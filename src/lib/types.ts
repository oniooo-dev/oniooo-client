export interface User {
	userId: string;
	email: string;
	icon_url: string;
	mochi_balance: number;
}

export interface MelodyChat {
	chat_id: string;
	last_active: number;
	title: string;
}

export interface MelodyMessage {
	type: string;
	content: string;
}

export type MelodyState = "THINKING" | "CREATING";
