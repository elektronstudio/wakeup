<template>
  <div
    class="cursor-pointer py-1 px-3 items-center gap-1 rounded border border-[#7bef87] bg-[#7bef87] font-mono text-sm uppercase text-black transition-all hover:brightness-90 disabled:pointer-events-none disabled:opacity-20 inline-block"
  >
    <div class="translate-y-[0.05rem]">
      <slot />
    </div>
  </div>
</template>
