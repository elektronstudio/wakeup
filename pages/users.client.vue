<script setup lang="ts">
const { messages, sendMessage } = useMessages();

const useUsers = (messageType: string, initialMe: {}) => {
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
    { debounce: 100, immediate: true, deep: true }
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
const data = useUsers("WAKEUP_USER", { x: 0, y: 0 });
</script>

<template>
  <div>
    <input type="range" v-model.number="data.me.value.x" />
    <pre>{{ { ...data, message: messages.slice(-1) } }}</pre>
  </div>
</template>
