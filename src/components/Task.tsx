import { useToDoStore } from "../useToDoStore";

type TaskProps = {
  title: string;
  status: "toDo" | "doing" | "done" | null;
};

export function Task({ title, status }: TaskProps) {
  const { removeTask, setDraggedTask } = useToDoStore((state) => ({
    removeTask: state.removeTask,
    setDraggedTask: state.setDraggedTask
  }));

  function handleDelete(title: string) {
    removeTask(title);
  }

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(title)}>
      <h4>{title}</h4>

      <div className="task-buttons">
        <button onClick={() => handleDelete(title)}>Delete</button>
      </div>

      <div className="bottomWrapper">
        <div></div>
        <div className={`status-container ${status}`}>{status}</div>
      </div>
    </div>
  );
}
