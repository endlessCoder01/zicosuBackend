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
  try {
    const nok = await nextOfKinService.getNokByReg(req.user.user.reg_number);
    res.json(nok);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createNok = async (req, res) => {
  try {
    const nok = {
        reg_number: req.user.user.reg_number,
        fullname: req.body.fullname,
        phone: req.body.phone, 
        address: req.body.address,
        email: req.body.email 
}
    const newNok = await nextOfKinService.createNok(nok);
    res.status(201).json(newNok);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNok = async (req, res) => {
  try {
    const updateUser = await nextOfKinService.updateNok(req.user.user.reg_number, req.body);
    res.status(201).json(updateUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
 createNok,
 getAllNoks,
 getNokById,
 getNokByReg,
updateNok
};
