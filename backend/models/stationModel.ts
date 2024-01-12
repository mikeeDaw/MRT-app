import mongoose from "mongoose";

const Schema = mongoose.Schema

const stationSchema = new Schema({
    name: {type: String, require: true, unique: true},
    connected: {type: [[Number]], require: true },
    coordinates: {type: [Number, Number], require: true},
});

const stationModel = mongoose.model('Station', stationSchema);

const getStations = () => stationModel.find();
const getStationByName = (name:String) => stationModel.findOne({name});
const createStation = (values: Record<string,any>) => new stationModel(values).save().then((user) => user.toObject());
const deleteStationByName = (name: String) => stationModel.findOneAndDelete({name})

export { stationModel,getStations,getStationByName,createStation,deleteStationByName }