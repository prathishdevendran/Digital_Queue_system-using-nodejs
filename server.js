const express = require("express");
const bodyParser = require("body-parser");
const { CircularQueue, Patient } = require("./queue");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Three queues
let highQueue = new CircularQueue(5);
let medQueue = new CircularQueue(5);
let lowQueue = new CircularQueue(5);

let servedHistory = [];     // Track served patients
let idCounter = 1;

function getAllQueues() {
    return {
        high: highQueue.getQueue(),
        medium: medQueue.getQueue(),
        low: lowQueue.getQueue(),
        highFull: highQueue.isFull(),
        medFull: medQueue.isFull(),
        lowFull: lowQueue.isFull(),
        allEmpty: highQueue.isEmpty() && medQueue.isEmpty() && lowQueue.isEmpty()
    };
}

// Home page (show 3 queues)
app.get("/", (req, res) => {
    res.render("index", getAllQueues());
});

// Add patient with priority
app.post("/add", (req, res) => {
    const { name, age, phone, priority } = req.body;

    const patient = new Patient(idCounter++, name, parseInt(age), phone);

    if (priority === "high") highQueue.enqueue(patient);
    else if (priority === "medium") medQueue.enqueue(patient);
    else lowQueue.enqueue(patient);

    res.redirect("/");
});

// Serve next patient (High → Medium → Low)
app.post("/serve", (req, res) => {
    let served = null;

    if (!highQueue.isEmpty()) served = highQueue.dequeue();
    else if (!medQueue.isEmpty()) served = medQueue.dequeue();
    else if (!lowQueue.isEmpty()) served = lowQueue.dequeue();

    if (served) servedHistory.push(served);

    res.redirect("/");
});

// History page
app.get("/history", (req, res) => {
    res.render("history", { history: servedHistory });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
