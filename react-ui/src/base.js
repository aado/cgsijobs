import firebase from "firebase";
import 'firebase/app';
import 'firebase/firestore';


const app = firebase.initializeApp({
	apiKey: "AIzaSyBGwqX1yjRmCIr-u8O1DLaSIjS29aZr8ys",
	authDomain: "adovin-d722f.firebaseapp.com",
	databaseURL: "https://adovin-d722f.firebaseio.com",
	projectId: "adovin-d722f",
	storageBucket: "adovin-d722f.appspot.com",
	messagingSenderId: "999604746437"
});

export default app;