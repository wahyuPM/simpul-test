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

export type GroupedMessages = Record<string, Message[]>;

class MessagesService {
    private baseURL: string;
    private messageThreadsMap: Map<string, MessageThread>;

    constructor() {
        this.baseURL = BASE_URL;
        this.messageThreadsMap = new Map();
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

        const threads = [
            {
                id: "1",
                subject: "Naturalization",
                participants: [users[0].first_name, users[1].first_name],
                date: "2025-04-01",
                messages: [
                    {
                        sender: users[0].first_name,
                        content: "Hey, are we still on for the meeting tomorrow?",
                        time: "09:00 AM",
                    },
                    {
                        sender: "You",
                        content: "Yes, absolutely. What time works for you?",
                        time: "09:05 AM",
                    },
                    {
                        sender: "Charlie",
                        content: "I can join anytime after 10 AM.",
                        time: "09:10 AM",
                    },
                ],
            },
            {
                id: "2",
                subject: "Visa Application",
                participants: [users[2].first_name, users[3].first_name],
                date: "2025-04-02",
                messages: [
                    {
                        sender: "You",
                        content: "Just checking in, are we all set for the meeting?",
                        time: "10:00 AM",
                    },
                    {
                        sender: users[2].first_name,
                        content: "Yes, I'll be there. Looking forward to it!",
                        time: "10:15 AM",
                    },
                    {
                        sender: "Charlie",
                        content: "Same here, see you all soon!",
                        time: "10:30 AM",
                    },
                ],
            },
        ];

        // Store threads in a map for quick access by id
        threads.forEach(thread => this.messageThreadsMap.set(thread.id, thread));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(threads);
            }, 2000); // 2-second delay
        });
    }

    async getDetailedMessage(id: string, signal: AbortSignal): Promise<{ id: string; subject: string; participants: string[]; groupedMessages: GroupedMessages }> {
        // Retrieve the subject from the stored message threads
        const thread = this.messageThreadsMap.get(id);
        if (!thread) {
            throw new Error("Message thread not found");
        }

        // Simulating an API call to fetch detailed message data by ID
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            signal,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch detailed message");
        }

        // Simulating the data structure based on getMessageThreads
        const users = await response.json();
        const groupedMessages: GroupedMessages = {
            "2025-04-01": [
                {
                    sender: users.data.first_name,
                    content: "Hey, are we still on for the meeting tomorrow?",
                    time: "09:00 AM",
                },
                {
                    sender: "You",
                    content: "Yes, absolutely. What time works for you?",
                    time: "09:05 AM",
                },
                {
                    sender: "Charlie",
                    content: "I can join anytime after 10 AM.",
                    time: "09:10 AM",
                },
            ],
            "2025-04-02": [
                {
                    sender: "You",
                    content: "Just checking in, are we all set for the meeting?",
                    time: "10:00 AM",
                },
                {
                    sender: users.data.first_name,
                    content: "Yes, I'll be there. Looking forward to it!",
                    time: "10:15 AM",
                },
                {
                    sender: "Charlie",
                    content: "Same here, see you all soon!",
                    time: "10:30 AM",
                },
            ],
        };

        return {
            id: `thread-${id}`,
            subject: thread.subject, // Use the subject from the message thread
            participants: [users.data.first_name, "Me", "Charlie"],
            groupedMessages,
        };
    }
}

const messagesService = new MessagesService();
export default messagesService;