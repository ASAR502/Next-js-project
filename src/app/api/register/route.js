import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
;

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();
  
  // Validate the request body
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: error.details[0].message,
    }, { status: 400 });
  }

  try {
    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return Response.json({
        success: false,
        message: "User already exists. Please try with a different email.",
      }, { status: 409 });
    }

    const hashPassword = await hash(password, 12);

    const newlyCreatedUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    if (newlyCreatedUser) {
      return Response.json({
        success: true,
        message: "Account created successfully.",
      }, { status: 201 });
    }
  } catch (error) {
    console.log("Error while new user registration: ", error);
    return Response.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    }, { status: 500 });
  }
}
