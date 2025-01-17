import { MenuItemProps } from "components/MenuItem";
import { Children, cloneElement, ReactElement, ReactNode } from "react";

export const getCursorPosition = (e: MouseEvent) => {
  const pos = { x: e.clientX, y: e.clientY };

  if (!pos.x || pos.x < 0) pos.x = 0;
  if (!pos.y || pos.y < 0) pos.y = 0;

  return pos;
};

export const cloneChildren = (children: ReactNode, props?: MenuItemProps) =>
  // Remove null items
  Children.map(Children.toArray(children).filter(Boolean), (item) =>
    cloneElement(item as ReactElement<any>, props)
  );
