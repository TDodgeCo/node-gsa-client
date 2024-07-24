
# GSA Client

A Node.js client for the GameServerApp API. Includes full type support. Ported from https://github.com/gameserverapp/PHP-API-Wrapper

## Installation

To install the package, use npm:

```bash
npm install node-gsa-client
```

Or with yarn:

```bash
yarn add node-gsa-client
```

## Usage

First, import the `GSAClient` class and create an instance with your `Client ID` and `Client Secret`. You can find those items on your Dashboard's API page: https://dash.gameserverapp.com/configure/api

```typescript
import GSAClient from 'node-gsa-client'

const clientId = 'your-client-id'
const secret = 'your-client-secret'
const client = new GSAClient(clientId, secret)
```

## Error Handling

The client throws `GSAClientException` for any errors encountered during the request. You can catch these errors and handle them appropriately:

```typescript
try {
  const settings = await client.domainSettings()
  console.log(settings)
} catch (error) {
  if (error instanceof GSAClientException) {
    console.error(`Error: ${error.message} (Status: ${error.statusCode})`)
  } else {
    console.error(error)
  }
}
```

### Methods

#### `domainSettings`

Fetch the domain settings.

```typescript
const settings = await client.domainSettings()
console.log(settings)
```

#### `domainStat(type: string = 'hours-played')`

Fetch domain statistics.
options:
- hours-played (graph)
- online-players (graph)
- new-characters (graph)
- online-count-last-7-days (graph)
- hours-played-last-7-days (graph)
- new-players-last-7-days (graph)
- active-tribes (group objects)
- newbies (character objects)
- top-players (character objects)
- last-online (character object)

```typescript
const stats = await client.domainStat('hours-played')
console.log(stats)
```

#### `clusterStat(uuid: string, type: string = 'online-count-last-7-days')`

Fetch cluster statistics.
options:
- online-count-last-7-days (graph)
- hours-played-last-7-days (graph)
- new-players-last-7-days (graph)
- active-tribes (group objects)
- newbies (character objects)
- top-players (character objects)
- last-online (character object)

```typescript
const uuid = 'your-cluster-uuid'
const stats = await client.clusterStat(uuid, 'online-count-last-7-days')
console.log(stats)
```

#### `serverStat(id: string, type: string = 'online-count-last-7-days')`

Fetch server statistics.
options:
- online-count-last-7-days (graph)
- hours-played-last-7-days (graph)
- new-players-last-7-days (graph)
- active-tribes (group objects)
- newbies (character objects)
- top-players (character objects)
- last-online (character object)

```typescript
const id = 'your-server-id'
const stats = await client.serverStat(id, 'online-count-last-7-days')
console.log(stats)
```

#### `servers`

Fetch the list of servers.

```typescript
const servers = await client.servers()
console.log(servers)
```

#### `group(uuid: string)`

Fetch group information.

```typescript
const uuid = 'your-group-uuid'
const group = await client.group(uuid)
console.log(group)
```

#### `groupStat(uuid: string, type: string = 'hours-played')`

Fetch group statistics.
options:
- hours-played
- levels-gained
- xp-gained

```typescript
const uuid = 'your-group-uuid'
const stats = await client.groupStat(uuid, 'hours-played')
console.log(stats)
```

#### `groupLog(uuid: string)`

Fetch group logs. Requires OAuth login.

```typescript
const uuid = 'your-group-uuid'
const logs = await client.groupLog(uuid)
console.log(logs)
```

#### `groupSettings(uuid: string, motd: string, about: string)`

Update group settings. Requires OAuth login.

```typescript
const uuid = 'your-group-uuid'
const motd = 'Message of the day'
const about = 'About the group'
const response = await client.groupSettings(uuid, motd, about)
console.log(response)
```

#### `groups`

Fetch the list of groups.

```typescript
const groups = await client.groups()
console.log(groups)
```

#### `user(uuid: string)`

Fetch user information.

```typescript
const uuid = 'your-user-uuid'
const user = await client.user(uuid)
console.log(user)
```

#### `userStat(uuid: string, type: string = 'hours-played')`

Fetch user statistics.
options:
- hours-played
- levels-gained
- xp-gained

```typescript
const uuid = 'your-user-uuid'
const stats = await client.userStat(uuid, 'hours-played')
console.log(stats)
```

#### `users`

Fetch the list of users.

```typescript
const users = await client.users()
console.log(users)
```

#### `character(uuid: string)`

Fetch character information.

```typescript
const uuid = 'your-character-uuid'
const character = await client.character(uuid)
console.log(character)
```

#### `characterStat(uuid: string, type: string = 'hours-played')`

Fetch character statistics.
options:
- hours-played
- levels-gained
- xp-gained

```typescript
const uuid = 'your-character-uuid'
const stats = await client.characterStat(uuid, 'hours-played')
console.log(stats)
```

#### `characters`

Fetch the list of characters.

```typescript
const characters = await client.characters()
console.log(characters)
```

#### `topCharacters`

Fetch the top characters.

```typescript
const characters = await client.topCharacters()
console.log(characters)
```

#### `freshCharacters`

Fetch the fresh characters.

```typescript
const characters = await client.freshCharacters()
console.log(characters)
```

#### `onlineCharacters`

Fetch the online characters.

```typescript
const characters = await client.onlineCharacters()
console.log(characters)
```

#### `spotlightCharacters`

Fetch the spotlight characters.

```typescript
const characters = await client.spotlightCharacters()
console.log(characters)
```

#### `shopItems(query: string)`

Fetch shop items.

```typescript
const shopPacks = await client.shopItems() // returns a broad list of shop packs. Mostly collections and top level items.
// OR
const shopPacks = await client.shopItems('dinos') // returns a list of shop packs that match the query string
console.log(shopPacks)
```

#### `shopItem(id: string)`

Fetch a shop item by it's id.

```typescript
const shopPack = await client.shopItem('6fd21cfb-441e-4a43-824c-451ad0768318')
console.log(shopPack)
```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
