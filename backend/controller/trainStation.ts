import express from 'express';
import { createStation } from '../models/stationModel';

export const makeStation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const sample = req.body;
    res.status(200).json({msg:'SUCCESS'})
    console.log(sample)
}