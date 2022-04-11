const functions = require("firebase-functions")
const admin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

// Init
admin.initializeApp()


// Check File storage creation
exports.storage = functions.region('europe-west2').storage.object().onFinalize(async (file) => {

    var fileObject = {
        name : file.name.replace('.mp3', ''),
        description: '',
        createAt: file.timeCreated,
        storage: `/${file.name}`,
        bucket: file.bucket
    };

    console.log(file)
    return admin.firestore().doc(`/audio/${uuidv4()}`).set(fileObject)
})