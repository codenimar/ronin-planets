import React, { useState, useEffect } from 'react';
import { getCooldownRemaining } from '../../utils/helpers';

const CooldownTimer = ({ cooldownEnd, onComplete }) => {
  const [cooldown, setCooldown] = useState(() => getCooldownRemaining(cooldownEnd));

  useEffect(() => {
    if (!cooldownEnd) {
      return;
    }

    const updateCooldown = () => {
      const remaining = getCooldownRemaining(cooldownEnd);
      setCooldown(remaining);
      
      if (!remaining.isActive && onComplete) {
        onComplete();
      }
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);

    return () => clearInterval(interval);
  }, [cooldownEnd, onComplete]);

  if (!cooldown.isActive) {
    return <span className="text-green">Available</span>;
  }

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <span className="cooldown-timer text-orange">
      {pad(cooldown.hours)}:{pad(cooldown.minutes)}:{pad(cooldown.seconds)}
    </span>
  );
};

export default CooldownTimer;
