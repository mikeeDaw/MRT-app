import React from 'react'
import { Table } from 'flowbite-react'

const EditStation = () => {

    // fetch('http://localhost:5000/stations/255654').then((res) => res.json()).then((res) => {
    //     console.log(res)
    // })

  return (
    <>
    <div className='w-full bg-cyan-100 p-5'>
        <span className='text-xl font-semibold'> Edit Stations </span>
    </div>

    <div>
        <Table striped>

        </Table>
    </div>
    </>
  )
}

export default EditStation