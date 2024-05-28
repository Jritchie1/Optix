export type ModalProps = {
    open: boolean
    currentRow?: FormattedMovie;
    handleOpen: () => void;
    handleClose: () => void;
    handleNotificationOpen: () => void;
    handleNotificationClose: () => void;
    setNotificationMessage: () => void;
}