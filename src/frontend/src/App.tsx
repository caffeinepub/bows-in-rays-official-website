import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronRight,
  Download,
  Dumbbell,
  ExternalLink,
  Gamepad2,
  Menu,
  Search,
  Sword,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Game = { name: string; url?: string };
type SportsGame = { name: string; url: string };

const romsfunBase: Record<string, string> = {
  ps1: "https://romsfun.com/roms/playstation",
  ps2: "https://romsfun.com/roms/playstation-2",
  psp: "https://romsfun.com/roms/psp",
  dreamcast: "https://romsfun.com/roms/dreamcast",
  switch: "https://romsfun.com/roms/nintendo-switch",
  gamecube: "https://romsfun.com/roms/gamecube",
};

const consoleLibraries: {
  id: string;
  name: string;
  fullName: string;
  color: string;
  accent: string;
  games: Game[];
}[] = [
  {
    id: "ps1",
    name: "PS1",
    fullName: "PlayStation 1",
    color: "#3B82F6",
    accent: "blue",
    games: [
      {
        name: "FIFA 2001",
        url: "https://romsfun.com/roms/playstation/fifa-2001.html",
      },
      {
        name: "WWE SmackDown! (SmackDown 1)",
        url: "https://romsfun.com/roms/playstation/wwf-smackdown.html",
      },
      {
        name: "WWE SmackDown! 2: Know Your Role",
        url: "https://romsfun.com/roms/playstation/wwf-smackdown-2-know-your-role.html",
      },
      {
        name: "Brian Lara Cricket",
        url: "https://romsfun.com/roms/playstation/brian-lara-cricket.html",
      },
      {
        name: "ISS Pro Evolution",
        url: "https://romsfun.com/roms/playstation/iss-pro-evolution.html",
      },
      {
        name: "WCW/nWo Thunder",
        url: "https://romsfun.com/roms/playstation/wcw-nwo-thunder.html",
      },
      {
        name: "WWE Attitude",
        url: "https://romsfun.com/roms/playstation/wwf-attitude.html",
      },
    ],
  },
  {
    id: "ps2",
    name: "PS2",
    fullName: "PlayStation 2",
    color: "#8B5CF6",
    accent: "purple",
    games: [
      // FIFA Series
      {
        name: "FIFA Football 2001",
        url: "https://romsfun.com/roms/playstation-2/fifa-football-2001.html",
      },
      {
        name: "FIFA Football 2002",
        url: "https://romsfun.com/roms/playstation-2/fifa-football-2002.html",
      },
      {
        name: "FIFA Football 2003",
        url: "https://romsfun.com/roms/playstation-2/fifa-football-2003.html",
      },
      {
        name: "FIFA Football 2004",
        url: "https://romsfun.com/roms/playstation-2/fifa-football-2004.html",
      },
      {
        name: "FIFA Football 2005",
        url: "https://romsfun.com/roms/playstation-2/fifa-football-2005.html",
      },
      {
        name: "FIFA 06",
        url: "https://romsfun.com/roms/playstation-2/fifa-06.html",
      },
      {
        name: "FIFA 07",
        url: "https://romsfun.com/roms/playstation-2/fifa-07.html",
      },
      {
        name: "FIFA 08",
        url: "https://romsfun.com/roms/playstation-2/fifa-08.html",
      },
      {
        name: "FIFA 09",
        url: "https://romsfun.com/roms/playstation-2/fifa-09.html",
      },
      {
        name: "FIFA 10",
        url: "https://romsfun.com/roms/playstation-2/fifa-10.html",
      },
      {
        name: "FIFA Street",
        url: "https://romsfun.com/roms/playstation-2/fifa-street.html",
      },
      {
        name: "FIFA Street 2",
        url: "https://romsfun.com/roms/playstation-2/fifa-street-2.html",
      },
      {
        name: "FIFA Street 3",
        url: "https://romsfun.com/roms/playstation-2/fifa-street-3.html",
      },
      // FIFA World Cup Series
      {
        name: "2002 FIFA World Cup",
        url: "https://romsfun.com/roms/playstation-2/2002-fifa-world-cup.html",
      },
      {
        name: "2006 FIFA World Cup Germany",
        url: "https://romsfun.com/roms/playstation-2/2006-fifa-world-cup-germany.html",
      },
      {
        name: "2010 FIFA World Cup South Africa",
        url: "https://romsfun.com/roms/playstation-2/2010-fifa-world-cup-south-africa.html",
      },
      // Pro Evolution Soccer Series
      {
        name: "Pro Evolution Soccer (PES 1)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer.html",
      },
      {
        name: "Pro Evolution Soccer 2 (PES 2)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-2.html",
      },
      {
        name: "Pro Evolution Soccer 3 (PES 3)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-3.html",
      },
      {
        name: "Pro Evolution Soccer 4 (PES 4)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-4.html",
      },
      {
        name: "Pro Evolution Soccer 5 (PES 5)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-5.html",
      },
      {
        name: "Pro Evolution Soccer 6 (PES 6)",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-6.html",
      },
      {
        name: "PES 2008",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-2008.html",
      },
      {
        name: "PES 2009",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-2009.html",
      },
      {
        name: "PES 2010",
        url: "https://romsfun.com/roms/playstation-2/pro-evolution-soccer-2010.html",
      },
      // WWE
      {
        name: "WWE SmackDown vs Raw 2006",
        url: "https://romsfun.com/roms/playstation-2/wwe-smackdown-vs-raw-2006.html",
      },
      {
        name: "WWE SmackDown! Here Comes the Pain",
        url: "https://romsfun.com/roms/playstation-2/wwe-smackdown-here-comes-the-pain.html",
      },
      // Cricket
      {
        name: "Brian Lara International Cricket 2005",
        url: "https://romsfun.com/roms/playstation-2/brian-lara-international-cricket-2005.html",
      },
      {
        name: "EA Cricket 2005",
        url: "https://romsfun.com/roms/playstation-2/ea-cricket-2005.html",
      },
    ],
  },
  {
    id: "psp",
    name: "PSP",
    fullName: "PlayStation Portable",
    color: "#10B981",
    accent: "green",
    games: [
      // FIFA Series
      {
        name: "FIFA Football (PSP Launch)",
        url: "https://romsfun.com/roms/psp/fifa-football.html",
      },
      {
        name: "FIFA 06",
        url: "https://romsfun.com/roms/psp/fifa-06.html",
      },
      {
        name: "FIFA 07",
        url: "https://romsfun.com/roms/psp/fifa-07.html",
      },
      {
        name: "FIFA 08",
        url: "https://romsfun.com/roms/psp/fifa-08.html",
      },
      {
        name: "FIFA 09",
        url: "https://romsfun.com/roms/psp/fifa-09.html",
      },
      {
        name: "FIFA 10",
        url: "https://romsfun.com/roms/psp/fifa-10.html",
      },
      {
        name: "FIFA 11",
        url: "https://romsfun.com/roms/psp/fifa-11.html",
      },
      {
        name: "FIFA 12",
        url: "https://romsfun.com/roms/psp/fifa-12.html",
      },
      {
        name: "FIFA 13",
        url: "https://romsfun.com/roms/psp/fifa-13.html",
      },
      {
        name: "FIFA 14",
        url: "https://romsfun.com/roms/psp/fifa-14.html",
      },
      // FIFA World Cup Series
      {
        name: "2006 FIFA World Cup Germany",
        url: "https://romsfun.com/roms/psp/2006-fifa-world-cup-germany.html",
      },
      {
        name: "2010 FIFA World Cup South Africa",
        url: "https://romsfun.com/roms/psp/2010-fifa-world-cup-south-africa.html",
      },
      {
        name: "2014 FIFA World Cup Brazil",
        url: "https://romsfun.com/roms/psp/2014-fifa-world-cup-brazil.html",
      },
      // Pro Evolution Soccer Series
      {
        name: "Pro Evolution Soccer (PES 5)",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-5.html",
      },
      {
        name: "Pro Evolution Soccer 6",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-6.html",
      },
      {
        name: "PES 2008",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2008.html",
      },
      {
        name: "PES 2009",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2009.html",
      },
      {
        name: "PES 2010",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2010.html",
      },
      {
        name: "PES 2011",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2011.html",
      },
      {
        name: "PES 2012",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2012.html",
      },
      {
        name: "PES 2013",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2013.html",
      },
      {
        name: "PES 2014",
        url: "https://romsfun.com/roms/psp/pro-evolution-soccer-2014.html",
      },
      // WWE
      {
        name: "WWE SmackDown vs Raw 2011",
        url: "https://romsfun.com/roms/psp/wwe-smackdown-vs-raw-2011.html",
      },
      {
        name: "WWE SmackDown vs Raw 2009",
        url: "https://romsfun.com/roms/psp/wwe-smackdown-vs-raw-2009.html",
      },
      // Cricket
      {
        name: "ICC Cricket 2010",
        url: "https://romsfun.com/roms/psp/icc-cricket-2010.html",
      },
      {
        name: "Brian Lara International Cricket 2007",
        url: "https://romsfun.com/roms/psp/brian-lara-international-cricket-2007.html",
      },
    ],
  },
  {
    id: "dreamcast",
    name: "DREAMCAST",
    fullName: "Sega Dreamcast",
    color: "#EF4444",
    accent: "red",
    games: [
      {
        name: "FIFA 2001",
        url: "https://romsfun.com/roms/dreamcast/fifa-2001.html",
      },
      {
        name: "WWF Royal Rumble",
        url: "https://romsfun.com/roms/dreamcast/wwf-royal-rumble.html",
      },
      {
        name: "NFL 2K2",
        url: "https://romsfun.com/roms/dreamcast/nfl-2k2.html",
      },
      {
        name: "Ready 2 Rumble Boxing",
        url: "https://romsfun.com/roms/dreamcast/ready-2-rumble-boxing.html",
      },
      {
        name: "Soul Calibur",
        url: "https://romsfun.com/roms/dreamcast/soul-calibur.html",
      },
      {
        name: "NBA 2K2",
        url: "https://romsfun.com/roms/dreamcast/nba-2k2.html",
      },
    ],
  },
  {
    id: "switch",
    name: "SWITCH",
    fullName: "Nintendo Switch",
    color: "#F97316",
    accent: "orange",
    games: [
      {
        name: "FIFA 23",
        url: "https://romsfun.com/roms/nintendo-switch/fifa-23.html",
      },
      {
        name: "WWE 2K22",
        url: "https://romsfun.com/roms/nintendo-switch/wwe-2k22.html",
      },
      {
        name: "Cricket 22",
        url: "https://romsfun.com/roms/nintendo-switch/cricket-22.html",
      },
      {
        name: "Mario Kart 8 Deluxe",
        url: "https://romsfun.com/roms/nintendo-switch/mario-kart-8-deluxe.html",
      },
      {
        name: "The Legend of Zelda: BOTW",
        url: "https://romsfun.com/roms/nintendo-switch/the-legend-of-zelda-breath-of-the-wild.html",
      },
      {
        name: "Super Smash Bros. Ultimate",
        url: "https://romsfun.com/roms/nintendo-switch/super-smash-bros-ultimate.html",
      },
    ],
  },
  {
    id: "gamecube",
    name: "GAMECUBE",
    fullName: "Nintendo GameCube",
    color: "#A855F7",
    accent: "violet",
    games: [
      {
        name: "FIFA 2003",
        url: "https://romsfun.com/roms/gamecube/fifa-2003.html",
      },
      {
        name: "WWE Day of Reckoning",
        url: "https://romsfun.com/roms/gamecube/wwe-day-of-reckoning.html",
      },
      {
        name: "Mario Kart: Double Dash!!",
        url: "https://romsfun.com/roms/gamecube/mario-kart-double-dash.html",
      },
      {
        name: "The Legend of Zelda: Wind Waker",
        url: "https://romsfun.com/roms/gamecube/the-legend-of-zelda-the-wind-waker.html",
      },
      {
        name: "Metroid Prime",
        url: "https://romsfun.com/roms/gamecube/metroid-prime.html",
      },
      {
        name: "Super Mario Sunshine",
        url: "https://romsfun.com/roms/gamecube/super-mario-sunshine.html",
      },
    ],
  },
];

const sportsGames: {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  games: SportsGame[];
  searchQuery: string;
}[] = [
  {
    id: "cricket",
    name: "Cricket Games",
    icon: Trophy,
    color: "#22C55E",
    games: [
      {
        name: "Brian Lara Cricket Series (PS1/PS2)",
        url: "https://romsfun.com/roms/playstation/brian-lara-cricket.html",
      },
      {
        name: "EA Cricket 2007",
        url: "https://romsfun.com/roms/playstation-2/ea-cricket-2007.html",
      },
      {
        name: "ICC Cricket 2010 (PSP)",
        url: "https://romsfun.com/roms/psp/icc-cricket-2010.html",
      },
      {
        name: "Cricket 22 (Switch)",
        url: "https://romsfun.com/roms/nintendo-switch/cricket-22.html",
      },
      {
        name: "Don Bradman Cricket 17",
        url: "https://romsfun.com/search/?q=don+bradman+cricket+17",
      },
    ],
    searchQuery: "cricket video games",
  },
  {
    id: "football",
    name: "Football Games",
    icon: Sword,
    color: "#3B82F6",
    games: [
      {
        name: "FIFA Series (All Consoles)",
        url: "https://romsfun.com/search/?q=fifa+football",
      },
      {
        name: "Pro Evolution Soccer Series",
        url: "https://romsfun.com/search/?q=pro+evolution+soccer",
      },
      {
        name: "FIFA Street (PS2)",
        url: "https://romsfun.com/roms/playstation-2/fifa-street.html",
      },
      {
        name: "FIFA World Cup Series (PS2/PSP)",
        url: "https://romsfun.com/search/?q=fifa+world+cup",
      },
      {
        name: "FIFA 23 (Switch)",
        url: "https://romsfun.com/roms/nintendo-switch/fifa-23.html",
      },
    ],
    searchQuery: "FIFA football video games",
  },
  {
    id: "wwe",
    name: "WWE Games",
    icon: Dumbbell,
    color: "#EF4444",
    games: [
      {
        name: "WWE SmackDown! (PS1)",
        url: "https://romsfun.com/roms/playstation/wwf-smackdown.html",
      },
      {
        name: "WWE SmackDown! 2: Know Your Role (PS1)",
        url: "https://romsfun.com/roms/playstation/wwf-smackdown-2-know-your-role.html",
      },
      {
        name: "WWE SmackDown! Here Comes the Pain (PS2)",
        url: "https://romsfun.com/roms/playstation-2/wwe-smackdown-here-comes-the-pain.html",
      },
      {
        name: "WWE SmackDown vs Raw Series (PS2/PSP)",
        url: "https://romsfun.com/search/?q=wwe+smackdown+vs+raw",
      },
      {
        name: "WWE Day of Reckoning (GameCube)",
        url: "https://romsfun.com/roms/gamecube/wwe-day-of-reckoning.html",
      },
    ],
    searchQuery: "WWE wrestling video games",
  },
];

const emulators = [
  {
    id: "yuzu",
    name: "Yuzu Emulator",
    short: "Y",
    color: "#F97316",
    consoles: "Nintendo Switch",
    description:
      "Popular Nintendo Switch emulator for PC. Play Switch games at high resolution with full controller support.",
    url: "https://github.com/yuzu-emu/yuzu",
    badge: "FREE",
  },
  {
    id: "dolphin",
    name: "Dolphin Emulator",
    short: "D",
    color: "#06B6D4",
    consoles: "Nintendo Switch & GameCube",
    description:
      "Best-in-class emulator for Nintendo GameCube and Wii games on Android.",
    url: "https://dolphinemulator.com/",
    badge: "FREE",
  },
  {
    id: "nethersx2",
    name: "NetherSX2",
    short: "N",
    color: "#8B5CF6",
    consoles: "PlayStation 2",
    description:
      "High-performance PS2 emulator for Android. Based on AetherSX2 with improvements.",
    url: "https://github.com/Trixarian/NetherSX2-patch",
    badge: "FREE",
  },
  {
    id: "ppsspp",
    name: "PPSSPP",
    short: "P",
    color: "#10B981",
    consoles: "PlayStation Portable (PSP)",
    description:
      "The most popular PSP emulator for Android. Play PSP games in HD.",
    url: "https://www.ppsspp.org/",
    badge: "FREE",
  },
  {
    id: "duckstation",
    name: "DuckStation",
    short: "S",
    color: "#F59E0B",
    consoles: "PlayStation 1",
    description:
      "Accurate and fast PS1 emulator for Android with advanced features.",
    url: "https://www.duckstation.org/",
    badge: "FREE",
  },
];

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "GAME LIBRARIES", href: "#game-libraries" },
  { label: "SPORTS ZONE", href: "#sports-zone" },
  { label: "EMULATORS", href: "#emulators" },
  { label: "ABOUT", href: "#about" },
];

// ─── Search Types ─────────────────────────────────────────────────────────────

type SearchResult = {
  gameName: string;
  gameUrl?: string;
  category: string;
  categoryColor: string;
};

// ─── Components ──────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Zap className="w-7 h-7 text-primary" strokeWidth={2.5} />
        <div className="absolute inset-0 blur-sm opacity-60">
          <Zap className="w-7 h-7 text-primary" strokeWidth={2.5} />
        </div>
      </div>
      <span className="font-display font-bold text-xl tracking-wider">
        <span className="text-primary">BOWS IN RAYS</span>
      </span>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search games..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 bg-background/80 border-border focus:border-primary font-display text-sm tracking-wide placeholder:text-muted-foreground/60 h-9"
        data-ocid="search.input"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
            data-ocid="search.close_button"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({
  mobileOpen,
  setMobileOpen,
  searchQuery,
  setSearchQuery,
}: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        <Logo />
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-primary transition-colors duration-200 font-display"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Desktop search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          className="hidden md:block w-56"
        />
        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 pt-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full"
              />
            </div>
            <ul className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-primary transition-colors font-display"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SearchResultsSection({
  query,
  results,
  onClear,
}: {
  query: string;
  results: SearchResult[];
  onClear: () => void;
}) {
  return (
    <motion.section
      key="search-results"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="pt-20 px-4 sm:px-6 lg:px-8 pb-6"
      data-ocid="search.panel"
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-primary" />
              <span className="font-display font-bold tracking-wider text-foreground">
                Results for{" "}
                <span className="text-primary">&ldquo;{query}&rdquo;</span>
              </span>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-display text-xs">
                {results.length} found
              </Badge>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Close search results"
              data-ocid="search.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="search.empty_state"
            >
              <Gamepad2 className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <p className="font-display font-bold text-lg text-muted-foreground tracking-wider">
                No games found
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border max-h-[420px] overflow-y-auto">
              {results.map((result, i) => (
                <motion.li
                  key={`${result.category}-${result.gameName}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-muted/30 transition-colors"
                  data-ocid={`search.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground truncate font-medium">
                      {result.gameName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge
                      className="font-display text-xs tracking-wider border"
                      style={{
                        backgroundColor: `${result.categoryColor}20`,
                        color: result.categoryColor,
                        borderColor: `${result.categoryColor}40`,
                      }}
                    >
                      {result.category}
                    </Badge>
                    {result.gameUrl && (
                      <a
                        href={result.gameUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        title={`Download ${result.gameName}`}
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="pt-16 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 font-display tracking-widest text-xs">
                OFFICIAL GAMING HUB
              </Badge>
            </div>
            <h1 className="font-display font-black leading-none mb-4">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-gradient-orange">
                BOWS IN RAYS
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">
                Official Gaming Hub
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Your ultimate destination for console game libraries, sports games
              &amp; Android emulators. Explore PS1, PS2, PSP, Sega Dreamcast,
              Nintendo Switch, and GameCube collections.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-display font-bold tracking-wider uppercase glow-orange-sm"
                data-ocid="hero.explore_libraries.button"
              >
                <a href="#game-libraries">
                  <Gamepad2 className="mr-2 w-5 h-5" />
                  Explore Libraries
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-wider uppercase"
                data-ocid="hero.get_emulators.button"
              >
                <a href="#emulators">
                  <Download className="mr-2 w-5 h-5" />
                  Get Emulators
                </a>
              </Button>
            </div>
            {/* Stats */}
            <div className="mt-10 flex gap-8">
              {[
                { value: "6", label: "Console Libraries" },
                { value: "80+", label: "Game Titles" },
                { value: "5", label: "Emulators" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black font-display text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide uppercase font-display">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Right: hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border glow-orange">
              <img
                src="/assets/generated/gaming-hero.dim_800x450.jpg"
                alt="Gaming Hub"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 glow-orange-sm">
              <span className="text-primary font-display font-bold text-sm">
                🎮 6 CONSOLES
              </span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-2">
              <span className="text-green-400 font-display font-bold text-sm">
                📱 ANDROID READY
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-wider mb-3">
        <span className="text-foreground">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
        </span>
        <span className="text-gradient-orange">
          {title.split(" ").slice(-1)[0]}
        </span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      )}
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-16 bg-primary rounded-full" />
        <div className="h-1 w-4 bg-primary/40 rounded-full ml-1" />
        <div className="h-1 w-2 bg-primary/20 rounded-full ml-1" />
      </div>
    </div>
  );
}

function ConsoleCard({
  lib,
  index,
}: { lib: (typeof consoleLibraries)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const visibleGames = expanded ? lib.games : lib.games.slice(0, 6);
  const hasMore = lib.games.length > 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`libraries.item.${index + 1}`}
    >
      <Card className="bg-card border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:glow-orange-sm group h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-black text-sm text-white"
              style={{ backgroundColor: lib.color }}
            >
              {lib.name.slice(0, 2)}
            </div>
            <div>
              <CardTitle
                className="font-display text-lg tracking-wider"
                style={{ color: lib.color }}
              >
                {lib.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground font-display tracking-wide">
                {lib.fullName} &bull; {lib.games.length} games
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 gap-4">
          <ul className="space-y-1.5 flex-1">
            {visibleGames.map((game) => (
              <li
                key={game.name}
                className="flex items-center justify-between gap-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>{game.name}</span>
                </span>
                {game.url && (
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-primary hover:text-primary/80 transition-colors"
                    title={`Download ${game.name}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary hover:text-primary/80 font-display tracking-wider uppercase transition-colors text-left"
            >
              {expanded ? "Show Less" : `+ ${lib.games.length - 6} More Games`}
            </button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="w-full border-border hover:border-primary hover:bg-primary/10 hover:text-primary font-display tracking-wider uppercase text-xs mt-auto"
            asChild
            data-ocid={`libraries.explore.button.${index + 1}`}
          >
            <a
              href={romsfunBase[lib.id] ?? "https://romsfun.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gamepad2 className="mr-2 w-3 h-3" />
              Browse All on Romsfun.com
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SportCard({
  sport,
  index,
}: { sport: (typeof sportsGames)[0]; index: number }) {
  const Icon = sport.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`sports.item.${index + 1}`}
    >
      <Card className="bg-card border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${sport.color}20`,
                border: `1px solid ${sport.color}40`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: sport.color }} />
            </div>
            <CardTitle
              className="font-display text-xl tracking-wider"
              style={{ color: sport.color }}
            >
              {sport.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 gap-4">
          <ul className="space-y-2 flex-1">
            {sport.games.map((game) => (
              <li
                key={game.name}
                className="flex items-center justify-between gap-2 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sport.color }}
                  />
                  <span>{game.name}</span>
                </span>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  title={`Download ${game.name}`}
                  style={{ color: sport.color }}
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <Button
            size="sm"
            asChild
            className="w-full font-display tracking-wider uppercase text-xs mt-auto text-white"
            style={{ backgroundColor: sport.color }}
            data-ocid={`sports.search.button.${index + 1}`}
          >
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(sport.searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 w-3 h-3" />
              Find Games Online
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EmulatorTile({
  emulator,
  index,
}: { emulator: (typeof emulators)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      data-ocid={`emulators.item.${index + 1}`}
    >
      <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="pt-6 flex flex-col flex-1 gap-4">
          {/* Icon */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-white flex-shrink-0 shadow-lg"
              style={{ backgroundColor: emulator.color }}
            >
              {emulator.short}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg tracking-wide text-foreground">
                {emulator.name}
              </h3>
              <p
                className="text-xs font-display tracking-wider"
                style={{ color: emulator.color }}
              >
                {emulator.consoles}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {emulator.description}
          </p>
          <div className="flex items-center gap-2">
            <Badge
              className="text-xs font-display"
              style={{
                backgroundColor: `${emulator.color}20`,
                color: emulator.color,
                border: `1px solid ${emulator.color}40`,
              }}
            >
              {emulator.badge}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs font-display text-muted-foreground"
            >
              PC
            </Badge>
          </div>
          <Button
            asChild
            className="w-full font-display font-bold tracking-wider uppercase text-white"
            style={{ backgroundColor: emulator.color }}
            data-ocid={`emulators.download.button.${index + 1}`}
          >
            <a href={emulator.url} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 w-4 h-4" />
              Download
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const year = new Date().getFullYear();

  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Search console libraries
    for (const lib of consoleLibraries) {
      for (const game of lib.games) {
        if (game.name.toLowerCase().includes(q)) {
          results.push({
            gameName: game.name,
            gameUrl: game.url,
            category: lib.name,
            categoryColor: lib.color,
          });
        }
      }
    }

    // Search sports games
    for (const sport of sportsGames) {
      for (const game of sport.games) {
        if (game.name.toLowerCase().includes(q)) {
          results.push({
            gameName: game.name,
            gameUrl: game.url,
            category: sport.name,
            categoryColor: sport.color,
          });
        }
      }
    }

    return results;
  }, [searchQuery]);

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Navbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Search Results */}
      <AnimatePresence>
        {isSearchActive && (
          <SearchResultsSection
            query={searchQuery}
            results={searchResults}
            onClear={() => setSearchQuery("")}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <HeroSection />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Console Game Libraries */}
      <section id="game-libraries" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Console Game LIBRARIES"
            subtitle="Browse curated game collections across 6 classic and modern gaming consoles"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consoleLibraries.map((lib, i) => (
              <ConsoleCard key={lib.id} lib={lib} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Sports Zone */}
      <section
        id="sports-zone"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Sports Game HUB"
            subtitle="Cricket, Football, and WWE — the best sports gaming titles across all platforms"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsGames.map((sport, i) => (
              <SportCard key={sport.id} sport={sport} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Emulators */}
      <section id="emulators" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Emulator DOWNLOADS"
            subtitle="Play your favourite console games on PC and Android with these powerful emulators"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {emulators.map((emu, i) => (
              <EmulatorTile key={emu.id} emulator={emu} index={i} />
            ))}
          </div>
          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center"
            data-ocid="emulators.info.panel"
          >
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">⚠️ Legal Note:</span>{" "}
              Emulators are legal software. You must own a physical copy of the
              game to legally use ROMs. Always download ROMs for games you
              personally own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* About */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading title="About BOWS IN RAYS" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-orange-sm">
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <strong className="text-primary">BOWS IN RAYS</strong> is your
              ultimate community hub for retro and modern gaming enthusiasts. We
              bring together comprehensive game libraries spanning six iconic
              gaming platforms — from the classic PlayStation 1 and Sega
              Dreamcast era to the modern Nintendo Switch generation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're a cricket fan looking for the best Brian Lara
              titles, a football enthusiast hunting FIFA and PES games, or a WWE
              wrestling gaming veteran — we've got your collection covered. We
              also provide curated information on the best emulators so you can
              enjoy your favourite console games on PC and Android.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to preserve gaming history and make it accessible
              to everyone, supporting both retro gaming culture and the modern
              gaming community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["PS1", "PS2", "PSP", "DREAMCAST", "SWITCH", "GAMECUBE"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-primary/30 text-primary font-display tracking-wider text-xs px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo />
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-display tracking-wider text-muted-foreground hover:text-primary transition-colors"
                  data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <p>© {year} BOWS IN RAYS Official Website. All rights reserved.</p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
