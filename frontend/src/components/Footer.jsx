import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        {/* {--------Left--------} */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet debitis perspiciatis fugit quam dicta beatae iste, temporibus ad neque harum et veniam? Error asperiores atque similique officiis veritatis. Temporibus, necessitatibus.</p>
        </div>
        {/* {--------Center--------} */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us </li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/* {--------Right--------} */}
        <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 9817436147</li>
                <li>aalok1390@gmail.com</li>
            </ul>
        </div>
      </div>
      {/* {-------Copyright-------} */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 &copy; Tony's Care - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
