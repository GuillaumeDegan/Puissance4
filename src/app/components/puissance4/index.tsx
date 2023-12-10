"use client";

import { Tab } from "@/app/page";
import { CreateGame, GridItem, Player, TokenColor } from "@/app/utils/common";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

let tokenColor: TokenColor = "R";

interface Puissance4Props {
	redPlayer: Player | undefined;
	yellowPlayer: Player | undefined;
	defaultWinner?: GridItem;
	playable?: boolean;
	defaultGrid?: Array<Array<GridItem>>;
	setCurrentTab: Dispatch<SetStateAction<Tab>>;
}

export default function Puissance4({
	redPlayer,
	yellowPlayer,
	defaultWinner = null,
	playable = true,
	setCurrentTab,
	defaultGrid = [
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
	],
}: Puissance4Props) {
	const [winner, setWinner] = useState<GridItem>(defaultWinner);

	const [grid, setGrid] = useState<Array<Array<GridItem>>>(defaultGrid);

	const addToken = (column: number) => {
		winner === null &&
			playable &&
			setGrid((prev) => {
				const newGrid = prev.map((row) => row.slice());

				for (let i = newGrid.length - 1; i >= 0; i--) {
					if (newGrid[i][column] === null) {
						newGrid[i][column] = tokenColor;

						console.log("newGrid", column, newGrid);
						return newGrid;
					}
				}

				return prev;
			});
	};

	useEffect(() => {
		if (!playable) return;

		const checkWin = () => {
			checkHorizontally();
			checkVertically();
			checkDiagonallyUpToDown();
			checkDiagonallyDownToUp();
		};

		const checkHorizontally = () => {
			let currentRTokenInARow = 0;
			let currentYTokenInARow = 0;

			grid.map((line) => {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				line.map((token: "R" | "Y" | null) => {
					if (token === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (token === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (token === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
				});
			});
		};

		const checkVertically = () => {
			let currentRTokenInARow = 0;
			let currentYTokenInARow = 0;

			for (let u = 0; u < 7; u++) {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				for (let i = 0; i < grid.length; i++) {
					if (grid[i][u] === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (grid[i][u] === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (grid[i][u] === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
				}
			}
		};

		const checkDiagonallyUpToDown = () => {
			let currentRTokenInARow = 0;
			let currentYTokenInARow = 0;

			// check seulement grande diagonale + une moitié dans un seul sens
			for (let u = 0; u < grid.length; u++) {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				let n = u;
				for (let i = 0; i < grid[u].length - 1 - u; i++) {
					if (grid[n][i] === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (grid[n][i] === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (grid[n][i] === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
					// console.log(n, i, grid[n][i]);
					// console.log(currentRTokenInARow, currentYTokenInARow);
					n++;
				}
			}
			// check l'autre moitié
			for (let u = 1; u < 3; u++) {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				let n = 0;
				for (let i = u; i < 5; i++) {
					if (grid[n][i] === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (grid[n][i] === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (grid[n][i] === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
					n++;
				}
			}
		};

		const checkDiagonallyDownToUp = () => {
			let currentRTokenInARow = 0;
			let currentYTokenInARow = 0;

			// check seulement grande diagonale + une moitié dans un seul sens
			for (let u = 5; u > 0; u--) {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				let n = u;
				for (let i = 6; i > 5 - u; i--) {
					if (grid[n][i] === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (grid[n][i] === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (grid[n][i] === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
					n--;
				}
			}
			// check l'autre moitié
			for (let u = 1; u < 2; u++) {
				currentRTokenInARow = 0;
				currentYTokenInARow = 0;
				let n = 5 - u;
				for (let i = 6; i > 1; i--) {
					if (grid[n][i] === "R") {
						currentRTokenInARow++;
						currentYTokenInARow = 0;
					}
					if (grid[n][i] === "Y") {
						currentRTokenInARow = 0;
						currentYTokenInARow++;
					}
					if (grid[n][i] === null) {
						currentRTokenInARow = 0;
						currentYTokenInARow = 0;
					}
					if (currentRTokenInARow === 4) handleGameWon("R");
					if (currentYTokenInARow === 4) handleGameWon("Y");
					n--;
				}
			}
		};

		const handleGameWon = async (gameWinner: TokenColor) => {
			if (yellowPlayer && redPlayer) {
				setWinner(gameWinner);
				const game: CreateGame = {
					grid: grid,
					loser: gameWinner === "R" ? yellowPlayer._id : redPlayer._id,
					winner: gameWinner === "R" ? redPlayer._id : yellowPlayer._id,
					winnerColor: gameWinner,
				};

				await fetch("http://localhost:3000/api/games", {
					method: "POST",
					body: JSON.stringify(game),
				});
			}
		};

		checkWin();
		tokenColor = tokenColor === "R" ? "Y" : "R";
	}, [grid, playable, redPlayer, yellowPlayer]);

	const keyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
		switch (event.key) {
			case "1":
				addToken(0);
				break;
			case "2":
				addToken(1);
				break;
			case "3":
				addToken(2);
				break;
			case "4":
				addToken(3);
				break;
			case "5":
				addToken(4);
				break;
			case "6":
				addToken(5);
				break;
			case "7":
				addToken(6);
				break;
			default:
				break;
		}
	};

	const divRef = useRef(null);

	return (
		<main
			ref={divRef}
			tabIndex={0}
			onKeyDown={keyDownHandler}
			className="flex min-h-screen flex-col items-center justify-around"
		>
			<h1 className="text-5xl font-bold text-gameBlue">Puissance 4</h1>
			{winner !== null && (
				<div className="flex flex-col items-center">
					<h3
						style={{
							color: winner === "R" ? "red" : "yellow",
							fontSize: "40px",
						}}
					>{`${
						winner === "R" ? redPlayer?.name : yellowPlayer?.name
					} won !!`}</h3>
					<button
						onClick={() => setCurrentTab("selectPlayer")}
						className="bg-white text-black py-2 px-5 rounded"
					>
						Home
					</button>
				</div>
			)}

			<div className="flex flex-row justify-around items-center w-full">
				<div
					style={{ width: "300px" }}
					className="flex flex-row items-center justify-start"
				>
					<div
						style={{
							backgroundColor: "#FF3030",
							border: "#DB1E2B 5px solid",
							borderRadius: "10px",
							padding: "10px 15px",
						}}
					>
						<h3
							style={{
								color: "#AF1825",
								fontSize: "40px",
							}}
						>
							{redPlayer?.name}
						</h3>
					</div>
					{!winner && (
						<div
							style={{
								width: "0",
								height: "0",
								margin: "30px 20px",
								borderTop: "18px solid transparent",
								borderBottom: "18px solid transparent",
								borderLeft:
									tokenColor === "Y"
										? "30px solid #FF3030"
										: "30px solid #00000030",
							}}
						></div>
					)}
				</div>

				<div
					style={{
						width: "500px",
						backgroundColor: "#0025E1",
						border: "#2327AF 5px solid",
					}}
					className="rounded-md p-3"
				>
					{grid.map((line, index) => {
						return (
							<div key={index} className="flex w-full flex-row justify-around">
								{line.map((token: string | null, i: number) => {
									return token === null ? (
										<div
											key={i}
											onClick={() => addToken(i)}
											style={{
												width: "50px",
												height: "50px",
												borderRadius: "100%",
												margin: "5px",
												backgroundColor: "#00267A",
											}}
										></div>
									) : (
										<div
											key={i}
											onClick={() => addToken(i)}
											style={{
												width: "50px",
												height: "50px",
												borderRadius: "100%",
												margin: "5px",
												border:
													token === "R"
														? "#DB1E2B 5px solid"
														: "#DB8300 5px solid",
												backgroundColor: token === "R" ? "#FF3030" : "#FFB000",
											}}
										></div>
									);
								})}
							</div>
						);
					})}
				</div>
				<div
					style={{ width: "300px" }}
					className="flex flex-row items-center justify-end"
				>
					{!winner && (
						<div
							style={{
								width: "0",
								height: "0",
								margin: "30px 20px",
								borderTop: "18px solid transparent",
								borderBottom: "18px solid transparent",
								borderRight:
									tokenColor === "Y"
										? "30px solid #00000030"
										: "30px solid #FFB000",
							}}
						></div>
					)}
					<div
						style={{
							backgroundColor: "#FFB000",
							border: "#DB8300 5px solid",
							borderRadius: "10px",
							padding: "10px 15px",
						}}
					>
						<h3
							style={{
								color: "#BF6F00",
								fontSize: "40px",
							}}
						>
							{yellowPlayer?.name}
						</h3>
					</div>
				</div>
			</div>
		</main>
	);
}
