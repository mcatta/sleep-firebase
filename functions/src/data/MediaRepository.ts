import { firestore } from 'firebase-admin';
import { MediaFile } from '../domain/MediaFile';

const AUDIO_COLLECTION = "audio"

export class MediaRepository {

    _firestore: firestore.Firestore

    constructor(firestore: firestore.Firestore) {
        this._firestore = firestore
    }

    /**
     * Get all media
     * @returns List of [MediaFile]
     */
    async list() {
        const mediaQuery = await this._firestore
            .collection(AUDIO_COLLECTION)
            .orderBy('order', 'asc')
            .get()
        return mediaQuery.docs.map(x => x.data() as MediaFile)
    }

    
}