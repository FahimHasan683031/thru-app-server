import admin from "firebase-admin";
import config from "../config";
import { logger } from "../shared/logger";

const serviceAccountJson = Buffer.from(config.firebase_service_account_base64!, "base64").toString("utf8");
const serviceAccount = JSON.parse(serviceAccountJson);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

type NotificationData = { [key: string]: string };

export const sendPushNotification = async (
  fcmToken: string,
  title: string,
  body: string,
  data: NotificationData,
  icon?: string
) => {
  const message: admin.messaging.Message = {
    token: fcmToken,
    notification: { title, body },
    data,
    ...(icon && {
      android: {
        notification: { icon },
      },
    }),
    apns: {
      payload: {
        aps: {
          'mutable-content': 1,
        },
      },
    },
  };

  try {
    const response = await admin.messaging().send(message);
    logger.info('Successfully sent message:', response);
  } catch (error: any) {
    logger.error('Error sending message:', error?.message, error);
  }
};

export const sendMulticastPushNotification = async (
  fcmTokens: string[],
  title: string,
  body: string,
  data: NotificationData,
  icon?: string
) => {
  if (!fcmTokens || fcmTokens.length === 0) return;

  const message: admin.messaging.MulticastMessage = {
    tokens: fcmTokens,
    notification: { title, body },
    data,
    ...(icon && {
      android: {
        notification: { icon },
      },
    }),
    apns: {
      payload: {
        aps: {
          'mutable-content': 1,
        },
      },
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    logger.info(`Successfully sent multicast message to ${response.successCount} users. Errors: ${response.failureCount}`);
  } catch (error: any) {
    logger.error('Error sending multicast message:', error?.message, error);
  }
};
