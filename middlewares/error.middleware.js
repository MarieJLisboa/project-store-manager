const midError = (err, _req, res, _next) => {
  res.locals.error = err;
  const status = err.status || 500;
  return res.status(status).json({ message: err.message });
};

module.exports = midError;