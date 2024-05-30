
class NotificationTypeChoices {
  static CREATED = "CREATED";
  static EXPIRED = "EXPIRED";
  static PAY = "PAY";
  static REQUEST_DELETE = "REQUEST_DELETE";
  static DELETE = "DELETE";
}
function handle_timestamp(create_at) {
  const time_stamp = new Date(create_at);
  const day = String(time_stamp.getDate()).padStart(2, '0');
  const month = String(time_stamp.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = time_stamp.getFullYear();
  return `${day}/${month}/${year}`;
}

class Notification {
  constructor(
    id,
    type,
    message,
    redirect_url,
    create_at,
    title,
    isRead
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.redirect_url = redirect_url;
    this.timestamp = handle_timestamp(create_at);
    this.title = title;
    this.isRead = isRead;
  }
}

function handleContentNotification(notification) {
  let message = "";
  let redirect_url = "";
  let title = ""; // Định nghĩa biến title

  if (notification.verb === NotificationTypeChoices.CREATED) {
    title = `Bài viết đã được tạo`;
    message = `Bài viết ${notification.redirectId} đã được tạo`;
    redirect_url = `/order/detail/${notification.redirectId}`;
  } else if (notification.verb === NotificationTypeChoices.EXPIRED) {
    title = `Bài viết hết hạn`;
    message = `Bài viết ${notification.redirectId} đã hết hạn`;
    redirect_url = `/order/detail/${notification.redirectId}`;
  } else if (notification.verb === NotificationTypeChoices.PAY) {
    title = `Thanh toán thành công`;
    message = `Thanh toán thành công bài viết ${notification.redirectId}`;
    redirect_url = `/order/detail/${notification.redirectId}`;
  } else if (notification.verb === NotificationTypeChoices.DELETE) {
    title = `Bài viết bị xóa`;
    message = `Bài viết ${notification.redirectId} đã bị xóa`;
    redirect_url = `/order/detail/${notification.redirectId}`;
  } else if (notification.verb === NotificationTypeChoices.REQUEST_DELETE) {
    if (notification.redirectType && notification.redirectType.includes("POST")) {
      title = `Yêu cầu xóa bài viết`;
      message = `Yêu cầu xóa bài viết ${notification.redirectId}`;
      redirect_url = `/admin/posts/${notification.redirectId}`;
    }
    if (notification.redirectType && notification.redirectType.includes("ACCOUNT")) {
      title = `Yêu cầu khóa tài khoản`;
      message = `Yêu cầu xóa tài khoản ${notification.redirectId}`;
      redirect_url = `/admin/accounts/${notification.redirectId}`;
    }
  }

  return new Notification(
    notification.id,
    notification.verb, // Đảm bảo type đúng
    message,
    redirect_url,
    notification.createAt, // Sử dụng đúng createAt
    title,
    notification.isRead
  );
}

export default handleContentNotification;
