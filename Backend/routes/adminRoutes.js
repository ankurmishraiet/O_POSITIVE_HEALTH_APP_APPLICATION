const express = require('express');
const { adminLogin } = require('../controllers/auth/loginController');
const { protect } = require('../middleware/authMiddleware');
const { getTasks, addTask, toggleTask, deleteTask } = require('../controllers/admin/taskController');
const makeController = require('../controllers/admin/crudController');
const Doctor = require('../models/doctorModel');
const Hospital = require('../models/hospitalModel');
const Video = require('../models/videoModel');
const Article = require('../models/articleModel');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/login', adminLogin);

router.get('/tasks', protect, getTasks);
router.post('/tasks', protect, addTask);
router.patch('/tasks/:id', protect, toggleTask);
router.delete('/tasks/:id', protect, deleteTask);

const resources = [
  ['doctors', Doctor, 'Doctor'],
  ['hospitals', Hospital, 'Hospital'],
  ['videos', Video, 'Video'],
  ['articles', Article, 'Article'],
];

resources.forEach(([path, Model, label]) => {
  const c = makeController(Model, label);
  router.get('/' + path, protect, c.getAll);
  router.post('/' + path, protect, c.create);
  router.put('/' + path + '/:id', protect, c.update);
  router.delete('/' + path + '/:id', protect, c.remove);
});
router.post('/upload', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image chuno' });
    }
    res.json({ url: '/api/uploads/' + req.file.filename });
  });
});

module.exports = router;