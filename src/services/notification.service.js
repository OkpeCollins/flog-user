import * as Notifications from "expo-notifications";
import { getFromStorage, saveToStorage } from "./localStorage.service";

const sendNotificationImmediately = async (title, body, data) => {
  let notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
  //console.log(notificationId); // can be saved in AsyncStorage or send to server
  let notificationData = {
    id: notificationId,
    title,
    body,
  }
  getFromStorage('notification')
    .then((response) => {
      if (response !== null) {
        saveToStorage('notification', notificationData)
      } else {
        let newNotificationData = [...response, notificationData]
        saveToStorage('notification', newNotificationData)
      }
    })
  .catch(error => console.log(error))
};

export const notificationService= {
  sendNotificationImmediately,
}