import { Task } from "./Task";
import { Modal } from "./Modal";
import { TaskStatus, useToDoStore } from "../useToDoStore";
import { useCallback, useMemo, useState } from "react";

type ColumnProps = {
  status: TaskStatus;
};

export function Column({ status }: ColumnProps) {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [droppingArea, setDroppingArea] = useState(false);

  // go to the store, and inside of it, just grab the tasks
  const { tasks, draggedTask, setDraggedTask, moveTask } = useToDoStore(
    (store) => ({
      tasks: store.tasks,
      draggedTask: store.draggedTask,
      setDraggedTask: store.setDraggedTask,
      moveTask: store.moveTask
    })
  );

  const filteredTasksByColumnStatus = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );

  return (
    <div
      // ADD THE CONDITIONAL STYLING HERE 44:28
      className={`column ${droppingArea ? "dropping-area" : ""}`}
      onDragOver={(e) => {
        setDroppingArea(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDroppingArea(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDroppingArea(false);
        moveTask(draggedTask, status);
        setDraggedTask(null);
        console.log("droped");
      }}
    >
      <div className="column-header">
        <h2>{status}</h2>

        <button
          className="button-add-column"
          onClick={() => setIsModelOpen(true)}
        >
          Add
        </button>
      </div>

      {filteredTasksByColumnStatus.map((task) => {
        return (
          <Task title={task.title} key={task.title} status={task.status} />
        );
      })}
      {isModalOpen && <Modal setIsModalOpen={setIsModelOpen} />}
    </div>
  );
}
