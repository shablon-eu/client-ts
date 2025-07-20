# Shablon Client

[![npm version](https://badge.fury.io/js/@shablon-eu%2Fclient.svg)](https://badge.fury.io/js/@shablon-eu%2Fclient)

Sending emails through shablon.

```ts

import { Client } from '@shablon-eu/client'

const client = new Client('sk_....')

// environment determines if mails are sent
client.setEnvironment('my_env')

// throw an error if the parameters are invalid for the passed templates
client.verifyParameters(true)

try {
  await client.send({
    to: 'somewhere@google.com'
  })
} catch (e) {
  if (e instanceof InvalidParamters) {
    // mandatory paramters are missing OR parameters have invalid content
  }
  if (e instanceof AddressError) {
    // TO / FROM / BCC / CC adresses haven an error
  }
}
```
