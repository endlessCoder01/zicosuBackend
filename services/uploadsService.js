const uploadsModel = require('../models/uploadsModel');

const getUploads = async () => {
  return await uploadsModel.getAllUploads();
};

const getCount = async (id) => {
  const count = await uploadsModel.getDocCountById(id);
  if (!count) throw new Error('Documents not found');
  return count;
};

const createUpload = async (data) => {
  return await uploadsModel.createUpload(data);
};

module.exports = {
  createUpload,
  getUploads,
  getCount
};
