import React, { useState, useRef, ReactNode } from 'react';

interface HoverDropdownProps {
  trigger: (isOpen: boolean) => ReactNode;
  content: ReactNode;
  minWidth?: string;
}

const HoverDropdown: React.FC<HoverDropdownProps> = ({
  trigger,
  content,
  minWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger(isOpen)}
      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full -mt-0.5 p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg shadow-2xl z-50 opacity-0 transition-opacity duration-300 pointer-events-auto"
          style={{ opacity: isOpen ? 1 : 0, minWidth: minWidth }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default HoverDropdown; 