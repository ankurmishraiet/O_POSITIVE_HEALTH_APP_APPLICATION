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
const { uploadImage } = require('../config/cloudinary');
const { getFeedbacks } = require('../controllers/admin/feedbackAdminController');
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

router.get('/feedbacks', protect, getFeedbacks);

router.post('/upload', protect, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image chuno' });
    }
    try {
      // Cloudinary par bhejo aur online link wapas do
      const url = await uploadImage(req.file.buffer);
      res.json({ url });
    } catch (e) {
      console.log('Cloudinary upload error:', e.message);
      res.status(500).json({ message: 'Image upload nahi ho payi' });
    }
  });
});

module.exports = router;