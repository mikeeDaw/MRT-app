import mongoose from "mongoose";

const Schema = mongoose.Schema

const stationSchema = new Schema({
    name: {type: String, require: true, unique: true},
    code: {type: String, require: true, unique: true},
    connected: {type: [String], require: true },
    coordinates: {type: {x: Number, y: Number}, require: true},
});

export const StationModel = mongoose.model('Station', stationSchema);

export const getStations = () => StationModel.find();
export const getStationByName = (code:String) => StationModel.findOne({code});
export const createStation = (values: Record<string,any>) => new StationModel(values).save().then((user) => user.toObject());
export const deleteStationByName = (name: String) => StationModel.findOneAndDelete({name})
export const updateStationByCode = (iCode: String, values: Record<string, any>) => StationModel.findOneAndUpdate({code:iCode},values, {new: true}); 
