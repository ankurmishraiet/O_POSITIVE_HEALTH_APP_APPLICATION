// const crypto = require('crypto');
// const Consultation = require('../../models/service/Consultation');

// // Video rooms use Jitsi Meet. Change JITSI_DOMAIN to your own Jitsi / 8x8 JaaS domain for production.
// const joinUrl = (room, name) =>
//   `https://${process.env.JITSI_DOMAIN || 'meet.jit.si'}/${room}` +
//   `#config.prejoinPageEnabled=false&config.disableDeepLinking=true&userInfo.displayName=${encodeURIComponent(
//     JSON.stringify(name)
//   )}`;

// // ---- Mobile app ----

// exports.createConsultation = async (req, res) => {
//   const patientName = String(req.body.patientName || '').trim().slice(0, 60);

//   if (!patientName) {
//     return res.status(400).json({ message: 'Please enter your name' });
//   }

//   try {
//     const room = 'consult-' + crypto.randomBytes(12).toString('hex'); // unguessable room name
//     const c = await Consultation.create({
//       room,
//       patientName,
//       reason: String(req.body.reason || '').slice(0, 300),
//     });

//     res.status(201).json({ id: c._id, room, joinUrl: joinUrl(room, patientName) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.endConsultation = async (req, res) => {
//   try {
//     await Consultation.updateOne(
//       { _id: req.params.id, room: req.body.room },
//       { status: 'completed' }
//     );
//     res.json({ ok: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ---- Admin ----

// exports.getAdminConsultations = async (req, res) => {
//   try {
//     const list = await Consultation.find().sort({ createdAt: -1 }).limit(100).lean();
//     res.json(list.map((c) => ({ ...c, doctorUrl: joinUrl(c.room, 'Doctor') })));
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateConsultationStatus = async (req, res) => {
//   try {
//     const item = await Consultation.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );

//     if (!item) {
//       return res.status(404).json({ message: 'Not found' });
//     }

//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };