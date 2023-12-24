import mongoose from "mongoose";
import { env } from "../../../config";

const connectMongoDB = async () => {
	try {
		if (!env.MONGODB_URI)
			throw new Error("Please define the mongo URI in the .env folder.");
		await mongoose.connect(env.MONGODB_URI);
		console.log("Connected to mongoDB");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
