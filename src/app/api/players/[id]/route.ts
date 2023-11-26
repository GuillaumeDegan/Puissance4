import connectMongoDB from "@/app/libs/mongodb";
import Player from "@/app/models/player";
import { NextRequest, NextResponse } from "next/server";
import { ParsedUrlQuery } from "querystring";

export async function GET(
	req: NextRequest,
	{ params }: { params: ParsedUrlQuery },
) {
	const { id } = params;
	await connectMongoDB();
	const player = await Player.findById(id);
	return NextResponse.json(player);
}
