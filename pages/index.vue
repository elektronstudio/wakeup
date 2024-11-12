<script setup lang="ts">
const cards = [
  {
    title: "Experience № 1",
    name: "3D Virtual stage",
    description:
      'First presented in the "Digital spaces for the performing arts" conference in Düsseldorf, a virtual 3D stage.',
    videoLink: "https://www.youtube.com/watch?v=C9Ly7UgsPCA&t=1753s",
    date: "5 Oct 2020",
    link: "http://foyer.elektron.studio",
    buttonText: "Go to virtual stage",
  },
  {
    title: "Experience № 2",
    name: "2D Lobby",
    description: "Recreation of the original lobby idea with online users.",
    videoLink: "https://www.youtube.com/watch?v=ttQ6L5ach3w",
    date: "Nov 2024",
    link: "/lobby",
    buttonText: "Go to Digital Foyer",
  },
  {
    title: "Experience № 3",
    name: "Collective synth",
    description: "Collaborative sound installation with online users",
    date: "April 2021",
    link: "http://synth.elektron.studio",
    buttonText: "Go to virtual stage",
  },
];
</script>

<template>
  <Breadboard />
  <div class="flex flex-col gap-10">
    <h1 class="text-5xl md:text-7xl tracking-tight">Wake↑up</h1>
    <div />
    <div class="grid lg:grid-cols-[1fr_2fr]">
      <div class="pr-16">
        <Heading>
          Reviving virtual performing arts and sound experiences from the
          digital obscurity
        </Heading>
      </div>
      <div class="flex flex-col gap-4 text-gray-400 md:pr-32">
        <p>
          From 2020 to 2022, the performing arts platform
          <a href="https://elektron.art" class="underline underline-offset-4"
            >elektron.art</a
          >
          pioneered a series of online performances and experiments, reimagining
          the collaborative and communal essence of performing arts in a virtual
          space.
        </p>
        <p class="text-gray-400">
          After being offline for several years, these projects are being
          revived in late 2024, with the original creators updating the code to
          make them accessible to the public once again.
        </p>
        <p>Note: The experiences are not optimized for mobile screens.</p>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="bg-black/50 z-50"
      >
        <div class="uppercase tracking-wider font-bold text-xs text-gray-500">
          {{ card.title }}
        </div>
        <div class="text-xl font-semibold font-title tracking-wide">
          {{ card.name }}
        </div>
        <div class="h-1" />
        <div class="text-gray-500">
          {{ card.description }}
          <a
            v-if="card.videoLink"
            :href="card.videoLink"
            target="blank"
            class="underline underline-offset-4"
          >
            See the video
          </a>
        </div>
        <div class="text-sm text-gray-600">{{ card.date }}</div>
        <div class="h-2" />
        <a v-if="card.link" :href="card.link" target="_blank">
          <Button>{{ card.buttonText }}</Button>
        </a>
      </Card>
    </div>
  </div>
</template>
