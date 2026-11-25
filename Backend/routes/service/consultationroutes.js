// const express = require('express');
// const rateLimit = require('express-rate-limit');
// const ctrl = require('../../controllers/service/consultationController');

// const patientRouter = express.Router();        // mobile app
// const adminConsultRouter = express.Router();   // admin dashboard (no auth for now)

// // ---- Mobile ----
// patientRouter.post('/', rateLimit({ windowMs: 60 * 1000, max: 10 }), ctrl.createConsultation);
// patientRouter.patch('/:id/end', ctrl.endConsultation);

// // ---- Admin ----
// adminConsultRouter.get('/', ctrl.getAdminConsultations);
// adminConsultRouter.patch('/:id', ctrl.updateConsultationStatus);

// module.exports = { patientRouter, adminConsultRouter };