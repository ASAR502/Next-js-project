import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
  "mongodb+srv://aaquibm502:GS6mDL2cpv3DJsEh@cluster7.z7hf3.mongodb.net/NextProject?retryWrites=true&w=majority&appName=Cluster7"
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};
 connectToDB();
export default connectToDB;
