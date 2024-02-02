import React, { useState } from 'react';
import { Thrash2 } from '../../../icons';
import { motion } from 'framer-motion';
import { StationMod } from '../../types/models';
import {Middleware} from '../../../middleware/Middleware';
import { ToastContainer, toast } from 'react-toastify';
const endpoint = process.env.REACT_APP_URL

interface Props {
    code: String,
    name: String,
    delay: number,
    setSelect: () => void,
    selected: boolean,
    connections: string[],
    getAll: () => Promise<void>,
    resetter: () => void
}

const StationCard : React.FC<Props> = ({code, name, delay, setSelect, selected, connections, getAll, resetter}) => {

  const {getToken, logout} = Middleware()

  const handleDelete = async (code:string) => {
    const response = await fetch(`${endpoint}/station/deleteMe`, {
      method: 'DELETE',
      headers: {
          "Content-Type": 'application/json',
          'Authorization': getToken()
      },
      body: JSON.stringify({name, code, connected: connections})
      }).then(async (jason) => {
          if(jason.status === 200){
              // const data = await jason.json()
              // console.log(data)
              await getAll()
              resetter()
          } else {
              console.log('Error');
              logout()
          }
      }).catch((error) => {
          console.log(error.message)
      })
      setConfDel(false)
  }

  const [confDel, setConfDel] = useState(false)

  const titleCase = (inputString:String) => {
    return inputString.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
  }

  return (
    <>
    <motion.tr className={'cursor-pointer stationCard ' + (selected ? 'bg-[#3ee7c3]' : 'bg-white') }
    initial={{y:-30,opacity:0}} animate={{y:0,opacity:1, transition: {type:'spring',bounce:0.4,delay:delay, duration: 0.7} }} exit={{x:-10, opacity:0}} onClick={setSelect}>
        <td className='rounded-l-xl border border-r-0 ps-5 py-2.5 font-bold text-sm'> {code} </td>
        <td className='border border-x-0 py-2.5 ps-7'> {name} </td>
        <td className='rounded-r-xl border border-l-0 pe-2'>
          {
            confDel ? (
              <>
              <div className='relative' onClick={()=> handleDelete(String(code))}>
              <motion.button key={"Conf"} className='absolute left-0 top-0 translate-y-[-50%] border p-0.5 rounded-full bg-[#e73030] border-[#e73030]' id='constConfDel'  > 
                <svg viewBox="0 0 24 24" className='w-4' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </motion.button>
              </div>
              </>
            ) : (
              <>
              <button className={'rounded-full w-5 p-1' + (selected ? 'bg-[#3ee7c3]' : 'bg-white')} onClick={()=>{setConfDel(true)}}>
                  <img src={Thrash2} className='w-5' alt="" />
              </button>
              </>
            )
          }

        </td>
    </motion.tr>
    </>
  )
}

export default StationCard