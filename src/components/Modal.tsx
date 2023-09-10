import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  MouseEvent
} from "react";
import { TaskStatus, useToDoStore } from "../useToDoStore";

type ModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export function Modal({ setIsModalOpen }: ModalProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);

  const addTask = useToDoStore((state) => state.addTask);

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (taskTitle && taskStatus) addTask(taskTitle, taskStatus);
      setIsModalOpen(false);
    },
    [taskStatus, taskTitle, addTask, setIsModalOpen]
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
          X
        </button>

        <input
          className="input-modal"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          className="select-modal"
          value={taskStatus as TaskStatus}
          onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
        >
          <option value="">Select a status</option>
          <option value="toDo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button
          className="btn-modal"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
