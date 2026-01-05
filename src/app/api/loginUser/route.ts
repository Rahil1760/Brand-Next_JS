import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/../lib/connectMongoDB";
import User from "@/../models/loginUser.model";
import { signToken } from "@/../lib/jwt";

export const POST = async (req: Request) => {
  try {
    await connectMongoDB();

    const { email, password } = await req.json();

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3️⃣ Sign JWT
    const token = signToken({
      userId: user._id,
      email: user.email,
    });

    // 4️⃣ Set HttpOnly cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
};
