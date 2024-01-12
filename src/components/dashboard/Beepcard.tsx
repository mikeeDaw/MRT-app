import React from 'react'

interface Props {
    uid: String,
    selected: Boolean
}
const Beepcard: React.FC<Props> = ({uid, selected}) => {
  return (
    <>
    <button className='bg-slate-600 text-white border-slate-800 border-2 bg-white py-2 px-4 flex rounded-xl w-10/12 relative flex gap-2'>
        <div className='font-semibold italic text-slate-300'> UID: </div>
        <div className='tracking-wider'> {uid} </div>
        { selected && (
            <div className='absolute right-[-37px] bg-green-500 p-2 rounded-3xl bottom-2/4 translate-y-2/4'>
                <svg fill="#FFFFFF" height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 330 330" stroke="#FFFFFF" stroke-width="5.58"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
            </div>
        ) }
    </button>
    </>
  )
}

export default Beepcard