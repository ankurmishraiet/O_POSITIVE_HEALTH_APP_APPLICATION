const Appointment = require("../../models/AppointmentRequest/AppointmentRequest");

const fail = (res, err, code = 500) => {
  console.error("Appointment API error:", err.message);
  res.status(code).json({ success: false, message: err.message || "Server error" });
};

/* ------------------------------ PUBLIC ------------------------------ */

// POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const {
      name, phone, age, email, preferredDate, preferredTime, message,
      conditionId, conditionName, doctorName, hospitalName,
    } = req.body;

    if (!name || name.trim().length < 2)
      return res.status(400).json({ success: false, message: "Please enter your name." });

    const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10)
      return res.status(400).json({ success: false, message: "Please enter a valid 10-digit phone number." });

    const data = await Appointment.create({
      name: name.trim(),
      phone: cleanPhone,
      age: age ? Number(age) : undefined,
      email,
      preferredDate,
      preferredTime,
      message,
      conditionId: conditionId || undefined,
      conditionName,
      doctorName,
      hospitalName,
    });

    res.status(201).json({
      success: true,
      message: "Appointment request sent. Our team will contact you shortly.",
      data: { id: data._id },
    });
  } catch (err) {
    fail(res, err, 400);
  }
};

/* ------------------------------ ADMIN ------------------------------ */

// GET /api/appointments/admin/all?status=pending
exports.adminList = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status && req.query.status !== "all") filter.status = req.query.status;

    const data = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    fail(res, err);
  }
};

// PATCH /api/appointments/admin/:id
exports.adminUpdate = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNote !== undefined) update.adminNote = adminNote;

    const data = await Appointment.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ success: false, message: "Appointment not found" });
    res.json({ success: true, data });
  } catch (err) {
    fail(res, err, 400);
  }
};

// DELETE /api/appointments/admin/:id
exports.adminDelete = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    fail(res, err);
  }
};