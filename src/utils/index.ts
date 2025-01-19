import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import { Position } from 'types';

export const getCursorPosition = (e: MouseEvent): Position => {
  const position = { x: e.clientX, y: e.clientY };

  if (!position.x || position.x < 0) position.x = 0;
  if (!position.y || position.y < 0) position.y = 0;

  return position;
};

export const validateWindowPosition = (position: Position, element: HTMLDivElement | null) => {
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
  Children.map(Children.toArray(children).filter(Boolean), (item) => cloneElement(item as ReactElement<any>));
