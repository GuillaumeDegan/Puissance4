import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema(
	{
		name: String,
		nbOfWins: Number,
		nbOfLoses: Number,
	},
	{
		timestamps: true,
	},
);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
