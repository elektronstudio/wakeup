<script setup lang="ts">
const cards = [
  {
    title: "Experience № 1",
    name: "Virtual stage",
    description:
      'A virtual 3D stage, first presented in the "Digital spaces for the performing arts" conference in Düsseldorf, .',
    videoLink: "https://www.youtube.com/watch?v=C9Ly7UgsPCA&t=1753s",
    date: "Oct 2020",
    link: "http://wakeup-foyer.elektron.art",
    buttonText: "Single user",
    link2: "/webrtc",
    buttonText2: "Multiuser",
  },
  {
    title: "Experience № 2",
    name: "Multiuser Lobby",
    description:
      "Created for Garage48 hackathon, a virtual lobby for online theater performances, allowing to communicate with each other.",
    videoLink: "https://www.youtube.com/watch?v=ttQ6L5ach3w",
    date: "Jan 2021",
    link: "/lobby",
    buttonText: "go to multiuser lobby",
  },
  {
    title: "Experience № 3",
    name: "Multiuser synth",
    description:
      "Based on the virtual lobby idea, a collaborative installation with online users making music together.",
    date: "April 2021",
    link: "http://wakeup-synth.elektron.art",
    buttonText: "got to multiuser synth",
  },
];
</script>

<template>
  <Breadboard />
  <div class="p-4 md:p-6 flex flex-col gap-10">
    <NuxtLink to="/users"
      ><h1 class="text-6xl md:text-7xl tracking-tight">Wake↑up</h1></NuxtLink
    >
    <div />
    <div class="grid lg:grid-cols-[1fr_2fr] gap-4">
      <Heading class="md:pr-16">
        Reviving virtual performing arts and sound experiences from the digital
        obscurity
      </Heading>
      <div class="flex flex-col gap-4 text-neutral-400 md:pr-32 xl:pr-72">
        <p>
          From 2020 to 2022, the performing arts platform
          <a href="https://elektron.art" class="underline underline-offset-4"
            >elektron.art</a
          >
          pioneered a series of online performances and experiments, reimagining
          the collaborative and communal essence of performing arts in a virtual
          space.
        </p>
        <p class="text-neutral-400">
          After being offline for several years, these projects are being
          revived in late 2024, with the original creators updating the code to
          make them accessible to the public once again.
        </p>
        <p>Note: The experiences are not optimized for mobile screens.</p>
      </div>
    </div>
    <div class="grid md:grid-cols-3 2xl:grid-cols-4 gap-6">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="bg-black/50 z-50"
      >
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col gap-2">
            <div
              class="uppercase tracking-wider font-bold text-xs text-neutral-500"
            >
              {{ card.title }}
            </div>
            <div class="text-xl font-semibold font-title tracking-wide">
              {{ card.name }}
            </div>
            <div class="h-1" />
            <div class="text-neutral-500">
              {{ card.description }}
            </div>
            <div class="text-sm text-neutral-600">{{ card.date }}</div>
            <div class="h-2" />
          </div>
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <a v-if="card.link" :href="card.link" target="_blank">
              <ButtonPrimary>{{ card.buttonText }}</ButtonPrimary>
            </a>
            <NuxtLink v-if="card.link2" :to="card.link2" target="_blank">
              <ButtonPrimary>{{ card.buttonText2 }}</ButtonPrimary>
            </NuxtLink>
            <a v-if="card.videoLink" :href="card.videoLink" target="blank">
              <Button>See video</Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
