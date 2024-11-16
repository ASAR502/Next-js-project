import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
;

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id)
        return Response.json({
          success: false,
          message: "Cart Item ID is required",
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return Response.json({
          success: true,
          message: "Cart Item deleted successfully",
        });
      } else {
        return Response.json({
          success: false,
          message: "Failed to delete Cart item ! Please try again.",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
