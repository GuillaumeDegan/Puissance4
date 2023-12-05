import connectMongoDB from "@/app/libs/mongodb";
import Player from "@/app/models/player";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { name } = await req.json();
	await connectMongoDB();
	await Player.create({ name, nbOfWins: 0, nbOfLoses: 0 });
	return NextResponse.json({ message: "Player created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const players = await Player.find();
	return NextResponse.json(players);
}

export async function getTopPlayers() {
	await connectMongoDB();
	const topPlayers = await Player.aggregate([
		{
			$sort: { nbOfWins: -1 },
		},
		{
			$limit: 10,
		},
	]);
	return NextResponse.json(topPlayers);
}

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Player.findByIdAndDelete(id);
	return NextResponse.json({ message: "Player Deleted" }, { status: 201 });
}
