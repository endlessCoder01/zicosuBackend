const documentModel = require('../models/documentModel');

const getDocuments = async () => {
  return await documentModel.getAllDocuments();
};

const getCount = async (id) => {
  const count = await documentModel.getDocCountById(id);
  if (!count) throw new Error('Documents not found');
  return count;
};

const createDocument = async (documentData) => {
  return await documentModel.createDocument(documentData);
};

module.exports = {
  createDocument,
  getDocuments,
  getCount
};
