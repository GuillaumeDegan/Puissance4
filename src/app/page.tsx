"use client";

import { useEffect, useState } from "react";
import { env } from "../../config";
import History from "./components/history";
import Puissance4 from "./components/puissance4";
import SelectPlayers from "./components/selectPlayers";
import { HistoryGameData, Player } from "./utils/common";

export type Tab = "selectPlayer" | "playTheGame" | "history" | "viewTheGame";

export default function Home() {
	const [players, setPlayers] = useState<Player[]>();
	const [redPlayer, setRedPlayer] = useState<Player | undefined>();
	const [yellowPlayer, setYellowPlayer] = useState<Player | undefined>();
	const [historyGameData, setHistoryGameData] = useState<HistoryGameData>();

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
			const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}api/players`, {
				method: "GET",
			});

			if (response) {
				setPlayers(await response.json());
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleGoBackDuringGame = () => {
		setRedPlayer(undefined);
		setYellowPlayer(undefined);
		setCurrentTab("selectPlayer");
	};

	useEffect(() => {
		fetchPlayers();
	}, []);

	const displayTabs = () => {
		if (!players) {
			return null;
		}

		switch (currentTab) {
			case "selectPlayer":
				return (
					<>
						<SelectPlayers
							players={players}
							setYellowPlayer={setYellowPlayer}
							setRedPlayer={setRedPlayer}
							redPlayer={redPlayer}
							yellowPlayer={yellowPlayer}
						/>
						<button
							className="absolute top-3 right-3 bg-gray-700 text-white hover:transform hover:scale-105 transition-transform p-3 rounded"
							onClick={() => setCurrentTab("history")}
						>
							History
						</button>
					</>
				);
			case "playTheGame":
				return (
					<>
						<Puissance4
							redPlayer={redPlayer}
							yellowPlayer={yellowPlayer}
							setCurrentTab={setCurrentTab}
						/>
						<button
							className="absolute top-3 left-3 bg-gray-700 text-white hover:transform hover:scale-105 transition-transform p-3 rounded"
							onClick={handleGoBackDuringGame}
						>
							{"< Back"}
						</button>
					</>
				);
			case "history":
				return (
					<>
						<History
							setCurrentTab={setCurrentTab}
							setHistoryGameData={setHistoryGameData}
						/>
						<button
							className="absolute top-3 left-3 bg-gray-700 text-white hover:transform hover:scale-105 transition-transform p-3 rounded"
							onClick={() => setCurrentTab("selectPlayer")}
						>
							{"< Back"}
						</button>
					</>
				);
			case "viewTheGame":
				return (
					<>
						<Puissance4
							redPlayer={historyGameData?.redPlayer}
							yellowPlayer={historyGameData?.yellowPlayer}
							defaultGrid={historyGameData?.defaultGrid}
							defaultWinner={historyGameData?.defaultWinner}
							setCurrentTab={setCurrentTab}
							playable={false}
						/>
						<button
							className="absolute top-3 left-3 bg-gray-700 text-white hover:transform hover:scale-105 transition-transform p-3 rounded"
							onClick={() => setCurrentTab("history")}
						>
							{"< Back"}
						</button>
					</>
				);
			default:
				break;
		}
	};

	return <main>{displayTabs()}</main>;
}
