import React from 'react';
import { Thrash2 } from '../../../icons';
import { motion } from 'framer-motion';
import { StationMod } from '../../types/models';

interface Props {
    code: String,
    name: String,
    delay: number,
    setSelect: () => void,
    selected: boolean
}

const StationCard : React.FC<Props> = ({code, name, delay, setSelect, selected}) => {
  return (
    <>
    <motion.tr className={'cursor-pointer stationCard ' + (selected ? 'bg-[#3ee7c3]' : 'bg-white') }
    initial={{y:-30,opacity:0}} animate={{y:0,opacity:1, transition: {type:'spring',bounce:0.4,delay:delay, duration: 0.7} }} exit={{x:-10, opacity:0}} onClick={setSelect}>
        <td className='rounded-l-xl border border-r-0 ps-5 py-2.5 font-bold text-sm'> {code} </td>
        <td className='border border-x-0 py-2.5 ps-7'> {name} </td>
        <td className='rounded-r-xl border border-l-0 pe-2'>
            <div className={'rounded-full w-7 p-1' + (selected ? 'bg-[#3ee7c3]' : 'bg-white')}>
                <img src={Thrash2} className='w-5' alt="" />
            </div>
        </td>
    </motion.tr>
    </>
  )
}

export default StationCard