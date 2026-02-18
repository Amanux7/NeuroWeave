# A2UI Protocol (Draft)

The Agent-to-UI (A2UI) protocol acts as the bridge between the Logic Layer (Weaver/Agents) and the Presentation Layer (Gemini-UI). 

## Structure
JSON-based stream containing partial UI updates.

```json
{
  "stream_id": "uuid",
  "component": "StatusCard",
  "props": {
    "title": "System Health",
    "status": "Optimal",
    "variant": "success"
  },
  "delta": true
}
```

## Implementation
- **Weaver**: Emits these events via Server-Sent Events (SSE).
- **Gemini-UI**: Consumes via `useStream` hook and maps to Shadcn components.
