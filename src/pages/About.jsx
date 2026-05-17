import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Photo" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>Born out of India’s rich textile legacy, Trendify is your premium thinking partner in style. Our collections blend organic, long-staple Indian cottons with contemporary global cuts. Every garment is a modern take on daily elegance, designed in Delhi and meticulously crafted to celebrate absolute comfort, tailored drape, and perfect summer breathability.</p>
          <p>We work directly with textile collectives and modern design hubs across Jaipur, Surat, and Coimbatore to source organic fibres, supporting local craftsmanship while ensuring premium quality. From your first click to the moment your package arrives at your doorstep, we are dedicated to a seamless, premium, and purely customer-first shopping experience.</p>
          <b className='text-gray-800'>Our Legacy</b>
          <p>To honor India's generational heritage of fine handlooms and premium organic cotton, translating centuries of textile mastery into effortless, modern daily wear.</p>
          <b className='text-gray-800'>Our Commitment</b>
          <p>To offer premium design, meticulous tailoring, and sustainable local sourcing—delivering standard-setting Indian craftsmanship to style-focused closets worldwide.</p>
        </div>
      </div>
      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col mb-20 text-sm md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At Trendify, quality comes first. Every product is carefully chosen and inspected to meet our high standards. Shop with confidence, knowing we ensure excellence in every detail.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Convenience</b>
          <p className='text-gray-600'>Trendify ensures a smooth shopping experience with easy browsing, fast shipping, simple returns, and multiple payment options. Your comfort and satisfaction are our priorities.</p>
        </div>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At Trendify, exceptional service is our promise. Our dedicated support team is here to assist you with any questions or concerns, ensuring a smooth and satisfying shopping experience.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
