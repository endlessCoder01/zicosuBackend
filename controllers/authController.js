const authService = require("../services/authService");
const uploadsService = require("../services/uploadsService");

const register = async (req, res) => {
  try {
    const uploadData = {
      reg_number: req.body.reg_number,
      title: "profile",
      file_url: req.body.profilePic,
    };
    await uploadsService.createUpload(uploadData);

    const userData = {
      name: req.body.name,
      surname:req.body.surname,
      username:req.body.username,
      gender: req.body.gender,
      dob: req.body.dob,
      phone: req.body.phone,
      campus: req.body.campus,
      residential_location: req.body.residential_location,
      email: req.body.email,
      reg_number: req.body.reg_number,
      password: req.body.password,
    };

    const user = await authService.registerUser(userData);

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login, refreshToken };
