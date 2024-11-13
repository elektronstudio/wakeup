<script setup>
definePageMeta({
  layout: "three",
});

const defaultSettings = {
  materialColor: {
    title: "Material color",
    type: "color",
    value: "#111111",
  },
  lineColor: {
    title: "Line color",
    type: "color",
    value: "#ffffff",
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

const settings = ref(defaultSettings);

const { me, others } = useUsers(
  "WAKEUP_USER",
  {
    settings: defaultUserSettings,
  },
  10
);
</script>

<template>
  <ThreeBackground :color="settings.materialColor.value" />
  <ThreeScene>
    <ThreeLights color="#ffffff" />
    <ThreeGeometry
      :rotation="[-90, 0, 0]"
      geometry="PlaneGeometry"
      :width="50"
      :height="50"
      :color="settings.materialColor.value"
      :lineColor="settings.lineColor.value"
      :receiveShadow="true"
    />
    <three-group :position="[0, settings.panelOffset.value, 0]">
      <three-panels v-slot="{ panel }">
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          :depth="0.05"
          :color="settings.materialColor.value"
          :lineColor="settings.lineColor.value"
          :receiveShadow="true"
        />
        <three-line
          :points="rectPoints(panel.width, 1)"
          :lineColor="settings.lineColor.value"
        />
      </three-panels>
      <ThreeText
        :position="[-1, 1.5, -1]"
        text="elektron"
        anchorX="center"
        anchorY="middle"
        :fontSize="1.25"
        :letterSpacing="-0.01"
        :color="settings.lineColor.value"
      />
    </three-group>
    <three-group
      v-for="user in [me, ...others].map((user) => user.settings)"
      :position="[user.x.value, user.y.value, user.z.value]"
      :rotation="[user.rotX.value, user.rotY.value, user.rotZ.value]"
    >
      <three-geometry
        :color="user.color.value"
        :lineColor="settings.lineColor"
        :width="0.4"
        :depth="0.4"
        :height="2"
        :castShadow="true"
      />
      <three-text
        :text="user.status.value"
        anchorX="left"
        anchorY="middle"
        :fontSize="0.18"
        :color="isLight(user.color.value) ? '#444' : '#ddd'"
        :position="[0, -0.8, 0.22]"
        :rotation="[0, 0, 90]"
      />
    </three-group>
  </ThreeScene>
  <div
    class="fixed top-0 right-0 bottom-0 w-[250px] bg-black/80 bg-blend-darken p-6"
  >
    <Settings2 v-model="settings" />
    <Settings2 v-model="me.settings" />
  </div>
  <!-- <Settings /> -->
</template>
