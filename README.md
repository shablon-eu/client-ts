# Shablon Client

[![npm version](https://badge.fury.io/js/@shablon-eu%2Fclient.svg)](https://badge.fury.io/js/@shablon-eu%2Fclient)

Sending emails through shablon.

```ts

import { Client } from '@shablon-eu/client'

const client = new Client({
  apiKey: 'sk_....'
})

// environment determines if mails are sent
client.setEnvironment('my_env')

try {
  const {status, id} = await client.send({
    to: 'somewhere@google.com'
  })

  console.log(`current email status is: ${status}`)
  
  await new Promise(resolve => setTimeout(resolve, 10_000))

  // in case you want to check later if the status changed
  const info = await client.status(id)
  
  console.log('updated email status', {
    status: info.status,
    opened: info.openend,
  })
} catch (e) {
  if (e instanceof InvalidParameters) {
    // mandatory paramters are missing OR parameters have invalid content
  }
  if (e instanceof AddressError) {
    // TO / FROM / BCC / CC adresses haven an error
  }
  if (e instanceof TemplateError) {
    // template not found
  }
  if (e instanceof IdempotentError) {
    // idempotency key was already used with different data
  }
  if (e instanceof EnvironmentError) {
    // cannot find the environment
  }
}
```
