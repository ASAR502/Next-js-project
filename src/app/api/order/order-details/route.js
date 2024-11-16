import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
;

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return Response.json({
          success: false,
          message: "Product ID is required",
        });

      const extractOrderDetails = await Order.findById(id).populate(
        "orderItems.product"
      );

      if (extractOrderDetails) {
        return Response.json({
          success: true,
          data: extractOrderDetails,
        });
      } else {
        return Response.json({
          success: false,
          message: "Failed to get order details ! Please try again",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "You are not authticated",
      });
    }
  } catch (e) {
    return Response.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
