import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const db = getFirestore();

const expensesCol = collection(db, `users/jkasodkskoa/expenses`);

addDoc(expensesCol, {
  name: 'Blabka',
  cost: 19.0,
  address: '',
});

const expenseDoc = doc(db, `users/akokaokao/expenses/kaoakokao`);
setDoc(expenseDoc, {
  name: 'Blabka',
});

updateDoc(expenseDoc, {
  name: 'Putu',
});
