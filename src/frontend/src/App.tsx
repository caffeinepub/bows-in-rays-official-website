import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronRight,
  Download,
  Dumbbell,
  ExternalLink,
  Gamepad2,
  Menu,
  Sword,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Game = { name: string; url?: string };

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
        url: "https://archive.org/search?query=FIFA+2001+PS1",
      },
      {
        name: "WWE SmackDown! (SmackDown 1)",
        url: "https://archive.org/search?query=WWF+SmackDown+PS1",
      },
      {
        name: "WWE SmackDown! 2: Know Your Role",
        url: "https://archive.org/search?query=WWF+SmackDown+2+Know+Your+Role+PS1",
      },
      {
        name: "Brian Lara Cricket",
        url: "https://archive.org/search?query=Brian+Lara+Cricket+PS1",
      },
      {
        name: "ISS Pro Evolution",
        url: "https://archive.org/search?query=ISS+Pro+Evolution+PS1",
      },
      {
        name: "WCW/nWo Thunder",
        url: "https://archive.org/search?query=WCW+nWo+Thunder+PS1",
      },
      {
        name: "WWE Attitude",
        url: "https://archive.org/search?query=WWF+Attitude+PS1",
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
        url: "https://archive.org/search?query=FIFA+Football+2001+PS2",
      },
      {
        name: "FIFA Football 2002",
        url: "https://archive.org/search?query=FIFA+Football+2002+PS2",
      },
      {
        name: "FIFA Football 2003",
        url: "https://archive.org/search?query=FIFA+Football+2003+PS2",
      },
      {
        name: "FIFA Football 2004",
        url: "https://archive.org/search?query=FIFA+Football+2004+PS2",
      },
      {
        name: "FIFA Football 2005",
        url: "https://archive.org/search?query=FIFA+Football+2005+PS2",
      },
      { name: "FIFA 06", url: "https://archive.org/search?query=FIFA+06+PS2" },
      { name: "FIFA 07", url: "https://archive.org/search?query=FIFA+07+PS2" },
      { name: "FIFA 08", url: "https://archive.org/search?query=FIFA+08+PS2" },
      { name: "FIFA 09", url: "https://archive.org/search?query=FIFA+09+PS2" },
      { name: "FIFA 10", url: "https://archive.org/search?query=FIFA+10+PS2" },
      {
        name: "FIFA Street",
        url: "https://archive.org/search?query=FIFA+Street+PS2",
      },
      {
        name: "FIFA Street 2",
        url: "https://archive.org/search?query=FIFA+Street+2+PS2",
      },
      {
        name: "FIFA Street 3",
        url: "https://archive.org/search?query=FIFA+Street+3+PS2",
      },
      // FIFA World Cup Series
      {
        name: "2002 FIFA World Cup",
        url: "https://archive.org/search?query=2002+FIFA+World+Cup+PS2",
      },
      {
        name: "2006 FIFA World Cup Germany",
        url: "https://archive.org/search?query=2006+FIFA+World+Cup+Germany+PS2",
      },
      {
        name: "2010 FIFA World Cup South Africa",
        url: "https://archive.org/search?query=2010+FIFA+World+Cup+South+Africa+PS2",
      },
      // Pro Evolution Soccer Series
      {
        name: "Pro Evolution Soccer (PES 1)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+1+PS2",
      },
      {
        name: "Pro Evolution Soccer 2 (PES 2)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+2+PS2",
      },
      {
        name: "Pro Evolution Soccer 3 (PES 3)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+3+PS2",
      },
      {
        name: "Pro Evolution Soccer 4 (PES 4)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+4+PS2",
      },
      {
        name: "Pro Evolution Soccer 5 (PES 5)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+5+PS2",
      },
      {
        name: "Pro Evolution Soccer 6 (PES 6)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+6+PS2",
      },
      {
        name: "PES 2008",
        url: "https://archive.org/search?query=PES+2008+Pro+Evolution+Soccer+PS2",
      },
      {
        name: "PES 2009",
        url: "https://archive.org/search?query=PES+2009+Pro+Evolution+Soccer+PS2",
      },
      {
        name: "PES 2010",
        url: "https://archive.org/search?query=PES+2010+Pro+Evolution+Soccer+PS2",
      },
      // WWE
      {
        name: "WWE SmackDown vs Raw 2006",
        url: "https://archive.org/search?query=WWE+SmackDown+vs+Raw+2006+PS2",
      },
      {
        name: "WWE SmackDown! Here Comes the Pain",
        url: "https://archive.org/search?query=WWE+SmackDown+Here+Comes+the+Pain+PS2",
      },
      // Cricket
      {
        name: "Brian Lara International Cricket 2005",
        url: "https://archive.org/search?query=Brian+Lara+International+Cricket+2005+PS2",
      },
      {
        name: "EA Cricket 2005",
        url: "https://archive.org/search?query=EA+Cricket+2005+PS2",
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
        url: "https://archive.org/search?query=FIFA+Football+PSP+2005",
      },
      { name: "FIFA 06", url: "https://archive.org/search?query=FIFA+06+PSP" },
      { name: "FIFA 07", url: "https://archive.org/search?query=FIFA+07+PSP" },
      { name: "FIFA 08", url: "https://archive.org/search?query=FIFA+08+PSP" },
      { name: "FIFA 09", url: "https://archive.org/search?query=FIFA+09+PSP" },
      { name: "FIFA 10", url: "https://archive.org/search?query=FIFA+10+PSP" },
      { name: "FIFA 11", url: "https://archive.org/search?query=FIFA+11+PSP" },
      { name: "FIFA 12", url: "https://archive.org/search?query=FIFA+12+PSP" },
      { name: "FIFA 13", url: "https://archive.org/search?query=FIFA+13+PSP" },
      { name: "FIFA 14", url: "https://archive.org/search?query=FIFA+14+PSP" },
      // FIFA World Cup Series
      {
        name: "2006 FIFA World Cup Germany",
        url: "https://archive.org/search?query=2006+FIFA+World+Cup+Germany+PSP",
      },
      {
        name: "2010 FIFA World Cup South Africa",
        url: "https://archive.org/search?query=2010+FIFA+World+Cup+South+Africa+PSP",
      },
      {
        name: "2014 FIFA World Cup Brazil",
        url: "https://archive.org/search?query=2014+FIFA+World+Cup+Brazil+PSP",
      },
      // Pro Evolution Soccer Series
      {
        name: "Pro Evolution Soccer (PES 5)",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+5+PSP",
      },
      {
        name: "Pro Evolution Soccer 6",
        url: "https://archive.org/search?query=Pro+Evolution+Soccer+6+PSP",
      },
      {
        name: "PES 2008",
        url: "https://archive.org/search?query=PES+2008+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2009",
        url: "https://archive.org/search?query=PES+2009+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2010",
        url: "https://archive.org/search?query=PES+2010+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2011",
        url: "https://archive.org/search?query=PES+2011+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2012",
        url: "https://archive.org/search?query=PES+2012+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2013",
        url: "https://archive.org/search?query=PES+2013+Pro+Evolution+Soccer+PSP",
      },
      {
        name: "PES 2014",
        url: "https://archive.org/search?query=PES+2014+Pro+Evolution+Soccer+PSP",
      },
      // WWE
      {
        name: "WWE SmackDown vs Raw 2011",
        url: "https://archive.org/search?query=WWE+SmackDown+vs+Raw+2011+PSP",
      },
      {
        name: "WWE SmackDown vs Raw 2009",
        url: "https://archive.org/search?query=WWE+SmackDown+vs+Raw+2009+PSP",
      },
      // Cricket
      {
        name: "ICC Cricket 2010",
        url: "https://archive.org/search?query=ICC+Cricket+2010+PSP",
      },
      {
        name: "Brian Lara International Cricket 2007",
        url: "https://archive.org/search?query=Brian+Lara+International+Cricket+2007+PSP",
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
        url: "https://archive.org/search?query=FIFA+2001+Dreamcast",
      },
      {
        name: "WWF Royal Rumble",
        url: "https://archive.org/search?query=WWF+Royal+Rumble+Dreamcast",
      },
      {
        name: "NFL 2K2",
        url: "https://archive.org/search?query=NFL+2K2+Dreamcast",
      },
      {
        name: "Ready 2 Rumble Boxing",
        url: "https://archive.org/search?query=Ready+2+Rumble+Boxing+Dreamcast",
      },
      {
        name: "Soul Calibur",
        url: "https://archive.org/search?query=Soul+Calibur+Dreamcast",
      },
      {
        name: "NBA 2K2",
        url: "https://archive.org/search?query=NBA+2K2+Dreamcast",
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
        url: "https://archive.org/search?query=FIFA+23+Nintendo+Switch",
      },
      {
        name: "WWE 2K22",
        url: "https://archive.org/search?query=WWE+2K22+Nintendo+Switch",
      },
      {
        name: "Cricket 22",
        url: "https://archive.org/search?query=Cricket+22+Nintendo+Switch",
      },
      {
        name: "Mario Kart 8 Deluxe",
        url: "https://archive.org/search?query=Mario+Kart+8+Deluxe+Switch",
      },
      {
        name: "The Legend of Zelda: BOTW",
        url: "https://archive.org/search?query=Zelda+Breath+of+the+Wild+Switch",
      },
      {
        name: "Super Smash Bros. Ultimate",
        url: "https://archive.org/search?query=Super+Smash+Bros+Ultimate+Switch",
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
        url: "https://archive.org/search?query=FIFA+2003+GameCube",
      },
      {
        name: "WWE Day of Reckoning",
        url: "https://archive.org/search?query=WWE+Day+of+Reckoning+GameCube",
      },
      {
        name: "Mario Kart: Double Dash!!",
        url: "https://archive.org/search?query=Mario+Kart+Double+Dash+GameCube",
      },
      {
        name: "The Legend of Zelda: Wind Waker",
        url: "https://archive.org/search?query=Zelda+Wind+Waker+GameCube",
      },
      {
        name: "Metroid Prime",
        url: "https://archive.org/search?query=Metroid+Prime+GameCube",
      },
      {
        name: "Super Mario Sunshine",
        url: "https://archive.org/search?query=Super+Mario+Sunshine+GameCube",
      },
    ],
  },
];

const sportsGames = [
  {
    id: "cricket",
    name: "Cricket Games",
    icon: Trophy,
    color: "#22C55E",
    games: [
      "Brian Lara Cricket Series (PS1/PS2)",
      "EA Cricket 2007",
      "ICC Cricket 2010 (PSP)",
      "Cricket 22 (Switch)",
      "Don Bradman Cricket 17",
    ],
    searchQuery: "cricket video games",
  },
  {
    id: "football",
    name: "Football Games",
    icon: Sword,
    color: "#3B82F6",
    games: [
      "FIFA Series (All Consoles)",
      "Pro Evolution Soccer Series",
      "FIFA Street (PS2)",
      "FIFA World Cup Series (PS2/PSP)",
      "FIFA 23 (Switch)",
    ],
    searchQuery: "FIFA football video games",
  },
  {
    id: "wwe",
    name: "WWE Games",
    icon: Dumbbell,
    color: "#EF4444",
    games: [
      "WWE SmackDown! (PS1)",
      "WWE SmackDown! 2: Know Your Role (PS1)",
      "WWE SmackDown! Here Comes the Pain (PS2)",
      "WWE SmackDown vs Raw Series (PS2/PSP)",
      "WWE Day of Reckoning (GameCube)",
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

function Navbar({
  mobileOpen,
  setMobileOpen,
}: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
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
              href={`https://archive.org/search?query=${encodeURIComponent(`${lib.fullName} game ISO ROM`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gamepad2 className="mr-2 w-3 h-3" />
              Browse All on Archive.org
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
                key={game}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: sport.color }}
                />
                <span>{game}</span>
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
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

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
