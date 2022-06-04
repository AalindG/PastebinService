import axios, { Axios, AxiosInstance } from "axios"

class TinyUrl {

  public url
  private tinyUrlEndpoint = process.env.TINYURL_ENDPOINT
  private apiKey = process.env.TINYURL_API_KEY || ''
  private requestInstance: any

  constructor(url: string) {
    this.url = url
    // this.createRequestInstance()
  }

  private request() {
    console.log('object: ', {
      url: `${this.tinyUrlEndpoint}/generate`,
      method: 'POST',
      headers: { apiKey: this.apiKey },
      data: { longUrl: this.url }
    });
    return axios.post(
      `${this.tinyUrlEndpoint}/generate`,
      { longUrl: this.url },
      { headers: { apiKey: this.apiKey }, }
    )
      .then(({ data }) => data)
      .then(({ shortUrl }) => shortUrl)
  }

  async generateUrl() {
    // const tinyUrlGenerateInstance = this.createRequestInstance()
    const shortUrl = await this.request()
    // const { shortUrl } = data
    console.log('tinyUrl: ', shortUrl);
    return shortUrl
  }

}

async function generateUrl(pasteUrl: string) {
  console.log('pasteurl: ', pasteUrl);
  const tinyUrlinstance = new TinyUrl(pasteUrl)
  const url = await tinyUrlinstance.generateUrl()
  return url
}

export {
  generateUrl
}
