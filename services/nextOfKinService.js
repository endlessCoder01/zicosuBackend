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
  console.log("now", id)
  const user = await nextOfKinModel.getNokByReg(id);
  if (!user) throw new Error('User not found');
  return user;
};


const createNok = async (nokData) => {
  return await nextOfKinModel.createNok(nokData);
};

const updateNok = async (id, Data) => {
  console.log("look",id);
  console.log(Data)
  return await nextOfKinModel.updateNok(id, Data);
};

module.exports = {
getNok,
getNokByReg,
getNoks,
createNok,
updateNok
};
