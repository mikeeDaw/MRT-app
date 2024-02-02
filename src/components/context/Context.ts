import React, {createContext} from 'react'


export const authCxt = createContext({
    auth : false,
    setAuth : (auth:boolean) => {}
})

export const TapMethod = createContext({
    currStation: "buendia",
    pass: "in"
})
