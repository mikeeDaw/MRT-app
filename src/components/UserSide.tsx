import React, { useContext, useEffect, useState } from 'react'
import DataField from './DataField'
import {Wallet, Pay, Beep} from '../icons'
import { ToastContainer, toast } from 'react-toastify'
import { CardMod } from './types/models'
import { TapMethod } from './context/Context'
const endpoint = process.env.REACT_APP_URL

interface Props {
    currStat : string
    tap: string
}


const UserSide: React.FC<Props> = ({currStat, tap}) => {

    const [inputVal, setInputVal] = useState<string>("")
    const [cardData, setCardData] = useState<CardMod | undefined>(undefined)
    const [canTap, setCanTap] = useState(false)
    const [fare, setFare] = useState(0)

    const submitUID = async (uid:string) => {
        console.log(uid)
        const response = await fetch(`${endpoint}/beep/getOne`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({uid:uid})
        }).then(async (jason) => {
            if(jason.status === 200){
                const data = await jason.json()
                setCardData(data)
                console.log(data)
            } else if (jason.status === 400){
                toast.error(`Card UID Not Found.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
            }
        })

    }
    const getFare = async () => {
        try {
          const response = await fetch(`${endpoint}/constants/get`, {
            method: 'GET',
            headers: {
              "Content-Type": 'application/json',
            },
          })
          .then(async (jason) => {
            if(jason.status === 200){
              const data = await jason.json();
              setFare(data.farePerKM);
            }
          })
        } catch (error : any) {
          console.log(error.message);
        }
      }

    const titleCase = (inputString:String) => {
        return inputString.replace(/\w\S*/g, (word) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
    }

    useEffect(()=>{
        getFare()
    },[])
    useEffect(() => {
        if(cardData){
            if(!cardData.tapped && cardData.origin === "")
                setCanTap(false) // 'disabled' is false. Can be clicked.
            else
                setCanTap(true)
        } else {
            setCanTap(true)
        }

    }, [cardData])
    useEffect(()=>{
        setCanTap(true) // true = disabled button
        setCardData(undefined)
    }, [inputVal])

    const tapIn = async () => {
        if(cardData && inputVal!==""){
            const response = await fetch(`${endpoint}/beep/tapIn`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({uid:inputVal, origin: currStat.toUpperCase()})
            }).then(async (jason) => {
                if(jason.status === 200){
                    const data = await jason.json()
                    setCardData(data)
                    console.log(data)
                    toast.success(`You Have Tapped In!`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        pauseOnHover: false,
                        progress: undefined,
                        theme: "colored",
                      });
                }
            })
            setCanTap(true)
        } else {

        }
    }

  return (
    <>
    <div className=''>
        <ToastContainer className="" stacked />
    </div>
    <div
    className='flex flex-col border-2 border-[#202758] py-6 rounded-b-lg'
    >
        {/* Search UID */}
        <div className="flex my-4 px-6 relative">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-s-lg">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        </span>
        <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-10 border text-gray-900 outline-0 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 pe-10 focus:border-cyan-400 tracking-widest" placeholder="Your UID..." value={inputVal} onChange={(e) => setInputVal(e.target.value)}
        autoComplete='off' onKeyUp={(e) => {if(e.key === 'Enter'){submitUID(inputVal)}}}
        />
        <button className={'absolute bottom-1/2 transition-all translate-y-[50%] '+ (inputVal.length !== 0 ? 'right-8 opacity-1' : 'right-5 opacity-0 pointer-events-none' )} onClick={()=>{submitUID(inputVal)}}>
            <svg fill="#676883" className='w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10 0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z"></path><path d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z"></path></g></svg>
        </button>

        </div>
        {/* Current Station */}
        <div className='bg-cyan-300 mb-3 flex items-center py-3 px-5' style={{backgroundImage: "linear-gradient(45deg, #1a9d49, transparent)"}}>
            <div className='flex flex-col'>
                <span className='text-white text-sm'> You are in: </span>
                <span className='text-white text-xl font-bold'> {currStat.toUpperCase()} STATION </span>
            </div>
        </div>
        {/* Card Data */}
        <div
        className='flex flex-row gap-3 px-6'
        >
            <div className='w-1/2 flex flex-col gap-2'>
                <DataField title={"Balance"} data={( cardData ? "₱ " + String(cardData.balance) + ".00" : "₱ ----")} icon={Wallet}/>
                <DataField title={"Origin"} data={( cardData ? (cardData.origin ? titleCase(cardData.origin) : '---') : "---")} icon={Wallet} />
            </div>
            <div className='w-1/2 flex flex-col gap-2'>
                <DataField title={"Fare"} data={( fare !== 0 ? '₱ ' + String(fare) + ' /KM' : "---")} icon={Pay}/>
                <DataField title={"To"} data={(tap !== 'in' ? titleCase(currStat) : '---')} icon={Wallet} />
            </div>
        </div>

        <div className='px-6 mt-3'>
            <button className='bg-[#0e137d] hover:bg-[#05094f] cursor-pointer w-full text-white py-2 rounded-lg disabled:opacity-60 disabled:pointer-events-none' disabled={canTap} onClick={tapIn}>
                { cardData ? (cardData.tapped ? 'Already Tapped In.' : `Tap ${tap}` ) : `Tap ${tap}`}
            </button>
        </div>


    </div>
    </>
  )
}

export default UserSide