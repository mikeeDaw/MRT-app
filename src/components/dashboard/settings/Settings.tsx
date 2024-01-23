import React from 'react'

const Settings = () => {
  return (
    <>
    <div className='flex bg-slate-300 h-full p-5'>
        <div className='w-5/12 bg-white h-1/2 p-4 flex flex-col gap-4'>
            <span className='font-bold'> Charges </span>
            <div className='flex flex-col h-full gap-2'>
                <div className='flex w-full border justify-between py-2 px-4 items-center' style={{boxShadow: '1px 1px 5px -3px #797979'}}>
                    <span className='text-sm'> Penalty Fee</span>
                    
                    <span> ₱ 25</span>
                </div>
                <div className='flex w-full border justify-between py-2 px-4 items-center' style={{boxShadow: '1px 1px 5px -3px #797979'}}>
                    <span className='text-sm'> Minimum Fare</span>
                    
                    <span className='w-[50px] text-center'> ₱ 15</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Settings