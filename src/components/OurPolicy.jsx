import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='my-16'>
        {/* Responsive Grid - 3 Column Layout */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center select-none'>
            {/* Policy Card 1 */}
            <div className='bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-8 hover:shadow-md transition-all duration-300 group'>
                <div className='bg-[#faf9f5] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300'>
                    <img src={assets.exchange_icon} className='w-6 object-contain' alt="Exchange icon" />
                </div>
                <h3 className='text-md font-sans font-semibold text-[#141413] mb-2'>
                    Easy Returns & Exchanges
                </h3>
                <p className='text-xs sm:text-sm text-[#6c6a64] font-light leading-relaxed max-w-xs mx-auto'>
                    Complete peace of mind. Hassle-free reverse pick-ups across 19,000+ Indian Pin Codes within 7 days.
                </p>
            </div>

            {/* Policy Card 2 */}
            <div className='bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-8 hover:shadow-md transition-all duration-300 group'>
                <div className='bg-[#faf9f5] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300'>
                    <img src={assets.quality_icon} className='w-6 object-contain' alt="Quality icon" />
                </div>
                <h3 className='text-md font-sans font-semibold text-[#141413] mb-2'>
                    Sourced & Crafted in India
                </h3>
                <p className='text-xs sm:text-sm text-[#6c6a64] font-light leading-relaxed max-w-xs mx-auto'>
                    Meticulously woven from organic, premium long-staple Indian cottons, offering superior durability and cool breathability.
                </p>
            </div>

            {/* Policy Card 3 */}
            <div className='bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-8 hover:shadow-md transition-all duration-300 group'>
                <div className='bg-[#faf9f5] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300'>
                    <img src={assets.support_img} className='w-6 object-contain' alt="Support icon" />
                </div>
                <h3 className='text-md font-sans font-semibold text-[#141413] mb-2'>
                    COD & Dedicated Support
                </h3>
                <p className='text-xs sm:text-sm text-[#6c6a64] font-light leading-relaxed max-w-xs mx-auto'>
                    Cash on Delivery (COD) available nationwide with zero extra fees, backed by professional 24/7 client support.
                </p>
            </div>
        </div>
    </div>
  )
}

export default OurPolicy
