import UserModel from "@/../models/loginUser.model";
import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/../lib/connectMongoDB";
import bcrypt from "bcryptjs";
import { signToken } from "@/../lib/jwt";

export const POST = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ❌ Prevent duplicate email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 🔑 Sign JWT
    const token = signToken({
      userId: newUser._id,
      email: newUser.email,
    });

    // 🍪 Set cookie
    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
};
