import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBe01WnKuU5sFcchTdFzkcaser-p3hjyTA',
  authDomain: 'contoh-nama-project.firebaseapp.com',
  projectId: 'contoh-nama-project',
  storageBucket: 'contoh-nama-project.appspot.com',
  messagingSenderId: '932832134333',
  appId: '1:932837644562:web:912eea8c940d9f173cdefb',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const buttonElement = document.querySelector('#btn-sign-in');
buttonElement?.addEventListener('click', () => {
  signInWithRedirect(auth, new GoogleAuthProvider());
});

const listElement = document.querySelector('#list-expenses');
const loginInfoElement = document.querySelector('#login-info');

onAuthStateChanged(auth, (user) => {
  if (user === null) {
    return;
  }

  loginInfoElement!.textContent = `Login sebagai: ${user.displayName} (${user.email})`;

  const expensesCol = collection(db, `users/${user.uid}/expenses`);
  const expensesQuery = query(expensesCol, where('cost', '>', 10.0));

  onSnapshot(expensesQuery, (snapshot) => {
    const expenses = snapshot.docs.map((d) => d.data());

    // Sync with UI
    listElement!.innerHTML = '';
    expenses.forEach((expense) => {
      const li = document.createElement('li');
      li.textContent = `${expense.name} - ${expense.cost}`;
      listElement?.appendChild(li);
    });
  });
});
