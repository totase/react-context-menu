import { ReactNode } from 'react';

import './styles.css';

const StoryWrapper = ({
  triggerId,
  children,
  triggerText = 'Right-click to trigger menu',
}: {
  triggerId: string;
  children: ReactNode;
  triggerText?: string;
}) => {
  return (
    <div className="story-wrapper">
      <p id={triggerId}>{triggerText}</p>

      {children}
    </div>
  );
};

export default StoryWrapper;
