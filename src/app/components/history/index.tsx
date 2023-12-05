"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Game } from "../puissance4";

export default function History() {
	const [games, setGames] = useState<Game[]>();

	const fetchGames = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/games", {
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

	if (!games) {
		return null;
	}

	return (
		<div className="flex flex-col items-center ">
			<h1 className="py-5">History</h1>
			<div className="flex flex-row justify-start w-4/5 p-4">
				<h3 className="w-1/3">Date</h3>
				<h3 className="w-1/3">Winner</h3>
				<h3 className="w-1/3">Loser</h3>
			</div>
			{games.map((game, index) => (
				<div
					key={index}
					onClick={() => console.log("game link")}
					className="flex flex-row justify-start bg-gray-400 rounded w-4/5 p-3 m-1"
				>
					<h3 className="w-1/3">
						{game.createdAt && format(new Date(game.createdAt), "dd/MM/yyyy")}
					</h3>
					<h3 className="w-1/3">{game.winner}</h3>
					<h3 className="w-1/3">{game.loser || "/"}</h3>
				</div>
			))}

			{/* <Puissance4
				redPlayer={
					games[0].winnerColor === "R" ? games[0].winner : games[0].loser
				}
				yellowPlayer={
					games[0].winnerColor === "R" ? games[0].loser : games[0].winner
				}
				defaultWinner={games[0].winnerColor}
			/> */}
		</div>
	);
}
