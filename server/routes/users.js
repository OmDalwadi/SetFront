// import express from "express";
// import {
//   updateUser,
//   deleteUser,
//   getUser,
//   getUsers,
// } from "../controllers/user.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// const router = express.Router();

// // router.get("/checkauthentication", verifyToken, (req,res,next)=>{
// //   res.send("hello user, you are logged in")
// // })

// // router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
// //   res.send("hello user, you are logged in and you can delete your account")
// // })

// // router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
// //   res.send("hello admin, you are logged in and you can delete all accounts")
// // })

// //UPDATE
// router.put("/:id", verifyUser, updateUser);

// //DELETE
// router.delete("/:id", verifyUser, deleteUser);

// //GET
// router.get("/:id", verifyUser, getUser);

// //GET ALL
// router.get("/", verifyAdmin, getUsers);

// export default router;



const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
// const Agent = require("../models/agentModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const authMiddleware = require("../middlewares/authMiddleware");
// const Appointment = require("../models/appointmentModel");
// const moment = require("moment");


// import express from "express";
// import { login, register } from "../controllers/auth.js";

// const router = express.Router();

// router.post("/register", register)
// router.post("/login", login)

// export default router

// CREATE
// UPDATE
// DELETE
// GET
// GET ALL


// POST request to register!!
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    // const password = req.body.password;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: "1d",
      // });
      // res
      //   .status(200)
      //   .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

// router.post("/getuser/:id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.body.userId });
//     user.password = undefined;
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "User does not exist", success: false });
//     } else {
//       res.status(200).send({
//         success: true,
//         data: user,
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error getting user info", success: false, error });
//   }
// });

// router.post("/applyAgentAccount", authMiddleware, async (req, res) => {
//   try {
//     const newagent = new Agent({ ...req.body, status: "pending" });
//     await newagent.save();
//     const adminUser = await User.findOne({ isAdmin: true });

//     const unseenNotifications = adminUser.unseenNotifications;
//     unseenNotifications.push({
//       type: "new-agent-request",
//       message: `${newagent.firstName} ${newagent.lastName} has applied for a agent account`,
//       data: {
//         agentId: newagent._id,
//         name: newagent.firstName + " " + newagent.lastName,
//       },
//       onClickPath: "/admin/agentslist",
//     });
//     await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
//     res.status(200).send({
//       success: true,
//       message: "Agent account applied successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error applying doctor account",
//       success: false,
//       error,
//     });
//   }
// });
// router.post(
//   "/mark-all-notifications-as-seen",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const user = await User.findOne({ _id: req.body.userId });
//       const unseenNotifications = user.unseenNotifications;
//       const seenNotifications = user.seenNotifications;
//       seenNotifications.push(...unseenNotifications);
//       user.unseenNotifications = [];
//       user.seenNotifications = seenNotifications;
//       const updatedUser = await user.save();
//       updatedUser.password = undefined;
//       res.status(200).send({
//         success: true,
//         message: "All notifications marked as seen",
//         data: updatedUser,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Error applying doctor account",
//         success: false,
//         error,
//       });
//     }
//   }
// );

// router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.body.userId });
//     user.seenNotifications = [];
//     user.unseenNotifications = [];
//     const updatedUser = await user.save();
//     updatedUser.password = undefined;
//     res.status(200).send({
//       success: true,
//       message: "All notifications cleared",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error applying agent account",
//       success: false,
//       error,
//     });
//   }
// });

// router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
//   try {
//     const doctors = await Doctor.find({ status: "approved" });
//     res.status(200).send({
//       message: "Doctors fetched successfully",
//       success: true,
//       data: doctors,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error applying doctor account",
//       success: false,
//       error,
//     });
//   }
// });

// router.post("/book-appointment", authMiddleware, async (req, res) => {
//   try {
//     req.body.status = "pending";
//     req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     req.body.time = moment(req.body.time, "HH:mm").toISOString();
//     const newAppointment = new Appointment(req.body);
//     await newAppointment.save();
//     //pushing notification to doctor based on his userid
//     const user = await User.findOne({ _id: req.body.doctorInfo.userId });
//     user.unseenNotifications.push({
//       type: "new-appointment-request",
//       message: `A new appointment request has been made by ${req.body.userInfo.name}`,
//       onClickPath: "/doctor/appointments",
//     });
//     await user.save();
//     res.status(200).send({
//       message: "Appointment booked successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error booking appointment",
//       success: false,
//       error,
//     });
//   }
// });

// router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await Appointment.find({
//       doctorId,
//       date,
//       time: { $gte: fromTime, $lte: toTime },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not available",
//         success: false,
//       });
//     } else {
//       return res.status(200).send({
//         message: "Appointments available",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error booking appointment",
//       success: false,
//       error,
//     });
//   }
// });

// router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ userId: req.body.userId });
//     res.status(200).send({
//       message: "Appointments fetched successfully",
//       success: true,
//       data: appointments,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error fetching appointments",
//       success: false,
//       error,
//     });
//   }
// });
module.exports = router;