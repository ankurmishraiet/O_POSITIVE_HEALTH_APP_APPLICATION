// const mongoose = require('mongoose');

// // actionType: what happens when the user taps the icon
// //  external_link : open `url` in the app's WebView
// //  whatsapp      : service page + "Call on WhatsApp" button (uses `phone`)
// //  native_screen : go to an existing app screen (`screen`)
// //  dynamic_page  : service page built from a plain-text paragraph (`pageContent`) + optional button (`url`)
// const serviceSchema = new mongoose.Schema(
//   {
//     title:       { type: String, required: true, trim: true },
//     slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
//     description: { type: String, default: '' },
//     iconKey:     { type: String, default: 'apps' },
//     iconUrl:     { type: String, default: '' },
//     actionType:  { type: String, enum: ['external_link', 'whatsapp', 'native_screen', 'dynamic_page'], required: true },
//     url:         { type: String, default: '' },
//     phone:       { type: String, default: '' },   // WhatsApp number, digits only, with country code
//     ctaLabel:    { type: String, default: '' },
//     screen:      { type: String, default: '' },
//     pageContent: { type: String, default: '' },
//     config:      { type: mongoose.Schema.Types.Mixed, default: {} },
//     order:       { type: Number, default: 0 },
//     isActive:    { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Service', serviceSchema);
















const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    iconKey: { type: String, default: 'apps' },
    iconUrl: { type: String, default: '' },
    actionType: {
      type: String,
      required: true,
      enum: ['dynamic_page', 'external_link', 'native_screen', 'whatsapp', 'video_call'],
    },
    url: { type: String, default: '' },
    screen: { type: String, default: '' },
    pageContent: { type: String, default: '' },
    phone: { type: String, default: '' },      // WhatsApp number, digits only
    ctaLabel: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);