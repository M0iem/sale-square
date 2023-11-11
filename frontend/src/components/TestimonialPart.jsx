import React from 'react'
import photo1 from '../images/testimonials/photo1.jpg'
import photo2 from '../images/testimonials/photo2.jpg'
import photo3 from '../images/testimonials/photo3.jpg'

const TestimonialPart = () => {
  return (
    <div>
      <div className='text-center p-10'>
        <h5 className='text-gray-500'> Testimonials</h5>
        <h1 className=' sm:text-2xl md:text-3xl  mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>Read What Others Have To Say</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 max-x-5xl gap-8 mx-auto group '>
            <div className='bg-[#1B151F] group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl text-white mix-blend-luminosity ' >
                <img src={photo1} alt="" className='w-20 h-20 rounded-full mx-auto' />
                <h4 className='uppercase text-md sm:text-xl font-bold mt-2'> sara M. </h4>
                <p className='text-sm leading-7 my-3 font-light opacity-50 '> I absolutely love shopping at this e-commerce website! They have a wide range of products to choose from, and the quality is always top-notch. The customer service is excellent too. I highly recommend them!  </p>
            

            </div>
            <div className='bg-[#1B151F] group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl text-white mix-blend-luminosity' >
                <img src={photo2} alt="" className='w-20 h-20 rounded-full mx-auto' />
                <h4 className='uppercase text-md sm:text-xl font-bold mt-2'> David L. </h4>
                <p className='text-sm leading-7 my-3 font-light opacity-50 '> I have been a loyal customer of this e-commerce website for years, and I'm always impressed with their fast shipping and reliable delivery. Their website is easy to navigate, and I can always find what I'm looking for. It's my go-to online shopping destination!  </p>
            

            </div>
            <div className='bg-[#1B151F] group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl text-white mix-blend-luminosity' >
                <img src={photo3} alt="" className='w-20 h-20 rounded-full mx-auto' />
                <h4 className='uppercase text-md sm:text-xl font-bold mt-2'> Michael S. </h4>
                <p className='text-sm leading-7 my-3 font-light opacity-50 '> I had a fantastic experience shopping at this e-commerce website. The product selection is extensive, and the quality is exceptional. Their checkout process is seamless, and the delivery was prompt. I will definitely be recommending them to my friends and family!  </p>
            

            </div>
        </div>

      </div>
    </div>
  )
}

export default TestimonialPart
