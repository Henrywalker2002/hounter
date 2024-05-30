import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDeWX6EqGrpJkSsiFkIGgWq2ujHAxSzZak",
    authDomain: "bhx-clone-5db5a.firebaseapp.com",
    databaseURL: "https://bhx-clone-5db5a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bhx-clone-5db5a",
    storageBucket: "bhx-clone-5db5a.appspot.com",
    messagingSenderId: "180504301747",
    appId: "1:180504301747:web:7c40e6766787a1e684e0c6",
    measurementId: "G-GJKZ8XVL5C"
  };
export const firebaseDb = initializeApp(firebaseConfig);