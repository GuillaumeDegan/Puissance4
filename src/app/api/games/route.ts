import connectMongoDB from "@/app/libs/mongodb";
import Game from "@/app/models/game";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { grid, winner, looser } = await req.json();
	await connectMongoDB();
	await Game.create({ grid, winner, looser });
	return NextResponse.json({ message: "Game created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const games = await Game.find();
	return NextResponse.json(games);
}

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Game.findByIdAndDelete(id);
	return NextResponse.json({ message: "Game Deleted" }, { status: 201 });
}
