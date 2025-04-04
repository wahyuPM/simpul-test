const BASE_URL = "https://reqres.in/api";

class MessagesService {
    private baseURL: string;

    constructor() {
        this.baseURL = BASE_URL;
    }

    async getMessages() {
        const response = await fetch(`${this.baseURL}/users?page=1`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    }
}

const messagesService = new MessagesService();
export default messagesService;