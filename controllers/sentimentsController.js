const sentimentsService = require('../services/sentimentsService');

const getAllSentiments= async (req, res) => {
  try {
    const sentiments = await sentimentsService.getSentiments();
    res.json(sentiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteAll= async (req, res) => {
  try {
    const sentiments = await sentimentsService.deleteAll();
    res.json(sentiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSentimentsWithUsers= async (req, res) => {
  try {
    const sentiments = await sentimentsService.getAllSentimentsWithUsers();
    res.json(sentiments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSentimentById = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const sentiments = await sentimentsService.getSentiment(req.params.id);
    res.json(sentiments);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getSentimentByReg = async (req, res) => {
 
  try {

    const sentiments = await sentimentsService.getSentimentByReg(req.user.user.reg_number);
    res.json(sentiments);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


const createSentiment = async (req, res) => {
  try {
    const user = req.user;
    console.log("sentiment", user);
    const newSent = {
      reg_number: user.user.reg_number,
      sentiment: req.body.sentiment,
      upload_url: req.body.upload_url
    }
    
    console.log("newSent", newSent);

    const newSentiment = await sentimentsService.createSentiment(newSent);
    res.status(200).json(newSentiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSentiment = async (req, res) => {

  try {
    console.log("updating", req.params.sentId)
    const updateSent = await sentimentsService.updateSentiment(req.params.sentId, req.body);
    res.status(200).json(updateSent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
createSentiment,
getAllSentiments,
getSentimentById,
getSentimentByReg,
updateSentiment,
getAllSentimentsWithUsers,
deleteAll
};
