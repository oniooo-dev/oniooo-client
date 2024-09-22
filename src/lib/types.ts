export interface User {
	user_id: string;
	username: string;
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
	isComplete: boolean;
}

export interface CSText {
	type: "USER" | "SYSTEM";
	content: string;
}
