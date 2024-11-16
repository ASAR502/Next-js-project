import connectToDB from "@/database";
import Product from "@/models/product";
;

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const getData = await Product.find({ category: id });

    if (getData) {
      return Response.json({
        success: true,
        data: getData,
      });
    } else {
      return Response.json({
        success: false,
        status: 204,
        message: "No Products found !",
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
