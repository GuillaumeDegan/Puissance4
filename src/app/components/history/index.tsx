"use client";

import { Tab } from "@/app/page";
import { GetGame, HistoryGameData } from "@/app/utils/common";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { env } from "../../../../config";

interface HistoryProps {
	setCurrentTab: Dispatch<SetStateAction<Tab>>;
	setHistoryGameData: Dispatch<SetStateAction<HistoryGameData | undefined>>;
}

export default function History({
	setCurrentTab,
	setHistoryGameData,
}: HistoryProps) {
	const [games, setGames] = useState<GetGame[]>();

	const fetchGames = async () => {
		try {
			const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}api/games`, {
				method: "GET",
			});

			if (response) {
				setGames(await response.json());
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);

	const handleSeeHistoryGame = (game: GetGame) => {
		setCurrentTab("viewTheGame");
		setHistoryGameData({
			redPlayer: game.winnerColor === "R" ? game.winner : game.loser,
			yellowPlayer: game.winnerColor === "R" ? game.loser : game.winner,
			defaultGrid: game.grid,
			defaultWinner: game.winnerColor,
		});
	};

	if (!games) {
		return null;
	}

	return (
		<div className="flex flex-col items-center">
			<h1 className="py-7 text-5xl font-bold text-gameBlue">History</h1>
			<div className="w-4/5 p-8 flex flex-col items-center bg-gray-800 rounded-md">
				<div className="flex flex-row justify-start w-full px-2">
					<h3 className="w-1/3 text-lg font-bold">Date</h3>
					<h3 className="w-1/3 text-lg font-bold">Winner</h3>
					<h3 className="w-1/3 text-lg font-bold">Loser</h3>
				</div>
				{games.map((game, index) => (
					<div
						key={index}
						onClick={() => handleSeeHistoryGame(game)}
						className={`flex flex-row justify-start ${
							index % 2 ? "bg-gray-400" : "bg-gray-500"
						}  rounded w-full p-3 m-1 cursor-pointer hover:transform hover:scale-105 transition-transform`}
					>
						<h3 className="w-1/3">
							{game.createdAt && format(new Date(game.createdAt), "dd/MM/yyyy")}
						</h3>
						<h3 className="w-1/3">{game.winner.name || "/"}</h3>
						<h3 className="w-1/3">{game.loser.name || "/"}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
