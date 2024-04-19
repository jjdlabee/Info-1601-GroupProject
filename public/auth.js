import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  signInAnonymously, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import firebaseConfig from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function setAuthListeners(onLogin, onLogout){
  onAuthStateChanged(auth, user => {
    if (user) {
      onLogin();
    } else {
      onLogout();
    }
  });
}

// const loginEmailPassword = async () => {
//   const loginEmail = txtEmail.value;
//   const loginPassword = txtPassword.value;

//   const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//   console.log(userCredential.user);
// }

// loginBtn.addEventListener("click", loginEmailPassword)

async function signIn(){
  try{
    await setPersistence(auth, browserLocalPersistence);
    const user = await signInAnonymously(auth);
  }catch(e){
    console.error(e);
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
  }
}

export {auth, setAuthListeners, signIn, logout};