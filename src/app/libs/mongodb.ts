import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		if (!process.env.MONGODB_URI)
			throw new Error("Please define the mongo URI in the .env folder.");
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to mongoDB");
	} catch (error) {
		console.log(error);
	}
};

export default connectMongoDB;
