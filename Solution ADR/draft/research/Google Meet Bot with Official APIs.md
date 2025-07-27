The recommended way to build a Google Meet bot (one that can join meetings and detect participant join/leave events) is to use Google’s official Meet and Workspace APIs. In particular, the Google Meet REST API (for creating/managing meeting spaces and listing participants) and the Google Workspace Events API (for real-time notifications via Google Cloud Pub/Sub) provide the needed capabilities
developers.google.com
workspaceupdates.googleblog.com
. In practice, you would create a service account (with domain-wide delegation) in the company’s Google Workspace, grant it access to the Meet API and Events API scopes, and then either invite that bot account to meetings or have it create/join meetings via the API.
Google Meet REST API: The Meet API lets you programmatically create or retrieve meetings (conferenceRecords), and list participants and their sessions. For example, you can call ConferenceRecordsService.listParticipants() on an active meeting to get each participant’s name and join/leave timestamps
developers.google.com
developers.google.com
. (Filtering by latestEndTime IS NULL returns currently active participants
developers.google.com
developers.google.com
.) This API is officially supported and generally available for Google Workspace accounts
workspaceupdates.googleblog.com
. It is also how the bot can pre-configure meetings or generate join links if needed.
Google Workspace Events API (Meet events): To track join/leave in near real time, use the Workspace Events API. You create a subscription (on a meeting space or on a user) specifying the meet event types you care about. Supported event types include google.workspace.meet.participant.v2.joined and ...left
developers.google.com
. When an event occurs, Google pushes a CloudEvent (to your specified Pub/Sub topic) with the participant session resource name. For example, when someone joins a meeting, you’ll receive a participantSession resource path, which you can then resolve using the Meet API. By subscribing on the bot’s user account (or on specific meeting spaces), the bot will get events for every meeting it’s in (even concurrently) and can thus detect joins/leaves with only a few seconds’ delay
developers.google.com
workspaceupdates.googleblog.com
.
People API (get email addresses): The Meet APIs return participants by ID (e.g. a conferenceRecords/…/participants/{userId} string). To identify each user by email, call the Google People API using that ID. As documented, the trailing number in the participant resource is the Person ID for People API lookup. For example, if the participant resource is conferenceRecords/xyz/participants/12345, then 12345 is the People ID. You can call people.get with personFields=names,emailAddresses to retrieve the participant’s name and email (if available)
developers.google.com
. (Be aware of privacy: profile info may not be available for all participants, especially external guests
developers.google.com
.) In short, the sequence is: on a join/leave event, extract the user’s People ID from the event data, then use the People API to get their email address.
Authentication and Security: Use a Google Cloud service account with domain-wide delegation so it can impersonate users in the Workspace without manual consent for each user
developers.google.com
. Enable the Meet API and Workspace Events API in Google Cloud, and grant the service account the needed OAuth scopes (Meet API scope, Workspace Events scope, and People API scope). The bot’s credentials should be securely stored (e.g. via Application Default Credentials or key files). All communication is over Google’s secured HTTPS endpoints. Importantly, this approach uses only official APIs, so there is no need for screen-scraping or other unsupported hacks, and it complies with Google’s terms
developers.google.com
workspaceupdates.googleblog.com
.
Concurrent meetings and real-time: Because events are pushed via Cloud Pub/Sub, the bot can handle many meetings at once. You can either create one subscription for each meeting space or subscribe to the user (the bot account) so that all events for meetings it participates in are delivered to the same Pub/Sub topic. Your service (in any language with Google API client libraries) can consume these events in parallel. This yields effectively real-time tracking of participants (usually within seconds). As a backup or supplement, the bot can also poll the Meet API every 30–60 seconds to reconcile participant lists (using filters like latestEndTime IS NULL to detect active users
developers.google.com
developers.google.com
).
Implementation overview: The bot runs in Google Cloud (or any server) and does the following. First, it sets up a Pub/Sub topic and subscription, granting publish rights to meet-api-event-push@system.gserviceaccount.com
developers.google.com
. Then it creates a Google Workspace Events subscription (using the Events REST API) targeting either the meeting’s spaces/… ID or the bot’s //cloudidentity.googleapis.com/users/ ID, listing event types for conference start/end and participant join/leave
developers.google.com
. Once subscribed, Google will send CloudEvents to your Pub/Sub whenever someone joins or leaves. The bot’s code receives each event, uses the Meet REST API to get participant details or participantSessions for that conference record, and then calls the People API to resolve user IDs to emails
developers.google.com
. All participants will appear as a signedInUser in the Meet API, whose ID can be translated to an email address. Privacy and compliance: Because the bot runs under the company’s Workspace account, it only sees data for meetings the company has access to. Google’s APIs enforce permissions: for example, you can only retrieve info about participants in your organization (and external participants only if profile info is shared)
developers.google.com
. Per Google’s documentation, the Meet API should not be used for employee evaluation or unauthorized data collection
developers.google.com
. As long as the bot only tracks join/leave times for authorized meetings and uses APIs as intended, it complies with Google’s privacy and license policies. The bot should request only the minimum OAuth scopes needed and follow best practices (secure storage of credentials, least privilege, etc.). Key steps (example): In practice, one would:
Enable APIs & create credentials: In Google Cloud Console, enable the Google Meet API, Google Workspace Events API, and People API. Create a service account with domain-wide delegation and grant it the required scopes
developers.google.com
developers.google.com
.
Set up Pub/Sub: In the Cloud project, create a Pub/Sub topic (e.g. workspace-events) and give publish permission to meet-api-event-push@system.gserviceaccount.com
developers.google.com
. Create a subscription to consume messages.
Create Meet event subscription: Use the Workspace Events API to create a subscription with targetResource set to the meeting space or user, and eventTypes including participant.v2.joined and participant.v2.left
developers.google.com
. Point its notificationEndpoint.pubsubTopic to your topic.
Handle events: Write code (e.g. in Python or Node.js) that listens to the Pub/Sub subscription. For each event (join/leave), parse the participantSession name, then call the Meet API to getParticipantSession or listParticipants to fetch details. Extract the user ID (from user.user or the path), and call People API to get names,emailAddresses for that ID
developers.google.com
.
Track state: Maintain an in-memory or database record of who is in each meeting and when they joined/left. Update this record in real time. Use this to generate attendance logs or trigger other business logic.
All of these steps use supported Google APIs and services. By leveraging the Google Meet REST API and Workspace Events API, the bot can securely join meetings as a participant (using its Workspace identity) and track attendees by email with only about a one-minute latency, without any unofficial hacks
developers.google.com
developers.google.com
. Sources: Official Google documentation confirms these capabilities: the Meet REST API allows listing participants in real time
developers.google.com
, the Workspace Events API can notify your app when a participant joins or leaves
developers.google.com
, and the People API can map user IDs to email addresses
developers.google.com
. The Google Workspace updates blog also notes that the Meet API (now generally available) supports exactly these use cases
workspaceupdates.googleblog.com
. By following those docs and setting up proper OAuth, you can build a compliant, secure Meet bot as described.