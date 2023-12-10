import mongoose, { Schema } from "mongoose";
import { GridItem } from "../utils/common";

const gameSchema = new Schema(
	{
		grid: Array<Array<GridItem>>,
		winner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
		loser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
		winnerColor: {
			type: String,
			enum: ["R", "Y"],
		},
	},
	{
		timestamps: true,
	},
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
