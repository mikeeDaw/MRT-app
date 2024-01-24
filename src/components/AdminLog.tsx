import React, { useContext, useEffect, useState } from 'react'
import InputField from './InputField'
import { Navigate, useNavigate } from 'react-router';
import {Middleware, isLogged} from '../middleware/Middleware';


const AdminLog = () => {

    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [usernameErr, setUsernameErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const nav = useNavigate();
    const {login} = Middleware()
    const auth = isLogged()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUsernameErr(false)

        if(!username || !password){
            if (!username) {setUsernameErr(true)}
            if (!password) {setPassErr(true)}
            return
        }
        
        const fetchBody = {username:username, password:password}

        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })

        const json = await response.json()
        console.log(json)
        
        if(response.ok){
            login(json.authentication.sessionToken)

        } else {
            if(json.ErrUser) { setUsernameErr(true) }
            if(json.ErrPass) { setPassErr(true) }
        }
        
    }

    const emailSVG = (
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg>
    )

    const passSVG = (
        <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
            <path stroke="currentColor" d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/>
        </svg>
    )
  return (
    <div
    className='flex border-2 border-[#202758] p-6 rounded-b-xl'
    >
        <form className='w-full flex flex-col justify-center items-center'
            onSubmit={(e) => { handleSubmit(e)}}
        >
            <div className='flex justify-center w-full mb-3'>
                <svg className="w-16 h-16 text-[#202758] mt-3 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
            </div>

            <InputField forImg={true} icon={emailSVG} placeholder={'Username'} name='username' setter={(e) => {setUsername(e.target.value)}} inpValue={username} error={usernameErr} onlyRead={auth} />

            <InputField forImg={true} icon={passSVG} placeholder={'Password'} name='passw' type='password' setter={(e) => {setPass(e.target.value)}} inpValue={password} error={passErr} onlyRead={auth} />

            {
                !auth ? (
                    <button className='mt-5 py-2 bg-[#202758] text-white rounded-full w-2/3 border-2 border-white hover:bg-white hover:text-sky-800 hover:border-2 hover:border-sky-800' type='submit'> Log In</button>
                ) : (
                    <button className='mt-5 py-2 bg-[#202758] text-white rounded-full w-2/3 border-2 border-white hover:bg-white hover:text-sky-800 hover:border-2 hover:border-sky-800' type='button' onClick={()=> {nav('/admin')}} > Dashboard </button>
                )
            }

        </form>

    </div>
    
  )
}

export default AdminLog