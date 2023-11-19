import { pre, prop } from "typegoose";

export const PLAYERS_COLLECTION_NAME = "players";

@pre<Player>("save", function () {
	if (!this._id) this._id = new mongoose.Types.ObjectId().toHexString();

	this.updatedAt = new Date();
})
@modelOptions({
	schemaOptions: {
		collection: PLAYERS_COLLECTION_NAME,
		timestamps: true,
		versionKey: false,
	},
})
export class Player {
	@prop({ type: String })
	_id!: string;

	@prop()
	createdAt!: Date;

	@prop()
	updatedAt!: Date;

	@prop({ required: true, type: String })
	name!: string;

	@prop({ required: true, type: Number })
	gamesWon!: number;
}

export const PlayerModel = getModelForClass(Player);
