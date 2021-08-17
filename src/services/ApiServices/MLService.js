const apiConsts = require('./ApiConstants');
const ax = require('axios');
const axios = ax.create();

module.exports.getParameters = () => {
  return new Promise((resolve, reject) => {
    axios(
      apiConsts.generateApiRequest(
        apiConsts.HTTP_METHODS.GET,
        apiConsts.ML_URI,
        apiConsts.ML_ENDPOINTS.PARAMETERS
      )
    )
      .then(result => resolve(result.data))
      .catch(err => {
        console.log(err.response);
        reject(err.response);
      });
  });
};
