import * as functions from "firebase-functions"
import * as firebase from 'firebase-admin'
import { FirebaseDataSource } from "./data/FirebaseDataSource"
import * as express from 'express'
import { validateFirebaseIdToken } from "./http/Utils"
import * as cors from 'cors'

// Bootstrap
const app = firebase.initializeApp()
const api = express()
api.use(cors({ origin: true }))
api.use(validateFirebaseIdToken)

const dataSource = new FirebaseDataSource(firebase.firestore(), app.storage().bucket())

// Endpoints
api.get('/', async (req: express.Request, res: express.Response) => {
    dataSource.list()
        .then(list => res.status(200).json(list))
        .catch(_ => res.status(500).send())
})

api.get('/url', async (req: express.Request, res: express.Response) => {
    let path = req.query.path as string
    
    dataSource.getSignedUrlByPath(path)
        .then(media => res.status(200).json(media))
        .catch(_ => res.status(404).send())
})

api.get('/url/:id', async (req: express.Request, res: express.Response) => {
    let id = req.params.id
    
    dataSource.getSignedUrlById(id)
        .then(media => res.status(200).json(media))
        .catch(_ => res.status(404).send())
})

exports.media = functions.region('europe-west2').https.onRequest(api)