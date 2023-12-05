import mongoose, { Schema } from "mongoose";

export type GridItem = "R" | "Y" | null;

const gameSchema = new Schema(
	{
		grid: Array<Array<GridItem>>,
		winner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
		loser: String,
		winnerColor: String,
	},
	{
		timestamps: true,
	},
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
