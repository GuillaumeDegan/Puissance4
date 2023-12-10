export type TokenColor = "R" | "Y";

export type GridItem = "R" | "Y" | null;

export interface CreateGame {
	grid: Array<Array<GridItem>>;
	winner: string;
	loser: string;
	createdAt?: Date;
	winnerColor: string;
}

export interface GetGame {
	grid: Array<Array<GridItem>>;
	winner: Player;
	loser: Player;
	createdAt?: Date;
	winnerColor: TokenColor;
}

export interface Player {
	_id: string;
	name: string;
	nbOfWins: number;
	nbOfLoses: number;
}

export interface HistoryGameData {
	redPlayer: Player;
	yellowPlayer: Player;
	defaultGrid: Array<Array<GridItem>>;
	defaultWinner: TokenColor;
}
