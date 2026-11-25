const express = require('express');
const ctrl = require('../../controllers/service/serviceController');

const publicRouter = express.Router();   // mobile app
const adminRouter = express.Router();    // admin dashboard (no auth for now)

// ---- Public ----
publicRouter.get('/', ctrl.getPublicServices);
publicRouter.get('/:slug', ctrl.getPublicServiceBySlug);

// ---- Admin ----
adminRouter.get('/', ctrl.getAdminServices);
adminRouter.post('/', ctrl.createService);
adminRouter.put('/reorder', ctrl.reorderServices);   // keep ABOVE '/:id'
adminRouter.put('/:id', ctrl.updateService);
adminRouter.delete('/:id', ctrl.deleteService);

module.exports = { publicRouter, adminRouter };