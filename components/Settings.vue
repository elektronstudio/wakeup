<script setup lang="js">
const settings = useSettings();
const userName = useUserName();
const isOpen = ref(false);
</script>

<template>
  <div
    v-if="isOpen"
    style="
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 300px;
      overflow: auto;
      color: white;
      padding: 32px;
      background: rgba(30, 30, 30, 0.85);
      display: grid;
      grid-auto-rows: max-content;
      gap: 8px;
    "
  >
    <div>Username</div>
    <input type="text" v-model="userName" />

    <template v-for="(value, key, i) in settings" :key="key">
      <div>{{ initialSettings[i].title }}: {{ settings[key] }}</div>
      <textarea
        v-if="initialSettings[i].textarea"
        v-model="settings[key]"
        :rows="initialSettings[i].rows || 2"
      />
      <input
        v-if="!initialSettings[i].textarea"
        :value="settings[key]"
        @input="
          settings[key] = isNaN($event.target.value)
            ? $event.target.value
            : parseFloat($event.target.value)
        "
        :type="initialSettings[i].type"
        :min="initialSettings[i].min ?? 0"
        :max="initialSettings[i].max ?? 100"
        :step="initialSettings[i].step ?? 1"
      />
    </template>
  </div>
  <div
    v-if="isOpen"
    @click="isOpen = false"
    class="fixed top-2 right-2 text-white opacity-50"
  >
    ×
  </div>
  <div
    v-if="!isOpen"
    @click="isOpen = true"
    class="fixed top-2 right-2 text-white opacity-50"
  >
    ≡
  </div>
</template>
