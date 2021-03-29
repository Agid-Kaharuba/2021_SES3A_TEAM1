export default {
  port: process.env.API_PORT,
  stage: process.env.STAGE,
  firebase: {
    serviceAccountPath: process.env.FIREBASE_SVC_PATH,
    dbUrl: process.env.FIREBASE_DB_URL,
    webApiKey: process.env.FIREBASE_WEB_API_KEY
  }
};
