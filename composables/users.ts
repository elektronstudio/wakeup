export const useUsers = (
  messageType: string,
  initialMe: {},
  debounce = 100
) => {
  const { messages, sendMessage } = useMessages();
  const userId = useUserId();

  const me = ref<any>({ userId, ...initialMe });
  const others = ref<any[]>([]);

  debouncedWatch(
    me,
    (updatedMe) => {
      sendMessage.value({
        type: messageType,
        payload: updatedMe,
      });
    },
    { debounce, immediate: true, deep: true }
  );

  watch(messages.value, (updatedMessages) => {
    const message = updatedMessages[updatedMessages.length - 1];
    if (
      message.type === messageType &&
      message.payload?.userId !== userId.value
    ) {
      const otherIndex = others.value?.findIndex((u) => {
        return u.userId === message.payload?.userId;
      });
      if (others.value?.length && otherIndex > -1) {
        others.value[otherIndex] = message.payload;
      } else {
        others.value.push(message.payload);
      }
    }
  });

  return { me, others };
};
