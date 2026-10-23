import { AudioLines, Mic, type LucideIcon } from "lucide-react";

import profileImage from "@/assets/jesse-profile.jpg";
import jesseAiInverseIcon from "@/assets/brand/icons/inverse/jesse-ai.png";
import { cn } from "@/lib/utils";

export type JesseAvatarActivity = "idle" | "listening" | "speaking" | "thinking";

const STATUS = {
  idle: { icon: null, label: "Ready", iconClass: "text-emerald-300" },
  listening: { icon: Mic, label: "Listening", iconClass: "text-emerald-300" },
  speaking: { icon: AudioLines, label: "Speaking", iconClass: "text-orange-300" },
  thinking: { icon: null, label: "Thinking", iconClass: "text-orange-300" },
} satisfies Record<JesseAvatarActivity, { icon: LucideIcon | null; label: string; iconClass: string }>;

export default function JesseAvatarStage({ activity }: { activity: JesseAvatarActivity }) {
  const status = STATUS[activity];
  const StatusIcon = status.icon;
  const isActive = activity !== "idle";

  return (
    <div className="relative h-44 shrink-0 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <img
        src={jesseAiInverseIcon}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute left-[64%] top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-75 transition-opacity duration-300",
          isActive && "opacity-100",
        )}
      />
      <div
        className={cn(
          "absolute left-[34%] top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 bg-neutral-900 ring-2 ring-primary/40 transition",
          activity === "speaking" && "scale-105 ring-primary/70",
        )}
      >
        <img src={profileImage} alt="Jesse AI portrait" className="h-full w-full object-cover" />
      </div>

      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-900/90 px-2.5 py-1 text-[10px] font-medium text-white/70">
        {StatusIcon ? <StatusIcon className={cn("h-3 w-3", status.iconClass)} /> : <span className={cn("h-1.5 w-1.5 rounded-full bg-current", status.iconClass, isActive && "animate-pulse")} />}
        {status.label}
      </div>
    </div>
  );
}
