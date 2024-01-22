import express from 'express';
import { createCard, getCardByUID, getCards, deleteCardById } from '../models/CardModel';

export const generateCard = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    let UID = '6823' + (Math.floor(Math.random() * 8999999) + 10000000)
    const existCard = await getCardByUID(UID);
    if(existCard){
        res.status(400).json({msg: 'Card UID already exists.'})
    }
    
    const newCard = await createCard({uid: UID, balance: 50})
    res.status(200).json(newCard)
}

export const getAllCards = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const cardsRes = await getCards()
    res.status(200).json(cardsRes)
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