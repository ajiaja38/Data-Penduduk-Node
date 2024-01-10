module.exports = response = {
  success: (code, message) => ({
    code,
    message,
  }),
  successWithData: (code, message, data) => ({
    code,
    message,
    data,
  }),
  error: (code, message) => ({
    code,
    message,
  }),
};
