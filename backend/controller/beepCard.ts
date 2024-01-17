import express from 'express';
import { createCard, getCardByUID, getCards } from '../models/CardModel';

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