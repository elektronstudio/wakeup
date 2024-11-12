<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const { to } = defineProps<{
  to: string;
}>();
</script>

<template>
  <component
    :is="to.startsWith('http') ? 'a' : 'NuxtLink'"
    :href="to.startsWith('http') ? to : undefined"
    :to="!to.startsWith('http') ? to : undefined"
    target="_blank"
  >
    <Card
      v-bind="$attrs"
      class="transition-all hover:border-neutral-600 hover:bg-neutral-900"
    >
      <slot />
    </Card>
  </component>
</template>
