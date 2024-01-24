import express from 'express';
import { createConst, getConstById, updateConst } from '../models/ConstantModel';

export const getConstant = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const data = await getConstById('Constant');
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({msg: 'No Document Found.'})
    }
}

export const updConstDocu = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const data = {penalty: req.body.penalty, farePerKM: req.body.farePerKM, minFare: req.body.minFare, minLoad: req.body.minLoad}
    console.log(data)
    try {
        const docu = await getConstById('Constant');

        if(!docu){
            return res.status(400).json({message: "Document was not Found."})
        }

        try {
            const updating = await updateConst('Constant', data)
            return res.status(200).json({msg: "Document was Updated!"})
        } catch (error) {
            return res.status(400).json({msg: "Update was not Successful."})
        }
        

    } catch (error) {
        
    }
}
