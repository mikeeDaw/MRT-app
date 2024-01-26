import React from 'react'

interface Props {
    uid: String,
    selected: Boolean,
    handleClick: (data: any) => void,
}
const Beepcard: React.FC<Props> = ({uid, selected, handleClick}) => {
  return (
    <>
    <button key={Number(uid)} className={'border-[#a9a9a9] border break-all items-center py-2 px-4 flex rounded-xl w-10/12 relative flex gap-3 ' + (selected ? 'bg-[#58ECC2]' : 'bg-white ')} onClick={handleClick}>

        <div className={'font-semibold italic break-normal ' + (selected ? 'text-[#202758]' : 'text-slate-400')}> UID: </div>
        <div className={'tracking-wide text-left text-md ' + (selected ? 'text-[#202758]' : 'text-slate-600') }> {uid} </div>

    </button>
    </>
  )
}

export default Beepcard