import { createContext } from 'react';

export interface ContextMenuContextProps {
  hide: () => void;
}

export const ContextMenuContext = createContext<ContextMenuContextProps | null>(null);
