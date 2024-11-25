import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    // Find the doctor by ID
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "found" });
    }

    // Toggle the availability status
    const updatedDoc = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true } // Returns the updated document
    );

    res.json({ success: true, message: "Availability Changed", data: updatedDoc });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
export { changeAvailability, doctorList };
