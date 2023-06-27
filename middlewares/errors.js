const errors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере что-то пошло не так'
        : message,
    });
  next();
};

module.exports = errors;
