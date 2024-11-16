import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
;

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({
        success: false,
        message: "Address ID is required",
      });
    }

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress) {
        return Response.json({
          success: true,
          message: "Address is deleted successfully",
        });
      } else {
        return Response.json({
          success: false,
          message: "failed to delete address ! Please try again",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "You are not authenticated",
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
