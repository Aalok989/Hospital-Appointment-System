import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Helper function for password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file; // Uploaded file

    // Log incoming data for debugging
    console.log("Body:", req.body);
    console.log("File:", req.file);

    // Validate required fields
    const requiredFields = [
      { name: "name", value: name },
      { name: "email", value: email },
      { name: "password", value: password },
      { name: "speciality", value: speciality },
      { name: "degree", value: degree },
      { name: "experience", value: experience },
      { name: "about", value: about },
      { name: "fees", value: fees },
      { name: "address", value: address }
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        return res.json({ success: false, message: `${field.name} is required` });
      }
    }

    // Validate file upload
    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Parse JSON address
    const parsedAddress = JSON.parse(address || "{}");

    // Save doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added!" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.json({ success: false, message: "Error adding doctor: " + error.message });
  }
};

// API for admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate credentials against environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate a JWT token with a secure payload and set an expiration time
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Send the token in the response
      return res.json({ success: true, token });
    } else {
      // Send an invalid credentials response
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API to get all doctors at admin panel

const allDoctors = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error);
    res.json({success:false,messgae:error.message})
  }
}

// API to get all appointment list
const appointmentsAdmin = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true, appointments})
  } catch (error) {
    console.log(error);
    res.json({success:false,messgae:error.message})
  }
}

// API for appointment Cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


// API to get dashboard data for admin panel
const adminDashboard = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({success:true, dashData})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard};
