import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyCSl8YKPaQkuVno6XILrc0uEgZZQVdCG5w",
  authDomain: "insong-94de5.firebaseapp.com",
  databaseURL: "https://insong-94de5.firebaseio.com",
  projectId: "insong-94de5",
  storageBucket: "insong-94de5.appspot.com",
  messagingSenderId: "523033426454",
  appId: "1:523033426454:web:33cdc5e9c89a0912eb5337",
  measurementId: "G-MDH2QBJCMT"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}