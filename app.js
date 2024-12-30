const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk parse JSON
app.use(express.json());

// Penyimpanan data dalam array
let tasks = [
  { id: 1, title: "Belajar Express.js", completed: false },
  { id: 2, title: "Membuat API To-Do List", completed: false },
];

// Route untuk membuat tugas baru (POST /tasks)
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;
  const newTask = {
    id: tasks.length + 1, // ID otomatis berdasarkan panjang array
    title: title,
    completed: completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route untuk melihat daftar semua tugas (GET /tasks)
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Route untuk melihat tugas tertentu berdasarkan ID (GET /tasks/:id)
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Tugas tidak ditemukan" });
  }
  res.status(200).json(task);
});

// Route untuk mengupdate tugas berdasarkan ID (PUT /tasks/:id)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tugas tidak ditemukan" });
  }

  tasks[taskIndex] = { id: parseInt(id), title, completed };
  res.status(200).json(tasks[taskIndex]);
});

// Route untuk menghapus tugas berdasarkan ID (DELETE /tasks/:id)
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tugas tidak ditemukan" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Tugas berhasil dihapus" });
});

// Route untuk root (GET /)
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API!");
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
