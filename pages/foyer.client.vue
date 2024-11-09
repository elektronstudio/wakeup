<script setup>
definePageMeta({
  layout: "three",
});
</script>

<template>
  <ThreeBackground :color="settings.materialColor" />
  <ThreeScene>
    <ThreeLights :color="settings.lightColor" />
    <ThreeGeometry
      :rotation="[-90, 0, 0]"
      geometry="PlaneGeometry"
      :width="50"
      :height="50"
      :color="settings.materialColor"
      :lineColor="settings.lineColor"
      :receiveShadow="true"
    />
    <three-group :position="[0, settings.panelOffset, 0]">
      <three-panels v-slot="{ panel }">
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          depth="0.05"
          :color="settings.materialColor"
          :lineColor="settings.lineColor"
          :receiveShadow="true"
        />
        <three-line
          :points="rectPoints(panel.width, 1)"
          :lineColor="settings.lineColor"
        />
      </three-panels>
      <ThreeText
        :position="[-1, 1.5, -1]"
        text="elektron"
        anchorX="center"
        anchorY="middle"
        fontSize="1.25"
        letterSpacing="-0.01"
        :color="settings.lineColor"
      />
    </three-group>
  </ThreeScene>
  <Settings />
</template>
