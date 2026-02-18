
import React, { useState, useEffect, memo } from 'react';
import { animate } from 'framer-motion';

interface CountUpProps {
  value: number;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = memo(({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [value, duration]);

  return <>{displayValue.toLocaleString()}</>;
});

CountUp.displayName = 'CountUp';
