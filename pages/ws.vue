<script setup lang="ts">
const { messages, sendMessage } = useMessages();
const send = () => sendMessage.value({ value: 'hello' });
</script>
<template>
    <div class="flex flex-col gap-4 items-start">
        <Button @click="send">Send message</Button>
        <div class="font-mono whitespace-pre">
            {{ messages }}
        </div>
    </div>
</template>
