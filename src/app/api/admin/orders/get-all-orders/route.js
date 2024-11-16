import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
;

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const getAllOrders = await Order.find({})
        .populate("orderItems.product")
        .populate("user");

      if (getAllOrders) {
        return Response.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return Response.json({
          success: false,
          message:
            "failed to fetch the orders ! Please try again after some time.",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "You are not autorized !",
      });
    }
  } catch (e) {
    console.log(e);
    return Response.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
