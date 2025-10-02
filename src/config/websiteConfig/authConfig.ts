export const authConfigs = {
  source: 'firebase', // firebase | mock | custom
  cookieName: 'imperator_admin_session',
  cookieSameSite: 'lax' as 'lax' | 'strict' | 'none',
  sessionRefreshInterval: 15 * 60 * 1000, // 15 minutes
  jwtSecret: process.env.AUTH_JWT_SECRET,
  jwtExpirationMs: 7 * 24 * 60 * 60 * 1000, // 7 days
};