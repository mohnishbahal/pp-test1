import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "persona-builder-dev.firebaseapp.com",
  projectId: "persona-builder-dev",
  storageBucket: "persona-builder-dev.appspot.com",
  messagingSenderId: "170427468921",
  appId: "1:170427468921:web:b2e52f96b84853c79ce13a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);