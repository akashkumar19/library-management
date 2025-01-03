import { Typography } from "@mui/material";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { NotificationModel } from "../core/models";

interface SnackBarProps {
    notification: NotificationModel,
    setNotification: (notification: any) => void;
}
const SnackBar = ({notification, setNotification}: SnackBarProps) => {
  setTimeout(() => {
    setNotification(null);
  }, 5000);
  return (
    <NotificationGroup style={{ top: 70, right: 0, alignItems: "flex-end", zIndex: 1000 }}>
      <Notification
            type={{
              style: notification.type === "success" ? "success" : "error",
              icon: true,
            }}
            closable={true}
            onClose={() => setNotification(null)}
            >
            <Typography>{notification.message}</Typography>
      </Notification>
    </NotificationGroup>
  )
}

export default SnackBar;