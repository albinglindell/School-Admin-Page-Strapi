module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6b1bc190183d0d34cc9cec3ae2f75e6d'),
  },
});
