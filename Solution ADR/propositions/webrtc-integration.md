# Option 3 – WebRTC Integration
Status: Proposed

**Description:**  
Use Google's Meet Media API with WebRTC protocols to monitor participant streams via CSRC (Contributing Source) tracking. Each participant gets a unique identifier that remains constant during their session, enabling real-time join/leave detection through direct WebRTC connection monitoring.

**Assumptions & Constraints:** 
- ALL participants must be enrolled in Google's Developer Preview Program
- Participants can revoke consent at any time, terminating monitoring
- Requires custom libwebrtc implementation (no SDK provided)
- Must use libwebrtc within 12 months of latest stable Chromium release
- Limited to allowlisted vendors for production "Bots on Demand" API access

**High level design:**  
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Google Meet   │───▶│  WebRTC Media   │───▶│   Bot Client    │
│   Conference    │    │  API (CSRC)      │    │   (libwebrtc)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Configured    │◀───│  Event Processor │◀───│   Participant   │
│   Endpoint      │    │  Service         │    │   Detector      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

**Architecture Components:**
- **WebRTC Media API Integration**: Direct connection to Google Meet conferences
- **CSRC Monitoring Service**: Tracks unique participant identifiers in real-time
- **Custom libwebrtc Implementation**: Full WebRTC stack with codec negotiation
- **Event Processing Pipeline**: Converts CSRC events to attendance records
- **Fallback Browser Automation**: Puppeteer/Selenium alternative approach

**Pros:**  
- ✅ Direct API access to Google Meet data (official Google API)
- ✅ Real-time participant detection with minimal latency
- ✅ Precise participant tracking with unique CSRC identifiers
- ✅ No DOM scraping or UI dependency (API-based approach)
- ✅ Potential for high accuracy in participant event detection

**Cons:**  
- ❌ **Critical Limitation**: ALL participants must be enrolled in Developer Preview Program
- ❌ Participants can revoke consent at any time, breaking the entire system
- ❌ No SDK provided - requires implementing full WebRTC stack from scratch
- ❌ Complex technical implementation with libwebrtc library requirements
- ❌ Production use restricted to allowlisted vendors only
- ❌ Google explicitly prohibits Meet APIs for performance tracking/user evaluation
- ❌ Not suitable for enterprise deployment due to participant requirements
- ❌ High technical complexity with limited documentation and examples

**Extra Costs:**  
- **Development Costs**: $20,000-35,000 (custom WebRTC implementation)
- **Google Cloud Infrastructure**: $200-500/month (compute resources for WebRTC processing)
- **API Usage Fees**: $100-300/month (Meet Media API calls)
- **Specialized Development Resources**: $150-200/hour for WebRTC expertise
- **Ongoing Maintenance**: $2,000-5,000/month (specialized support)
- **Total Estimated**: $3,000-8,000/month operational costs

**Risks & Mitigations:**  
- **Developer Preview Dependency**: No viable mitigation - fundamental limitation
- **Consent Revocation**: No recovery mechanism available - system breaks permanently
- **API Restrictions**: Google's usage policies prohibit this use case
- **Technical Complexity**: Requires rare WebRTC expertise and extensive testing
- **Vendor Allowlisting**: Production deployment impossible without Google approval
- **Policy Violations**: Risk of API access revocation for non-compliant usage

**Resources:**
- [Google Meet Media API Documentation](https://developers.google.com/workspace/meet/media)
- [WebRTC libwebrtc Documentation](https://webrtc.org/native-code/native-apis/)
- [Google Meet API Usage Policies](https://developers.google.com/workspace/meet/policies)
- [Chrome WebRTC Implementation Guide](https://chromium.googlesource.com/external/webrtc/)
