import express from "express";
import Hotel from "../models/hotel.js";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel, getHotelRooms,
    getHotels,
    updateHotel
} from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router()

//Create
router.post("/", verifyAdmin, createHotel)
//Update
router.put("/:id", verifyAdmin, updateHotel)
//Delete
router.delete("/:id", verifyAdmin, deleteHotel)
//Get
router.get("/find/:id", getHotel)

//Get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/rooms/:id", getHotelRooms)
export default router