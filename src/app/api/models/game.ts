import {
	getModelForClass,
	modelOptions,
	pre,
	prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose"; // Add this line to import mongoose

export const GAMES_COLLECTION_NAME = "games";

pre<Game>("save", function () {
	if (!this._id) this._id = new mongoose.Types.ObjectId().toHexString();

	this.updatedAt = new Date();
});
modelOptions({
	schemaOptions: {
		collection: GAMES_COLLECTION_NAME,
		timestamps: true,
		versionKey: false,
	},
});
export class Game {
	@prop({ type: String })
	_id!: string;

	@prop()
	createdAt!: Date;

	@prop()
	updatedAt!: Date;

	@prop({ required: true, type: String })
	grid!: string;

	@prop({ required: true, type: String })
	winner!: string;

	@prop({ required: true, type: String })
	looser!: string;
}

export const GameModel = getModelForClass(Game);
