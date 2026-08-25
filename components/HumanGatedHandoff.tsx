import "./HumanGatedHandoff.css";

import React from 'react';

/**
 * HumanGatedHandoff
 * 
 * Ported from Pass-1 Design Sandbox.
 * Represents a technical drawing of an AI-assisted workflow.
 * Relies on external CSS classes (.handoff-flow, .handoff-node, etc.)
 * configured in the Pass-1 design system.
 */

interface HumanGatedHandoffProps {
  variant?: 'light' | 'dark';
  showPublicLabel?: boolean;
  className?: string;
}

export const HumanGatedHandoff: React.FC<HumanGatedHandoffProps> = ({ 
  variant = 'light',
  showPublicLabel = true,
  className = ''
}) => {
  const isDark = variant === 'dark';
  const containerClass = `handoff ${isDark ? 'handoff-dark' : 'hero-handoff'} ${className}`.trim();

  return (
    <div className={containerClass} aria-label="Human-gated handoff">
      <div className="handoff-flow">
        
        <div className="handoff-node">
          <span aria-hidden="true">01</span>
          <b>Request + Scope</b>
        </div>
        
        <div className="handoff-node">
          <span aria-hidden="true">02</span>
          <b>AI-assisted role</b>
        </div>
        
        <div className="handoff-node">
          <span aria-hidden="true">03</span>
          <b>Specialist work</b>
        </div>
        
        <div className="handoff-node">
          <span aria-hidden="true">04</span>
          <b>Review + Evidence</b>
        </div>

        {/* Distinct Human Decision node (uses copper accent) */}
        <div className="handoff-node handoff-decision">
          <span aria-hidden="true">05</span>
          <b>Human decision</b>
        </div>
        
        <div className="handoff-node">
          <span aria-hidden="true">06</span>
          <b>Closeout</b>
        </div>
        
      </div>

      <div className="handoff-recovery" aria-label="Recovery path">
        <span>Recovery</span>
        <b>Review + Evidence</b>
        <span aria-hidden="true">↺ Specialist work</span>
      </div>

      <p className="handoff-note sr-only">Closeout follows the human decision. Recovery loops back to specialist work.</p>
      
      {showPublicLabel && (
        <p className="handoff-public-label">SIMPLIFIED PUBLIC-SAFE VIEW</p>
      )}
    </div>
  );
};

export default HumanGatedHandoff;
