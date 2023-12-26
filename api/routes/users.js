import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/user.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";

const router = express.Router()

//
// router.get("/checkauthentication", verifyToken,(req,res,next)=> {
//     res.send("hello , you are logged in !")
// })
// router.get("/check/:id", verifyUser,(req,res,next)=> {
//     res.send("hello , you are !")
// })
// router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=> {
//     res.send("hello , you are admin !")
// })
//Create
router.post("/",verifyUser, createUser)
//Update
router.put("/:id",verifyUser, updateUser)
//Delete
router.delete("/:id",verifyUser, deleteUser)
//Get
router.get("/:id",verifyUser, getUser)

//Get all
router.get("/",verifyAdmin, getUsers)
export default router