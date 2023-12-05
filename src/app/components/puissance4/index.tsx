"use client";

import { GridItem } from "@/app/models/game";
import { Player } from "@/app/page";
import { useEffect, useRef, useState } from "react";

type TokenColor = "R" | "Y";

let tokenColor: TokenColor = "R";

interface Puissance4Props {
	redPlayer: Player | undefined;
	yellowPlayer: Player | undefined;
	defaultWinner?: GridItem;
	playable?: boolean;
	defaultGrid?: Array<Array<GridItem>>;
}

export interface Game {
	grid: Array<Array<GridItem>>;
	winner: string;
	loser: string;
	createdAt?: Date;
	winnerColor: string;
}

export default function Puissance4({
	redPlayer,
	yellowPlayer,
	defaultWinner = null,
	playable = true,
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
				const game: Game = {
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
	}, [grid, redPlayer, yellowPlayer]);

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
			className="flex min-h-screen flex-col items-center justify-between p-24"
		>
			<h1>Puissance 4</h1>
			{winner !== null ? (
				<div>
					<h3
						style={{
							color: winner === "R" ? "red" : "yellow",
							fontSize: "40px",
						}}
					>{`${
						winner === "R" ? redPlayer?.name : yellowPlayer?.name
					} won !!`}</h3>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<h3
						style={{
							color: "red",
							fontSize: "40px",
						}}
					>
						{redPlayer?.name}
					</h3>
					<h3
						style={{
							color: "yellow",
							fontSize: "40px",
						}}
					>
						{yellowPlayer?.name}
					</h3>
				</div>
			)}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{grid.map((line, index) => {
					return (
						<div
							key={index}
							style={{
								display: "flex",
								width: "500px",
								flexDirection: "row",
								justifyContent: "space-around",
								backgroundColor: "blue",
							}}
						>
							{line.map((token: string | null, i: number) => {
								return token === null ? (
									<div
										key={i}
										style={{
											width: "50px",
											height: "50px",
											borderRadius: "100%",
											margin: "5px",
											backgroundColor: "white",
										}}
									></div>
								) : (
									<div
										key={i}
										style={{
											width: "50px",
											height: "50px",
											borderRadius: "100%",
											margin: "5px",
											backgroundColor: token === "R" ? "red" : "yellow",
										}}
									></div>
								);
							})}
						</div>
					);
				})}
			</div>
		</main>
	);
}
