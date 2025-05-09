import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login otomatis
signInWithPopup(auth, provider).then(result => {
  console.log("Login:", result.user.displayName);
}).catch(console.error);

const form = document.getElementById("form");
const daftar = document.getElementById("daftar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const teks = document.getElementById("pertanyaan").value;
  const file = document.getElementById("gambar").files[0];

  let urlGambar = "";
  if (file) {
    const storageRef = ref(storage, 'gambar/' + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    urlGambar = await getDownloadURL(snapshot.ref);
  }

  await addDoc(collection(db, "pertanyaan"), {
    teks,
    urlGambar,
    waktu: new Date()
  });

  form.reset();
  tampilkanPertanyaan();
});

async function tampilkanPertanyaan() {
  daftar.innerHTML = "";
  const q = query(collection(db, "pertanyaan"), orderBy("waktu", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${data.teks}</p>` +
                    (data.urlGambar ? `<img src="${data.urlGambar}">` : "");
    daftar.appendChild(div);
  });
}

tampilkanPertanyaan();
