<script setup lang="ts">
const { shift, space } = useMagicKeys();

watchEffect(async () => {
  if (shift.value && space.value) {
    await navigateTo("/slides");
  }
});
</script>

<template>
  <Breadboard />
  <div class="flex flex-col gap-10">
    <h1 class="text-5xl md:text-7xl tracking-tight">Wake↑up</h1>
    <div />
    <div class="grid lg:grid-cols-[3fr_1fr] gap-14">
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
            to make them accessible to the public once again.
          </p>
          <p>Note: The experiences are not optimized for mobile screens.</p>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <Card class="bg-black z-50">
        <div class="uppercase tracking-wider font-bold text-xs text-gray-500">
          Experience № 1
        </div>
        <div class="text-xl font-semibold font-title tracking-wide">
          3D Virtual stage
        </div>
        <div class="h-1" />
        <div class="text-gray-500">
          First presented in the "Digital spaces for the performing arts"
          conference in Düsseldorf, a virtual 3D stage.
          <a
            href="https://www.youtube.com/watch?v=C9Ly7UgsPCA&t=1753s"
            target="blank"
            class="underline underline-offset-4"
          >
            See the video
          </a>
        </div>
        <div class="text-sm text-gray-600">5 Oct 2020</div>
        <div class="h-2" />
        <a href="http://foyer.elektron.studio" target="_blank">
          <Button>Go to virtual stage</Button>
        </a>
      </Card>
      <Card class="bg-black z-50">
        <div class="uppercase tracking-wider font-bold text-xs text-gray-500">
          Experience № 2
        </div>
        <div class="text-xl font-semibold font-title tracking-wide">
          2D Lobby
        </div>
        <div class="h-1" />
        <div class="text-gray-500">
          Recreation of the original lobby idea with online users.
        </div>
        <div class="text-sm text-gray-600">Nov 2024</div>
        <div class="h-2" />
        <NuxtLink to="/lobby" target="_blank">
          <Button>Go to Digital Foyer</Button>
        </NuxtLink>
      </Card>
      <Card class="bg-black z-50">
        <div class="uppercase tracking-wider font-bold text-xs text-gray-500">
          Experience № 3
        </div>
        <div class="text-xl font-semibold font-title tracking-wide">
          Collective synth
        </div>
        <div class="h-1" />
        <div class="text-gray-500">
          Collaborative sound installation with online users
        </div>
        <div class="text-sm text-gray-600">April 2021</div>
        <div class="h-2" />
        <a href="http://synth.elektron.studio" target="_blank">
          <Button>Go to virtual stage</Button>
        </a>
      </Card>
    </div>
  </div>
</template>
