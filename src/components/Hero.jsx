import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='border border-[#e6dfd8] rounded-2xl overflow-hidden bg-[#efe9de] flex flex-col md:flex-row shadow-sm min-h-[480px] my-6 transition-all duration-300'>
        {/* Hero left side - Editorial Content Panel */}
        <div className='flex items-center justify-center w-full py-12 px-6 md:px-12 md:w-1/2 bg-[#faf9f5]/65 backdrop-blur-sm'>
            <div className='text-left max-w-md flex flex-col items-start'>
                {/* Brand Accent Tag with Inline Spike Mark */}
                <div className='flex items-center gap-1.5 mb-4'>
                   
                    <span className='text-[11px] tracking-[0.15em] font-semibold text-[#cc785c] uppercase font-sans'>
                        Season Premiere
                    </span>
                </div>
                
                {/* Editorial Display Headline */}
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-serif text-[#141413] font-light leading-[1.1] tracking-tight mb-4'>
                    Meet your <br/>
                    <span className='italic font-normal text-[#cc785c]'>thinking</span> partner in style.
                </h1>
                
                {/* Humanist Subtitle */}
                <p className='text-sm sm:text-base text-[#3d3d3a] font-sans font-light leading-relaxed mb-8 max-w-sm'>
                    Meticulously curated premium apparel designed to blend warm literary editorial voice with everyday comfortable elegance.
                </p>
                
                {/* Signature Coral CTA Button */}
                <Link 
                    to='/collection' 
                    className='inline-flex items-center justify-center px-7 py-3.5 bg-[#cc785c] hover:bg-[#a9583e] text-white font-sans font-medium text-xs rounded-lg uppercase tracking-wider shadow-sm transition-all duration-200 active:scale-95 focus:outline-none hover:shadow-md'
                >
                    Browse Collections
                </Link>
            </div>
        </div>
        
        {/* Hero right side - Premium Photography */}
        <div className='w-full md:w-1/2 relative min-h-[300px] md:min-h-auto overflow-hidden'>
            <img 
                className='absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 hover:scale-105' 
                src={assets.fashion2} 
                alt="Latest arrivals clothing editorial model" 
            />
            {/* Subtle soft edge gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#faf9f5]/15 via-transparent to-transparent pointer-events-none' />
        </div>
    </div>
  )
}

export default Hero
