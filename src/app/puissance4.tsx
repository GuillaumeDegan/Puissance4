import { useEffect } from "react";

export default function Puissance4() {
	// const [tokenColor, setTokenColor] = useState<"R" | "J">("R");
	let tokenColor: "R" | "Y" = "R";

	let grid: Array<any> = [
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null],
	];

	const addToken = (number: number) => {
		for (let i = 5; i >= 0; i--) {
			if (grid[i][number] === null) {
				grid[i][number] = tokenColor;
				// setTokenColor(tokenColor === "R" ? "J" : "R");
				tokenColor = tokenColor === "R" ? "Y" : "R";
				checkWin();
				return;
			}
		}
	};

	const checkWin = () => {
		checkHorizontally();
		checkVertically();
		// checkDiagonally();
	};

	const checkHorizontally = () => {
		let currentRTokenInARow = 0;
		let currentYTokenInARow = 0;

		grid.map((line) => {
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

	// const checkDiagonally = () => {

	// };

	const keyDownHandler = (e: KeyboardEvent) => {
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
		console.log(grid);
	};

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Jeu</h1>
		</main>
	);
}
