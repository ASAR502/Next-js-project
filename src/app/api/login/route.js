import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const { email, password } = await req.json();
    console.log("Login attempt with email:", email);
    const { error } = schema.validate({ email, password });
    if (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.details[0].message }),
        { status: 400 }
      );
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Account not found with this email." }),
        { status: 404 }
      );
    }

    // Check password
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "Incorrect password. Please try again!" }),
        { status: 401 }
      );
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "1d" }
    );

    // Prepare final data
    const finalData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return new Response(
      JSON.stringify({ success: true, message: "Login successful!", data: finalData }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while logging in:", error);

    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong! Please try again later." }),
      { status: 500 }
    );
  }
}
