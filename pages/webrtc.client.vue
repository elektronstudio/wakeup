<script setup lang="ts">
const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);

const { createOffer } = useWebRTC(localVideo, remoteVideo);
</script>

<template>
  <div>
    <video ref="localVideo" autoplay muted></video>
    <video ref="remoteVideo" autoplay></video>
    <button @click="createOffer">Start Call</button>
  </div>
</template>
