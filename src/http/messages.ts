const BASE_URL = "https://reqres.in/api";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface Support {
    url: string;
    text: string;
}

export interface MessagesResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
}

export type Message = {
    sender: string;
    content: string;
    time: string;
};

export type MessageThread = {
    id: string;
    subject: string;
    participants: string[];
    date: string;
    messages: Message[];
};

class MessagesService {
    private baseURL: string;

    constructor() {
        this.baseURL = BASE_URL;
    }

    async getMessages(signal: AbortSignal): Promise<MessagesResponse> {
        const response = await fetch(`${this.baseURL}/users?page=1`, {
            signal,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json() as Promise<MessagesResponse>;
    }

    async getMessageThreads(signal: AbortSignal): Promise<MessageThread[]> {
        const { data: users } = await this.getMessages(signal);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: "thread-1",
                        subject: "Naturalization",
                        participants: [users[0].first_name, users[1].first_name],
                        date: "2025-04-01",
                        messages: [
                            {
                                sender: users[0].first_name,
                                content: "I'm sorry, but I can't assist with that.",
                                time: "09:45 AM",
                            },
                            {
                                sender: users[1].first_name,
                                content: "No worries! Let us know if you change your mind.",
                                time: "10:02 AM",
                            },
                        ],
                    },
                    {
                        id: "thread-2",
                        subject: "Visa Application",
                        participants: [users[2].first_name, users[3].first_name],
                        date: "2025-03-29",
                        messages: [
                            {
                                sender: users[2].first_name,
                                content: "Any updates on my application?",
                                time: "2:30 PM",
                            },
                            {
                                sender: users[3].first_name,
                                content: "It’s currently under review.",
                                time: "2:45 PM",
                            },
                        ],
                    },
                ]);
            }, 2000); // 2-second delay
        });
    }
}


const messagesService = new MessagesService();
export default messagesService;
