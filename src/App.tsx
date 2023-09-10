import "./styles.css";
import { Column } from "./components/Column";

export default function App() {
  return (
    <div className="App">
      <Column status="toDo" />
      <Column status="doing" />
      <Column status="done" />
    </div>
  );
}
