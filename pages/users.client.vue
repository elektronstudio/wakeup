<script setup lang="ts">
const { me, others } = useUsers("WAKEUP_USER", { x: 0, y: 0, status: "" });
const el = ref<HTMLElement | null>(null);

const { centerX, centerY } = useWindowCenter();

const { x, y } = useDraggable(el, {
  initialValue: {
    x: centerX.value - me.value.x,
    y: centerY.value - me.value.y,
  },
});

watch([x, y], () => {
  me.value.x = x.value;
  me.value.y = y.value;
});

const textareaClass =
  "tracking-loose mt-[7px] w-32 h-64 border-none p-0 resize-none outline-none text-white text-sm bg-transparent leading-tight";
</script>

<template>
  <div class="fixed left-4 top-4 pointer-events-none select-none opacity-50">
    <pre>{{ { me, others } }}</pre>
  </div>
  <div
    v-for="other in others"
    :key="other.userId"
    :style="{ left: other.x + 'px', top: other.y + 'px' }"
    class="fixed transition-all duration-500 ease-in-out flex gap-2"
  >
    <Dot class="text-blue-500/90" />
    <textarea
      v-model="other.status"
      :class="textareaClass + ' opacity-50 pointer-events-none'"
      readonly
    />
  </div>
  <div
    ref="el"
    :style="{ left: x + 'px', top: y + 'px' }"
    class="fixed flex gap-2 select-none touch-none cursor-grab"
  >
    <Dot class="text-red-500/90" />
    <textarea v-model="me.status" :class="textareaClass" />
  </div>
</template>
