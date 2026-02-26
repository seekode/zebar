import * as zebar from "https://esm.sh/zebar@2";
import clock from "./clock.js";
import workspace from "./workspace.js";

const providers = zebar.createProviderGroup({
  date: { type: "date", formatting: "cccc dd.MM.yyyy | t" },
  battery: { type: "battery" },
  glazewm: { type: "glazewm" },
});

const pauseButton = document.getElementById("paused");
const tilingDirection = document.getElementById("tiling-direction");

const batteryContainer = document.getElementById("battery-container");
const battery = document.getElementById("battery");
const batteryCharge = document.getElementById("battery-charge");

providers.onOutput(() => {
  const output = providers.outputMap;
  output.glazewm.isPaused
    ? pauseButton.classList.add("active")
    : pauseButton.classList.remove("active");

  output.glazewm.tilingDirection === "vertical"
    ? tilingDirection.classList.add("vertical")
    : tilingDirection.classList.remove("vertical");

  if (output.battery) {
    batteryContainer.style.display = "flex";
    const percent = output.battery.chargePercent;

    battery.style.width = `${percent}%`;

    // Calculate color based on battery percentage (red at 0%, green at 100%)
    const red = Math.round(255 * (1 - percent / 100));
    const green = Math.round(255 * (percent / 100));
    battery.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

    if (output.battery.isCharging) {
      batteryCharge.classList.add("active");
    } else {
      batteryCharge.classList.remove("active");
    }
  }

  clock();
  workspace(output.glazewm);
});

// actions
pauseButton.addEventListener("click", () => {
  providers.outputMap.glazewm.runCommand("wm-toggle-pause");
});

tilingDirection.addEventListener("click", () => {
  providers.outputMap.glazewm.runCommand("toggle-tiling-direction");
});
