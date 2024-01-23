import React from 'react'

const TopNav = () => {
  return (
    <>
    <div className="h-[60px] flex items-center justify-between ps-5 pe-10" style={{boxShadow: '3px 1px 6px -1px #c9c9c9', zIndex:'10'}}>
        <span> Sample Title Header</span>
        <div>
            <button className='rounded-xl border border-[#00B38C] px-4 py-1 text-[#00B38C] text-sm'>
                Click Me
            </button>    
        </div>       
    </div>
    </>
  )
}

export default TopNav