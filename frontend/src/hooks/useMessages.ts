import { useEffect } from 'react';
import { useMessagesStore } from '@/stores/messagesStore';
import { solanaService } from '@/services/solanaService';

export const useMessages = () => {
  const { messages, loading, error, setMessages, setLoading, setError } = useMessagesStore();

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMessages = await solanaService.fetchMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = () => {
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    refreshMessages,
  };
};
