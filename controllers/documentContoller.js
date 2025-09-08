const documentService = require("../services/documentService");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCountById = async (req, res) => {
  console.log("id", req.params.id);
  try {
    const count = await documentService.getCount(req.params.id);
    res.json(count);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const newDoc = await documentService.createDocument(req.body);
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDocuments,
  getCountById,
  createDocument,
};
