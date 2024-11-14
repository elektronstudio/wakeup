<script setup lang="ts">
import {
  useCollider,
  type ColliderBody,
  type ColliderCircle,
} from "~/composables/collider";

const { width, height, centerX, centerY } = useWindowCenter();

const { x: defaultX, y: defaultY } = randomCollider(
  { x: 0, y: 0, r: 15, type: "circle" },
  [{ x: 0, y: 0, r: 100, type: "circle" }],
  width.value / 2,
  height.value / 2
);

console.log({ defaultX, defaultX2: defaultX - centerX.value, defaultY });

const { me, others } = useUsers("WAKEUP_USER", {
  x: defaultX - centerX.value,
  y: defaultY - centerY.value,
  colliding: false,
  status: "",
});

const el = ref<HTMLElement | null>(null);

const { x, y } = useDraggable(el, {
  initialValue: {
    x: centerX.value - me.value.x,
    y: centerY.value - me.value.y,
  },
});

watch([x, y], () => {
  me.value.x = x.value - centerX.value;
  me.value.y = y.value - centerY.value;
});

const body = computed<ColliderCircle>(() => {
  return { x: me.value.x, y: me.value.y, r: 15, type: "circle" };
});
const bodies = ref<ColliderBody[]>([
  { x: 0, y: 0, r: 100, type: "circle", audio: new Audio("/fertility.mp3") },
]);
const { colliding, collidingBodies } = useCollider(body, bodies);

watchEffect(() => (me.value.colliding = colliding.value));

watchEffect(() => {
  collidingBodies.value.forEach((body) => {
    if (body.type === "circle" && body.audio) {
      if (body.colliding) {
        body.audio.play();
      } else {
        body.audio.pause();
      }
    }
  });
});

const viewBox = computed(
  () =>
    `-${width.value / 2} -${height.value / 2} ${width.value} ${height.value}`
);

const textareaClass =
  "duration-500 tracking-loose mt-[7px] w-32 h-64 border-none p-0 resize-none outline-none text-white text-sm bg-transparent leading-tight";
</script>

<template>
  <svg class="fixed pointer-events-none w-full h-full" :viewBox="viewBox">
    <g v-for="body in collidingBodies">
      <circle
        v-if="body.type === 'circle'"
        :cx="body.x"
        :cy="body.y"
        :r="body.r"
        :class="body.colliding ? 'stroke-red-500/60' : 'stroke-neutral-500'"
        stroke-width="2"
        fill="none"
        class="transition-all duration-500"
      />
    </g>
  </svg>
  <div class="fixed left-4 top-4 pointer-events-none select-none opacity-50">
    <pre>{{ { collidingBodies, colliding, me, others } }}</pre>
  </div>
  <div
    v-for="other in others"
    :key="other.userId"
    :style="{ left: other.x + centerX + 'px', top: other.y + centerY + 'px' }"
    class="fixed transition-all duration-500 ease-in-out flex gap-2"
  >
    <Dot
      class="transition-all duration-500"
      :class="other.colliding ? 'text-blue-500/60' : 'text-blue-500/90'"
    />
    <textarea
      v-model="other.status"
      readonly
      :class="[
        other.colliding ? 'opacity-0' : 'opacity-100',
        'pointer-events-none',
        textareaClass,
      ]"
    />
  </div>
  <div
    ref="el"
    :style="{ left: x + 'px', top: y + 'px' }"
    class="fixed flex gap-2 select-none touch-none cursor-grab"
  >
    <Dot
      class="transition-all duration-500"
      :class="me.colliding ? 'text-red-500/60' : 'text-red-500/90'"
    />
    <textarea
      v-model="me.status"
      :class="[me.colliding ? 'opacity-0' : 'opacity-100', textareaClass]"
      :readonly="me.colliding"
    />
  </div>
</template>
