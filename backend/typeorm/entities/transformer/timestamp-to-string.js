const timestampToString = {
  to: (output) => output,
  from: (output) => (output === null ? null : new Date(output)),
};

module.exports = { timestampToString };
