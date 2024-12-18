import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
;

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      const {
        _id,
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          price,
          description,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return Response.json({
          success: true,
          message: "Product updated successfully",
        });
      } else {
        return Response.json({
          success: false,
          message: "Failed to update the product ! Please try again later",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
