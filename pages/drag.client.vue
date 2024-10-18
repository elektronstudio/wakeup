<script setup lang="ts">

import { Circle, Polygon, Result } from "collisions";
import { useUserId, useUserName } from '~/composables/user';


const el = ref<HTMLElement | null>(null)

const { centerX, centerY } = useWindowCenter();

const userRadius = 15

const { x, y } = useDraggable(el, {
    initialValue: { x: centerX.value - userRadius, y: centerY.value - userRadius },
})

const user = ref({ x: 0, y: 0 })

const { messages, sendMessage } = useMessages();

const userId = useUserId();
const userName = useUserName();


watch([x, y], ([x, y]) => {
    user.value.x = x - centerX.value + userRadius
    user.value.y = y - centerY.value + userRadius
})

const circleRadius = 250
const circlePadding = 100
const svgSize = (circleRadius * 2) + (circlePadding * 2)
const svgSizeHalf = svgSize / 2
const viewBox = `-${svgSizeHalf} -${svgSizeHalf} ${svgSize} ${svgSize}`
const left = computed(() => (centerX.value - svgSizeHalf) + 'px')
const top = computed(() => (centerY.value - svgSizeHalf) + 'px')


const circle = new Circle(0, 0, circleRadius);
const result = new Result();

const userCollides = ref(false)

watch([x, y], () => {
    const userCircle = new Circle(user.value.x, user.value.y, userRadius);
    userCollides.value = userCircle.collides(circle);
}, { immediate: true })

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


const userStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
</script>

<template>

    <svg :width="svgSize" :height="svgSize" :viewBox="viewBox" class="fixed border pointer-events-none"
        :style="{ top, left }">
        <circle :r="circleRadius" cx="0" cy="0" stroke="#777" stroke-width="2" fill="none" />
        <circle r="2" fill="white" />
    </svg>

    <pre
        class="pointer-events-none select-none">{{ { userCollides, left, top, user: { ...user, userId }, users } }}</pre>

    <div v-for="user in users" :key="user.userId" class="fixed transition-all"
        :style="{ animationDuration: debounce * 4 + 'ms', left: user.x + 'px', top: user.y + 'px' }">
        <Dot :r="15" class="text-blue-500/90" />
    </div>
    <div ref="el" :style="userStyle" class="fixed cursor-grab">
        <Dot :r="15" class="text-red-500/90" />
    </div>
</template>