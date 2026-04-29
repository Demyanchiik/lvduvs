import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_qag7yA2XL3WG77QGX0kWZdJO42h7BY0",
  authDomain: "schedule-lvduvs.firebaseapp.com",
  projectId: "schedule-lvduvs",
  appId: "1:429889953501:web:9baa50fd8f02d29c04c534"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "auth.html";
  }
});
