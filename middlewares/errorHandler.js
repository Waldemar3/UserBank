module.exports = (err, req, res, next) => {
    console.error(err.message);
  
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if (err.status === 404) {
      statusCode = 404;
    }
  
    res.status(statusCode).json({
      message: err.message
    });
  };
  