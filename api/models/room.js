import mongoose from "mongoose";
const  {Schema} = mongoose ;

const RoomSchema = new mongoose.Schema({
    title : {
        type: String ,
        require: true
    },
    price : {
        type: Number ,
        require: true ,
    },
    maxPeople : {
        type: Number ,
        require: true ,
    },
    desc : {
        type: String ,
        require: true ,
    },
    roomNumber : [{
        number : Number,
        unavailableDates: {
            type:[Date]
        }
    }]
}, {timestamps : true});
// [
//     {number:101 , unavailableDates: [01.05.2023,02.06.2023]},
//     {number:102 , unavailableDates: []},
//     {number:103 , unavailableDates: []},
//     {number:104 , unavailableDates: []},
//     {number:105 , unavailableDates: []}
//     ]
export  default mongoose.model("Room", RoomSchema)