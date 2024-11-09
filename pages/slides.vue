<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";

definePageMeta({
  layout: "three",
});

type ContentItem = {
  image?: string;
  title?: string;
  video?: string;
  audio?: string;
};

const items = ref<ContentItem[]>([
  { audio: "crowd.mp3" },
  { video: "elektron_cables.mp4" },
  { title: "Lähme tagasi talve" },
]);

const currentIndex = ref(0);

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
      <div
        v-if="item.image"
        class="flex justify-center items-center border h-full"
      >
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
    </div>
  </div>
</template>
