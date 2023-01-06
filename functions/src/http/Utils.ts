import * as firebase from 'firebase-admin'
import { logger } from "firebase-functions"
import {
  Request, 
  Response,
  NextFunction
} from 'express'

export const validateFirebaseIdToken = async (req: Request, res: Response, next: NextFunction) => {

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)) {
    logger.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    )
    res.status(403).send('Unauthorized')
    return
  }

  let idToken
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    logger.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  } else {
    // No cookie
    res.status(403).send('Unauthorized')
    return
  }

  try {
    const decodedIdToken = await firebase.auth().verifyIdToken(idToken)
    logger.log('ID Token correctly decoded', decodedIdToken)
    //req.user = decodedIdToken
    next()
    return
  } catch (error) {
    logger.error('Error while verifying Firebase ID token:', error)
    res.status(403).send('Unauthorized')
    return
  }
}