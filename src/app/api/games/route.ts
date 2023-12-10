import connectMongoDB from "@/app/libs/mongodb";
import Game from "@/app/models/game";
import Player from "@/app/models/player";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { grid, winner, loser, winnerColor } = await req.json();
	await connectMongoDB();
	await Game.create({ grid, winner, loser, winnerColor });
	await Player.findByIdAndUpdate(winner, { $inc: { nbOfWins: 1 } });
	await Player.findByIdAndUpdate(loser, { $inc: { nbOfLoses: 1 } });
	return NextResponse.json({ message: "Game created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const games = await Game.find()
		.populate("winner")
		.populate("loser")
		.sort({ createdAt: -1 });
	return NextResponse.json(games);
}

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Game.findByIdAndDelete(id);
	return NextResponse.json({ message: "Game Deleted" }, { status: 201 });
}
