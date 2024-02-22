import React, { useState } from 'react'
import { MRT, Stations, Logout, Settings, Add, Card  } from '../../../icons'
import Tabs from './Tabs'
import { Middleware } from '../../../middleware/Middleware' 

interface Props {
  setTab : React.Dispatch<React.SetStateAction<String>>,
  opened : boolean,
  openSide : React.Dispatch<React.SetStateAction<boolean>>
}

const SideNav : React.FC<Props> = ({setTab, opened, openSide}) => {

  const [activeIcon, setActiveIcon] = useState(localStorage.getItem('adminPage') ?? 'AddStation')

  const selected = (tab: String) => {
    return activeIcon == tab;
  }

  const { logout } = Middleware()

  return (
    <>
    <div className={"flex h-screen md:fixed md:left-auto flex-col items-center w-[75px] pt-5 pb-6 px-1 lg:px-2 bg-[#202758] gap-3 z-40 transition-all " + (opened ? 'left-0 fixed' : ' absolute left-[-75px]')}>
        <div className='border-b border-[#58ECC2] pt-1 pb-4'>
            <a href="">
                {<img src={MRT} alt="Mrt Logo" className='w-full translate-x-[-3px]' />}
            </a>
        </div>
        <div className='flex flex-col justify-between items-center h-full w-full'>
          <div className='flex flex-col gap-3 mt-3'>
            <Tabs pic={Add} location={'#'} selected={selected('AddStation')} description={'Add New Station'} handleClick={() => {setTab('AddStation'); setActiveIcon('AddStation')}} />
            <Tabs pic={Stations} location={'#'} selected={selected('Station')} description={'Train Stations'} handleClick={() => {setTab('Station'); setActiveIcon('Station')}} />
            <Tabs pic={Card} location={'#'} selected={selected('Card')} description={'Beep Cards'} handleClick={() => {setTab('Card'); setActiveIcon('Card')}} />
          </div>
          <div className='flex flex-col gap-3 border-t border-[#58ECC2] w-full items-center pt-3'>
            <Tabs pic={Settings} location={''} selected={selected('Settings')} description={'Management'} handleClick={() => {setTab('Settings'); setActiveIcon('Settings')}} />
            <Tabs pic={Logout} location={'/ayala/in'} description={'Log Out'} handleClick={logout} />
          </div>

        </div>


    </div>
    {
      opened && (
        <div className='fixed w-full h-full bg-[#000] z-30 h-full opacity-70' onClick={()=>openSide(!opened)}/>
      )
    }

    </>
  )
}

export default SideNav