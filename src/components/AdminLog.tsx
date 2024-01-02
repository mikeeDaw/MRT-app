import React from 'react'

const AdminLog = () => {
  return (
    <div
    className='flex flex-col border-2 border-[#202758] p-6 justfy-center items-center rounded-b-xl'
    >

        <div className='flex justify-center w-full'>
            <svg className="w-16 h-16 text-[#202758] mt-3 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        </div>

        <div className="flex mt-4 mb-3 w-full">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-xl">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
            </span>
            <input type="text" id="emailAdmin" className="rounded-none rounded-e-lg bg-gray-10 border text-gray-900 outline-0 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 focus:border-[#202758] tracking-widest" placeholder="Email"
            />
        </div>

        <div className="flex w-full">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-xl">
            <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/>
            </svg>
            </span>
            <input type="password" id="emailAdmin" className="rounded-none rounded-e-xl bg-gray-10 border text-gray-900 outline-0 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 focus:border-[#202758] tracking-widest" placeholder="Password"
            />
        </div>


        <button className='mt-6 py-2 bg-[#202758] text-white rounded-full w-2/3 border-2 border-white hover:bg-white hover:text-sky-800 hover:border-2 hover:border-sky-800'> Log In</button>


    </div>
  )
}

export default AdminLog