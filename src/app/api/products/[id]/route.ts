// app/api/products/[id]/route.ts
import productDb from "../../../../../models/productModel";
import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../../lib/connectMongoDB";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed: params is a Promise
) {
  try {
    await connectMongoDB();
    
    const { id } = await params; // ✅ Fixed: await params before destructuring

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await productDb.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    let relatedProducts = await productDb.find({type : product.type});
    if(!relatedProducts){
      relatedProducts = [];
    }
    return NextResponse.json({product,relatedProducts}, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    
    // Handle CastError (invalid ID format)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add PUT and DELETE methods for full CRUD
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed: params is a Promise
) {
  try {
    await connectMongoDB();
    
    const { id } = await params; // ✅ Fixed: await params before destructuring
    const updateData = await request.json();

    const updatedProduct = await productDb.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true // Run model validations
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed: params is a Promise
) {
  try {
    await connectMongoDB();
    
    const { id } = await params; // ✅ Fixed: await params before destructuring

    const deletedProduct = await productDb.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}