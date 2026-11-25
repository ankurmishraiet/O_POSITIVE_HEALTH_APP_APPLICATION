// const Service = require('../../models/service/Service');

// // ---- Helpers ----

// const isHttpUrl = (u) => /^https?:\/\//.test(u || '');

// // keep digits only: "+91 98765-43210" -> "919876543210"
// const cleanBody = (body) => ({ ...body, phone: String(body.phone || '').replace(/\D/g, '') });

// const validateService = (body) => {
//   if (!body.title || !body.slug || !body.actionType) {
//     return 'title, slug and actionType are required';
//   }
//   if (body.actionType === 'external_link' && !isHttpUrl(body.url)) {
//     return 'A valid http(s) URL is required';
//   }
//   if (body.actionType === 'native_screen' && !body.screen) {
//     return 'Screen name is required';
//   }
//   if (body.actionType === 'dynamic_page' && !(body.pageContent || '').trim()) {
//     return 'Page paragraph is required';
//   }
//   if (body.actionType === 'whatsapp' && !/^\d{8,15}$/.test(body.phone)) {
//     return 'Enter a valid WhatsApp number with country code (e.g. 919876543210)';
//   }
//   if (body.url && !isHttpUrl(body.url)) {
//     return 'Button link must start with http:// or https://';
//   }
//   return null;
// };

// const saveError = (error) =>
//   error.code === 11000 ? 'Slug already exists' : error.message;

// // ---- Public (mobile app) ----

// exports.getPublicServices = async (req, res) => {
//   try {
//     const items = await Service.find({ isActive: true })
//       .sort({ order: 1 })
//       .select('-pageContent -createdAt -updatedAt -__v');
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getPublicServiceBySlug = async (req, res) => {
//   try {
//     const item = await Service.findOne({ slug: req.params.slug, isActive: true });
//     if (!item) return res.status(404).json({ message: 'Not found' });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ---- Admin ----

// exports.getAdminServices = async (req, res) => {
//   try {
//     res.json(await Service.find().sort({ order: 1 }));
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createService = async (req, res) => {
//   const data = cleanBody(req.body);
//   const validationError = validateService(data);
//   if (validationError) return res.status(400).json({ message: validationError });

//   try {
//     res.status(201).json(await Service.create(data));
//   } catch (error) {
//     res.status(400).json({ message: saveError(error) });
//   }
// };

// exports.reorderServices = async (req, res) => {
//   if (!Array.isArray(req.body.ids)) {
//     return res.status(400).json({ message: 'ids must be an array' });
//   }
//   try {
//     await Service.bulkWrite(
//       req.body.ids.map((id, index) => ({
//         updateOne: { filter: { _id: id }, update: { order: index } },
//       }))
//     );
//     res.json({ ok: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateService = async (req, res) => {
//   const data = cleanBody(req.body);
//   const validationError = validateService(data);
//   if (validationError) return res.status(400).json({ message: validationError });

//   try {
//     const item = await Service.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//       runValidators: true,
//     });
//     if (!item) return res.status(404).json({ message: 'Not found' });
//     res.json(item);
//   } catch (error) {
//     res.status(400).json({ message: saveError(error) });
//   }
// };

// exports.deleteService = async (req, res) => {
//   try {
//     const item = await Service.findByIdAndDelete(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Not found' });
//     res.json({ ok: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


















const Service = require('../../models/service/Service');

// ---- Helpers ----

const isHttpUrl = (u) => /^https?:\/\//.test(u || '');

// old records saved as "video_call" are treated as WhatsApp
const normalizeOut = (s) =>
  s && s.actionType === 'video_call' ? { ...s, actionType: 'whatsapp' } : s;

// keep digits only: "+91 98765-43210" -> "919876543210"
const cleanBody = (body = {}) => {
  const data = { ...body };
  if (data.actionType === 'video_call') data.actionType = 'whatsapp';
  data.phone =
    data.actionType === 'whatsapp' ? String(data.phone || '').replace(/\D/g, '') : '';
  // never let the client overwrite internal fields
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const validateService = (body) => {
  if (!body.title || !body.slug || !body.actionType) {
    return 'title, slug and actionType are required';
  }
  if (body.actionType === 'external_link' && !isHttpUrl(body.url)) {
    return 'A valid http(s) URL is required';
  }
  if (body.actionType === 'native_screen' && !body.screen) {
    return 'Screen name is required';
  }
  if (body.actionType === 'dynamic_page' && !(body.pageContent || '').trim()) {
    return 'Page paragraph is required';
  }
  if (body.actionType === 'whatsapp' && !/^\d{8,15}$/.test(body.phone)) {
    return 'Enter a valid WhatsApp number with country code (e.g. 919876543210)';
  }
  if (body.url && !isHttpUrl(body.url)) {
    return 'Button link must start with http:// or https://';
  }
  return null;
};

const saveError = (error) =>
  error.code === 11000 ? 'Slug already exists' : error.message;

// ---- Public (mobile app) ----

exports.getPublicServices = async (req, res) => {
  try {
    const items = await Service.find({ isActive: true })
      .sort({ order: 1 })
      .select('-pageContent -createdAt -updatedAt -__v')
      .lean();
    res.json(items.map(normalizeOut));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicServiceBySlug = async (req, res) => {
  try {
    const item = await Service.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(normalizeOut(item));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Admin ----

exports.getAdminServices = async (req, res) => {
  try {
    res.json(await Service.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  const data = cleanBody(req.body);
  const validationError = validateService(data);
  if (validationError) return res.status(400).json({ message: validationError });

  try {
    res.status(201).json(await Service.create(data));
  } catch (error) {
    res.status(400).json({ message: saveError(error) });
  }
};

exports.reorderServices = async (req, res) => {
  if (!Array.isArray(req.body.ids)) {
    return res.status(400).json({ message: 'ids must be an array' });
  }
  try {
    await Service.bulkWrite(
      req.body.ids.map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { order: index } },
      }))
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  const data = cleanBody(req.body);
  const validationError = validateService(data);
  if (validationError) return res.status(400).json({ message: validationError });

  try {
    const item = await Service.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: saveError(error) });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const item = await Service.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};