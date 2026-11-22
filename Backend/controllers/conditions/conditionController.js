const Condition = require("../../models/conditions/Condition");

const fail = (res, err, code = 500) =>
  res.status(code).json({ success: false, message: err.message || "Server error" });

/* ----------------------------- PUBLIC ----------------------------- */

// GET /api/conditions?limit=8
exports.getConditions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const data = await Condition.find({ isActive: true })
      .select("name slug icon iconUrl")
      .sort({ order: 1, name: 1 })
      .limit(limit);
    res.json({ success: true, data });
  } catch (err) {
    fail(res, err);
  }
};

// GET /api/conditions/:slug
exports.getCondition = async (req, res) => {
  try {
    const data = await Condition.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!data)
      return res.status(404).json({ success: false, message: "Condition not found" });
    res.json({ success: true, data });
  } catch (err) {
    fail(res, err);
  }
};

/* ------------------------------ ADMIN ------------------------------ */

exports.adminList = async (req, res) => {
  try {
    const data = await Condition.find().sort({ order: 1, name: 1 });
    res.json({ success: true, data });
  } catch (err) {
    fail(res, err);
  }
};

exports.adminCreate = async (req, res) => {
  try {
    const data = await Condition.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    fail(res, err, 400);
  }
};

exports.adminUpdate = async (req, res) => {
  try {
    const doc = await Condition.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Condition not found" });

    // doctors/hospitals alag endpoints se manage hote hain
    const { doctors, hospitals, ...rest } = req.body;
    doc.set(rest);
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (err) {
    fail(res, err, 400);
  }
};

exports.adminDelete = async (req, res) => {
  try {
    await Condition.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Condition deleted" });
  } catch (err) {
    fail(res, err);
  }
};

/* ---- Doctors ---- */
exports.adminAddDoctor = async (req, res) => {
  try {
    const doc = await Condition.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Condition not found" });
    doc.doctors.push(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    fail(res, err, 400);
  }
};

exports.adminRemoveDoctor = async (req, res) => {
  try {
    const doc = await Condition.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Condition not found" });
    doc.doctors.pull({ _id: req.params.doctorId });
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (err) {
    fail(res, err);
  }
};

/* ---- Hospitals ---- */
exports.adminAddHospital = async (req, res) => {
  try {
    const doc = await Condition.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Condition not found" });
    doc.hospitals.push(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    fail(res, err, 400);
  }
};

exports.adminRemoveHospital = async (req, res) => {
  try {
    const doc = await Condition.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Condition not found" });
    doc.hospitals.pull({ _id: req.params.hospitalId });
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (err) {
    fail(res, err);
  }
};