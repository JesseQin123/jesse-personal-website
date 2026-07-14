import { AudioLines, Bot, Mic, Sparkles } from "lucide-react";

import profileImage from "@/assets/jesse-profile.jpg";
import { cn } from "@/lib/utils";

export type JesseAvatarActivity = "idle" | "listening" | "speaking" | "thinking";

const STATUS = {
  idle: { icon: Bot, label: "Ready", iconClass: "text-emerald-300" },
  listening: { icon: Mic, label: "Listening", iconClass: "text-emerald-300" },
  speaking: { icon: AudioLines, label: "Speaking", iconClass: "text-orange-300" },
  thinking: { icon: Sparkles, label: "Thinking", iconClass: "text-orange-300" },
} satisfies Record<JesseAvatarActivity, { icon: typeof Bot; label: string; iconClass: string }>;

export default function JesseAvatarStage({ activity }: { activity: JesseAvatarActivity }) {
  const status = STATUS[activity];
  const StatusIcon = status.icon;
  const isActive = activity !== "idle";

  return (
    <div className="relative h-44 shrink-0 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.34),transparent_52%)]" />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 transition-all duration-500",
          isActive && "scale-125 border-primary/60 opacity-80",
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 transition-all duration-700",
          isActive && "animate-spin [animation-duration:8s]",
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-white/10 shadow-2xl shadow-primary/30 transition",
          activity === "speaking" && "scale-105 ring-primary/60",
        )}
      >
        <img src={profileImage} alt="Jesse AI portrait" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-neutral-950/70 to-transparent" />
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1" aria-hidden="true">
        {[8, 14, 22, 12, 26, 18, 10].map((height, index) => (
          <span
            key={index}
            className={cn("w-1 rounded-full bg-primary/55 transition-all", isActive && "animate-pulse")}
            style={{ height: isActive ? height : 3, animationDelay: `${index * 90}ms` }}
          />
        ))}
      </div>
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/70 backdrop-blur">
        <StatusIcon className={cn("h-3 w-3", status.iconClass)} /> {status.label}
      </div>
    </div>
  );
}
