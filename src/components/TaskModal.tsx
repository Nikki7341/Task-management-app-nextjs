import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { styles } from "@/styles/ThemeRegistry";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "@/store/reducer";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
};
interface Modal {
  type: "To Do" | "Doing" | "Done";
  isActive: boolean;
  action: "Add" | "Update";
}

interface FormValue {
  name: string;
  description: string;
}

function TaskModal({
  modalProps,
  editTaskContent,
}: Readonly<{ modalProps: Modal; editTaskContent: any }>) {
  const [open, setOpen] = React.useState(false);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setOpen(modalProps.isActive);
  }, [modalProps]);

  const handleClose = () => setOpen(false);

  const handleTask = (value: FormValue) => {
    if (modalProps.action === "Add") {
      addNewTask(value);
    } else {
      updateTask(value);
    }
  };

  const addNewTask = (value: FormValue) => {
    const newTask = {
      name: value.name,
      description: value.description,
      status: modalProps.type.split(" ").join("").toLocaleLowerCase(),
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    // @ts-ignore
    dispatch(addTask(newTask));
    handleClose();
  };

  const updateTask = (value: FormValue) => {
    const updatedValue = {
      name: value.name,
      description: value.description,
      status: modalProps.type.split(" ").join("").toLocaleLowerCase(),
      id: editTaskContent.id,
      date: editTaskContent.date,
    };
    // @ts-ignore
    dispatch(editTask(updatedValue));
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      // onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Formik
            initialValues={{
              name: editTaskContent ? editTaskContent.name : "",
              description: editTaskContent ? editTaskContent.description : "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: any) => {
              console.log(values);
              handleTask(values);
            }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              values,
            }: any) => (
              <Box className={classes.inputOuterBox}>
                <Typography variant="h6">{`${modalProps.action} ${modalProps.type} Task`}</Typography>
                <TextField
                  className={classes.inputField}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  InputLabelProps={{
                    className:
                      touched.name && errors.name ? classes.errorLabel : "",
                  }}
                />
                <TextField
                  className={classes.inputField}
                  multiline={true}
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  rows={3}
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  InputLabelProps={{
                    className:
                      touched.name && errors.name ? classes.errorLabel : "",
                  }}
                />
                <Box className={classes.btnsBox}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    className={classes.addBtn0}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.addBtn1}
                  >{`${modalProps.action}`}</Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}

export default React.memo(TaskModal);

const useStyles = makeStyles()((theme) => {
  return {
    errorLabel: {},
    inputField: {
      margin: "10px 0",
    },
    btnsBox: {
      ...styles.flexRowSpacedBw,
    },
    inputOuterBox: {
      display: "flex",
      flexDirection: "column",
    },
    addBtn0: {
      fontSize: "16px",
      padding: "10px 0",
      margin: "20px 0",
      width: "100%",
      textTransform: "none",
      marginRight: "5px",
    },
    addBtn1: {
      fontSize: "16px",
      padding: "10px 0",
      margin: "20px 0",
      width: "100%",
      textTransform: "none",
      marginLeft: "5px",
    },
  };
});
