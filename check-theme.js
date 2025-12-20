try {
  const theme = require("@heroui/theme");
  console.log("Theme keys:", Object.keys(theme));
} catch (e) {
  console.log("Error loading theme:", e.message);
}

try {
  const plugin = require("@heroui/theme/plugin");
  console.log("Plugin export type:", typeof plugin);
  console.log("Plugin keys:", Object.keys(plugin));
  if (typeof plugin === "function") console.log("Plugin is a function");
} catch (e) {
  console.log("Error loading plugin:", e.message);
}
