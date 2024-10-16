import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { CookieJar } from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'
import * as https from 'https'

class GSAClientException extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'GSAClientException'
  }
}

export default class GSAClient {
  private static readonly OAUTH_COOKIE_NAME = 'GSA_AUTH'

  private clientId: string
  private secret: string
  private url: string
  private client: AxiosInstance
  private cookieJar: CookieJar

  constructor(clientId: string, secret: string, url: string = 'https://api.gameserverapp.com/api', sslVerify: boolean = true) {
    this.clientId = clientId
    this.secret = secret
    this.url = url

    this.cookieJar = new CookieJar()
    const httpsAgent = new https.Agent({ rejectUnauthorized: sslVerify })

    const axiosInstance = axios.create({
      httpsAgent,
      headers: { 
        'User-Agent': 'GSA Node.js API wrapper',
        'X-AUTH-GSA-CLIENT-ID': this.clientId
      }
    })

    this.client = wrapper(axiosInstance)
  }

  public async domainSettings() {
    return this.request('get', 'v1', 'domain/settings')
  }

  public async domainStat(type: string = 'hours-played') {
    return this.request('get', 'v1', `domain/stats/${type}`)
  }

  public async clusterStat(uuid: string, type: string = 'online-count-last-7-days') {
    return this.request('get', 'v1', `cluster/${uuid}/stats/${type}`)
  }

  public async serverStat(id: string, type: string = 'online-count-last-7-days') {
    return this.request('get', 'v1', `server/${id}/stats/${type}`)
  }

  public async servers() {
    return this.request('get', 'v1', 'servers')
  }

  public async group(uuid: string) {
    return this.request('get', 'v1', `group/${uuid}`)
  }

  public async groupStat(uuid: string, type: string = 'hours-played') {
    return this.request('get', 'v1', `group/${type}`)
  }

  public async groupLog(uuid: string) {
    return this.request('get', 'v1', `group/${uuid}/log`)
  }

  public async groupSettings(uuid: string, motd: string, about: string) {
    return this.request('post', 'v1', `group/${uuid}`, { motd, about })
  }

  public async groups() {
    return this.request('get', 'v1', 'group')
  }

  public async user(uuid: string) {
    return this.request('get', 'v1', `user/${uuid}`)
  }

  public async userStat(uuid: string, type: string = 'hours-played') {
    return this.request('get', 'v1', `user/${uuid}/stats/${type}`)
  }

  public async users() {
    return this.request('get', 'v1', 'user')
  }

  public async character(uuid: string) {
    return this.request('get', 'v1', `character/${uuid}`)
  }

  public async characterStat(uuid: string, type: string = 'hours-played') {
    return this.request('get', 'v1', `character/${type}`)
  }

  public async characters() {
    return this.request('get', 'v1', 'characters')
  }

  public async topCharacters() {
    return this.request('get', 'v1', 'characters/top')
  }

  public async freshCharacters() {
    return this.request('get', 'v1', 'characters/fresh')
  }

  public async onlineCharacters() {
    return this.request('get', 'v1', 'characters/online')
  }

  public async spotlightCharacters() {
    return this.request('get', 'v1', 'characters/spotlight')
  }

  public async shopItems(route: string = '', query: any = {}) {
    let fullRoute = 'shop';
    if (route) {
      fullRoute = `${fullRoute}/${route}`;
    }
  
    const queryString = new URLSearchParams(query).toString();
    if (queryString) {
      fullRoute = `${fullRoute}?${queryString}`;
    }
  
    return this.request('get', 'v1', fullRoute);
  }

  public async shopItem(id: string) {
    return this.request('get', 'v1', `shop/${id}`);
  }

  private async request(method: 'get' | 'post' | 'delete', version: string, url: string, data: any = {}) {
    const fullUrl = `${this.url}/${version}/${url}`;
    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      data: method === 'post' ? data : undefined,
    };

    if (this.cookieJar.getCookieStringSync(fullUrl)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.cookieJar.getCookieStringSync(fullUrl)}`,
      };
    }

    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new GSAClientException(error.response.data, error.response.status);
      } else {
        throw new GSAClientException(error.message);
      }
    }
  }
}

// export default GSAClient
