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
        <input
          type="color"
          v-model="setting.value"
          class="ring-2 ring-white appearance-none h-4 w-full rounded [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
        />
      </div>
      <div v-if="setting.type === 'textarea'" class="flex flex-col gap-2">
        <label>{{ setting.title }}</label>
        <textarea
          v-model="setting.value"
          class="bg-black border-2 rounded px-2 py-1 outline-none"
        />
      </div>
      <div v-if="setting.type === 'range'" class="flex flex-col gap-2">
        <label>{{ setting.title }}</label>
        <input
          type="range"
          v-model.number="setting.value"
          :min="setting.min"
          :max="setting.max"
          :step="setting.step"
          class="accent-neutral-300 block w-full bg-white h-[2px] relative outline-none my-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:bg-gray-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full"
        />
      </div>
    </div>
  </div>
</template>
