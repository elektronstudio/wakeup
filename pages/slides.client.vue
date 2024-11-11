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
  // { image: "algo.png" },
  { video: "hello.mp4" },
  { image: "stages.png" },
  { video: "elektronlive.mp4" },
  // { image: "liis1.png" },
  // { image: "liis2.png" },
  { image: "hundid.png" },
  { image: "neuro.jpg" },
  { image: "kure.png" },
  { image: "lp.png" },
  { image: "zahir.png" },
  { image: "animals.png" },
  { image: "gallery.png" },
  { image: "henri.png" },
  { audio: "road.mp3" },
  { image: "kanut.png" },
  { image: "beethoven.jpg" },
  { image: "twitch.png" },
  { image: "world1.png" },
  { image: "world2.png" },
  { image: "world3.png" },
  { image: "world4.png" },
  { image: "world5.png" },
  { image: "nite.png" },
  { title: "Eksperiment № 1" },
  { video: "foyer1.mp4" },
  { image: "foyer2.png" },
  { image: "foyer4.png" },
  { image: "chips2.png" },
  { image: "chips3.png" },
  { image: "chips8.png" },
  { image: "chips6.png" },
  { image: "chips1.png" },
  { title: "Eksperiment № 2" },
  { draggable: true },
  { video: "sphere.mp4" },
  { image: "lobby_sketch.jpg" },
  { image: "circ1.png" },
  { image: "circ2.png" },
  { title: "Eksperiment № 3" },
  { image: "chaplin.jpg" },
  // { video: "elektron_cables.mp4" },
  { video: "hello.mp4" },
]);

const currentIndex = useStorage("slides", 0);

const next = () => {
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
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
      <div v-if="item.title" class="flex justify-center items-center h-full">
        <h1
          class="text-8xl text-balance text-center font-semibold px-4 md:px-32 tracking-tight"
        >
          {{ item.title }}
        </h1>
      </div>
      <div v-if="item.video" class="flex justify-center items-center h-full">
        <video
          :src="'/slides/' + item.video"
          class="h-full"
          muted
          autoplay
          controls
        />
      </div>
      <div v-if="item.audio" class="flex justify-center items-center h-full">
        <audio
          :src="'/slides/' + item.audio"
          controls
          class="invert opacity-0 transition hover:opacity-50"
        />
      </div>
      <Draggable v-if="item.draggable" />
    </div>
  </div>
</template>
