const express = require("express");
const router = express.Router();

const {
  getConditions,
  getCondition,
  adminList,
  adminCreate,
  adminUpdate,
  adminDelete,
  adminAddDoctor,
  adminRemoveDoctor,
  adminAddHospital,
  adminRemoveHospital,
} = require("../../controllers/conditions/conditionController");

// const { protectAdmin } = require("../../middleware/authMiddleware");

// Admin (admin routes /:slug se PEHLE hone chahiye). Live jaane se pehle protectAdmin lagao.
router.get("/admin/all", adminList);
router.post("/admin", adminCreate);
router.put("/admin/:id", adminUpdate);
router.delete("/admin/:id", adminDelete);

router.post("/admin/:id/doctors", adminAddDoctor);
router.delete("/admin/:id/doctors/:doctorId", adminRemoveDoctor);

router.post("/admin/:id/hospitals", adminAddHospital);
router.delete("/admin/:id/hospitals/:hospitalId", adminRemoveHospital);

// Public (mobile app)
router.get("/", getConditions);
router.get("/:slug", getCondition);

module.exports = router;