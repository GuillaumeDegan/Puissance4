"use client";

import React, { useEffect, useState } from "react";

type GridItem = "R" | "Y" | null;
type TokenColor = "R" | "Y";

let tokenColor: TokenColor = "R";

export default function Puissance4() {
	// const [keyValue, setKeyValue] = useState(-1);
	// const [keyPressed, setKeyPressed] = useState(false);

	const [grid, setGrid] = useState<Array<Array<GridItem>>>([
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
	]);

	useEffect(() => {
		checkWin();
	}, [grid]);

	const addToken = (column: number) => {
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
		tokenColor = tokenColor === "R" ? "Y" : "R";
	}, [grid]);

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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
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
				if (currentRTokenInARow === 4) console.log("R win");
				if (currentYTokenInARow === 4) console.log("Y win");
				n--;
			}
		}
	};

	const keyDownHandler = React.useCallback((e: KeyboardEvent) => {
		console.log("pressed", e.key);
		switch (e.key) {
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
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined")
			window.addEventListener("keydown", keyDownHandler);
	}, []);

	// useEffect(() => {
	// 	if (keyValue >= 0) addToken(keyValue);
	// }, [keyValue !== -1]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Puissance 4</h1>
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
