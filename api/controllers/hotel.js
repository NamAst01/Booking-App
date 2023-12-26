import Hotel from "../models/hotel.js";
import Room from "../models/room.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    } catch (err) {
        next(err)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true})
        res.status(200).json(updatedHotel)

    } catch (err) {
        res.status(500).json(err)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(
            req.params.id)
        res.status(200).json("Deleted !")

    } catch (err) {
        res.status(500).json(err)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id)
        res.status(200).json(hotel)

    } catch (err) {
        res.status(500).json(err)
    }
}
export const getHotels = async (req, res, next) => {

    try {
        const {min, max, city, limit, ...query} = req.query;
        let hotelQuery = {
            ...query,
            cheapestPrice: {
                $gt: parseInt(min, 10) || 1,
                $lt: parseInt(max, 10) || 9999,
            },
        };
        const hotels = await Hotel.find(hotelQuery).limit(limit);
        // Check if the 'city' parameter is provided
        if (city) {
            hotelQuery.city = city;
        }

        // const hotels = await Hotel.find({
        //     ...query,
        //     city: city,
        //     cheapestPrice: {$gt: parseInt(min, 10) || 1, $lt: parseInt(max, 10) || 9999},
        // }).limit(limit)

        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(
            city => {
                return Hotel.countDocuments(
                    {"city": city}
                )
            }
        ))
        const hotels = await Hotel.find()
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ])
    } catch (err) {
        next(err)
    }
}


export const getHotelRooms = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map(
                room => {
                    return Room.findById(room)
                }
            )
        )


        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}