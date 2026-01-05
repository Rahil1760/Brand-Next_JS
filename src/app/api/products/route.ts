import productDb from "../../../../models/productModel";
import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../lib/connectMongoDB";

export const POST = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    let { name, category, type, price, size, color, image, inStock } =
      await req.json();
    if (typeof size === "string") {
      try {
        // Try parsing JSON-style string
        size = JSON.parse(size);
      } catch {
        // If it's just a single string like "M"
        size = [size];
      }
    }
    // No need to check type of size, just use it directly
    const product = {
      name,
      category,
      type,
      price,
      size, // expects array
      color,
      image,
      inStock,
    };

    const newProduct = await productDb.create(product);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add products", error },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    const products = await productDb.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(error || { message: "Failed to fetch products" }, {
      status: 500,
    });
  }
};
