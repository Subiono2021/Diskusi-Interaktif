import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider).then(result => {
  console.log("Login sebagai:", result.user.displayName);
});

// Logika untuk menambahkan pertanyaan, upload gambar, dll.

document.body.innerHTML += `
  <div style="margin-top:20px; padding:10px; border:1px solid #ccc;">
    <h2>✅ Firebase Tersambung</h2>
    <p>Login berhasil! Silakan lanjutkan mengisi pertanyaan atau upload gambar.</p>
  </div>
`;

