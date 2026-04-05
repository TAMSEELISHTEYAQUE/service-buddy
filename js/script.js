function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234"){
        localStorage.setItem("user", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}
const services = [
    {name: "Electrician", desc: "Fix wiring, switches", price: "₹200"},
    {name: "Plumber", desc: "Pipe & leakage repair", price: "₹150"},
    {name: "AC Repair", desc: "Cooling issue fix", price: "₹300"},
    {name: "Cleaner", desc: "Home cleaning", price: "₹100"}
];

function loadServices(){
    let container = document.getElementById("services");
    container.innerHTML = "";

    services.forEach(service => {
        container.innerHTML += `
        <div class="card">
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
            <p><b>${service.price}</b></p>
            <button onclick="bookService('${service.name}')">Book</button>
        </div>
        `;
    });
}

function searchService(){
    let query = document.getElementById("search").value.toLowerCase();

    let filtered = services.filter(s => 
        s.name.toLowerCase().includes(query)
    );

    let container = document.getElementById("services");
    container.innerHTML = "";

    filtered.forEach(service => {
        container.innerHTML += `
        <div class="card">
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
            <p><b>${service.price}</b></p>
            <button onclick="bookService('${service.name}')">Book</button>
        </div>
        `;
    });
}

function bookService(name){
    alert("Service Booked: " + name);
}

function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

window.onload = loadServices;
