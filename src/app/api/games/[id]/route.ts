import connectMongoDB from "@/app/libs/mongodb";
import Game from "@/app/models/game";
import { NextRequest, NextResponse } from "next/server";
import { ParsedUrlQuery } from "querystring";

export async function GET(
	req: NextRequest,
	{ params }: { params: ParsedUrlQuery },
) {
	const { id } = params;
	await connectMongoDB();
	const game = await Game.findById(id);
	return NextResponse.json(game);
}
