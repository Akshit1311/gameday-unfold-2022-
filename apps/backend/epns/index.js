// Import the required packages
require("dotenv").config();
const EpnsSDK = require("@epnsproject/backend-sdk-staging").default;

// Define the parameters we would need in order to initialize the SDK
const CHANNEL_PK = process.env.METAMASK_PRIV_KEY;

console.log({ CHANNEL_PK });

// Initialise the SDK
const epnsSdk = new EpnsSDK(CHANNEL_PK);

const recipients = "0x15900c698ee356E6976e5645394F027F0704c8Eb";
const pushNotificationTitle = "Hi anj";
const pushNotificationBody = "Does this work";
const notificationTitle = "notificationTitle";
const notificationBody = "notificationBody";
const notificationType = 1;
const link = "http://localhost:3000";

const sendEpnsNotif = async () => {
  const response = await epnsSdk.sendNotification(
    recipients, //the recipients of the notification
    pushNotificationTitle, // push notification title
    pushNotificationBody, //push notification body
    notificationTitle, //the title of the notification
    notificationBody, //the body of the notification
    notificationType, //1 - for broadcast, 3 - for direct message, 4 - for subset.
    link //the CTA of the notification, the link which should be redirected to when they click on the notification
  );

  console.log({ response });
};

module.exports = sendEpnsNotif;
