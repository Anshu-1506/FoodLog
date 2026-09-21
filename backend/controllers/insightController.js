const {
  buildInsights
} = require('../services/insightService');
const getInsights = async (req, res, next) => {
  try {
    const days = parseInt(req.query.range) === 30 ? 30 : 7;
    const insights = await buildInsights(req.user._id, days, req.user.dailyGoals);
    res.json(insights);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getInsights
};