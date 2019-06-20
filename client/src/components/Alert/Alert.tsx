import React, { useEffect } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  isOpen: boolean;
}

const Alert: React.FC<Props> = ({ isOpen }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center"
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    setState({ ...state, open: true });
  }, [isOpen]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
};
export default Alert;
