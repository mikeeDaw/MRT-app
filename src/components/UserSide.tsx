import React from 'react'
import DataField from './DataField'
import {Wallet, Pay, Beep} from '../icons'

const UserSide = () => {

  return (
        <div
        className='flex flex-col border-2 border-[#202758] py-6 rounded-b-lg'
        >
            
            <div className="flex my-4 px-6">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-lg">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
            </span>
            <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-10 border text-gray-900 outline-0 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 focus:border-cyan-400 tracking-widest" placeholder="Your UID..."
            
            />
            </div>

            <div className='bg-cyan-300 mb-3 flex items-center py-3 px-5' style={{backgroundImage: "linear-gradient(45deg, #1a9d49, transparent)"}}>
                <div className='flex flex-col'>
                    <span className='text-white text-sm'> You are in: </span>
                    <span className='text-white text-xl font-bold'> ORTIGAS STATION </span>
                </div>
            </div>

            <div
            className='flex flex-row gap-3 px-6'
            >
                <div className='w-1/2 flex flex-col gap-2'>
                    <DataField title={"Balance"} data={"Php 0.00"} icon={Wallet}/>
                    <DataField title={"Origin"} data={"---"} icon={Wallet} />
                </div>
                <div className='w-1/2 flex flex-col gap-2'>
                    <DataField title={"Fare"} data={"Php 0.00"} icon={Pay}/>
                    <DataField title={"To"} data={"---"} icon={Wallet} />
                </div>
            </div>

        </div>
  )
}

export default UserSide