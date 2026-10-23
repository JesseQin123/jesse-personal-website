import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Play, X } from "lucide-react";
import { voices, type Voice } from "./voices";

const still = (voice: Voice) => `/one-person-company/${voice.id}.jpg`;

const sourceHost = (voice: Voice) =>
  voice.youtubeId ? "YouTube" : voice.href.includes("linkedin") ? "LinkedIn" : "Yahoo Finance";

function VoiceDialog({ voice, onClose }: { voice: Voice | null; onClose: () => void }) {
  return (
    <Dialog.Root open={Boolean(voice)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        {voice && (
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[min(960px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 font-hero text-white focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-black">
              {voice.youtubeId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${voice.youtubeId}?start=${voice.start ?? 0}&autoplay=1&rel=0&modestbranding=1`}
                  title={`${voice.name}, ${voice.source}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <img src={still(voice)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              )}
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <Dialog.Title className="text-[22px] leading-snug sm:text-[26px]">“{voice.quote}”</Dialog.Title>
                <Dialog.Description className="mt-2 text-[15px] text-white/60">
                  {voice.name}, {voice.role} · {voice.source}
                  {voice.translated ? " · translated" : ""}
                </Dialog.Description>
              </div>
              <a
                href={voice.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-[15px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                Watch on {sourceHost(voice)} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <Dialog.Close
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </Dialog.Close>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const VoicesWall = () => {
  const [active, setActive] = useState<Voice | null>(null);

  return (
    <section aria-labelledby="voices-heading" className="bg-[#080808] pt-24 font-hero text-white sm:pt-32">
      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-10">
        <p className="text-[16px] text-white/50">Not just me</p>
        <h2 id="voices-heading" className="mt-3 max-w-[44rem] text-[36px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[56px]">
          The people building AI are saying it too
        </h2>
        <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.6] text-white/60">
          I cut these moments into the opening film for a Solo Unicorn event. Tap anyone to watch the original.
        </p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-[1440px] grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
        {voices.map((voice) => (
          <li key={voice.id}>
            <button
              type="button"
              onClick={() => setActive(voice)}
              className="group relative block aspect-square w-full overflow-hidden text-left focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6815]"
              aria-label={`${voice.name}: ${voice.quote}`}
            >
              <img
                src={still(voice)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/60" />
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="hidden text-[14px] leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:line-clamp-4">
                  “{voice.quote}”
                </span>
                <span className="mt-2 block text-[13px] font-medium leading-tight sm:text-[15px]">{voice.name}</span>
                <span className="mt-0.5 hidden text-[12px] leading-tight text-white/60 sm:block">
                  {voice.counterpoint ? "The skeptic · " : ""}
                  {voice.role}
                </span>
              </span>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <VoiceDialog voice={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default VoicesWall;
