import axios from 'axios'
var MockAdapter = require("axios-mock-adapter");
import GSAClient from '../src/GSAClient'

const mock = new MockAdapter(axios)

const key = 'test-key'
const secret = 'test-secret'
const client = new GSAClient(key, secret)

describe('GSAClient', () => {
  afterEach(() => {
    mock.reset()
  })

  test('domainSettings should return domain settings', async () => {
    const response = { settings: 'domain-settings' }
    mock.onGet('https://api.gameserverapp.com/api/v1/domain/settings').reply(200, response)

    const result = await client.domainSettings()
    expect(result).toEqual(response)
  })

  test('domainStat should return domain statistics', async () => {
    const response = { stats: 'domain-statistics' }
    mock.onGet('https://api.gameserverapp.com/api/v1/domain/stats/hours-played').reply(200, response)

    const result = await client.domainStat('hours-played')
    expect(result).toEqual(response)
  })

  test('clusterStat should return cluster statistics', async () => {
    const response = { stats: 'cluster-statistics' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/cluster/${uuid}/stat/online-count-last-7-days`).reply(200, response)

    const result = await client.clusterStat(uuid, 'online-count-last-7-days')
    expect(result).toEqual(response)
  })

  test('serverStat should return server statistics', async () => {
    const response = { stats: 'server-statistics' }
    const id = 'test-id'
    mock.onGet(`https://api.gameserverapp.com/api/v1/server/${id}`).reply(200, response)

    const result = await client.serverStat(id, 'online-count-last-7-days')
    expect(result).toEqual(response)
  })

  test('servers should return list of servers', async () => {
    const response = { servers: 'list-of-servers' }
    mock.onGet('https://api.gameserverapp.com/api/v1/servers').reply(200, response)

    const result = await client.servers()
    expect(result).toEqual(response)
  })

  test('group should return group information', async () => {
    const response = { group: 'group-information' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/group/${uuid}`).reply(200, response)

    const result = await client.group(uuid)
    expect(result).toEqual(response)
  })

  test('groupStat should return group statistics', async () => {
    const response = { stats: 'group-statistics' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/group/hours-played`).reply(200, response)

    const result = await client.groupStat(uuid, 'hours-played')
    expect(result).toEqual(response)
  })

  test('groupLog should return group logs', async () => {
    const response = { log: 'group-log' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/group/${uuid}/log`).reply(200, response)

    const result = await client.groupLog(uuid)
    expect(result).toEqual(response)
  })

  test('groupSettings should update group settings', async () => {
    const response = { success: true }
    const uuid = 'test-uuid'
    const motd = 'Message of the day'
    const about = 'About the group'
    mock.onPost(`https://api.gameserverapp.com/api/v1/group/${uuid}`, { motd, about }).reply(200, response)

    const result = await client.groupSettings(uuid, motd, about)
    expect(result).toEqual(response)
  })

  test('groups should return list of groups', async () => {
    const response = { groups: 'list-of-groups' }
    mock.onGet('https://api.gameserverapp.com/api/v1/group').reply(200, response)

    const result = await client.groups()
    expect(result).toEqual(response)
  })

  test('user should return user information', async () => {
    const response = { user: 'user-information' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/user/${uuid}`).reply(200, response)

    const result = await client.user(uuid)
    expect(result).toEqual(response)
  })

  test('userStat should return user statistics', async () => {
    const response = { stats: 'user-statistics' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/user/${uuid}/stat/hours-played`).reply(200, response)

    const result = await client.userStat(uuid, 'hours-played')
    expect(result).toEqual(response)
  })

  test('users should return list of users', async () => {
    const response = { users: 'list-of-users' }
    mock.onGet('https://api.gameserverapp.com/api/v1/user').reply(200, response)

    const result = await client.users()
    expect(result).toEqual(response)
  })

  test('character should return character information', async () => {
    const response = { character: 'character-information' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/character/${uuid}`).reply(200, response)

    const result = await client.character(uuid)
    expect(result).toEqual(response)
  })

  test('characterStat should return character statistics', async () => {
    const response = { stats: 'character-statistics' }
    const uuid = 'test-uuid'
    mock.onGet(`https://api.gameserverapp.com/api/v1/character/hours-played`).reply(200, response)

    const result = await client.characterStat(uuid, 'hours-played')
    expect(result).toEqual(response)
  })

  test('characters should return list of characters', async () => {
    const response = { characters: 'list-of-characters' }
    mock.onGet('https://api.gameserverapp.com/api/v1/characters').reply(200, response)

    const result = await client.characters()
    expect(result).toEqual(response)
  })

  test('topCharacters should return top characters', async () => {
    const response = { characters: 'top-characters' }
    mock.onGet('https://api.gameserverapp.com/api/v1/characters/top').reply(200, response)

    const result = await client.topCharacters()
    expect(result).toEqual(response)
  })

  test('freshCharacters should return fresh characters', async () => {
    const response = { characters: 'fresh-characters' }
    mock.onGet('https://api.gameserverapp.com/api/v1/characters/fresh').reply(200, response)

    const result = await client.freshCharacters()
    expect(result).toEqual(response)
  })

  test('onlineCharacters should return online characters', async () => {
    const response = { characters: 'online-characters' }
    mock.onGet('https://api.gameserverapp.com/api/v1/characters/online').reply(200, response)

    const result = await client.onlineCharacters()
    expect(result).toEqual(response)
  })

  test('spotlightCharacters should return spotlight characters', async () => {
    const response = { characters: 'spotlight-characters' }
    mock.onGet('https://api.gameserverapp.com/api/v1/characters/spotlight').reply(200, response)

    const result = await client.spotlightCharacters()
    expect(result).toEqual(response)
  })
})
