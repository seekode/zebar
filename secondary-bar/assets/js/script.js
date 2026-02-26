import * as zebar from "https://esm.sh/zebar@2";
import workspace from "./workspace.js";

const providers = zebar.createProviderGroup({
  network: { type: "network" },
  cpu: { type: "cpu" },
  date: { type: "date", formatting: "cccc dd.MM.yyyy | t" },
  battery: { type: "battery" },
  memory: { type: "memory" },
  weather: { type: "weather" },
  glazewm: { type: "glazewm" },
});

const pauseButton = document.getElementById("paused");

providers.onOutput(() => {
  const output = providers.outputMap;
  output.glazewm.isPaused
    ? pauseButton.classList.add("active")
    : pauseButton.classList.remove("active");

  workspace(output.glazewm);
});

// actions
pauseButton.addEventListener("click", () => {
  providers.outputMap.glazewm.runCommand("wm-toggle-pause");
});
