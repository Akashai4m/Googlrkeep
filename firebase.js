import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "keep0-75dac.firebaseapp.com",
	databaseURL: "https://keep0-75dac-default-rtdb.firebaseio.com",
	projectId: "keep0-75dac",
	storageBucket: "keep0-75dac.appspot.com",
	messagingSenderId: "85998764332",
	appId: process.env.FIREBASE_APP_ID,
}

// in serverless environment, firebase.initializeApp() get called multiple times, hence first check the "firebase.apps.length"
firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

export const database = firebase.database()





