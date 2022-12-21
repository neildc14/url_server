const userInputValidator = (response) => {
  return function (req, res, next) {
    res.status(400).json(response);
  };
};

module.exports = userInputValidator;
