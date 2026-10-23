const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jesseqin-phd/" },
  { label: "GitHub", href: "https://github.com/JesseQin123" },
  { label: "X", href: "https://x.com/jesseqin_" },
];

const linkClass =
  "text-[#080808] underline decoration-[#8A8792]/50 underline-offset-[3px] transition-colors hover:decoration-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const HomeClosing = () => (
  <section
    id="contact"
    aria-labelledby="closing-heading"
    className="bg-white px-5 pb-10 pt-24 font-hero text-[#080808] sm:px-[8vw] sm:pt-32"
  >
    <div className="max-w-[34rem]">
      <h2 id="closing-heading" className="text-[36px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[48px]">
        Building context systems for people and AI agents
      </h2>
      <p className="mt-6 text-[17px] leading-[1.6] text-[#5B5864]">
        I&apos;m the founder of Solo Unicorn Lab, based in New York. More projects will show up here as they ship.
        Until then, find me on{" "}
        {links.map((link, i) => (
          <span key={link.label}>
            <a className={linkClass} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {i < links.length - 2 ? ", " : i === links.length - 2 ? " or " : ""}
          </span>
        ))}
        , or write to{" "}
        <a className={linkClass} href="mailto:jesse@solounicorn.club">
          jesse@solounicorn.club
        </a>
        .
      </p>
    </div>

    <p className="mt-28 text-[14px] text-[#8A8792] sm:mt-40">© {new Date().getFullYear()} Jesse Qin</p>
  </section>
);

export default HomeClosing;
