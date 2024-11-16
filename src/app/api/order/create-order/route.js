import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
;

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { user } = data;

      const saveNewOrder = await Order.create(data);

      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user });

        return Response.json({
          success: true,
          message: "Products are on the way !",
        });
      } else {
        return Response.json({
          success: false,
          message: "Failed to create a order ! Please try again",
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
