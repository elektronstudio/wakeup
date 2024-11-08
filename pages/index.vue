<script setup lang="ts">
import LinkCard from "~/components/LinkCard.vue";
</script>

<template>
  <Breadboard />
  <div class="flex flex-col gap-10">
    <h1 class="text-5xl md:text-7xl tracking-tight">Wake↑up</h1>
    <div />
    <div class="grid lg:grid-cols-2 gap-14">
      <div class="flex flex-col gap-8">
        <Heading>
          Reviving virtual peforming arts and sound experiences from the digital
          obscurity
        </Heading>
        <div class="flex flex-col gap-4 text-gray-400">
          <p>
            From 2020 to 2022, the performing arts platform
            <a href="https://elektron.art" class="underline underline-offset-4"
              >elektron.art</a
            >
            pioneered a series of online performances and experiments,
            reimagining the collaborative and communal essence of performing
            arts in a virtual space.
          </p>
          <p class="text-gray-400">
            After being offline for several years, these projects are being
            revived in late 2024, with the original creators updating the code
            to make them accessible to the public once again. Note: The
            experiences are not optimized for mobile screens.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <Heading>
          Virtuaalsete etenduskunstide ja heliinstallatsioonide taaselustamine
        </Heading>
        <div class="flex flex-col gap-4 text-gray-400">
          <p>
            Aastatel 2020–2022 lõi etenduskunstide platvorm
            <a href="https://elektron.art" class="underline underline-offset-4"
              >elektron.art</a
            >
            rea veebipõhiseid etendusi ja eksperimente, uurides kuidas luua
            virtuaalseid teatrisündmusi ning kohalolu- ja kogukonnatunnet.
          </p>
          <p>
            2024. aasta sügisest on projektide lähtekood ja infrastruktuur
            uuendatud ning nad on taas avalikkusele kättesaadavad. Märkus:
            projektid ei pruugi mobiilsetes seadmetes hästi töötada.
          </p>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-5 gap-6">
      <a href="http://foyer.elektron.studio" target="_blank">
        <Card>
          <div>3D theatre space</div>
          <div class="text-gray-500">
            First presented in the Digital Foyer conference in Düsseldorf Oct 5
            2020
          </div>
        </Card>
      </a>
      <NuxtLink to="/foyer" target="_blank">
        <Card>
          <div>3D theatre space II</div>
          <div class="text-gray-500">
            Second version of theatre space with online users. Nov 2020
          </div>
        </Card>
      </NuxtLink>
      <a href="https://www.youtube.com/watch?v=ttQ6L5ach3w" target="_blank">
        <Card>
          <div>Electron Lobby (video)</div>
          <div class="text-gray-500">
            Garage48 hackaton project for virtual social gatherings. Jan 27 2021
          </div>
        </Card>
      </a>
      <NuxtLink to="/lobby" target="_blank">
        <Card>
          <div>Electron Lobby</div>
          <div class="text-gray-500">
            Remake of the original lobby idea with online users. Nov 2024
          </div>
        </Card>
      </NuxtLink>
      <a href="http://synth.elektron.studio" target="_blank">
        <Card>
          <div>Collective music maker</div>
          <div class="text-gray-500">
            Collaborative sound installation with online users. April 2021
          </div>
        </Card>
      </a>
    </div>
  </div>
</template>
