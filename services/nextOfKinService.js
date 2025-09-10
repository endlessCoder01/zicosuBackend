const nextOfKinModel = require('../models/nextOfKinModel');

const getNoks = async () => {
  return await nextOfKinModel.getAllNoks();
};


const getNok = async (id) => {
  const user = await nextOfKinModel.getNokById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const getNokByReg = async (id) => {
  const user = await nextOfKinModel.getNokByReg(id);
  if (!user) throw new Error('User not found');
  return user;
};


const createNok = async (nokData) => {
  return await nextOfKinModel.createNok(nokData);
};

// const updateUser = async (id, userData) => {
//   console.log("look",id);
//   console.log(userData)
//   return await nextOfKinModel.updateUser(id, userData);
// };

module.exports = {
getNok,
getNokByReg,
getNoks,
createNok,
};
