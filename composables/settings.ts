const userId = useUserId();

export const initialSettings = [
  {
    user: true,
    key: "userColor",
    title: "User color",
    type: "color",
    value: randomHexColor(),
  },
  {
    user: true,
    key: "userX",
    title: "User X coordinate",
    type: "range",
    value: trunc(random(-3, 2), 1),
    min: -3,
    max: 2,
    step: 0.01,
  },
  {
    user: true,
    key: "userY",
    title: "User Y coordinate",
    type: "range",
    value: 1,
    min: 1,
    max: 3,
    step: 0.01,
  },
  {
    user: true,
    key: "userZ",
    title: "User Z coordinate",
    type: "range",
    value: trunc(random(4, 10), 1),
    min: 4,
    max: 10,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationX",
    title: "User X rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationY",
    title: "User Y rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
  {
    user: true,
    key: "userRotationZ",
    title: "User Z rotation",
    type: "range",
    value: 0,
    min: -90,
    max: 90,
    step: 0.01,
  },
  {
    key: "lightColor",
    title: "Light color",
    type: "color",
    value: "#ffffff",
  },
  {
    key: "materialColor",
    title: "Material color",
    type: "color",
    value: "#111111",
  },
  {
    key: "lineColor",
    title: "Line color",
    type: "color",
    value: "#ffffff",
  },
  {
    key: "panelOffset",
    title: "Panel offset",
    type: "range",
    value: 0,
    min: -5,
    max: 0,
    step: 0.01,
  },
];

export const settings = reactive(
  Object.fromEntries(initialSettings.map(({ key, value }) => [key, value]))
);

export const useSettings = () => {
  const { sendMessage } = useMessages();
  const broadcastSettings = () => {
    sendMessage.value({
      type: "WAKEUP_SETTINGS",
      userId: userId.value,
      value: Object.fromEntries(
        initialSettings
          .filter(({ user }) => user)
          .map(({ key, value }) => [key, settings[key]])
      ),
    });
  };
  const keys = initialSettings.filter(({ user }) => user).map(({ key }) => key);
  watch(
    keys.map((key) => {
      return () => settings[key];
    }),
    throttle(broadcastSettings, 50),
    { immediate: true }
  );
  return settings;
};
