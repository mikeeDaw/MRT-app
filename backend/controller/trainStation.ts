import express from 'express';
import { createStation, getStations, updateStationByCode } from '../models/stationModel';

export const makeStation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const {name, code, connected, coordinates} = req.body;

    try {
        const data = await createStation({name, code, connected, coordinates}) 
        console.log(data)
        res.status(200).json({message:'Creation Done!'})       
    } catch (error) {
        console.log('Error: Creation Not Successful.', error)
        res.status(400).json({message:'Creation Failed.'})  
    }
}

export const getAllStations = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const sample = req.body;
    try {
        const data = await getStations()
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        res.status(400).json({msg:"Error in Getting Data"})
        console.log("Error in catch")
    }

}

export const updateStation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {origCode ,name, code, connected, coordinates} = req.body;

    try {
        
        const updated = await updateStationByCode(origCode,{name,code,connected,coordinates})
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({message: 'Update Failed.'})
    }
}