<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: Record<string, any>;
}>();
const emit = defineEmits(["update:modelValue"]);

const settings = useVModel(props, "modelValue", emit);
</script>

<template>
  <div class="flex flex-col gap-3 text-neutral-300 text-sm">
    <div v-for="setting in settings">
      <div v-if="setting.type === 'color'" class="flex flex-col gap-2">
        <label class="">{{ setting.title }}</label>
        <input type="color" v-model="setting.value" />
      </div>
      <div v-if="setting.type === 'textarea'" class="flex flex-col gap-2">
        <label>{{ setting.title }} {{ setting.value }}</label>
        <textarea v-model="setting.value" />
      </div>
      <div v-if="setting.type === 'range'" class="flex flex-col gap-2">
        <label>{{ setting.title }} {{ setting.value }}</label>
        <input
          type="range"
          v-model.number="setting.value"
          :min="setting.min"
          :max="setting.max"
          :step="setting.step"
        />
      </div>
    </div>
  </div>
</template>
