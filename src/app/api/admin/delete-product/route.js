import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
;

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return Response.json({
          success: false,
          message: "Product ID is required",
        });

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return Response.json({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        return Response.json({
          success: false,
          message: "Failed to delete the product ! Please try again",
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
