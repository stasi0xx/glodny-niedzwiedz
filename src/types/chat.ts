export type Intent = 'idle' | 'faq' | 'delivery_check' | 'diet_selection' | 'checkout_handoff';

export interface DietPreferences {
    goal?: 'lose-weight' | 'build-muscle' | 'health' | 'energy';
    activity?: 'low' | 'medium' | 'high';
    dietType?: 'standard' | 'wege' | 'no-lactose' | 'keto' | 'sport' | 'low-ig' | 'classic';
    calories?: number;
    meals?: number;
    duration?: number;
}

export interface ConversationState {
    intent: Intent;
    step?: number;
    data: {
        deliveryStatus?: {
            isDeliverable?: boolean;
            zone?: string;
            postalCode?: string;
            city?: string;
        };
        dietPreferences: DietPreferences;
        userName?: string;
        checkoutData?: {
            address?: string;
            // other fields if needed
        };
    };
    history: ChatMessage[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    options?: string[];
    productCard?: {
        title: string;
        description: string;
        price: number;
        image: string;
        slug: string;
        matches: string[];
    };
    action?: 'show_checkout_link';
    checkoutLink?: string;
}

export interface ChatResponse {
    messages: ChatMessage[];
    newState: ConversationState;
}
