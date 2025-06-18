const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Password will be hashed before saving
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
