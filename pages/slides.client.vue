<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const { shift, space } = useMagicKeys();

watchEffect(async () => {
  if (shift.value && space.value) {
    await navigateTo("/");
  }
});

definePageMeta({
  layout: "three",
});

type ContentItem = {
  image?: string;
  title?: string;
  video?: string;
  audio?: string;
  draggable?: true;
};

const items = ref<ContentItem[]>([
  { draggable: true },
  { image: "circ1.png" },
  { image: "circ2.png" },
  { image: "chaplin.jpg" },
  { video: "hello.mp4" },
  { image: "algo.png" },
  { image: "nite.png" },
  { image: "neuro.jpg" },
  { image: "neuro.jpg" },
  { image: "liis1.png" },
  { image: "liis2.png" },
  { image: "kure.png" },
  { image: "lp.png" },
  { image: "gallery.png" },
  { image: "henri.png" },
  { image: "twitch.png" },
  { image: "kanut.png" },
  { image: "world1.png" },
  { image: "world2.png" },
  { image: "world3.png" },
  { image: "world4.png" },
  { image: "world5.png" },
  { image: "lobby_sketch.jpg" },
  { audio: "road.mp3" },
  { video: "elektron_cables.mp4" },
  { title: "Lähme tagasi talve" },
]);

const currentIndex = useStorage("slides", 0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % items.value.length;
};

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + items.value.length) % items.value.length;
};

const { arrowRight, arrowLeft } = useMagicKeys();

// Watch for arrow key events to navigate slides
watchEffect(() => {
  if (arrowRight.value) next();
  if (arrowLeft.value) prev();
});
</script>

<template>
  <div class="bg-black text-white fixed inset-0">
    <div
      v-for="(item, i) in items"
      :key="i"
      v-show="i === currentIndex"
      class="h-full"
    >
      <div v-if="item.image" class="flex justify-center items-center h-full">
        <img :src="'/slides/' + item.image" class="h-full object-contain" />
      </div>
      <div
        v-if="item.title"
        class="flex justify-center items-center border h-full"
      >
        <h1
          class="text-8xl text-balance text-center font-semibold px-4 md:px-32 tracking-tight"
        >
          {{ item.title }}
        </h1>
      </div>
      <div
        v-if="item.video"
        class="flex justify-center items-center border h-full"
      >
        <video
          :src="'/slides/' + item.video"
          class="h-full"
          muted
          loop
          autoplay
          controls
        />
      </div>
      <div
        v-if="item.audio"
        class="flex justify-center items-center border h-full"
      >
        <audio
          :src="'/slides/' + item.audio"
          controls
          loop
          class="invert opacity-0 transition hover:opacity-50"
        />
      </div>
      <Draggable v-if="item.draggable" />
    </div>
  </div>
</template>
