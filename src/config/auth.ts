const authConfig = {
  jwt: {
    secretToken: process.env.APP_JWT_SECRET,
    expiresInToken: '15m',
  },
};

export default authConfig;
