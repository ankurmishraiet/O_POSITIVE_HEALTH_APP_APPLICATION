const Appointment = require('../../models/user/appointmentModel');

const getAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filter = { user: req.user._id };

    if (req.query.type === 'upcoming') {
      filter.status = 'booked';
      filter.date = { $gte: today };
    } else if (req.query.type === 'past') {
      filter.$or = [{ status: { $ne: 'booked' } }, { date: { $lt: today } }];
    }

    const appointments = await Appointment.find(filter)
      .populate('doctor')
      .sort({ date: req.query.type === 'past' ? -1 : 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { doctor, patientName, date, timeSlot } = req.body;

    if (!doctor || !patientName || !date || !timeSlot) {
      return res.status(400).json({ message: 'Saari details daalo' });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      doctor,
      patientName: patientName.trim(),
      date,
      timeSlot,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, status: 'booked' },
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment nahi mili' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAppointments, createAppointment, cancelAppointment };