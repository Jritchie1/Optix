type ToastProps = {
    open: boolean;
    handleNotificationClose: () => void;
    notificationMessage: string | undefined;
}