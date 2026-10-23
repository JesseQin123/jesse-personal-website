import { ProfileContact, ProfileFooter } from "@/components/profile/ProfileContact";
import { ProfileFocus } from "@/components/profile/ProfileFocus";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileSnapshot } from "@/components/profile/ProfileSnapshot";
import { ProfileServices } from "@/components/profile/ProfileServices";
import { ProfileWork } from "@/components/profile/ProfileWork";

const PublicProfileHomepage = () => (
  <div id="top" className="min-h-[100dvh] bg-[hsl(var(--profile-surface))] text-[hsl(var(--profile-ink))] lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] min-[1400px]:grid-cols-[340px_minmax(0,1fr)]">
    <a className="sr-only z-[60] bg-[hsl(var(--profile-surface-elevated))] px-4 py-3 font-bold text-[hsl(var(--profile-ink))] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--profile-accent))]" href="#main-content">
      Skip to main content
    </a>
    <ProfileSidebar />
    <div className="min-w-0 bg-[hsl(var(--profile-surface-elevated))]">
      <ProfileHeader />
      <main id="main-content">
        <ProfileHero />
        <ProfileWork />
        <ProfileSnapshot />
        <ProfileServices />
        <ProfileFocus />
        <ProfileContact />
      </main>
      <ProfileFooter />
    </div>
  </div>
);

export default PublicProfileHomepage;
