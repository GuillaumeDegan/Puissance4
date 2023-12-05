"use client";

import { Player } from "@/app/page";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SelectPlayersProps {
	players: Player[];
	setRedPlayer: Dispatch<SetStateAction<Player | undefined>>;
	setYellowPlayer: Dispatch<SetStateAction<Player | undefined>>;
}

type PlayerColor = "Red" | "Yellow";

export default function SelectPlayers({
	players,
	setRedPlayer,
	setYellowPlayer,
}: SelectPlayersProps) {
	const [topPlayers, setTopPlayers] = useState<Player[]>();

	function handleSelectChange(playerId: string, playerColor: PlayerColor) {
		const player = players.find((p) => p._id === playerId);
		if (playerColor === "Red") {
			console.log(player);
			setRedPlayer(player);
		} else {
			setYellowPlayer(player);
		}
	}

	async function fetchTopPlayers() {
		try {
			const response = await fetch("http://localhost:3000/api/topPlayers", {
				method: "GET",
			});

			if (response) {
				setTopPlayers(await response.json());
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTopPlayers();
	}, []);

	return (
		<div className="flex flex-col items-center ">
			<div className="h-80 w-full flex">
				<div className="bg-red-500 w-1/2 h-full">
					<select
						name="playerOne"
						id="playerOneSelect"
						onChange={(e) => handleSelectChange(e.target.value, "Red")}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-4"
					>
						<option value={""}>Select a player...</option>
						{players?.map((player, index) => (
							<option key={index} value={player._id}>
								{player.name}
							</option>
						))}
					</select>
				</div>
				<div className="bg-yellow-500 w-1/2 h-full">
					<select
						name="playerTwo"
						id="playerTwoSelect"
						onChange={(e) => handleSelectChange(e.target.value, "Yellow")}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-4"
					>
						<option value={""}>Select a player...</option>
						{players?.map((player, index) => (
							<option key={index} value={player._id}>
								{player.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<h1 className="py-5">Press space to start</h1>
			<div className="bg-blue-600 p-5">
				<h3 className="text-black text-3xl text-center pb-3">Top 10</h3>
				<div className="w-80">
					{topPlayers?.map((player, index) => {
						let medalColor = "";

						if (index === 0) {
							medalColor = "bg-yellow-400";
						} else if (index === 1) {
							medalColor = "bg-gray-300";
						} else if (index === 2) {
							medalColor = "bg-orange-900";
						}

						return (
							<div
								key={index}
								className="flex flex-row justify-between p-1 m-1 rounded-md bg-slate-800"
							>
								<p
									className={`p-0.5 rounded-full ${medalColor} w-7 h-7 text-center`}
								>
									{index + 1}
								</p>
								<p>{player.name}</p>
								<p>{player.nbOfWins}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
