import * as functions from "firebase-functions";
import * as firebase from 'firebase-admin';
import { MediaRepository } from "./data/MediaRepository";
import * as express from 'express'
import { validateFirebaseIdToken } from "./http/Utils";
import * as cors from 'cors'

// Bootstrap
firebase.initializeApp()
const api = express()
api.use(cors({ origin: true }))
api.use(validateFirebaseIdToken)

const mediaRepository = new MediaRepository(firebase.firestore())

// Endpoints
api.get('/', async (req: express.Request, res: express.Response) => {
    res.status(200)
        .json(await mediaRepository.list())
})

exports.media = functions.region('europe-west2').https.onRequest(api)