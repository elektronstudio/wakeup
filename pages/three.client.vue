<template>
    <ThreeScene>
        <ThreeLights />
        <ThreeGeometry :rotation="[-90, 0, 0]" geometry="PlaneGeometry" :width="50" :height="50" color="#111111"
            lineColor="#FFFFFF" :receiveShadow="true" />
    </ThreeScene>
</template>