import { ReactNode } from 'react';

import './styles.css';

const StoryWrapper = ({ triggerId, children }: { triggerId: string; children: ReactNode }) => {
  return (
    <div className="story-wrapper">
      <p id={triggerId}>Right-click to trigger menu</p>

      {children}
    </div>
  );
};

export default StoryWrapper;
