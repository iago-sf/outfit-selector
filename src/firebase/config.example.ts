import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {};

export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();