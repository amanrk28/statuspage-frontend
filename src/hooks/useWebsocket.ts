// hooks/useWebSocket.ts
import { SocketMessage } from "@/core/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useWebSocket = (onMessage: (data: SocketMessage) => void) => {
  const { user } = useAuth0();
  const { orgSlug } = useParams();

  const orgId = user?.org_id ?? orgSlug;
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const domain = BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');
    const ws = new WebSocket(`${domain}/ws/${orgId}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const ws = socketRef.current;
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  }, [onMessage]);
};
