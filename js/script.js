// 🔥 FIREBASE CONFIG (PASTE YOUR REAL KEYS)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

// INIT
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ================= AUTH =================

// SIGNUP
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Signup Successful"))
        .catch(err => alert(err.message));
}

// LOGIN
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch(err => alert(err.message));
}

// LOGOUT
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}

// ================= SERVICES =================

// LOAD SERVICES
function loadServices() {
    const container = document.getElementById("services");
    if (!container) return;

    container.innerHTML = "<p>Loading services...</p>";

    db.collection("services").get().then(snapshot => {
        container.innerHTML = "";

        snapshot.forEach(doc => {
            const s = doc.data();

            container.innerHTML += `
            <div class="card">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <p><b>₹${s.price}</b></p>
                <button onclick="bookService('${s.name}')">Book</button>
            </div>
            `;
        });
    });
}

// SEARCH
function searchService() {
    const query = document.getElementById("search").value.toLowerCase();
    const container = document.getElementById("services");

    db.collection("services").get().then(snapshot => {
        container.innerHTML = "";

        snapshot.forEach(doc => {
            const s = doc.data();

            if (s.name.toLowerCase().includes(query)) {
                container.innerHTML += `
                <div class="card">
                    <h3>${s.name}</h3>
                    <p>${s.desc}</p>
                    <p><b>₹${s.price}</b></p>
                    <button onclick="bookService('${s.name}')">Book</button>
                </div>
                `;
            }
        });
    });
}

// BOOK
function bookService(name) {
    alert("Service booked: " + name);
}

// ================= AUTO LOAD =================

window.onload = () => {
    loadServices();
};
