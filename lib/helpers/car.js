let _config = {
  color: 'white'
};

const delegateProto = {
  create: function create(config) {
    _config = Object.assign(_config, config);
    return _config;
  },
  setColor: function setColor(color) {
    _config.color = color;
    return _config;
  }
};

export default function() {
  return Object.create(delegateProto)
}