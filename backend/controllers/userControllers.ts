// import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { NextFunction, Request as ExpressRequest, Response } from "express";

interface CustomInterface extends ExpressRequest {
  user?: {
    userId?: String;
  };
}
// GET All User
//  Public
const GetAllUser = asyncHandler(async (req: ExpressRequest, res: Response) => {
  const page = req.query.page as unknown as number || 1
  const limit = req.query.limit as unknown as number || 4
  const skip = (page - 1) * limit
  // no of limit
  // no of skip
  const user = await User.find({}).limit(limit!).skip(skip!)
  const totalUser = await User.countDocuments({})
  const totalPages = Math.ceil(totalUser / limit)
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ user, totalPages });
});


//PRIVATE
// ADMIN
const UpdateUser = asyncHandler(async (req: ExpressRequest, res: Response) => {

  const user = await User.findById({ _id: req.params.id });

  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
   res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ updatedUser });
});

// GET SINGLE User
// Private
// Admin and seller
const CreateUser = asyncHandler(async (req: ExpressRequest, res: Response) => {
   res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).send('Create user User');

})

const GetSingleUser = asyncHandler(async (req: ExpressRequest, res: Response) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("The user does not exist");
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ user });
});


//PRIVATE/
// ADMIN
const DeleteUser = asyncHandler(async (req: ExpressRequest, res: Response) => {
   res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).send('Deelete user User');

})
const GetTopRatedUser = asyncHandler(async (req: ExpressRequest, res: Response) => {
   res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).send('Create user User');

})

export {
  GetTopRatedUser,
  CreateUser,
  DeleteUser,
  UpdateUser,
  GetAllUser,
  GetSingleUser,
};
