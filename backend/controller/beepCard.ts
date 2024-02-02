import express from 'express';
import { createCard, getCardByUID, getCards, deleteCardById, LoadCardById } from '../models/CardModel';
import { getConstById } from '../models/ConstantModel';

export const generateCard = async (req: express.Request, res: express.Response, next: express.NextFunction) => {


    let UID = '6823' + (Math.floor(Math.random() * 8999999) + 10000000)
    const existCard = await getCardByUID(UID);
    if(existCard){
        res.status(400).json({msg: 'Card UID already exists.'})
    }
    const constDocu = await getConstById('Constant');
    
    const newCard = await createCard({uid: UID, balance: constDocu!.minLoad})
    res.status(200).json(newCard)
}

export const getAllCards = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const cardsRes = await getCards()
        res.status(200).json(cardsRes)
    } catch (error) {
        res.status(400).json({msg: 'Internal Error.'})
    }

}

export const deleteCard = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let uid = req.body.uid

    try{
        const card = await getCardByUID(uid)

        if(!card) {
            res.status(400).json({msg: 'The Card does not exist'})
        }

        try{
            const deleted = await deleteCardById(uid);
            res.status(200).json(deleted);
        } catch (err) {
            console.log('in inner catch:',err.message)
            res.status(400).json({msg: 'Card not Found!'});
        }

    } catch (err) {
        console.log('in outer catch:',err.message)
    }
}

export const updateLoad = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let uid = req.body.uid;
    let added = req.body.load;

    const constDocu = await getConstById('Constant');

    if(added < constDocu!.minLoad!){
        res.status(401).json({message: "Cannot load below minimum."})
    } else {
        try{
            const card = await getCardByUID(uid)
    
            if(!card) {
                res.status(400).json({msg: 'The Card does not exist'})
            }
    
            try{
                const updated = await LoadCardById(uid,{balance: card!.balance + added});
                res.status(200).json(updated);
            } catch (err) {
                console.log('in inner catch:',err.message)
                res.status(400).json({msg: 'Card not Found!'});
            }
    
        } catch (err) {
            console.log('in outer catch:',err.message)
        }
    }



}