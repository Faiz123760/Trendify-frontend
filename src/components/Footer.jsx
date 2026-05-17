import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-screen relative left-1/2 -translate-x-1/2 bg-[#181715] text-[#a09d96] py-16 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-32 select-none border-t border-[#252320] shadow-inner overflow-hidden'>
        {/* Decorative subtle dark spikes */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full pointer-events-none' />

        <div className='max-w-7xl mx-auto flex flex-col md:grid grid-cols-[3fr_1fr_1fr] gap-12 text-sm'>
            {/* Mission Section */}
            <div className='flex flex-col items-start'>
                <Link to='/' className='mb-6 hover:opacity-85 transition-opacity'>
                    <img 
                        src={assets.logo} 
                        className='w-32 filter invert brightness-200' 
                        alt="Trendify Logo" 
                    />
                </Link>
                <p className='text-[#a09d96]/80 font-sans font-light leading-relaxed max-w-md'>
                    Thank you for shopping with Trendify! We are dedicated to delivering high-fidelity curated collections, combining timeless editorial styling with unparalleled comfort. Join our global journey and experience apparel reimagined.
                </p>
            </div>

            {/* Navigation Links Column */}
            <div>
                <h4 className='text-[#faf9f5] font-sans font-bold text-xs uppercase tracking-wider mb-5'>
                    Company
                </h4>
                <ul className='flex flex-col gap-2.5 font-sans font-light text-xs'>
                    <li>
                        <Link to='/' className='hover:text-[#faf9f5] transition-colors'>Home Catalogue</Link>
                    </li>
                    <li>
                        <Link to='/about' className='hover:text-[#faf9f5] transition-colors'>About Our Brand</Link>
                    </li>
                    <li>
                        <Link to='/collection' className='hover:text-[#faf9f5] transition-colors'>Delivery & Shipping</Link>
                    </li>
                    <li>
                        <Link to='/about' className='hover:text-[#faf9f5] transition-colors'>Privacy & Cookie Policies</Link>
                    </li>
                </ul>
            </div>

            {/* Get In Touch Column */}
            <div>
                <h4 className='text-[#faf9f5] font-sans font-bold text-xs uppercase tracking-wider mb-5'>
                    Get In Touch
                </h4>
                <ul className='flex flex-col gap-2.5 font-sans font-light text-xs'>
                    <li className='flex items-center gap-1.5'>
                        <span>📞</span> +91 87954 12711
                    </li>
                    <li className='flex items-center gap-1.5 hover:text-[#faf9f5] transition-colors cursor-pointer'>
                        <span>✉</span> faiz47532@gmail.com
                    </li>
                    <li className='flex items-center gap-1.5'>
                        <span>📍</span> 95/50 Beconganj, Kanpur Nagar, India
                    </li>
                </ul>
            </div>
        </div>

        {/* Separator & Copyright Fine-print */}
        <div className='max-w-7xl mx-auto mt-12 pt-8 border-t border-[#252320] flex flex-col sm:flex-row items-center justify-between text-xs text-[#a09d96]/60 font-sans font-light gap-4'>
            <p>© 2026 Trendify Premium E-Commerce. All rights reserved.</p>
            <div className='flex gap-4'>
                <span className='hover:underline cursor-pointer'>Terms of Service</span>
                <span className='hover:underline cursor-pointer'>Global Supply Chain</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer
