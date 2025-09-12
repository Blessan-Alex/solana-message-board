import { create } from 'zustand';
import { Message, MessagesState } from '@/types';

interface MessagesStore extends MessagesState {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  loading: false,
  error: null,
  
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) => set((state) => ({
    messages: [message, ...state.messages]
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
  
  reset: () => set({
    messages: [],
    loading: false,
    error: null,
  }),
}));
