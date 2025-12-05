import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ISI DARI FIREBASE",
  authDomain: "ISI DARI FIREBASE",
  projectId: "ISI DARI FIREBASE",
  storageBucket: "ISI DARI FIREBASE",
  messagingSenderId: "ISI DARI FIREBASE",
  appId: "ISI DARI FIREBASE"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    querySnapshot.forEach((docItem) => {
        const li = document.createElement("li");
        li.textContent = docItem.data().text;
        li.onclick = () => deleteTask(docItem.id);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() === "") return;

    await addDoc(collection(db, "tasks"), { text: taskInput.value });

    taskInput.value = "";
    loadTasks();
}

async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    loadTasks();
}

loadTasks();
