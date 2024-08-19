import { Card, Typography, Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { makeStyles } from "tss-react/mui";
import { pallete, styles } from "@/styles/ThemeRegistry";
import { deleteTask } from "@/store/reducer";
import { useDispatch } from "react-redux";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
interface TaskData {
  name: string;
  description: string;
  status: "todo" | "done" | "doing";
  id: number;
  date: string;
}
interface Modal {
  type: "To Do" | "Doing" | "Done";
  isActive: boolean;
  action: "Add" | "Update";
}

const TaskCard = ({
  data,
  handleEdit
}: {
  data: TaskData;
  handleEdit: any
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const task = {
      id: data.id,
      status: data.status,
    };
    dispatch(deleteTask(task));
  };

  return (
    <Card className={classes.mainCard}>
      <Box className={classes.upperBox}>
        <Typography variant="h6" sx={{ margin: "auto 0" }}>
          {data.name}
        </Typography>
        <Box>
          <Tooltip title="Edit Task" arrow>
            <IconButton onClick={() => handleEdit(data)}>
              <EditRoundedIcon sx={{ color: pallete.parimayBlue }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task" arrow>
            <IconButton onClick={handleDelete}>
              <DeleteRoundedIcon sx={{ color: pallete.selections.red }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Typography variant="body1">{data.description}</Typography>
      <Box className={classes.dateBox}>
        <Typography variant="subtitle1">{formatDate(data.date)}</Typography>
      </Box>
    </Card>
  );
};

export default TaskCard;

const useStyles = makeStyles()((theme) => {
  return {
    upperBox: {
      ...styles.flexRowSpacedBw,
    },
    dateBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    mainCard: {
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      margin: "15px 0",
      padding: "15px",
      cursor: "pointer",
      "&:hover": {
        boxShadow:
          "0 6px 10px rgba(0, 0, 0, 0.1), 0 1px 18px rgba(0, 0, 0, 0.08), 0 3px 5px rgba(0, 0, 0, 0.12)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      },
    },
  };
});
