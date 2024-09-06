import { Friend } from "./enums";

export interface DaoYouMessage {
	type: "USER_TEXT" | "SYSTEM_TEXT";
	content: string;
	isComplete: boolean;
}

export interface User {
	user_id: string;
	username: string;
	email: string;
	role: string;
	icon_url: string;
}

export interface MelodyChat {
	chat_id: string;
	last_active: number;
	friend: Friend;
	title: string;
}

export interface MelodyMessage {
	chat_id: string;
	type: string;
	content: string;
}
