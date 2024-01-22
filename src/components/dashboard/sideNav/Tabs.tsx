import React, { useState } from 'react'

interface Props {
    pic: any,
    location: string,
    description: string,
    selected? : boolean
}

const Tabs : React.FC<Props> = ({pic, location, selected = false, description}) => {

    const [hovered, setHovered] = useState(false);
  return (
    <div className={'p-2 rounded-2xl relative ' + (selected ? 'bg-[#00B38C]' : '')} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <a href={location}>
            <img src={pic} alt="Add Location" className='w-6' style={(selected ? {filter: 'invert(1) brightness(20)'} : {})} />
        </a>
        {
            hovered && (
                <>
                <div className='absolute bg-[#202758] text-[#58ECC2] ps-5 pe-4 left-20 z-20 bottom-1/2 translate-y-[50%] hovDesc text-sm rounded-tr-xl rounded-br-xl rounded-tl rounded-bl whitespace-nowrap py-2 border-2 border-[#58ECC2]' >
                {description}
                </div>
                {/* Arrow Part */}
                <div className='absolute left-[73px] top-1/2 bg-[#202758] p-2 rotate-45 border border-[#58ECC2] translate-y-[-50%] z-20 arrow' />
                </>
            )
        }



    </div>
  )
}

export default Tabs