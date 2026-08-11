'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { io, type Socket } from 'socket.io-client';

import { env } from '@/config/env';
import { FCOP_AUTH_TOKEN_STORAGE_KEY } from '@/lib/auth/bearer-token';

export type LiveChatChannel = {
  type: 'service-request' | 'project';
  id: string;
};

export type LiveChatMessage = {
  id: string;
  channel: LiveChatChannel;
  authorMemberId: string;
  body: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    role: string;
    user: {
      id: string;
      name: string;
      email?: string | null;
      image: string | null;
    };
  };
};

type ChatResponse<T = undefined> =
  | { success: true; data?: T }
  | { success: false; message: string; code: string };

type ServerToClientEvents = {
  'chat:message': (message: LiveChatMessage) => void;
};

type ClientToServerEvents = {
  'chat:join': (
    payload: { channel: LiveChatChannel },
    acknowledge: (response: ChatResponse<LiveChatMessage[]>) => void,
  ) => void;
  'chat:leave': (payload: { channel: LiveChatChannel }) => void;
  'chat:send': (
    payload: { channel: LiveChatChannel; body: string; isInternal: boolean },
    acknowledge: (response: ChatResponse<LiveChatMessage>) => void,
  ) => void;
};

type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
export type ChatConnectionStatus = 'connecting' | 'live' | 'reconnecting' | 'offline';

type SendMessageInput = {
  body: string;
  isInternal: boolean;
};

type ChatContextValue = {
  messages: LiveChatMessage[];
  connectionStatus: ChatConnectionStatus;
  connectionError: string | null;
  unreadCount: number;
  isAttentionActive: boolean;
  handleOpenChange: (open: boolean) => void;
  sendMessage: (input: SendMessageInput) => Promise<ChatResponse<LiveChatMessage>>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

type ChatProviderProps = {
  channel: LiveChatChannel;
  currentMemberId: string;
  children: ReactNode;
};

export function ChatProvider({ channel, currentMemberId, children }: ChatProviderProps) {
  const channelType = channel.type;
  const channelId = channel.id;
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ChatConnectionStatus>('connecting');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAttentionActive, setIsAttentionActive] = useState(false);
  const socketRef = useRef<ChatSocket | null>(null);
  const isOpenRef = useRef(false);
  const seenMessageIdsRef = useRef(new Set<string>());
  const attentionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const activeChannel: LiveChatChannel = { type: channelType, id: channelId };
    const token = localStorage.getItem(FCOP_AUTH_TOKEN_STORAGE_KEY);
    const socket: ChatSocket = io(env.NEXT_PUBLIC_API_URL, {
      auth: { token },
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current = socket;

    const joinRoom = () => {
      setConnectionStatus('connecting');
      setConnectionError(null);
      socket.emit('chat:join', { channel: activeChannel }, (response) => {
        if (!response.success) {
          setConnectionStatus('offline');
          setConnectionError(response.message);
          return;
        }

        const history = response.data ?? [];
        seenMessageIdsRef.current = new Set(history.map((message) => message.id));
        setMessages(history);
        setConnectionStatus('live');
      });
    };

    const receiveMessage = (message: LiveChatMessage) => {
      if (seenMessageIdsRef.current.has(message.id)) {
        return;
      }

      seenMessageIdsRef.current.add(message.id);
      setMessages((current) => [...current, message]);

      // Draw attention only when another participant sends a message outside the open chat.
      if (!isOpenRef.current && message.authorMemberId !== currentMemberId) {
        setUnreadCount((count) => count + 1);
        setIsAttentionActive(true);

        if (attentionTimerRef.current) {
          clearTimeout(attentionTimerRef.current);
        }

        attentionTimerRef.current = setTimeout(() => setIsAttentionActive(false), 700);
      }
    };

    socket.on('connect', joinRoom);
    socket.on('chat:message', receiveMessage);
    socket.on('connect_error', (error) => {
      setConnectionStatus('offline');
      setConnectionError(error.message || 'Could not connect to live chat.');
    });
    socket.io.on('reconnect_attempt', () => {
      setConnectionStatus('reconnecting');
      setConnectionError(null);
    });

    return () => {
      socket.emit('chat:leave', { channel: activeChannel });
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;

      if (attentionTimerRef.current) {
        clearTimeout(attentionTimerRef.current);
      }
    };
  }, [channelId, channelType, currentMemberId]);

  const handleOpenChange = useCallback((open: boolean) => {
    isOpenRef.current = open;

    // Opening the conversation acknowledges live messages seen on this page.
    if (open) {
      setUnreadCount(0);
      setIsAttentionActive(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (input: SendMessageInput): Promise<ChatResponse<LiveChatMessage>> => {
      const socket = socketRef.current;

      if (!socket?.connected || connectionStatus !== 'live') {
        return {
          success: false,
          code: 'CHAT_OFFLINE',
          message: 'Live chat is offline. Reconnect before sending.',
        };
      }

      return new Promise((resolve) => {
        socket
          .timeout(10_000)
          .emit(
            'chat:send',
            { channel: { type: channelType, id: channelId }, ...input },
            (error, response) => {
              if (error || !response) {
                resolve({
                  success: false,
                  code: 'CHAT_TIMEOUT',
                  message: 'Message delivery timed out.',
                });
                return;
              }

              resolve(response);
            },
          );
      });
    },
    [channelId, channelType, connectionStatus],
  );

  const value = useMemo(
    () => ({
      messages,
      connectionStatus,
      connectionError,
      unreadCount,
      isAttentionActive,
      handleOpenChange,
      sendMessage,
    }),
    [
      connectionError,
      connectionStatus,
      handleOpenChange,
      isAttentionActive,
      messages,
      sendMessage,
      unreadCount,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used inside ChatProvider.');
  }

  return context;
}
