"use client";

import { useEffect, useState } from "react";
import History from "./components/history";
import Puissance4 from "./components/puissance4";
import SelectPlayers from "./components/selectPlayers";

export interface Player {
	_id: string;
	name: string;
	nbOfWins: number;
	nbOfLoses: number;
}

type Tab = "selectPlayer" | "playTheGame" | "history";

export default function Home() {
	const [players, setPlayers] = useState<Player[]>();
	const [redPlayer, setRedPlayer] = useState<Player | undefined>();
	const [yellowPlayer, setYellowPlayer] = useState<Player | undefined>();
	const [currentTab, setCurrentTab] = useState<Tab>("selectPlayer");

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
				if (redPlayer === undefined || yellowPlayer === undefined) {
					console.log("Please select two players");
					return;
				}

				setCurrentTab("playTheGame");
			}
		};

		document.addEventListener("keydown", keyDownHandler);
	}, [redPlayer, yellowPlayer]);

	const fetchPlayers = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/players", {
				method: "GET",
			});

			if (response) {
				setPlayers(await response.json());
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPlayers();
	}, []);

	if (!players) {
		return null;
	}

	return (
		<main>
			{currentTab !== "history" && (
				<button
					className="absolute top-3 right-3 bg-white text-black p-3 rounded"
					onClick={() => setCurrentTab("history")}
				>
					History
				</button>
			)}
			{currentTab !== "selectPlayer" && currentTab !== "playTheGame" && (
				<button
					className="absolute top-3 left-3 bg-white text-black p-3 rounded"
					onClick={() => setCurrentTab("selectPlayer")}
				>
					{"< Back"}
				</button>
			)}
			{currentTab === "selectPlayer" && (
				<SelectPlayers
					players={players}
					setYellowPlayer={setYellowPlayer}
					setRedPlayer={setRedPlayer}
				/>
			)}
			{currentTab === "playTheGame" && (
				<Puissance4 redPlayer={redPlayer} yellowPlayer={yellowPlayer} />
			)}
			{currentTab === "history" && <History />}
		</main>
	);
}
