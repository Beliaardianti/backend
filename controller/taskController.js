const { Task } = require('../models');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params; // ID task yang akan diupdate
      const { title, description } = req.body; // Data baru untuk task
  
      // Cari task berdasarkan ID dan userId
      const task = await Task.findOne({ where: { id, userId: req.user.id } });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' }); // Task tidak ditemukan
      }
  
      // Update task dengan data baru
      task.title = title || task.title; // Tetap gunakan nilai lama jika tidak diberikan
      task.description = description || task.description;
      await task.save();
  
      res.status(200).json(task); // Kirim task yang telah diupdate
    } catch (error) {
      res.status(500).json({ message: error.message }); // Tangani error
    }
  };
  

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.destroy({ where: { id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
