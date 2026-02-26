import * as zebar from "https://esm.sh/zebar@2";
import workspace from "./workspace.js";

const providers = zebar.createProviderGroup({
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
