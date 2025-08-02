// Assumes @googleworkspace/meet-addons is loaded globally (via <script> tag or similar)
// and exposes 'meet' on window.

const CLOUD_PROJECT_NUMBER = "793951466229";

window.setUpAddon = async function () {
  if (!window.meet) {
    console.error("Google Meet Add-ons SDK not loaded.");
    return;
  }
  const session = await window.meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  const sidePanelClient = await session.createSidePanelClient();
  // Auto-execute activity logic on add-on load
  let userInfo;
  try {
    userInfo = session.user;
    console.log("Current user info:", userInfo);
  } catch (e) {
    console.error("Failed to get user info:", e);
  }

  // Call localhost service on port 5000
  try {
    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    });
    console.log("Request sent to localhost:5000");
  } catch (err) {
    console.error("Failed to call localhost service:", err);
  }
};
