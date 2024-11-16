import connectToDB from "@/database";
import Product from "@/models/product";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {

    const extractAllproducts = await Product.find({});
    if (extractAllproducts) {
      const response ={
        success: true,
        message: extractAllproducts,
        status:200
      };
      return Response.json(response)
    } else {
      return Response.json({
        message: "No Products found",
      });
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "product is not defined",
      },
      { status: 200 }
    );
  }
}
