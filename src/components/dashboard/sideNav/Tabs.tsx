import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIntoTab, fadeIntoTabArrow } from '../../../constants/animate';
interface Props {
    pic: any,
    location: string,
    description: string,
    selected? : boolean,
    handleClick : () => any
}

const Tabs : React.FC<Props> = ({pic, location, selected = false, description, handleClick}) => {

    const [hovered, setHovered] = useState(false);
  return (
    <div className={'p-2 rounded-2xl relative hover:bg-[#00B38C] iconContainer ' + (selected ? 'bg-[#00B38C]' : '')} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleClick}>
        <a href={location}>
            <img src={pic} alt="Add Location" className='w-6' style={(selected ? {filter: 'invert(1) brightness(20)'} : {})} />
        </a>
        <AnimatePresence>
        {
            
            hovered && (
                <>
                    <motion.div {...fadeIntoTab} className='absolute bg-[#202758] text-[#58ECC2] ps-5 pe-4 left-20 z-20 bottom-1/2 translate-y-[50%] hovDesc text-sm rounded-tr-xl rounded-br-xl rounded-tl rounded-bl whitespace-nowrap py-2 border-2 border-[#58ECC2] tabber' >
                    {description}
                    </motion.div>
                    {/* Arrow Part */}
                    <motion.div {...fadeIntoTabArrow} className='absolute left-[73px] top-1/2 bg-[#202758] p-2 rotate-45 border border-[#58ECC2] translate-y-[-50%] z-20 arrow' />  
                </>
            )

        }
        </AnimatePresence>



    </div>
  )
}

export default Tabs