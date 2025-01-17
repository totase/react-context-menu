import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import MenuItem from "components/MenuItem";
import Separator from "components/Separator";
import { cloneChildren, getCursorPosition, validateWindowPosition } from "utils";
import { hideEvents } from "utils/constants";

import styles from "./styles.module.css";

interface ContextMenuProps {
  triggerId: string;
  children: ReactNode;
}

const ContextMenu = ({ triggerId, children }: ContextMenuProps) => {
  const [state, setState] = useState({
    active: false,
    position: { x: 0, y: 0 },
  })

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const show = useCallback(
    (event: MouseEvent) => {
      let position = getCursorPosition(event);
      position = validateWindowPosition(position, contextMenuRef.current);

      if (JSON.stringify(state.position) === JSON.stringify(position)) return;

      event.stopPropagation();
      event.preventDefault();

      setState({
        active: true,
        position,
      });
    },
    [state.position]
  );

  const hide = useCallback(() => {
    setState({
      active: false,
      position: { x: 0, y: 0 },
    });
  }, []);

  useEffect(() => {
    const { position } = state;
  
    if (state.active) setState((prev) => ({
      ...prev,
      position: validateWindowPosition(position, contextMenuRef.current),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.active]);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);

    if (trigger) trigger.addEventListener("contextmenu", show);
    if (state.active) {
      for (const event of hideEvents) window.addEventListener(event, hide);
    }

    return () => {
      trigger?.removeEventListener("contextmenu", show);

      for (const event of hideEvents) window.removeEventListener(event, hide);
    };
  }, [triggerId, state.active, state.position, show, hide]);

  if (!state.active) return null;

  return (
    <div
      className={styles.contextMenu}
      style={{
        left: state.position.x,
        top: state.position.y,
        opacity: 1,
      }}
      role="menu"
      ref={contextMenuRef}
    >
      {cloneChildren(children)}
    </div>
  );
};

ContextMenu.Item = MenuItem;
ContextMenu.Separator = Separator;

export default ContextMenu;
