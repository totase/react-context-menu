import { Children, cloneElement, ReactElement, ReactNode } from "react";
import { Position } from "types";

export const getCursorPosition = (e: MouseEvent) => {
  const pos = { x: e.clientX, y: e.clientY };

  if (!pos.x || pos.x < 0) pos.x = 0;
  if (!pos.y || pos.y < 0) pos.y = 0;

  return pos;
};

export const validateWindowPosition = (position: Position, element: HTMLDivElement | null) => {
  console.log(position, element);
  if (!element) return position;

  let { x, y } = position;

  const { innerWidth, innerHeight } = window;
  const { offsetWidth, offsetHeight } = element;

  if (x + offsetWidth > innerWidth) x -= x + offsetWidth - innerWidth;
  if (y + offsetHeight > innerHeight) y -= y + offsetHeight - innerHeight;

  return { x, y };
};

export const cloneChildren = (children: ReactNode) =>
  // Remove null items
  Children.map(Children.toArray(children).filter(Boolean), (item) =>
    cloneElement(item as ReactElement<any>)
  );
