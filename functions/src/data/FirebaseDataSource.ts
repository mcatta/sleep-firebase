import { firestore } from 'firebase-admin'
import { MediaFile } from '../domain/MediaFile'
import { MediaUrl } from '../domain/MediaUrl'
import { Bucket, GetSignedUrlConfig } from '@google-cloud/storage'

const AUDIO_COLLECTION = "audio"

export class FirebaseDataSource {

    _firestore: firestore.Firestore
    _bucket: Bucket

    constructor(firestore: firestore.Firestore, bucket: Bucket) {
        this._firestore = firestore
        this._bucket = bucket
    }

    /**
     * Get all media
     * @returns List of [MediaFile]
     */
    async list(): Promise<MediaFile[]> {
        const mediaQuery = await this._firestore
            .collection(AUDIO_COLLECTION)
            .orderBy('order', 'asc')
            .get()

        return mediaQuery.docs.map(x => { 
            let item = (x.data() as MediaFile)
            item.id = x.id
            return item
        })
    }

    /**
     * Return signed URL
     * @param path 
     * @returns Url [MediaUrl]
     */
    async downloadUrl(path: string): Promise<MediaUrl> {
        const options: GetSignedUrlConfig = {
            version: 'v2', // defaults to 'v2' if missing.
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // one hour
        }

        return this._bucket
            .file(path)
            .getSignedUrl(options)
            .then(signedUrls => new MediaUrl(path, signedUrls[0]))
   }
    
}