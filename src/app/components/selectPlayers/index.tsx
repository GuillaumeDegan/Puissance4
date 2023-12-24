"use client";

import { Player, TokenColor } from "@/app/utils/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { env } from "../../../../config";

interface SelectPlayersProps {
	players: Player[];
	setRedPlayer: Dispatch<SetStateAction<Player | undefined>>;
	setYellowPlayer: Dispatch<SetStateAction<Player | undefined>>;
	redPlayer: Player | undefined;
	yellowPlayer: Player | undefined;
}

type PlayerColor = "Red" | "Yellow";

type SelectType = null | "select" | "create";

export default function SelectPlayers({
	players,
	setRedPlayer,
	setYellowPlayer,
	redPlayer,
	yellowPlayer,
}: SelectPlayersProps) {
	const [topPlayers, setTopPlayers] = useState<Player[]>();
	const [newRedPlayer, setNewRedPlayer] = useState("");
	const [newYellowPlayer, setNewYellowPlayer] = useState("");
	const [yellowSelect, setYellowSelect] = useState<SelectType>(null);
	const [redSelect, setRedSelect] = useState<SelectType>(null);

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
			const response = await fetch(
				`${env.NEXT_PUBLIC_SITE_URL}api/topPlayers`,
				{
					method: "GET",
				},
			);

			if (response) {
				setTopPlayers(await response.json());
			}
		} catch (error) {
			console.log(error);
		}
	}

	const createPlayer = async (color: TokenColor) => {
		try {
			const playerName = color === "R" ? newRedPlayer : newYellowPlayer;
			const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}api/players`, {
				method: "POST",
				body: JSON.stringify({
					name: playerName,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const player: Player = await response.json();

			if (player) {
				color === "R" ? setRedPlayer(player) : setYellowPlayer(player);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTopPlayers();
	}, []);

	return (
		<div className="flex flex-col items-center ">
			<h1 className="text-5xl font-bold text-gameBlue py-10">Puissance 4</h1>
			<div className="h-50 w-full flex justify-around">
				<div className="bg-redToken w-1/3 flex flex-col items-center h-full rounded-md border-4 border-redBorderToken">
					<h3 className="font-bold text-center text-2xl m-4">Red player</h3>
					{redSelect === null && (
						<div className="w-full m-2 flex flex-row justify-around">
							<button
								onClick={() => setRedSelect("select")}
								className="w-1/3 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Select a player
							</button>
							<button
								onClick={() => setRedSelect("create")}
								className="w-1/3 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Create a player
							</button>
						</div>
					)}

					{redSelect === "select" && (
						<>
							<select
								name="playerOne"
								id="playerOneSelect"
								onChange={(e) => handleSelectChange(e.target.value, "Red")}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 m-4 p-2.5"
							>
								<option value={""}>Select a player...</option>
								{players?.map((player, index) => (
									<option key={index} value={player._id}>
										{player.name}
									</option>
								))}
							</select>
							<button
								onClick={() => {
									setRedSelect(null);
									setRedPlayer(undefined);
								}}
								className="w-1/3 m-2 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Cancel
							</button>
						</>
					)}
					{redSelect === "create" && (
						<>
							<div className="flex flex-row m-2 w-4/5">
								<input
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2"
									type="text"
									value={newRedPlayer}
									onChange={(e) => setNewRedPlayer(e.target.value)}
									name=""
									id=""
								/>
								<button
									onClick={() => createPlayer("R")}
									className="top-3 right-3 bg-white text-black p-2 rounded"
								>
									Create
								</button>
							</div>
							<button
								onClick={() => {
									setRedSelect(null);
									setRedPlayer(undefined);
								}}
								className="w-1/3 m-2 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Cancel
							</button>
						</>
					)}
				</div>
				<div className="bg-yellowToken w-1/3 flex flex-col items-center h-full rounded-md border-4 border-yellowBorderToken">
					<h3 className="font-bold text-center text-2xl m-4">Yellow player</h3>
					{yellowSelect === null && (
						<div className="w-full m-2 flex flex-row justify-around">
							<button
								onClick={() => setYellowSelect("select")}
								className="w-1/3 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Select a player
							</button>
							<button
								onClick={() => setYellowSelect("create")}
								className="w-1/3 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Create a player
							</button>
						</div>
					)}
					{yellowSelect === "select" && (
						<>
							<select
								name="playerTwo"
								id="playerTwoSelect"
								onChange={(e) => handleSelectChange(e.target.value, "Yellow")}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 m-4 p-2.5"
							>
								<option value={""}>Select a player...</option>
								{players?.map((player, index) => (
									<option key={index} value={player._id}>
										{player.name}
									</option>
								))}
							</select>
							<button
								onClick={() => {
									setYellowSelect(null);
									setYellowPlayer(undefined);
								}}
								className="w-1/3 m-2 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Cancel
							</button>
						</>
					)}

					{yellowSelect === "create" && (
						<>
							<div className="flex flex-row m-2 w-4/5">
								<input
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2"
									type="text"
									value={newYellowPlayer}
									onChange={(e) => setNewYellowPlayer(e.target.value)}
									name=""
									id=""
								/>
								<button
									onClick={() => createPlayer("Y")}
									className="top-3 right-3 bg-white text-black p-2 rounded"
								>
									Create
								</button>
							</div>
							<button
								onClick={() => {
									setYellowSelect(null);
									setYellowPlayer(undefined);
								}}
								className="w-1/3 m-2 bg-white border-4 border-gray-300 rounded-md p-2 text-gray-900 hover:transform hover:scale-105 transition-transform"
							>
								Cancel
							</button>
						</>
					)}
				</div>
			</div>
			<div className="bg-gray-700 border-4 border-gray-500 p-6 rounded-md w-3/5 mt-10 mb-20 flex flex-col items-center">
				<h3
					className={`font-bold text-2xl w-full h-full text-center mb-4 ${
						redPlayer && yellowPlayer && "animate-bounce"
					}`}
				>
					{!redPlayer || !yellowPlayer
						? "Select two players before starting the game..."
						: "Press space to play !"}
				</h3>
				<div className="flex flex-row w-full m-4 justify-around">
					<div className="flex flex-col items-center w-1/3">
						<h5 className="font-bold">Red player :</h5>
						<div
							className={`p-3 m-4 rounded-md border-4 ${
								redPlayer
									? "bg-redToken border-redBorderToken"
									: "bg-gray-800 border-gray-900"
							} `}
						>
							<h3>{redPlayer ? redPlayer.name : "Not selected..."}</h3>
						</div>
					</div>
					<div className="flex flex-col items-center w-1/3">
						<h5 className="font-bold">Yellow player :</h5>
						<div
							className={`p-3 m-4 rounded-md border-4 ${
								yellowPlayer
									? "bg-yellowToken border-yellowBorderToken"
									: "bg-gray-800 border-gray-900"
							} `}
						>
							<h3>{yellowPlayer ? yellowPlayer.name : "Not selected..."}</h3>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gameBlue p-5 rounded-md border-4 border-gameBlueBorder mb-10">
				<h3 className="text-3xl text-center font-bold text-white">Top 10</h3>
				<h5 className="text-center pb-3 font-bold text-white">winners</h5>
				<div className="w-80">
					{topPlayers?.map((player, index) => {
						let medalColor = "bg-slate-800 border-slate-800 border-4";

						if (index === 0) {
							medalColor = "bg-yellow-400 border-yellow-500 border-4";
						} else if (index === 1) {
							medalColor = "bg-gray-300 border-gray-400 border-4";
						} else if (index === 2) {
							medalColor = "bg-orange-900 border-orange-800 border-4";
						}

						return (
							<div
								key={index}
								className="flex flex-row justify-between items-center p-1 m-1 rounded-md bg-slate-800"
							>
								<p
									className={`pb-1 rounded-full ${medalColor} w-8 h-8 text-center`}
								>
									{index + 1}
								</p>
								<p>{player.name}</p>
								<p className="p-1">{player.nbOfWins}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
