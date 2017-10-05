let _config = {
  age: 3000
};

const delegateProto = {
  create: function create(config) {
    _config = Object.assign(_config, config);
    return _config;
  },
  get: function get() {
    _config.age = 6000;
    return _config;
  },
  post: function post() {
    _config.age = 7000;
    return _config;
  }
};

export default Object.create(delegateProto);