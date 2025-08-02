async function initAddon() {
  try {
    const session = await google.meet.addons.createAddonSession();

    const metadataEl = document.getElementById('metadata');
    const meeting = session.meeting || session.meetingSpace || {};
    metadataEl.textContent = 'Meeting metadata:\n' + JSON.stringify(meeting, null, 2);

    const userInfoEl = document.getElementById('userinfo');
    const user = session.currentUser || session.currentParticipant || {};
    if (user.displayName) {
      userInfoEl.textContent = `Signed in as ${user.displayName}`;
    } else if (user.person && user.person.displayName) {
      userInfoEl.textContent = `Signed in as ${user.person.displayName}`;
    } else {
      userInfoEl.textContent = 'User information unavailable';
    }
  } catch (err) {
    console.error('Failed to initialize add-on', err);
    const metadataEl = document.getElementById('metadata');
    if (metadataEl) {
      metadataEl.textContent = 'Failed to initialize add-on.';
    }
  }
}

google.meet.addons.onLoad(() => {
  initAddon();
});
