import React from 'react'
import { toast } from 'react-toastify'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        toast.success("Thank you! You have successfully subscribed to the Trendify newsletter.");
    }
    
  return (
    <div className='my-16 bg-[#cc785c] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-md select-none transition-all duration-300'>
        {/* Soft geometric design circle elements */}
        <div className='absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none' />
        <div className='absolute -bottom-16 -left-16 w-64 h-64 bg-black/5 rounded-full pointer-events-none' />

        <div className='relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center justify-center'>
            {/* Tagline category label */}
            <span className='text-[10px] tracking-[0.2em] font-semibold text-white/90 uppercase font-sans mb-3.5'>
                Brand Voltage Bulletin
            </span>

            {/* Display Headings */}
            <h2 className='text-3xl sm:text-4.5xl font-serif text-[#faf9f5] font-light leading-tight tracking-tight mb-3'>
                Unlock <span className='italic font-normal text-white'>20% Off</span> your premiere order.
            </h2>
            <p className='text-sm text-[#faf9f5]/85 font-sans font-light leading-relaxed mb-8 max-w-md'>
                Subscribe to our editorial newsletter and be the first to receive catalog premiere drops, designer features, and custom promotions.
            </p>

            {/* Inverted Subscription Form Box */}
            <form 
                onSubmit={onSubmitHandler} 
                className='flex items-center w-full max-w-md bg-[#faf9f5] border border-[#e6dfd8] rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-white/50 transition-all duration-200'
            >
                <input 
                    className='w-full px-4 py-3 bg-transparent text-sm text-[#141413] outline-none placeholder-[#8e8b82]' 
                    type="email" 
                    placeholder='Enter your email address...'
                    required 
                />
                {/* Coral primary CTA button on cream canvas */}
                <button 
                    type='submit' 
                    className='px-6 py-3.5 text-xs font-sans font-bold bg-[#cc785c] text-white hover:bg-[#a9583e] active:scale-98 transition-all uppercase tracking-wider focus:outline-none'
                >
                    Subscribe
                </button>
            </form>
        </div>
    </div>
  )
}

export default NewsLetterBox
