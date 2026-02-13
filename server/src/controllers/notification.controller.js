import { Notification } from "../models/notifiation.model.js";
import asyncHandler from "../utils/asynchandler.js";

export const sendNotification = async (userIds, message, link) => {
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) return;

  try {
    const notifications = userIds.map((userId) => ({
      userId,
      message,
      link,
    }));

    // Bulk insert notifications
    await Notification.insertMany(notifications);
    console.log(`Sent notifications to ${userIds.length} users.`);

  } catch (err) {
    console.error("Error sending notifications:", err);
  }
}

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const notificationId = req.params.id;

  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (!notification.seen) {
    notification.seen = true;
    await notification.save();
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});

export const getUserNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .select("message link seen createdAt");
    console.log(notifications);
    
  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications,
  });
});