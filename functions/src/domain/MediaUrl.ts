export class MediaUrl {
    
    path: string

    url: string

    expireIn: number

    constructor(path: string, url: string, expireIn: number) {
        this.path = path
        this.url = url
        this.expireIn = expireIn
    }

}