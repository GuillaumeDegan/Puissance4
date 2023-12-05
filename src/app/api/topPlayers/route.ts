import connectMongoDB from "@/app/libs/mongodb";
import Player from "@/app/models/player";
import { NextResponse } from "next/server";

export async function GET() {
	await connectMongoDB();
	const players = await Player.aggregate([
		{
			$sort: { nbOfWins: -1 },
		},
		{
			$limit: 10,
		},
	]);
	return NextResponse.json(players);
}
