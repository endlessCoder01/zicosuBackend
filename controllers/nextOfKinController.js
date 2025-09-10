const nextOfKinService = require('../services/nextOfKinService');

const getAllNoks = async (req, res) => {
  try {
    const noks = await nextOfKinService.getNoks();
    res.json(noks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNokById = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const nok = await nextOfKinService.getNok(req.params.id);
    res.json(nok);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getNokByReg = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const nok = await nextOfKinService.getNokByReg(req.params.id);
    res.json(nok);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createNok = async (req, res) => {
  try {
    const newNok = await nextOfKinService.createNok(req.body);
    res.status(201).json(newNok);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const updateUser = async (req, res) => {
//   const userId = req.params.id
//   try {
//     const updateUser = await nextOfKinService.updateUser(userId, req.body);
//     res.status(201).json(updateUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
 createNok,
 getAllNoks,
 getNokById,
 getNokByReg,
  // updateUser,
};
