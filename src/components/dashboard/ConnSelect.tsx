import React from 'react'
import { Select } from 'flowbite-react'

interface Props {
    id: string
    handleClick : () => void
}

const ConnSelect : React.FC<Props> = ({id, handleClick}) => {
  return (
    <> 
        <div className="w-full flex" id={id}>
          <Select required className='w-5/6'>
            <option>Ayala</option>
            <option>Buendia</option>
            <option>Cubao</option>
            <option>Taft</option>
          </Select>
          <div className='w-1/6 flex justify-center items-center cursor-pointer' onClick={handleClick}>
            <svg fill="#f03838" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.29 310.29" stroke="#f03838"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142 C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32 c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"></path> </g></svg>
          </div>
        </div>
    </>
  )
}

export default ConnSelect