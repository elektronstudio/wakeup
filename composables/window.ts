export const useWindowCenter = () => {
  const { width, height } = useWindowSize();
  const centerX = computed(() => width.value / 2);
  const centerY = computed(() => height.value / 2);
  return { width, height, centerX, centerY };
};
