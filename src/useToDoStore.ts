import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TaskStatus = "toDo" | "doing" | "done";

type Task = {
  title: string;
  status: TaskStatus | null;
};

type ToDoStore = {
  tasks: Task[];
  addTask: (title: string, status: TaskStatus) => void;
  removeTask: (title: string) => void;

  draggedTask: string | null;
  setDraggedTask: (title: string | undefined) => void;
  moveTask: (title: string, newState: TaskStatus) => void;
};

const createStore = (set) => ({
  tasks: [],

  draggedTask: "",

  addTask: (title, status) =>
    set(
      (state) => ({
        tasks: [...state.tasks, { title, status }]
      }),
      false,
      "addTask"
    ),

  removeTask: (title) =>
    set(
      (state) => ({
        tasks: state.tasks.filter((task) => task.title !== title)
      }),
      false,
      "removeTask"
    ),

  setDraggedTask: (title) => set({ draggedTask: title }),

  moveTask: (title: string, newState: TaskStatus) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { ...task, status: newState } : task
        )
      }),
      false,
      "moveTask"
    )
});

export const useToDoStore = create<ToDoStore>(
  persist(devtools(createStore, "ToDoStore"), { name: "toDoStore" })
);
