/**
 * Example: Working with Sponsored Messages in mtcute
 * 
 * This example demonstrates how to use the SponsoredMessage types.
 * NOTE: Replace 'example_channel' with an actual channel username.
 */

import { TelegramClient } from '@mtcute/node'

const client = new TelegramClient({
  apiId: Number.parseInt(process.env.API_ID!),
  apiHash: process.env.API_HASH!,
  storage: 'my-session'
})

async function getSponsoredMessages(channelUsername: string) {
  const channel = await client.resolvePeer(channelUsername)
  
  if (channel._ !== 'inputPeerChannel') {
    throw new Error('Not a channel')
  }

  const result = await client.call({
    _: 'messages.getSponsoredMessages',
    channel: {
      _: 'inputChannel',
      channelId: channel.channelId,
      accessHash: channel.accessHash
    }
  })

  if (result._ === 'messages.sponsoredMessagesEmpty') {
    console.log('No sponsored messages available')
    return
  }

  console.log(`Found ${result.messages.length} sponsored messages`)
  
  for (const msg of result.messages) {
    console.log(`\nSponsored Message:`)
    console.log(`  Title: ${msg.title}`)
    console.log(`  Message: ${msg.message}`)
    console.log(`  URL: ${msg.url}`)
    console.log(`  Button: ${msg.buttonText}`)
  }

  return result
}

async function main() {
  await client.start()
  await getSponsoredMessages('example_channel')
  await client.close()
}

main().catch(console.error)
