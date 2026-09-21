const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Server error'
  });
};
module.exports = errorMiddleware;