import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_qag7yA2XL3WG77QGX0kWZdJO42h7BY0",
  authDomain: "schedule-lvduvs.firebaseapp.com",
  projectId: "schedule-lvduvs",
  storageBucket: "schedule-lvduvs.firebasestorage.app",
  messagingSenderId: "429889953501",
  appId: "1:429889953501:web:9baa50fd8f02d29c04c534"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// РЕЄСТРАЦІЯ
document.getElementById("registerBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Успішна реєстрація"))
    .catch(e => alert(e.message));
};

// ЛОГІН
document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Успішний вхід");
      location.href = "index.html";
    })
    .catch(e => alert(e.message));
};
