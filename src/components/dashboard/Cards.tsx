import React, { useEffect, useRef, useState } from 'react'
import { RArrow, Beep, Thrash } from '../../icons'
import { InputField } from '../'
import Beepcard from './Beepcard'
import {Middleware} from '../../middleware/Middleware'

const Cards = () => {

    const { getToken } = Middleware()

    const [cards, setCards] = useState<any[]>([]);
    const [trackChanges, setTrackChanges] = useState(0);
    const [selectedCard, setSelectedCard] = useState<any>({})
    const [select, setSelect] = useState(false)
    const [load, setLoad] = useState(0);

    // const dragged = useRef();
    // Generate New Beep Card
    const generateHandler = async () => {
        const response = await fetch('http://localhost:4000/beep/generate', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': getToken()
            },
        })

        const jason = await response.json()
        console.log(jason)
        setTrackChanges(trackChanges+1)
        setSelectedCard(jason)
        setSelect(true)
    }

    
    // Get All beep cards
    const getAll = async () => {

        const response = await fetch('http://localhost:4000/beep/fetchAll', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': getToken()
            },
        })
        const jason = await response.json()
        setCards(jason);
    }

    // Load a card
    const loadBeep = async () => {

        const updBody = {uid: selectedCard.uid, load: Number(load)}

        const response = await fetch('http://localhost:4000/beep/load', {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify(updBody)
        })

        const jason = await response.json()
        console.log('Updated:',jason)
        setSelectedCard(jason)
        setTrackChanges(trackChanges+1)
    }

    // Delete a card
    const deleteCard = async (uid: string) => {

        const delBody = {uid:uid}
        const response = await fetch('http://localhost:4000/beep/deleteCard', {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify(delBody)
        })

        const jason = await response.json()
        console.log('Deleted:',jason)
        setTrackChanges(trackChanges-1)
        setSelect(false)
        setSelectedCard({})
    }

    useEffect(() => {
        getAll()
    },[trackChanges])

    const cardClick = (data:any) => {
        setSelectedCard(data)
        setSelect(true)
        setLoad(0); 
    }

    // For Dragging
    // const dragStart = (e:any, position : any) => {
    //     dragged.current = position;
    //     console.log(dragged.current)
    // }

    const loadChange = (e: any) => {
        const re = /^[0-9\b]+$/;
        const val = e.target.value
        if(val === '' || re.test(val)){
            setLoad(val);
        }
    }



  return (
    <>
        <div className='w-full flex h-full'>
            <div className='bg-slate-200 w-1/4 h-full flex flex-col items-center gap-3 py-10'>
                {/* Search Bar */}
                <div className='flex flex w-5/6 relative'>
                    <div className='w-[20px] absolute bottom-2/4 translate-y-2/4 left-[10px]'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 15L21 21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" stroke-width="2"></path> </g></svg>
                    </div>
                    <input type="text" className='rounded-xl w-full ps-10' placeholder='Search'>
                    </input>
                </div>

                <button className='bg-slate-100 py-2 text-slate-500 px-4 flex border-4 border-dashed border-slate-400 rounded-xl w-10/12 relative gap-2 items-center transition-all duration-75 hover:border-solid' onClick={generateHandler}>
                    <div className='text-lg leading-none w-1/6'> + </div>
                    <div> Generate Card </div>
                </button>

                {/* Card List */}
                <div className='w-full h-[380px] relative' id='idList'>
                    <div className='overflow-y-scroll w-full scrollbar-hide flex flex-col h-[380px] items-center gap-2 '>
                    {
                        cards.map((elem)=> <Beepcard uid={elem.uid} key={Number(elem.uid)} selected={selectedCard.uid == elem.uid} handleClick={() => {cardClick(elem)}} /> )
                    }
                    </div>
                </div>



            </div>
            {/* Middle Area */}
            <div className='w-1/2 h-full flex flex-col items-center justify-center relative pt-3'>
                {
                    select ? (
                        /* Beep Card */
                        <div className='w-5/6 h-5/6 flex flex-col rounded-xl relative' id='cardData' >
                            <div className='absolute top-[-35px] left-1/2 translate-x-[-50%] bg-white rounded-full z-10'>
                                <img src={Beep} alt="Beep Icon" className='w-[80px]' />
                            </div>
                            <div className='h-2/4 bg-white rounded-t-xl p-4 pt-10 flex' style={{zIndex:1}}>
                                <div className='flex flex-col w-full pt-3'>
                                    <div className='flex w-full flex-col items-center mb-5'>
                                        <span className='text-2xl'> {selectedCard.uid} </span>
                                        <span className='text-slate-400 text-sm'> UUID</span>
                                    </div>
                                    <div className='flex'>
                                        <div className='flex flex-col items-center w-1/2'>
                                            <span> Balance:</span>
                                            <span className='text-xl'> Php {selectedCard.balance}.00 </span>
                                        </div>
                                        <div className='flex flex-col w-1/2 items-center'>
                                            <span> Date Created</span>
                                            <span className='text-xl'> {new Date(selectedCard.createdAt).toLocaleString("en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='bg-green-100 h-2/4 rounded-b-xl p-4'>
                                Transactions
                            </div>
                        </div>
                    ) : (
                        <div className='border-4 border-slate-300 p-3 w-5/6 h-5/6 flex justify-center rounded-2xl '>
                            <div className='flex flex-col w-full h-full bg-slate-200 rounded-xl justify-center items-center '>
                                <svg viewBox="0 0 24 24" fill="none" className='w-32 opacity-55' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M5 11H19V15C19 16.8856 19 17.8284 18.4142 18.4142C17.8284 19 16.8856 19 15 19H9C7.11438 19 6.17157 19 5.58579 18.4142C5 17.8284 5 16.8856 5 15V11Z" fill="#737373"></path> <path d="M2.8153 7.8153L5 10L9 6L6.58869 4.39246C6.23591 4.15728 5.77317 4.17012 5.43399 4.42451L2.92241 6.30819C2.43557 6.67332 2.38499 7.38499 2.8153 7.8153Z" fill="#737373"></path> <path d="M21.1847 7.8153L19 10L15 6L17.4113 4.39246C17.7641 4.15728 18.2268 4.17012 18.566 4.42451L21.0776 6.30819C21.5644 6.67332 21.615 7.38499 21.1847 7.8153Z" fill="#737373"></path> <path d="M18 10V11H6V10L9 7H15L18 10Z" stroke="#737373" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                                <span className='text-slate-600 opacity-65'> No Card Selected..</span>
                            </div>

                        </div>
                    )
                }

            </div>

            {/* Increase Load */}
            <div className='w-1/4 p-2 flex flex-col justify-between py-10'>

                {/* Add Load */}
                <div className='bg-slate-800 border-2 mt-4 border-slate-800 w-11/12 rounded-xl'>
                    <div className='p-3 pt-2 rounded-t-xl text-white'>
                        Add Load
                    </div>
                    
                    <div className='bg-white rounded-b-xl p-4 pb-3 flex flex-col'>
                        <InputField forImg={false} placeholder='' inpValue={(select ? selectedCard.uid : '')} textIcon='UID' onlyRead={true}/>
                        <InputField forImg={false} placeholder='0.00' textIcon='PHP' disabled={!select} inpValue={(load > 0 ? load : '')} setter={loadChange} />
                        <div className='text-end'>
                            <button className='w-2/6 text-sm bg-slate-800 text-white p-1 rounded-xl mt-1 disabled:opacity-60 disabled:pointer-events-none' disabled={!select} onClick={loadBeep}>
                                Load
                            </button>
                        </div>

                    </div>

                </div>

                {/* Delete Button */}
                <button className='flex px-3 py-1.5 gap-3 items-center border-2 border-[#ff5959] bg-[#ff5959] w-9/12 mt-3 rounded-full transition-all duration-500 disabled:opacity-60 disabled:pointer-events-none' id='delBtn' onClick={()=>{deleteCard(selectedCard.uid)}} disabled={(select ? false : true)}>
                    <div className='p-1.5 rounded-full bg-[#ff9a9a]' draggable
                    onDragStart={(e) => console.log(e)}>
                        <img src={Thrash} alt="Thrash Icon" className='w-6' />
                    </div>
                    <span className='block text-white'> Delete Card </span>

                </button>

            </div>
        </div>
    </>
  )
}

export default Cards