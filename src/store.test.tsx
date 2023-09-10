import { useEffect } from "react";
import { render } from "react-dom";
import { useStore } from "zustand";

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => {
    effect(items);
  }, [items]);

  return null;
}

test("should return default value at the start", () => {
  const selector = (store) => store.tasks;
  // mocked function
  const effect = vi.fn();
  // render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test("should add an item to the store and re-run the effect", () => {
  const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });

  // mocked function
  const effect = vi.fn().mockImplmentation((items) => {
    if (items.tasks.length === 0) {
      items.addTask("a", "b");
    }
  });

  // render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({ tasks: [{ title: "a", state: "b" }] })
  );
});
