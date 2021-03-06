export default  {
  apiUrl: process.env.VUE_APP_TWORK_API_BASE_URL,
  apiDocUrl: process.env.VUE_APP_TWORK_API_BASE_URL.replace("api/v1", "apidoc"),
  googleAuthProviderLink: process.env.VUE_APP_GOOGLE_AUTH_PROVIDER_LINK,
  isProduction: process.env.NODE_ENV == 'production',
  WebPushVapidPublicKey: process.env.VUE_APP_WEB_PUSH_VAPID_PUBLIC_KEY
};