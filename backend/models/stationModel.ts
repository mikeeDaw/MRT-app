import mongoose from "mongoose";

const Schema = mongoose.Schema

const stationSchema = new Schema({
    name: {type: String, require: true, unique: true},
    code: {type: String, require: true, unique: true},
    connected: {type: [{code: String, x: Number, y: Number}], require: true },
    coordinates: {type: {x: Number, y: Number}, require: true},
});

const StationModel = mongoose.model('Station', stationSchema);

const getStations = () => StationModel.find();
const getStationByName = (code:String) => StationModel.findOne({code});
const createStation = (values: Record<string,any>) => new StationModel(values).save().then((user) => user.toObject());
const deleteStationByName = (name: String) => StationModel.findOneAndDelete({name})

export { StationModel,getStations,getStationByName,createStation,deleteStationByName }