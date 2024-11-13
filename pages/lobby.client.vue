<script setup lang="ts">
import * as Tone from "tone";
import { Circle } from "collisions";
import { useUserId, useUserName } from "~/composables/user";

definePageMeta({
  layout: "three",
});

const el = ref<HTMLElement | null>(null);

const { width, height, centerX, centerY } = useWindowCenter();

const userRadius = 15;
const circleRadius = 100;

const circles = [
  {
    x: -250,
    y: -200,
    r: circleRadius,
    colliding: false,
    distance: 0,
    soundFile: "/fertility.mp3",
  },

  {
    x: 0,
    y: 0,
    r: 150,
    colliding: false,
    distance: 0,
    soundFile: "/crowd.mp3",
  },
  {
    x: 300,
    y: 200,
    r: 80,
    colliding: false,
    distance: 0,
    soundFile: "/kodak.mp3",
  },
];

// Create a player for each circle if soundFile exists
const players = circles.map((circleData) => {
  if (circleData.soundFile) {
    const player = new Tone.Player({
      url: circleData.soundFile,
      onload: () => {
        console.log(`Loaded sound file: ${circleData.soundFile}`);
      },
      onerror: (error) => {
        console.error(
          `Error loading sound file: ${circleData.soundFile}`,
          error
        );
      },
    }).toDestination();
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
    y: centerY.value - userRadius + randomUser.y,
  },
});

const user = ref({ x: 0 + randomUser.x, y: 0 + randomUser.y, status: "" });

const { messages, sendMessage } = useMessages();

const userId = useUserId();

watch([x, y], ([x, y]) => {
  user.value.x = x - centerX.value + userRadius;
  user.value.y = y - centerY.value + userRadius;
});

const viewBox = `-${width.value / 2} -${height.value / 2} ${width.value} ${
  height.value
}`;

const messageType = "USER_XY";

const debounce = 50;

debouncedWatch(
  [x, y, () => user.value.status],
  () => {
    sendMessage.value({
      type: messageType,
      userId: userId.value,
      userX: user.value.x,
      userY: user.value.y,
      userStatus: user.value.status,
    });
  },
  { debounce }
);

const otherUsers = ref<any[]>([]);

watch(messages.value, async (newValue) => {
  const message = newValue[newValue.length - 1];
  if (message.type === messageType && message.userId !== userId.value) {
    const user = {
      userId: message.userId,
      x: message.userX + centerX.value,
      y: message.userY + centerY.value,
      status: message.userStatus,
    };
    const existingUserIndex = otherUsers.value?.findIndex((u) => {
      return u.userId === user.userId;
    });
    if (otherUsers.value && existingUserIndex > -1) {
      otherUsers.value[existingUserIndex] = user;
    } else {
      otherUsers.value.push(user);
    }
  }
});

watch(
  [x, y],
  () => {
    const userCircle = new Circle(user.value.x, user.value.y, userRadius);
    circles.forEach((circleData, index) => {
      const circle = new Circle(circleData.x, circleData.y, circleData.r);
      const previouslyColliding = circleData.colliding;
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
        const player = players[index];
        if (player.loaded) {
          // Ensure the buffer is loaded before starting
          player.volume.value = Tone.gainToDb(circleData.distance);
          if (
            circleData.colliding &&
            (!player.state || player.state === "stopped")
          ) {
            player.start();
          } else if (!circleData.colliding && player.state === "started") {
            player.stop();
          }
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
    if (player && player.loaded) {
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
  <div
    class="fixed inset-0 flex justify-center items-center bg-[rgb(14,14,14)]"
  >
    <video
      src="/asuna.mp4"
      class="h-full brightness-[0.2] pointer-events-none touch-none"
      muted
      loop
      autoplay
    />
  </div>
  <svg class="fixed pointer-events-none w-full h-full" :viewBox="viewBox">
    <circle
      v-for="(circleData, index) in circles"
      :key="index"
      :r="circleData.r"
      :cx="circleData.x"
      :cy="circleData.y"
      :stroke="circleData.colliding ? 'rgba(239 68 68 / 0.9)' : 'gray'"
      stroke-width="2"
      fill="none"
      :class="['transition-all duration-300']"
    />
  </svg>

  <div
    v-for="otherUser in otherUsers"
    :key="otherUser.userId"
    class="fixed transition-all flex gap-2"
    :style="{
      animationDuration: debounce * 4 + 'ms',
      left: otherUser.x + 'px',
      top: otherUser.y + 'px',
    }"
  >
    <Dot class="text-blue-500/90" />
    <textarea
      v-model="otherUser.status"
      class="tracking-loose mt-[7px] w-32 h-64 border-none p-0 resize-none outline-none text-white text-sm bg-transparent leading-tight [font-feature-settings:tnum]"
    />
  </div>

  <div
    ref="el"
    :style="userStyle"
    class="fixed cursor-grab flex gap-2 select-none touch-none cursor-move"
  >
    <Dot class="text-red-500/90" @click="onStart" />
    <textarea
      v-model="user.status"
      class="tracking-loose mt-[7px] w-32 h-64 border-none p-0 resize-none outline-none text-white text-sm bg-transparent leading-tight [font-feature-settings:tnum]"
    />
  </div>
</template>
