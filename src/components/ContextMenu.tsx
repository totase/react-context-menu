import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'clsx';

import MenuItem from './MenuItem';
import Separator from './Separator';
import SubMenu from './SubMenu';
import { cloneChildren, getCursorPosition, validateWindowPosition } from '../utils';
import { Position } from 'types';

interface ContextMenuProps {
  triggerId: string;
  children: ReactNode;
  animateExit?: boolean;
}

interface ContextMenuState {
  active: boolean;
  leaving: boolean;
  position: Position;
}

const HIDE_ON_EVENTS: (keyof GlobalEventHandlersEventMap)[] = ['click', 'resize', 'scroll', 'contextmenu'];

const ContextMenu = ({ triggerId, children, animateExit = true }: ContextMenuProps) => {
  const [state, setState] = useState<ContextMenuState>({
    active: false,
    leaving: false,
    position: { x: 0, y: 0 },
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const show = useCallback(
    (event: MouseEvent) => {
      let position = getCursorPosition(event);
      position = validateWindowPosition(position, contextMenuRef.current);

      if (JSON.stringify(state.position) === JSON.stringify(position)) return;

      event.stopPropagation();
      event.preventDefault();

      setState((prev) => ({
        ...prev,
        active: true,
        position,
      }));
    },
    [state.position],
  );

  const hide = useCallback(() => {
    if (animateExit) {
      setState((prev) => ({
        ...prev,
        leaving: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        active: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnimationEnd = useCallback(() => {
    const { leaving, active } = state;

    if (leaving && active) {
      setState((prev) => ({
        ...prev,
        active: false,
        leaving: false,
      }));
    }
  }, [state]);

  useEffect(() => {
    const { position } = state;

    if (state.active)
      setState((prev) => ({
        ...prev,
        position: validateWindowPosition(position, contextMenuRef.current),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.active]);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);

    if (trigger) trigger.addEventListener('contextmenu', show);
    if (state.active) {
      for (const event of HIDE_ON_EVENTS) window.addEventListener(event, hide);
    }

    return () => {
      trigger?.removeEventListener('contextmenu', show);

      for (const event of HIDE_ON_EVENTS) window.removeEventListener(event, hide);
    };
  }, [triggerId, state.active, state.position, show, hide]);

  if (!state.active) return null;

  const classNames = cx('react-context-menu', {
    'react-context-menu--exit': state.leaving,
  });

  return (
    <div
      className={classNames}
      style={{
        left: state.position.x,
        top: state.position.y,
      }}
      role="menu"
      ref={contextMenuRef}
      onAnimationEnd={handleAnimationEnd}
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
