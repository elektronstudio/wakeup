<script setup lang="ts">
import { useUserId, useUserName } from '~/composables/user';


const el = ref<HTMLElement | null>(null)

const { centerX, centerY } = useWindowCenter();

const { x, y, style } = useDraggable(el, {
    initialValue: { x: 0, y: 0 },
})

const user = ref({ x: 0, y: 0 })

const { messages, sendMessage } = useMessages();

const userId = useUserId();
const userName = useUserName();

watch([x, y], ([x, y]) => {
    user.value.x = x - centerX.value
    user.value.y = y - centerY.value
})

const messageType = 'USER_XY'

debouncedWatch([x, y], () => {
    sendMessage.value({ type: messageType, userId: userId.value, userX: user.value.x, userY: user.value.y });
}, { debounce: 200 });

const users = ref<any[]>([])

watch(messages.value, async (newValue) => {
    const message = newValue[newValue.length - 1];
    if (message.type === messageType) {
        const user = {
            userId: message.userId,
            x: message.userX,
            y: message.userY,
        };
        const existingUserIndex = users.value?.findIndex((u) => {
            return u.userId === user.userId;
        });
        if (users.value && existingUserIndex > -1) {
            users.value[existingUserIndex] = user;
        } else {
            users.value.push(user);
        }
    }
});

</script>

<template>
    <pre class="pointer-events-none select-none">{{ user }}</pre>
    <pre class="pointer-events-none select-none">{{ users }}</pre>
    <div ref="el" :style="style" class="fixed cursor-grab">
        <Dot ref="el" :style="style" class="text-red-500" />
    </div>
</template>