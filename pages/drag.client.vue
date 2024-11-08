<script setup lang="ts">
import * as Tone from "tone";
import { Circle } from "collisions";
import { useUserId, useUserName } from "~/composables/user";

const el = ref<HTMLElement | null>(null);

const { width, height, centerX, centerY } = useWindowCenter();

const userRadius = 15;
const circleRadius = 100;

// Add two more circles to the array, each with a sound file
const circles = [
  {
    x: 0,
    y: 0,
    r: circleRadius,
    colliding: false,
    distance: 0,
    soundFile: "/crowd.mp3",
  },
  {
    x: 200,
    y: 200,
    r: circleRadius,
    colliding: false,
    distance: 0,
    soundFile: "/what_about_people_our_age.mp3",
  },
  {
    x: -200,
    y: -200,
    r: circleRadius,
    colliding: false,
    distance: 0,
  },
];

// Create a player for each circle if soundFile exists
const players = circles.map((circleData) => {
  if (circleData.soundFile) {
    const player = new Tone.Player(circleData.soundFile).toDestination();
    player.loop = true;
    player.autostart = false;
    return player;
  }
  return null;
});

const randomUser = randomXY(height.value, height.value, userRadius, circles);

const { x, y } = useDraggable(el, {
  initialValue: {
    x: centerX.value - userRadius + randomUser.x,
    y: centerY.value - userRadius,
  },
});

const user = ref({ x: 0 + randomUser.x, y: 0 });

const { messages, sendMessage } = useMessages();

const userId = useUserId();

watch([x, y], ([x, y]) => {
  user.value.x = x - centerX.value + userRadius;
  user.value.y = y - centerY.value + userRadius;
});

const svgSize = height.value;
const svgSizeHalf = svgSize / 2;
const viewBox = `-${svgSizeHalf} -${svgSizeHalf} ${svgSize} ${svgSize}`;
const left = computed(() => centerX.value - svgSizeHalf + "px");
const top = computed(() => centerY.value - svgSizeHalf + "px");

const messageType = "USER_XY";

const debounce = 50;

debouncedWatch(
  [x, y],
  () => {
    sendMessage.value({
      type: messageType,
      userId: userId.value,
      userX: user.value.x,
      userY: user.value.y,
    });
  },
  { debounce }
);

const users = ref<any[]>([]);

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

watch(
  [x, y],
  () => {
    const userCircle = new Circle(user.value.x, user.value.y, userRadius);
    circles.forEach((circleData, index) => {
      const circle = new Circle(circleData.x, circleData.y, circleData.r);
      circleData.colliding = userCircle.collides(circle);

      // Calculate distance of user from the circle center
      const dx = user.value.x - circleData.x;
      const dy = user.value.y - circleData.y;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      if (distanceFromCenter <= circleData.r) {
        circleData.distance = 1 - distanceFromCenter / circleData.r;
      } else {
        circleData.distance = 0;
      }

      // Adjust the volume of the corresponding player based on distance
      if (players[index]) {
        players[index].volume.value = Tone.gainToDb(circleData.distance);
        if (
          circleData.colliding &&
          (!players[index].state || players[index].state === "stopped")
        ) {
          players[index].start();
        } else if (
          !circleData.colliding &&
          players[index].state === "started"
        ) {
          players[index].stop();
        }
      }
    });
  },
  { immediate: true }
);

const userStyle = computed(() => ({
  left: x.value + "px",
  top: y.value + "px",
}));

const a = ref(0);

const onStart = async () => {
  await Tone.start();
  players.forEach((player) => {
    if (player) {
      player.start();
    }
  });
  Tone.getTransport().scheduleRepeat((time) => {
    Tone.getDraw().schedule(() => {
      a.value += 1;
    }, time);
  }, 1 / 60);
  Tone.getTransport().start();
};
</script>

<template>
  <svg
    :width="svgSize"
    :height="svgSize"
    :viewBox="viewBox"
    class="fixed pointer-events-none"
    :style="{ top, left }"
  >
    <circle
      v-for="(circleData, index) in circles"
      :key="index"
      :r="circleData.r"
      :cx="circleData.x"
      :cy="circleData.y"
      :stroke="circleData.colliding ? 'rgba(239 68 68 / 0.9)' : 'gray'"
      stroke-width="2"
      fill="none"
      class="transition-colors duration-300"
    />
  </svg>

  <pre class="pointer-events-none select-none">{{
    { randomUser, a, left, top, user: { ...user, userId }, users, circles }
  }}</pre>

  <div
    v-for="user in users"
    :key="user.userId"
    class="fixed transition-all"
    :style="{
      animationDuration: debounce * 4 + 'ms',
      left: user.x + 'px',
      top: user.y + 'px',
    }"
  >
    <Dot :r="15" class="text-blue-500/90" />
  </div>
  <div ref="el" :style="userStyle" class="fixed cursor-grab">
    <Dot :r="15" class="text-red-500/90" />
  </div>

  <Button @click="onStart">Start</Button>
</template>
