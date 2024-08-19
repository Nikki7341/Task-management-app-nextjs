import React, { useState } from "react";
import { Container, Grid, Card, Typography, Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import AddIcon from "@mui/icons-material/Add";
import { moveTask } from "@/store/reducer";
import { TaskData, ModalType } from "@/modals/interfaces";
import { makeStyles } from "tss-react/mui";
import { Scrollbars } from "react-custom-scrollbars";
import NoRecordFound from "@/components/NoRecordFound";

const handleColumData = (status: string, d1: any, d2: any, d3: any) => {
  if (status === "todo") {
    return d1;
  } else if (status === "doing") {
    return d2;
  } else {
    return d3;
  }
};

const Home: React.FC = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const todoTask: TaskData[] = useSelector((state: any) => state.tasks.todo);
  const doingTask: TaskData[] = useSelector((state: any) => state.tasks.doing);
  const doneTask: TaskData[] = useSelector((state: any) => state.tasks.done);

  const [showModal, setShowModal] = useState<ModalType>({
    type: "To Do",
    isActive: false,
    action: "Add",
  });

  const [editTaskContent, setEditTaskContent] = useState<
    TaskData | undefined
  >();

  const handleAdd = (type: string, action: "Add" | "Update") => {
    setShowModal((prev) => ({
      ...prev,
      isActive: true,
      type: type === "todo" ? "To Do" : type === "doing" ? "Doing" : "Done",
      action,
    }));
  };

  const handleEdit = (data: TaskData) => {
    setEditTaskContent(data);
    handleAdd(data.status, "Update");
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId !== destination.droppableId ||
      source.index !== destination.index
    ) {
      dispatch(
        moveTask({
          id: parseInt(draggableId, 10),
          fromStatus: source.droppableId,
          toStatus: destination.droppableId,
        }),
      );
    }
  };

  return (
    <Container maxWidth={false} className={classes.mainContainer}>
      <TaskModal modalProps={showModal} editTaskContent={editTaskContent} />
      <Typography variant="h2" color="primary" align="center">
        Task Management
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {(["todo", "doing", "done"] as const).map((status) => (
            <Grid
              item
              md={4}
              sm={12}
              key={status}
              className={classes.taskColumns}
            >
              <Card className={classes.outerCard}>
                <Typography variant="h6">
                  {handleColumData(status, "To Do", "Doing", "Done")}
                </Typography>
                <Droppable droppableId={status}>
                  {(provided: any) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                      <Scrollbars
                        autoHide
                        style={{ height: "65vh" }}
                        autoHideTimeout={800}
                        autoHideDuration={200}
                      >
                        {handleColumData(status, todoTask, doingTask, doneTask)
                          .length ? (
                          handleColumData(
                            status,
                            todoTask,
                            doingTask,
                            doneTask,
                          ).map((item: TaskData, index: number) => (
                            <Draggable
                              draggableId={item.id.toString()}
                              index={index}
                              key={item.id}
                            >
                              {(provided: any) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard
                                    handleEdit={handleEdit}
                                    data={item}
                                  />
                                </Box>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <NoRecordFound />
                        )}
                        {provided.placeholder}
                      </Scrollbars>
                    </Box>
                  )}
                </Droppable>
                <Button
                  onClick={() => handleAdd(status, "Add")}
                  startIcon={<AddIcon />}
                  className={classes.addBtn}
                >
                  Add Task
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default Home;

const useStyles = makeStyles()((theme) => {
  return {
    addBtn: {
      textTransform: "none",
      fontSize: "16px",
      fontWeight: "600",
    },
    taskList: {
      height: "400px",
    },
    outerCard: {
      backgroundColor: "#ebecf0",
      margin: "20px",
      padding: "20px",
      borderRadius: "6px",
      // height: "78vh",
    },
    taskColumns: {
      // height: "100vh",
    },
    mainContainer: {
      height: "100vh",
      padding: "50px 100px",
      background:
        "linear-gradient(229deg, rgba(166,241,243,1) 35%, rgba(185,122,175,1) 50%, rgba(1,55,209,1) 100%)",
    },
  };
});
