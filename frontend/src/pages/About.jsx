import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            aperiam labore quia fugiat id officiis aspernatur explicabo enim
            asperiores? Temporibus eos modi accusamus quod quas sunt nemo dolor.
            Repellendus, quibusdam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            magni amet reprehenderit, voluptatum voluptatem explicabo ex aut
            tenetur illum quibusdam rerum? Optio quos fugit pariatur nesciunt,
            qui cum? Magni, deserunt.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            quibusdam blanditiis rerum eos optio odio explicabo, delectus
            molestiae magnam vero aperiam quisquam, in, suscipit soluta impedit
            culpa voluptatibus natus expedita.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency</b>
          <p>Streamlined Appointment Booking That fits into your Busy Lifestyle</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>Access to a network of Trusted HealthCare Professionals in Your Area</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[-15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p>Tailored Recommmendations and Reminders to Hellp you stay on Top of Your Health</p>
        </div>
      </div>
    </div>
  );
};

export default About;
