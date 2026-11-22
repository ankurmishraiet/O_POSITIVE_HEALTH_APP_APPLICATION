const makeController = (Model, label) => {
  const getAll = async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getOne = async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: label + ' nahi mila' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Zaruri fields bharo' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };

  const update = async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after',
        runValidators: true,
      });
      if (!item) {
        return res.status(404).json({ message: label + ' nahi mila' });
      }
      res.json(item);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Zaruri fields bharo' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };

  const remove = async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: label + ' nahi mila' });
      }
      res.json({ message: label + ' delete ho gaya' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  return { getAll, getOne, create, update, remove };
};

module.exports = makeController;