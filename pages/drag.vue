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

const debounce = 50

debouncedWatch([x, y], () => {
    sendMessage.value({ type: messageType, userId: userId.value, userX: user.value.x, userY: user.value.y });
}, { debounce });

const users = ref<any[]>([])

watch(messages.value, async (newValue) => {
    const message = newValue[newValue.length - 1];
    if (message.type === messageType && message.userId !== userId.value) {
        const user = {
            userId: message.userId,
            x: message.userX + centerX.value,
            y: message.userY + centerY.value,
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
    <pre class="pointer-events-none select-none">{{ { ...user, userId } }}</pre>
    <pre class="pointer-events-none select-none">{{ users }}</pre>
    <div v-for="user in users" :key="user.userId" class="fixed transition-all"
        :style="{ animationDuration: debounce + 'ms', left: user.x + 'px', top: user.y + 'px' }">
        <Dot class="text-blue-500/90" />
    </div>
    <div ref="el" :style="style" class="fixed cursor-grab">
        <Dot ref="el" :style="style" class="text-red-500/90" />
    </div>
</template>