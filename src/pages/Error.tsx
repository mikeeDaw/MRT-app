import React from 'react'

const Error = () => {
  return (
    <>
    <div className='h-screen w-screen flex justify-center'>
        <div className='h-fit p-3 mt-32 w-full'>
            <div className='w-5/12 flex flex-col gap-4 ms-24 relative'>
                <span className='absolute top-[-80px] text-[200px] bg-clip-text text-transparent' style={{WebkitBackgroundClip:'text', background:'linear-gradient(179deg, rgb(0 0 0 / 17%),  rgb(255 255 255 / 0%)) text', fontFamily:'fantasy'}}> 404 </span>
                <span className='text-white font-bold text-4xl'>Looks like you are Lost!</span>
                <span className='text-white'>Sorry about that! Please check your URL for spelling errors to get where you need to go.</span>
            </div>
        </div>

    </div>
    </>
  )
}

export default Error