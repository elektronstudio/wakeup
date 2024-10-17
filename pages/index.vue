<script setup lang="ts">
import LinkCard from '~/components/LinkCard.vue';
</script>

<template>
    <div class="flex flex-col gap-4 items-start">
        <Heading>WAKE UP!</Heading>
        <Heading>Reviving eˉlektron's collaborative visual and sound experiments.</Heading>
        <p class="w-[60ch] text-gray-400">From 2021 to 2023, the eˉlektron artist collective hosted a series of online
            experiments,
            residencies, and performances, focusing on the collaborative nature of performative arts.</p>
        <p class="w-[60ch]  text-gray-400">After being offline for several years, these projects are being revived in
            late 2024, with
            the original creators updating the code and systems to make them accessible to the public once again.</p>
        <LinkCard to="/ws">
            <div>Websocket test</div>
            <div class="text-gray-500">Testing basic infrastructure</div>
        </LinkCard>
        <Breadboard />
    </div>
</template>
