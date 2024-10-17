<script setup lang="ts">

const {
    to = undefined,
} = defineProps<{
    to?: string;
}>();

</script>

<template>
    <NuxtLink :to="to"
        class="cursor-pointer py-1 px-3 items-center gap-1 rounded border border-gray-50 bg-black/90 font-mono text-sm uppercase text-gray-300 transition-colors hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-20 inline-block">
        <div class="translate-y-[0.05rem]">
            <slot />
        </div>
    </NuxtLink>
</template>