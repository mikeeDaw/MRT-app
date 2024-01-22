import React, {createContext} from 'react'


const authCxt = createContext({
    auth : false,
    setAuth : (auth:boolean) => {}
})


export default authCxt;