1. Google Meet SDK / REST APIs (Google‑supported)
Google now offers official developer tools for Meet integrations:

Meet SDK and REST API: lets you create/manage Meet sessions and embed apps/add‑ons within Meet.

Meet Media API (Developer Preview): provides real‑time access to audio/video streams during meetings 
Google Workspace
+10
Google for Developers
+10
screenapp.io
+10
.

⚠️ However, these APIs don’t directly let you auto‑join a meeting as a bot participant.

🔁 Third‑Party & Open‑Source Meeting Bots
While Google doesn’t officially support auto‑join bots, here are actionable alternatives:

• Recall.ai
Provides prebuilt Meeting Bot service that can join Google Meet sessions using authenticated Google accounts ("signed‑in" bots) 
docs.recall.ai
.

Supports real‑time attendance events, screen sharing detection, transcripts, and more — without building your own browser automation 
recall.ai
.

• ScreenApp Meeting Bot (open‑source, MIT license)
Released in April 2025, offering production‑ready meeting bot that auto‑joins Google Meet, records audio/video, extracts live media or transcripts, and includes AI insights and note/summary generation 
GitHub
+7
screenapp.io
+7
Reddit
+7
.

Self‑hosted via Docker, no expensive verification like Google’s $15k+ scope review needed. Real‑time events and recordings are available immediately 
screenapp.io
+1
recall.ai
+1
.

• DIY Browser Automation / Puppeteer Bots
Projects like balena‑io’s Meetbot (now archived) used Puppeteer to join meetings, fetch captions, record chats and audio, and export transcripts, all by automating a headless browser 
GitHub
.

Recent blog guides show how to build similar bots with Selenium + Chrome‑driver, PulseAudio, DOM scraping, etc. for transcription and recording 
Reddit
+6
gladia.io
+6
recall.ai
+6
.

📊 Comparison Overview
Solution	Auto‑join Bot	Authentication	Recording / Transcription	Self‑hosted	Notes
Google Meet APIs	❌	OAuth2 (user)	No	✅	Official APIs, limited features
Recall.ai	✅	Google account	✅	❌ (cloud)	Commercial, managed bot service
ScreenApp bot (2025)	✅	Token‑based	✅ (audio/video, AI insights)	✅	Open‑source, self‑hosted
DIY Puppeteer / Selenium	✅	User Google login	✅ (via scraping)	✅	Requires custom build & maintenance

✅ Recommended Options
A) Use a managed bot service: Recall.ai
Easiest setup. Provide your Google Workspace credentials (via their Login Groups), configure bots, and they can auto-join meetings, capture audio/video, transcripts, attendance, etc. 
airslate.com
+12
docs.recall.ai
+12
Google for Developers
+12
workspaceupdates.googleblog.com
+3
screenapp.io
+3
Reddit
+3
workspaceupdates.googleblog.com
+2
googlecloudcommunity.com
+2
Reddit
+2
recall.ai
+1
Reddit
+1
.

B) Deploy the open‑source ScreenApp Meeting Bot
Quick deployment via Docker or Node.js; built-in capabilities for joining, recording, live transcription, and AI note-taking; MIT license and full control over your data 
screenapp.io
recall.ai
.

ℹ️ Important Notes
Google Meet doesn’t officially support bots that auto‑join as participants. Most solutions rely on workaround flows (browser automation or 3rd-party APIs).

You may need to use a Google Workspace paid tier for certain features (e.g. creating scheduled meetings via API, attendance reporting) 
recall.ai
Google for Developers
.

Consider privacy and compliance: self‑hosting (like ScreenApp) gives you full control; managed services may store data on their infrastructure.

🧭 Next Steps
Decide if you want a managed service or self-hosted solution.

If you prefer managed: evaluate Recall.ai for streamlined onboarding and minimal setup.

If you prefer self-hosting: check out ScreenApp’s GitHub repo to deploy and customize the bot.

Optional: explore DIY options or fork archived projects like Meetbot if you want to build custom behavior.

Let me know if you'd like step‑by‑step help installing Recall.ai in Workspace or spinning up ScreenApp’s open-source bot!