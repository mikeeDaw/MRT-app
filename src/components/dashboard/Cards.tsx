import React from 'react'
import { RArrow, Beep } from '../../icons'
import { InputField } from '../'
import Beepcard from './Beepcard'

const Cards = () => {
  return (
    <>
        <div className='w-full flex h-full'>
            <div className='bg-cyan-200 w-1/4 h-full flex flex-col items-center gap-3 pt-10'>

                <div className='flex flex w-5/6 relative'>
                    <div className='w-[20px] absolute bottom-2/4 translate-y-2/4 left-[10px]'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 15L21 21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" stroke-width="2"></path> </g></svg>
                    </div>
                    <input type="text" className='rounded-xl w-full ps-10' placeholder='Search'>
                    </input>
                </div>

                <button className='bg-slate-100 py-2 text-slate-500 px-4 flex border-4 border-dashed border-slate-400 rounded-xl w-10/12 relative gap-2 items-center transition-all duration-75 hover:border-solid'>
                    <div className='text-lg leading-none'> + </div>
                    <div> Generate Card </div>
                </button>

                <Beepcard uid={'4958385939'} selected={false} />
                <Beepcard uid={'8294064932'} selected={false} />
                <Beepcard uid={'3002593811'} selected={true} />
                <Beepcard uid={'1833759224'} selected={false} />
                <Beepcard uid={'5023304256'} selected={false} />

            </div>

            <div className='w-1/2 h-full flex flex-col items-center justify-center relative'>
                <div className='absolute top-0 bg-white p-2 rounded-full'>
                    <img src={Beep} alt="Beep Icon" className='w-[80px]' />
                </div>

                content area
                <div className='w-5/6 h-5/6 flex flex-col rounded-xl' style={{boxShadow:'0 0 15px -2px #242424'}} >
                    <div className='h-2/4 bg-white rounded-t-xl p-4'>
                        Card Data
                    </div>

                    <div className='bg-green-100 h-2/4 rounded-b-xl p-4'>
                        Transactions
                    </div>
                </div>
            </div>

            {/* Increase Load */}
            <div className='w-1/4 bg-orange-300 p-2'>
                <div className='bg-slate-800 border-2 mt-4 border-slate-800 rounded-xl'>
                    <div className='p-3 pt-2 rounded-t-xl text-white'>
                        Add Load
                    </div>
                    <div className='bg-white rounded-b-xl p-4 pb-3 flex flex-col'>
                        <InputField forImg={false} placeholder='0.00' textIcon='PHP'/>
                        <div className='text-end'>
                            <button className='w-2/6 text-sm bg-slate-800 text-white p-1 rounded-xl mt-1'>
                                Load
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default Cards