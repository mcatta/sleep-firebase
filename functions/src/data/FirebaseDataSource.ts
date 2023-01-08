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
     * Return signed URL by path
     * @param path 
     * @returns Url [MediaUrl]
     */
    async getSignedUrlByPath(path: string): Promise<MediaUrl> {
        const expireInSec = 60 * 60 // one hour
        const options: GetSignedUrlConfig = {
            version: 'v2', // defaults to 'v2' if missing.
            action: 'read',
            expires: Date.now() + 1000 * expireInSec,
        }

        return this._bucket
            .file(path)
            .getSignedUrl(options)
            .then(signedUrls => new MediaUrl(path, signedUrls[0], expireInSec))
   }

    /**
     * Return signed URL by ID
     * @param id 
     * @returns Url [MediaUrl]
     */
    async getSignedUrlById(id: string): Promise<MediaUrl> {
        return this._firestore
            .collection(AUDIO_COLLECTION)
            .where(firestore.FieldPath.documentId(), "==", id)
            .get()
            .then( result => (result.docs[0].data() as MediaFile).storage)
            .then( path => this.getSignedUrlByPath(path))
   }
    
}