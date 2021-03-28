const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: [
      {
        message: err.message || 'Erro interno no servidor',
      },
    ],
  });
};

module.exports = errorHandler;
