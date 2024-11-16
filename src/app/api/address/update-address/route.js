import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
;

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { _id, fullName, city, address, country, postalCode } = data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updateAddress) {
        return Response.json({
          success: true,
          message: "Address updated successfully!",
        });
      } else {
        return Response.json({
          success: false,
          message: "failed to update address ! Please try again",
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
