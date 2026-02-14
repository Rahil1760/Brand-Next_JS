import productDb from "../../../../../models/productModel";
import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../../lib/connectMongoDB";

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "";

    if (!category || category.toLowerCase() === "all") {
      const results = await productDb.find({});
      const total = await productDb.countDocuments({});
      return NextResponse.json({ results, total }, { status: 200 });
    }

    const target = category.toLowerCase();
    // Match either category or type (case-insensitive)
    const results = await productDb.find({
      $or: [
        { category: { $regex: new RegExp(`^${target}$`, "i") } },
        { type: { $regex: new RegExp(`^${target}$`, "i") } },
      ],
    });

    const total = await productDb.countDocuments({});
    return NextResponse.json({ results, total }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Search failed", error }, { status: 500 });
  }
};
