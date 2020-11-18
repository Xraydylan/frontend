module.exports = {
  AUTH_URI:
    process.env.NODE_ENV === 'production' ? '/auth/' : 'http://localhost/auth/',
  API_URI:
    process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost/api/',

  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },

  AUTH_ENDPOINTS: {
    DEFAULT: '/',
    LOGIN: 'login',
    DELETE: 'unregister',
    REGISTER: 'register',
    USERS: 'USERS',
    INIT2FA: '2fa/init',
    VERIFY2FA: '2fa/verify',
    RESET2FA: '2fa/reset'
  },
  API_ENDPOINTS: {
    DATASETS: 'datasets',
    LABEL_DEFINITIONS: 'labelDefinitions',
    LABEL_TYPES: 'labelTypes',
    EXPERIMENTS: 'experiments'
  },

  generateRequest: generateRequest
};

function generateRequest(
  method = this.HTTP_METHODS.GET,
  baseUri = this.API_URI,
  endpoint = this.API_ENDPOINTS.DEFAULT,
  body = {}
) {
  return {
    method: method,
    url: baseUri + endpoint,
    data: body,
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

module.exports.generateApiRequest = (
  method = this.HTTP_METHODS.GET,
  baseUri = this.API_URI,
  endpoint = this.API_ENDPOINTS.DEFAULT,
  body = {}
) => {
  return {
    method: method,
    url: baseUri + endpoint,
    data: body,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
