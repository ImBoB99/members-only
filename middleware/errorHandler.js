function notFoundHandler(req, res, next) {
  res.status(404).render('404');  // Render 404.ejs
}

function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode);

  if (statusCode === 404) {
    return res.render('404');
  }

  // For other errors, render 500.ejs
  res.render('500', { error: err });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};