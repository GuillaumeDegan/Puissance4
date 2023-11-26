import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
	{
		grid: String,
		winner: String,
		looser: String,
	},
	{
		timestamps: true,
	},
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
