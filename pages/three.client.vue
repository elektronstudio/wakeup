<template>
  <ThreeScene>
    <ThreeLights />
    <ThreeGeometry
      :rotation="[-90, 0, 0]"
      geometry="PlaneGeometry"
      :width="50"
      :height="50"
      color="#111111"
      lineColor="#FFFFFF"
      :receiveShadow="true"
    />
    <three-group :position="[0, 0, 0]">
      <three-panels v-slot="{ panel }">
        <three-geometry
          geometry="PlaneGeometry"
          :width="panel.width"
          depth="0.05"
          color="#111111"
          lineColor="#FFFFFF"
          :receiveShadow="true"
        />
        <three-line :points="rectPoints(panel.width, 1)" lineColor="#FFFFFF" />
      </three-panels>
      <ThreeText
        :position="[-1, 1.5, -1]"
        text="elektron"
        anchorX="center"
        anchorY="middle"
        fontSize="1.25"
        letterSpacing="-0.01"
        color="#FFFFFF"
      />
    </three-group>
  </ThreeScene>
</template>
