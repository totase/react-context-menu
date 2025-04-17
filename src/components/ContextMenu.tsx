import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import cx from 'clsx';

import MenuItem from './MenuItem';
import Separator from './Separator';
import SubMenu from './SubMenu';
import { cloneChildren, getCursorPosition, validateMenuPosition } from '../utils';
import { HIDE_ON_EVENTS } from '../constants';
import { Position } from '../types';

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The id of the element that will trigger the context menu
   */
  triggerId: string;
  /**
   * Whether to animate the exit of the context menu.
   *
   * Default: `true`
   */
  animateExit?: boolean;
  /**
   * The event that will trigger the context menu.
   *
   * Default: `contextmenu`
   */
  triggerEvent?: 'contextmenu' | 'click';
}

interface ContextMenuState {
  active: boolean;
  leaving: boolean;
  position: Position;
}

const ContextMenu = ({
  triggerId,
  children,
  className,
  triggerEvent = 'contextmenu',
  animateExit = true,
  ...rest
}: ContextMenuProps) => {
  const [state, setState] = useState<ContextMenuState>({ active: false, leaving: false, position: { x: 0, y: 0 } });

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const show = (event: MouseEvent) => {
    let position = getCursorPosition(event);
    position = validateMenuPosition(position, contextMenuRef.current);

    if (JSON.stringify(state.position) === JSON.stringify(position)) return;

    event.stopPropagation();
    event.preventDefault();

    setState((prev) => ({ ...prev, active: true, position }));
  };

  const hide = () => {
    if (animateExit) setState((prev) => ({ ...prev, leaving: true }));
    else setState((prev) => ({ ...prev, active: false }));
  };

  const handleAnimationEnd = () => {
    const { leaving, active } = state;

    if (leaving && active) setState((prev) => ({ ...prev, active: false, leaving: false }));
  };

  useEffect(() => {
    const { position } = state;

    if (state.active)
      setState((prev) => ({ ...prev, position: validateMenuPosition(position, contextMenuRef.current) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.active]);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);

    if (trigger) trigger.addEventListener(triggerEvent, show);
    if (state.active) {
      for (const event of HIDE_ON_EVENTS) window.addEventListener(event, hide);
    }

    return () => {
      trigger?.removeEventListener(triggerEvent, show);

      for (const event of HIDE_ON_EVENTS) window.removeEventListener(event, hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerId, state.active, state.position, show, hide]);

  if (!state.active) return null;

  const classNames = cx('react-context-menu', className, { 'react-context-menu--exit': state.leaving });

  return (
    <div
      {...rest}
      className={classNames}
      style={{ left: state.position.x, top: state.position.y }}
      role="menu"
      ref={contextMenuRef}
      onAnimationEnd={handleAnimationEnd}
      onClick={(event) => event.stopPropagation()}
      tabIndex={-1}
    >
      {cloneChildren(children, { hide })}
    </div>
  );
};

ContextMenu.Item = MenuItem;
ContextMenu.Separator = Separator;
ContextMenu.SubMenu = SubMenu;

export default ContextMenu;
