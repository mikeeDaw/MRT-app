import mongoose from "mongoose";

const Schema = mongoose.Schema

const cardSchema = new Schema({
    uid: {type: String, require: true, unique: true},
    balance: {type: Number, require: true },
    transactions: {type: {date: String, amount: Number }},
}, {timestamps: true});

export const cardModel = mongoose.model('Beep', cardSchema);

export const getCards = () => cardModel.find().sort({'updatedAt' : 'desc'});
export const getCardByUID = (uid: String) => cardModel.findOne({uid});
export const createCard = (values: Record<string, any>) => new cardModel(values).save().then((card)=> card.toObject());
export const deleteCardById = (id: String) => cardModel.findOneAndDelete({ uid : id });
export const LoadCardById = (id: String, values: Record<string, any>) => cardModel.findOneAndUpdate({uid:id},values, {new: true}); 

