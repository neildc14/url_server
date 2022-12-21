const JSONResponse = (status_code, response) => {
  return function (req, res, next) {
    res.status(status_code).json(response);
    console.log(status_code);
  };
};

module.exports = { JSONResponse };
