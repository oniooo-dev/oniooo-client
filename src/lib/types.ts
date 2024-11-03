export interface User {
	userId: string;
	username: string;
	email: string;
	icon_url: string;
	mochi_balance: number;
}

export interface MelodyChat {
	chat_id: string;
	last_active: number;
	title: string;
	model_name: ModelName;
}

export interface MelodyMessage {
	type: string;
	content: string;
}