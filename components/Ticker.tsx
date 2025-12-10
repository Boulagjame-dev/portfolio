import React from 'react';

interface TickerProps {
  text: string;
  reverse?: boolean;
}

export const Ticker: React.FC<TickerProps> = ({ text, reverse = false }) => {
  return (
    <div className="w-full overflow-hidden bg-lumina-accent text-lumina-bg py-3 font-display font-bold tracking-widest uppercase select-none relative z-20">
      <div className={`whitespace-nowrap flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
};