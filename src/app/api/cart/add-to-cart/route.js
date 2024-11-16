import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
;

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const {productID , userID} = data;

      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return Response.json({
          success: false,
          message: error.details[0].message,
        });
      }

      console.log(productID, userID);

      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productID,
        userID: userID,
      });

      console.log(isCurrentCartItemAlreadyExists);
      

      if (isCurrentCartItemAlreadyExists?.length > 0) {
        return Response.json({
          success: false,
          message:
            "Product is already added in cart! Please add different product",
        });
      }

      const saveProductToCart = await Cart.create(data);

      console.log(saveProductToCart);

      if (saveProductToCart) {
        return Response.json({
          success: true,
          message: "Product is added to cart !",
        });
      } else {
        return Response.json({
          success: false,
          message: "failed to add the product to cart ! Please try again.",
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
