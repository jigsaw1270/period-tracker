// src/auth.js
import { auth ,db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , getAuth, onAuthStateChanged } from 'firebase/auth';


const auth = getAuth();

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, save email and uid in Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid
      }, { merge: true });
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }
});
// Register User
const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login User
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout User
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { register, login, logout };
