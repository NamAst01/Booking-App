import Room from "../models/room.js" ;
import {createError} from "../utils/error.js";
import Hotel from "../models/hotel.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},
            })
        } catch (e) {
            next(e)

        }
        res.status(200).json(savedRoom)
    } catch (e) {
        next(e)
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updatedRoom)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const updateAvailabilityRoom = async (req, res, next) => {
    try {
        await Room.updateOne({
            "roomNumber._id": req.params.id
        }, {
            $push: {
                "roomNumber.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("updatedRoom")

    } catch (err) {
        res.status(500).json(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(
            req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id},
            })
        } catch (e) {
            next(e)

        }
        res.status(200).json("Deleted !")

    } catch (err) {
        res.status(500).json(err)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const Room = await Room.findById(
            req.params.id)
        res.status(200).json(Room)

    } catch (err) {
        res.status(500).json(err)
    }
}
export const getRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}
