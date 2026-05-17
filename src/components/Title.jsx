import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 mb-4 text-center select-none'>
        <div className='flex items-center justify-center gap-2'>
            <h2 className='text-2xl sm:text-3.5xl font-serif text-[#141413] tracking-tight font-light leading-tight'>
                {text1} <span className='italic font-normal text-[#cc785c]'>{text2}</span>
            </h2>
        </div>
        {/* Editorial double hairline layout divider */}
        <div className='w-16 h-[1.5px] bg-[#e6dfd8] rounded-full' />
    </div>
  )
}

export default Title
