<script setup lang="ts">
const defaultGlobalSettings = {
  lightColor: {
    title: "Light color",
    type: "color",
    value: "#ffffff",
  },
  materialColor: {
    title: "Material color",
    type: "color",
    value: "#111111",
  },
  panelOffset: {
    title: "Panel offset",
    type: "range",
    value: 0,
    min: -5,
    max: 0,
    step: 0.01,
  },
};

const globalSettings = ref(defaultGlobalSettings);

const defaultUserSettings = {
  color: {
    title: "My color",
    type: "color",
    value: randomHexColor(),
  },
  status: {
    title: "My name and status",
    type: "textarea",
    value: "Hello",
  },
  x: {
    title: "My X coordinate",
    type: "range",
    value: trunc(random(-3, 2), 1),
    min: -3,
    max: 2,
    step: 0.01,
  },
  y: {
    title: "My Y coordinate",
    type: "range",
    value: 1,
    min: 1,
    max: 3,
    step: 0.01,
  },
  z: {
    title: "My Z coordinate",
    type: "range",
    value: trunc(random(4, 10), 1),
    min: 4,
    max: 10,
    step: 0.01,
  },
  rotX: {
    title: "My X rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
  rotY: {
    title: "My Y rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
  rotZ: {
    title: "My Z rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
};
const { me, others } = useUsers("WAKEUP_USER", {
  x: 0,
  y: 0,
  settings: defaultUserSettings,
});
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
  <div class="fixed left-4 top-4">
    <Settings2 v-model="globalSettings" />
    <Settings2 v-model="me.settings" />
    <pre>{{ { globalSettings, me, others } }}</pre>
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
    class="fixed flex gap-2 select-none touch-none cursor-move"
  >
    <Dot class="text-red-500/90" />
    <textarea v-model="me.status" :class="textareaClass" />
  </div>
</template>
