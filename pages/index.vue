<script setup lang="ts">
import LinkCard from "~/components/LinkCard.vue";
</script>

<template>
  <div class="flex flex-col gap-6 items-start">
    <h1 class="text-8xl tracking-tight">Wake↑up</h1>
    <br />
    <Heading>
      Reviving virtual peforming arts and sound experiences from the lockdown
    </Heading>
    <p class="w-[60ch] text-gray-400">
      From 2020 to 2023, the artist collective
      <span class="border-b border-gray-600">eˉlektron</span> pioneered a series
      of online experiments, residencies, and performances, reimagining the
      collaborative and communal essence of performing arts in a virtual space.
    </p>
    <p class="w-[60ch] text-gray-400">
      After being offline for several years, these projects are being revived in
      late 2024, with the original creators updating the code to make them
      accessible to the public once again.
    </p>
    <div class="grid grid-cols-4 gap-6">
      <LinkCard to="/ws">
        <div>Websocket test</div>
        <div class="text-gray-500">Testing basic infrastructure</div>
      </LinkCard>
      <LinkCard to="/drag">
        <div>Drag test</div>
        <div class="text-gray-500">Testing dragging</div>
      </LinkCard>
      <LinkCard to="/three">
        <div>ThreeJS test</div>
        <div class="text-gray-500">Testing 3D</div>
      </LinkCard>
    </div>
    <Breadboard />
  </div>
</template>
