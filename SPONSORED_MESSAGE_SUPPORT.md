# SponsoredMessage Support in mtcute

This document confirms that SponsoredMessage support has been added to mtcute.

## ✅ Completed Changes

### 1. Schema Support (api-schema.json)
All required TL types are present in the schema:

- **sponsoredMessage** (0x7dbf8673)
  - Type: `SponsoredMessage`
  - Fields: flags, recommended, can_report, random_id, url, title, message, entities, photo, media, color, button_text, sponsor_info, additional_info, min_display_duration, max_display_duration

- **messages.sponsoredMessages** (0xffda656d)
  - Type: `messages.SponsoredMessages`
  - Fields: flags, posts_between, start_delay, between_delay, messages, chats, users

- **messages.sponsoredMessagesEmpty** (0x1839490f)
  - Type: `messages.SponsoredMessages`
  - No fields (empty response)

### 2. Compatibility Layer (compat.tl)
The types have been added to the compatibility layer for Layer 218, ensuring backward compatibility.

### 3. Related Methods
The schema also includes related methods for working with sponsored messages:
- `account.toggleSponsoredMessages` - Toggle sponsored messages on/off
- `contacts.getSponsoredPeers` - Get sponsored peers
- `messages.viewSponsoredMessage` - Mark a sponsored message as viewed
- `messages.clickSponsoredMessage` - Track clicks on sponsored messages
- `messages.reportSponsoredMessage` - Report a sponsored message
- `messages.getSponsoredMessages` - Get sponsored messages for a channel

## Usage (After Build)

Once the TypeScript types are generated, the types will be available as:

```typescript
import { tl } from '@mtcute/tl'

// Using the types
type SponsoredMessage = tl.RawSponsoredMessage
type SponsoredMessages = tl.messages.RawSponsoredMessages | tl.messages.RawSponsoredMessagesEmpty

// Example usage with client
const sponsoredMessages = await client.call({
  _: 'messages.getSponsoredMessages',
  channel: channelPeer
})

if (sponsoredMessages._ === 'messages.sponsoredMessages') {
  for (const msg of sponsoredMessages.messages) {
    console.log('Sponsored:', msg.title, msg.message)
  }
}
```

## Build Instructions

To generate the TypeScript types and binary serialization code, run:

```bash
cd packages/tl
pnpm run gen-code
```

This will generate:
- `index.d.ts` - TypeScript type definitions
- `binary/reader.js` - Binary deserialization code
- `binary/writer.js` - Binary serialization code

## Verification

The schema changes have been verified and committed. All required types are present and ready for code generation.
