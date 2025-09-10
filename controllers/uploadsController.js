const uploadsService = require("../services/uploadsService");

const getAllUploads = async (req, res) => {
  try {
    const uploads = await uploadsService.getUploads();
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUploadsByReg = async (req, res) => {
  try {
    const uploads = await uploadsService.getUploadByReg(req.params.id);
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCountById = async (req, res) => {
  console.log("id", req.params.id);
  try {
    const count = await uploadsService.getCount(req.params.id);
    res.json(count);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createUpload = async (req, res) => {
  try {
    const newUpload = await uploadsService.createUpload(req.body);
    res.status(201).json(newUpload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createUpload,
    getAllUploads,
    getCountById,
    getUploadsByReg,
};
