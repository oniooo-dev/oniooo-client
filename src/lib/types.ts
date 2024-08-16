export interface User {
	id: string;
	username: string;
	email: string;
}

export interface SavedAIModel {
	id: string;
	modelName: string;
	iconUrl: string;
}

export interface AIModel {
	id: string;
	modelName: string;
	iconUrl: string;
}

export interface Conversation {
	id: string;
	title: string;
}

export interface ConversationMessage {
	id: string;
	iconUrl: string;
	senderType: string;
	senderName: string;
	content: string;
}
