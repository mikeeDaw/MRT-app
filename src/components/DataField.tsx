import { title } from 'process'
import React from 'react'

interface Props {
    title : String,
    data : String,
    icon : any
}

const DataField : React.FC<Props>= ({title, data, icon}) => {

  return (
    <div className='bg-slate-100 flex gap-5 justify-start items-center p-2 rounded-lg'>
        <div className='justify-start'>
            <img src={icon} alt='Icon' className='w-8' />
        </div>
        <div className='flex flex-col'>
            <span className='font-bold'>
                {title}
            </span>
            <span className='text-sm'>
                {data}
            </span>
        </div>

    </div>
  )
}

export default DataField