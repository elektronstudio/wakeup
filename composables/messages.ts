import ReconnectingWebSocket from "reconnecting-websocket";

export const useMessages = () => {
  const messages = ref<any[]>([]);
  const latestMessage = ref<any | null>(null);
  const sendMessage = ref((_: any) => {});
  const ws = ref<ReconnectingWebSocket | null>(null);

  tryOnMounted(() => {
    const config = useRuntimeConfig();
    const websocket = new ReconnectingWebSocket(config.public.wsUrl);

    websocket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      messages.value.push(message);
      latestMessage.value = message;
    });

    ws.value = websocket;
    sendMessage.value = (message: any) =>
      websocket.send(
        JSON.stringify({
          id: randomString(),
          datetime: new Date().toISOString(),
          ...message,
        })
      );
  });

  return { messages, latestMessage, sendMessage, ws };
};
