// Assumes @googleworkspace/meet-addons is loaded globally (via <script> tag or similar)
// and exposes 'meet' on window.

const CLOUD_PROJECT_NUMBER = "793951466229";
const MAIN_STAGE_URL = "MAIN_STAGE_URL";

window.setUpAddon = async function () {
  if (!window.meet) {
    console.error("Google Meet Add-ons SDK not loaded.");
    return;
  }
  const session = await window.meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  const sidePanelClient = await session.createSidePanelClient();
  document
    .getElementById("start-activity")
    .addEventListener("click", async () => {
      await sidePanelClient.startActivity({
        mainStageUrl: MAIN_STAGE_URL,
      });
    });
};
