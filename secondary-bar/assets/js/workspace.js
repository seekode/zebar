const nav = document.getElementById("nav");
const selector = document.getElementById("selector");
let oldDisplayedWorkspacesId = null;
// button html of each workspace
let currentButtons = [];

export default (glazewm) => {
  // prevent rebuild if the displayed workspace didn't change
  if (oldDisplayedWorkspacesId == glazewm.displayedWorkspace.id) return;

  let currentIds = [];
  let activeButton = null;

  glazewm.currentWorkspaces.map((ws) => {
    currentIds.push(ws.id);
    const currentButton = currentButtons.find((btn) => btn.id == ws.id);
    // if the button already exist, just update the active state
    if (currentButton) {
      if (ws.isDisplayed) {
        activeButton = currentButton;
        oldDisplayedWorkspacesId = ws.id;
        currentButton.classList.add("active");
      } else {
        currentButton.classList.remove("active");
      }

      // else create the button and set the active state
    } else {
      const button = document.createElement("button");
      button.id = ws.id;
      if (ws.isDisplayed) {
        activeButton = button;
        oldDisplayedWorkspacesId = ws.id;
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
      button.innerText = ws.displayName ?? ws.name;

      button.addEventListener("click", () => {
        glazewm.runCommand(`focus --workspace ${ws.name}`);
      });

      nav.appendChild(button);
      currentButtons.push(button);
    }
  });

  // delete every button that workspace doesn't exist anymore
  currentButtons = currentButtons.filter((btn) => {
    if (!currentIds.includes(btn.id)) {
      btn.remove();
      return false;
    }
    return true;
  });

  // move the selector to the active button
  if (activeButton) {
    selector.style.width = `${activeButton.offsetWidth + 7.5}px`;
    selector.style.transform = `translateX(${activeButton.offsetLeft}px)  scale(1.1)`;
  }
};
