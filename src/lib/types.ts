export interface User {
	id: string;
	username: string;
	email: string;
}

export interface UserOwnedModels {
	ai_model: {
		model_id: string;
		name: string;
		icon_url: string;
		short_description: string;
	};
}

export interface AIModel {
	ai_model: {
		model_id: string;
		name: string;
		icon_url: string;
		short_description: string;
	};
}

export interface Conversation {
	conversation_id: string;
	model_id: string;
	title: string;
}

export interface ConversationMessage {
	id: string;
	iconUrl: string;
	senderType: string;
	senderName: string;
	content: string;
}

// For unsigned chat interface
export interface DaoYouMessage {
    iconUrl: string;
    senderType: string;
    senderName: string;
    content: string;
}