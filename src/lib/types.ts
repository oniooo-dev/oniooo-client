export interface User {
    username: string,
    email: string,
}

export interface SavedAIModel {
    id: string;
    modelName: string;
}

export interface Conversation {
    id: string;
    title: string;
}

enum ConversationMessageAuthor {
    user,
    system
}

export interface ConversationMessage {
    id: string;
    author: ConversationMessageAuthor;
    content: string;
}