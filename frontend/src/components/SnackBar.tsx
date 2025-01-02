import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { Typography } from "@mui/material";

interface SnackBarProps {
    notification: {
        type: string;
        message: string;
    },
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