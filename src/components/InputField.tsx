import React from 'react'

interface Props {
    forImg: boolean,
    textIcon? : string,
    icon? : any,
    placeholder: string,
    inpValue? : string | number,
    name? : string,
    setter? : React.Dispatch<React.SetStateAction<any>>,
    error?: boolean,
    onlyRead? : boolean,
    type? : string,
    disabled? : boolean
}

const InputField : React.FC<Props> = ({forImg, textIcon, icon, placeholder, inpValue, name, setter = () => {}, error=false, onlyRead=false, type = 'text', disabled = false}) => {

    const renderIcon = () => {
        if(forImg)
            return icon
        else   
            return <span> {textIcon} </span>
    }

  return (
    <>
    <div className="flex mt-1 mb-2 w-full">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-xl">
            {renderIcon()}
        </span>
        <input type={type} id="emailAdmin" className={"rounded-none rounded-e-lg border text-gray-900 outline-0 block flex-1 min-w-0 w-full text-sm p-2 focus:border-[#202758] " + (error ? 'border-red-400' : 'border-gray-300')+ (onlyRead ? ' bg-slate-100' : '')} placeholder={placeholder}
        value={inpValue == 'undefined' ? '' : inpValue}
        name={name}
        onChange={(e) => {setter(e)}}
        readOnly={onlyRead}
        disabled={disabled}
        />
    </div>
    </>
  )
}

export default InputField