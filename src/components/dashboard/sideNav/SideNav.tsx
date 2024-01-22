import React, { useState } from 'react'
import { MRT, Stations, Logout, Settings, Add, Card  } from '../../../icons'
import Tabs from './Tabs'

const SideNav = () => {

  const [activeIcon, setActiveIcon] = useState('Add')

  return (
    <div className={"flex flex-col items-center w-[75px] pt-5 pb-6 px-2 bg-[#202758] gap-3"}>
        <div className='border-b border-[#58ECC2] pt-1 pb-4'>
            <a href="">
                {<img src={MRT} alt="Mrt Logo" className='w-full translate-x-[-3px]' />}
            </a>
        </div>
        <div className='flex flex-col justify-between items-center h-full w-full'>
          <div className='flex flex-col gap-3 mt-3'>
            <Tabs pic={Add} location={'#'} selected={true} description={'Add New Station'} />
            <Tabs pic={Stations} location={'#'} description={'Train Stations'} />
            <Tabs pic={Card} location={'#'} description={'Beep Cards'} />
          </div>
          <div className='flex flex-col gap-3 border-t border-[#58ECC2] w-full items-center pt-3'>
            <Tabs pic={Settings} location={'#'} description={'Settings'} />
            <Tabs pic={Logout} location={'#'} description={'Log Out'} />
          </div>

        </div>


    </div>
  )
}

export default SideNav