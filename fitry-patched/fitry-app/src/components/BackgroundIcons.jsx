import {
  Code2,
  Braces,
  Terminal,
  Trophy,
  Cpu,
  Bug,
  GitBranch,
  Hash,
  Star,
  Zap,
} from 'lucide-react';
import './BackgroundIcons.css';

/**
 * Site-wide decorative background.
 * Statically scattered, low-opacity coding icons tied to the
 * existing green theme. Sits at -z-1, pointer-events:none, so it
 * never interferes with content or clicks.
 *
 * Mounted once near the top of <App /> — every page inherits it.
 */
const ICONS = [
  // Top band
  { Icon: Code2,     top: '6%',  left: '4%',  size: 92,  rotate: -14 },
  { Icon: Braces,    top: '9%',  left: '88%', size: 70,  rotate: 12 },
  { Icon: Hash,      top: '14%', left: '46%', size: 54,  rotate: 6 },

  // Upper-mid band
  { Icon: Terminal,  top: '24%', left: '16%', size: 80,  rotate: -8 },
  { Icon: Trophy,    top: '22%', left: '72%', size: 86,  rotate: 10 },
  { Icon: Star,      top: '32%', left: '40%', size: 60,  rotate: -4 },

  // Middle band
  { Icon: Cpu,       top: '44%', left: '6%',  size: 100, rotate: 16 },
  { Icon: GitBranch, top: '40%', left: '58%', size: 64,  rotate: -12 },
  { Icon: Zap,       top: '48%', left: '90%', size: 72,  rotate: 8 },

  // Lower-mid band
  { Icon: Bug,       top: '60%', left: '24%', size: 58,  rotate: 14 },
  { Icon: Code2,     top: '64%', left: '78%', size: 80,  rotate: -10 },
  { Icon: Braces,    top: '72%', left: '8%',  size: 92,  rotate: 4 },

  // Bottom band
  { Icon: Trophy,    top: '82%', left: '52%', size: 64,  rotate: -6 },
  { Icon: Hash,      top: '88%', left: '20%', size: 50,  rotate: 18 },
  { Icon: Terminal,  top: '90%', left: '84%', size: 78,  rotate: -14 },
];

export default function BackgroundIcons() {
  return (
    <div className="bg-icons" aria-hidden="true">
      {ICONS.map(({ Icon, top, left, size, rotate }, i) => (
        <Icon
          key={i}
          size={size}
          strokeWidth={1.25}
          className="bg-icon"
          style={{
            top,
            left,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
