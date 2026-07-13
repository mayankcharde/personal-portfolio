import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import useLenis from "./hooks/useLenis";
import { portfolioData } from "./data/portfolioData";

import Loader from "./components/Loader";
import GridBackground from "./components/GridBackground";
import ScanlineOverlay from "./components/ScanlineOverlay";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import StatusPanel from "./components/StatusPanel";
import ProjectLogs from "./components/ProjectLogs";
import Timeline from "./components/Timeline";
import Certifications from "./components/Certifications";
import Transmission from "./components/Transmission";
import { FaSearch, FaCloudDownloadAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const LiveTerminal = lazy(() => import("./components/LiveTerminal"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const SettingsPanel = lazy(() => import("./components/SettingsPanel"));
const GitHubStats = lazy(() => import("./components/GitHubStats"));
const SkillsRadar = lazy(() => import("./components/SkillsRadar"));

const { personal } = portfolioData;

const THEME_PRESETS = {
  warm: { background: "#D85A48" },
  midnight: { background: "#0f172a" },
};

const ACCENT_PRESETS = {
  peach: { accent: "#F0B0A0", highlight: "#FFD166" },
  cyan: { accent: "#7dd3fc", highlight: "#f59e0b" },
};

function createResumePackage() {
  const anchor = document.createElement("a");
  anchor.href = personal.resumeUrl;
  anchor.download = `${personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.click();
}

function ToastStack({ toasts }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed right-4 top-28 z-[12500] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-2xl border border-white/10 bg-[#0b1220]/95 px-4 py-3 text-sm text-textPrimary shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(
    () => !window.sessionStorage.getItem("os_boot_seen"),
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("os_theme") || "warm",
  );
  const [accent, setAccent] = useState(
    () => window.localStorage.getItem("os_accent") || "peach",
  );
  const [toasts, setToasts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shellRef = useRef(null);
  const audioContextRef = useRef(null);
  const ambientNodesRef = useRef(null);
  const lastHoverTargetRef = useRef(null);
  useLenis();

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const accentColor =
    ACCENT_PRESETS[accent]?.accent || ACCENT_PRESETS.peach.accent;
  const highlightColor =
    ACCENT_PRESETS[accent]?.highlight || ACCENT_PRESETS.peach.highlight;

  const getAudioContext = () => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextCtor();
    }
    return audioContextRef.current;
  };

  const stopAmbientSound = () => {
    const nodes = ambientNodesRef.current;
    if (!nodes) return;

    try {
      const now = nodes.context.currentTime;
      nodes.masterGain.gain.cancelScheduledValues(now);
      nodes.masterGain.gain.setTargetAtTime(0.0001, now, 0.08);
      nodes.droneGain.gain.cancelScheduledValues(now);
      nodes.droneGain.gain.setTargetAtTime(0.0001, now, 0.08);
      nodes.shimmerGain.gain.cancelScheduledValues(now);
      nodes.shimmerGain.gain.setTargetAtTime(0.0001, now, 0.08);
      window.setTimeout(() => {
        nodes.oscillators.forEach((oscillator) => {
          try {
            oscillator.stop();
          } catch {
            // noop
          }
        });
        nodes.modOscillator?.stop?.();
        nodes.modGain?.disconnect?.();
        nodes.filter?.disconnect?.();
        nodes.masterGain?.disconnect?.();
      }, 180);
    } catch {
      // noop
    }

    ambientNodesRef.current = null;
  };

  const startAmbientSound = () => {
    if (!soundEnabled || ambientNodesRef.current) return;

    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const masterGain = context.createGain();
    const droneGain = context.createGain();
    const shimmerGain = context.createGain();
    const filter = context.createBiquadFilter();
    const panner = context.createStereoPanner?.();
    const oscillators = [];

    filter.type = "lowpass";
    filter.frequency.value = 1400;
    filter.Q.value = 1.1;
    masterGain.gain.value = 0.0001;
    droneGain.gain.value = 0.0001;
    shimmerGain.gain.value = 0.0001;

    [43.65, 65.41].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 0 ? -6 : 8;
      oscillator.connect(droneGain);
      oscillator.start();
      oscillators.push(oscillator);
    });

    const shimmerOscillator = context.createOscillator();
    shimmerOscillator.type = "sine";
    shimmerOscillator.frequency.value = 220;
    shimmerOscillator.connect(shimmerGain);
    shimmerOscillator.start();
    oscillators.push(shimmerOscillator);

    const shimmerLfo = context.createOscillator();
    const shimmerLfoGain = context.createGain();
    shimmerLfo.type = "sine";
    shimmerLfo.frequency.value = 0.08;
    shimmerLfoGain.gain.value = 0.0012;
    shimmerLfo.connect(shimmerLfoGain);
    shimmerLfoGain.connect(masterGain.gain);
    shimmerLfo.start();

    droneGain.connect(filter);
    shimmerGain.connect(filter);
    filter.connect(masterGain);
    if (panner) {
      panner.pan.value = -0.08;
      masterGain.connect(panner);
      panner.connect(context.destination);
    } else {
      masterGain.connect(context.destination);
    }

    const now = context.currentTime;
    masterGain.gain.linearRampToValueAtTime(0.025, now + 0.8);
    droneGain.gain.linearRampToValueAtTime(0.022, now + 0.8);
    shimmerGain.gain.linearRampToValueAtTime(0.01, now + 0.8);

    ambientNodesRef.current = {
      context,
      masterGain,
      droneGain,
      shimmerGain,
      filter,
      oscillators,
      modOscillator: shimmerLfo,
      modGain: shimmerLfoGain,
      panner,
    };
  };

  const playTone = (type = "click") => {
    if (!soundEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = type === "hover" ? "triangle" : "sine";
    oscillator.frequency.value = type === "hover" ? 860 : 660;
    filter.type = "lowpass";
    filter.frequency.value = type === "hover" ? 2600 : 1800;
    filter.Q.value = 0.8;
    gain.gain.value = 0.0001;

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    gain.gain.exponentialRampToValueAtTime(
      type === "hover" ? 0.024 : 0.045,
      now + 0.01,
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + (type === "hover" ? 0.09 : 0.13),
    );
    oscillator.stop(now + (type === "hover" ? 0.1 : 0.14));
  };

  const playHoverCue = () => {
    if (!soundEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const buffer = context.createBuffer(
      1,
      context.sampleRate * 0.08,
      context.sampleRate,
    );
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] =
        (Math.random() * 2 - 1) * (1 - index / channel.length) * 0.3;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const pan = context.createStereoPanner?.();

    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1500;
    filter.Q.value = 2.5;
    gain.gain.value = 0.0001;

    source.connect(filter);
    if (pan) {
      pan.pan.value = (Math.random() - 0.5) * 0.35;
      filter.connect(pan);
      pan.connect(gain);
    } else {
      filter.connect(gain);
    }
    gain.connect(context.destination);

    const now = context.currentTime;
    source.start(now);
    gain.gain.exponentialRampToValueAtTime(0.022, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    source.stop(now + 0.09);
  };

  const addToast = (message) => {
    const id =
      window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4200);
  };

  useEffect(() => {
    window.localStorage.setItem("os_theme", theme);
    document.documentElement.dataset.osTheme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("os_accent", accent);
    document.documentElement.dataset.osAccent = accent;
  }, [accent]);

  useEffect(() => {
    if (soundEnabled) {
      startAmbientSound();
      addToast("Sound module online");
      return () => {
        stopAmbientSound();
      };
    }

    stopAmbientSound();
    return undefined;
  }, [soundEnabled]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };

    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let buffer = [];
    const onKonami = (event) => {
      buffer = [...buffer, event.key].slice(-konami.length);
      if (
        konami.every(
          (key, index) => key.toLowerCase() === buffer[index]?.toLowerCase(),
        )
      ) {
        addToast("Hidden orbit protocol unlocked");
        playTone("hover");
      }
    };

    const onPointerOver = (event) => {
      if (!soundEnabled) return;
      const target = event.target?.closest?.(
        "a,button,input,textarea,select,[role='button'],[data-sound='hover']",
      );
      if (!target || target === lastHoverTargetRef.current) return;
      lastHoverTargetRef.current = target;
      playHoverCue();
    };

    const onPointerOut = (event) => {
      const target = event.target?.closest?.(
        "a,button,input,textarea,select,[role='button'],[data-sound='hover']",
      );
      if (target && target === lastHoverTargetRef.current) {
        lastHoverTargetRef.current = null;
      }
    };

    const onPointerDown = (event) => {
      if (!soundEnabled) return;
      const target = event.target?.closest?.(
        "a,button,input,textarea,select,[role='button'],[data-sound='hover']",
      );
      if (!target) return;
      playTone("click");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKonami);
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keydown", onKonami);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [soundEnabled]);

  useEffect(() => {
    if (window.sessionStorage.getItem("os_intro_toast") === "1") return;
    window.sessionStorage.setItem("os_intro_toast", "1");
    addToast("New project deployed");
    if (portfolioData.personal.availableForWork) {
      window.setTimeout(() => addToast("Available for freelance work"), 1700);
    }
  }, []);

  const commands = useMemo(
    () => [
      {
        label: "Open Hero",
        description: "Jump to the command deck",
        keywords: ["home", "intro"],
        action: () =>
          document
            .querySelector("#hero")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Status Panel",
        description: "Open system diagnostics",
        keywords: ["about", "status"],
        action: () =>
          document
            .querySelector("#status")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Project Logs",
        description: "Jump to featured projects",
        keywords: ["projects", "work"],
        action: () =>
          document
            .querySelector("#projects")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Skill Matrix",
        description: "Inspect technical stack",
        keywords: ["skills"],
        action: () =>
          document
            .querySelector("#skills")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Work Experience",
        description: "Deployment log & internships",
        keywords: ["experience", "work", "internship"],
        action: () =>
          document
            .querySelector("#experience")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Education",
        description: "Training protocol & academics",
        keywords: ["education", "college", "school"],
        action: () =>
          document
            .querySelector("#education")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Certifications",
        description: "View credentials & certificates",
        keywords: ["certifications", "credentials", "certificates"],
        action: () =>
          document
            .querySelector("#certifications")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Transmission",
        description: "Open contact channel",
        keywords: ["contact", "email"],
        action: () =>
          document
            .querySelector("#transmission")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Copy Email",
        description: personal.email,
        keywords: ["mail", "contact"],
        action: async () => {
          await navigator.clipboard.writeText(personal.email);
          addToast("Email copied to clipboard");
        },
      },
      {
        label: "Download Resume Package",
        description: "Generate a resume download",
        keywords: ["resume", "cv"],
        action: () => {
          playTone("click");
          createResumePackage();
          addToast("Resume package ready");
        },
      },
    ],
    [],
  );

  const handleIntroComplete = () => {
    window.sessionStorage.setItem("os_boot_seen", "1");
    setIsLoading(false);
  };

  const handleResumeDownload = () => {
    addToast("Preparing resume package...");
    window.setTimeout(() => {
      playTone("click");
      createResumePackage();
      addToast("Resume package ready");
    }, 650);
  };

  return (
    <>
      <Helmet>
        <title>{personal.name} | Command Center OS</title>
        <meta
          name="description"
          content={`${personal.name} — ${personal.title}. ${portfolioData.about.bio}`}
        />
        <meta
          name="keywords"
          content="Mayank Charde, AI Developer, Full Stack Developer, MERN, LangGraph, LangChain, React, Portfolio, Command Center"
        />
        <meta name="author" content={personal.name} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${personal.name} | Command Center OS`}
        />
        <meta property="og:description" content={portfolioData.about.bio} />
        <meta property="og:url" content="https://mayankcharde.vercel.app" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${personal.name} | Command Center OS`}
        />
        <meta name="twitter:description" content={portfolioData.about.bio} />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
        />
      </Helmet>

      {/* Boot Sequence Loader */}
      {isLoading && (
        <Loader
          onComplete={handleIntroComplete}
          onSkip={() => {
            window.sessionStorage.setItem("os_boot_seen", "1");
            setIsLoading(false);
          }}
        />
      )}

      {/* Main Dashboard — rendered behind loader then revealed */}
      {!isLoading && (
        <div
          ref={shellRef}
          className="relative min-h-screen text-textPrimary overflow-x-hidden"
          style={{
            backgroundColor:
              THEME_PRESETS[theme]?.background || THEME_PRESETS.warm.background,
          }}
        >
          <div className="fixed left-4 top-[5.5rem] z-[1100] w-[200px] hidden md:block">
            <div className="rounded border border-secondary/15 bg-surface/80 backdrop-blur-sm px-3 py-2" style={{ boxShadow: "0 0 20px rgba(0,0,0,0.2)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] tracking-[0.3em] text-secondary/50 uppercase">Sys Progress</span>
                <span className="font-mono text-[9px] text-secondary/70">{Math.round(scrollProgress)}%</span>
              </div>
              <div className="h-px overflow-hidden rounded-full bg-secondary/10">
                <div
                  className="h-full rounded-full transition-[width] duration-150 progress-glow"
                  style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})` }}
                />
              </div>
            </div>
          </div>

          {/* ── RESUME PANEL — fixed right side ── */}
          <div className="fixed right-5 top-[5.5rem] z-[1100] hidden md:flex flex-col">
            <div className="resume-panel group">
              <div className="resume-panel__glow" />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-secondary/50 uppercase">Operator File</span>
              </div>
              <p className="font-mono text-xs font-bold text-textPrimary tracking-wider mb-0.5">{portfolioData.personal.name}</p>
              <p className="font-mono text-[10px] text-secondary/70 tracking-wide mb-4">{portfolioData.personal.title}</p>
              <button
                type="button"
                onClick={handleResumeDownload}
                className="resume-panel__btn group/btn"
              >
                <FaCloudDownloadAlt size={11} className="shrink-0" />
                <span>Download Resume</span>
                <span className="resume-panel__btn-arrow">→</span>
              </button>
              <div className="mt-3 pt-3 border-t border-secondary/10 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-highlight/60" />
                <span className="font-mono text-[9px] text-textSecondary/40 tracking-widest">PDF · LATEST VERSION</span>
              </div>
            </div>
          </div>

          <div className="fixed top-0 left-0 right-0 z-[1090] h-1 bg-black/10">
            <div
              className="h-full transition-[width] duration-150"
              style={{
                width: `${scrollProgress}%`,
                background: `linear-gradient(90deg, ${accentColor}, ${highlightColor})`,
              }}
            />
          </div>

          {/* Global ambient chrome overlays */}
          <GridBackground />
          <ScanlineOverlay />
          <CustomCursor />

          {/* Navigation */}
          <Navbar
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
            onDownloadResume={handleResumeDownload}
            onToggleSound={() => setSoundEnabled((current) => !current)}
            soundEnabled={soundEnabled}
          />

          {/* Main Content */}
          <main>
            {/* 01 — Hero / Main Deck */}
            <Hero />

            {/* Ticker data feed */}
            <Marquee />

            <section className="relative px-4 md:px-8 py-10">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div
                  drag={!isMobile}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-textSecondary">
                    <span>Terminal App</span>
                    <span>Drag Window</span>
                  </div>
                  <Suspense
                    fallback={
                      <div className="min-h-[26rem] rounded-2xl border border-white/10 bg-white/5 p-6 text-textSecondary">
                        Loading terminal...
                      </div>
                    }
                  >
                    <LiveTerminal
                      onEasterEgg={() => addToast("Orbit protocol unlocked")}
                    />
                  </Suspense>
                </motion.div>

                <motion.div
                  drag={!isMobile}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="rounded-[1.75rem] border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-textSecondary">
                    <span>Live Systems</span>
                    <span>GitHub Feed</span>
                  </div>
                  <Suspense
                    fallback={
                      <div className="min-h-[26rem] rounded-2xl border border-white/10 bg-white/5 p-6 text-textSecondary">
                        Loading GitHub stats...
                      </div>
                    }
                  >
                    <div className="min-h-[26rem]">
                      <GitHubStats />
                    </div>
                  </Suspense>
                </motion.div>
              </div>
            </section>

            {/* 02 — System Status / About */}
            <StatusPanel />

            {/* 03 — Project Logs */}
            <ProjectLogs />

            {/* 04 — Skill Matrix */}
            <Suspense
              fallback={
                <section className="relative w-full bg-black px-4 py-24 text-radar-text md:px-8">
                  <div className="mx-auto max-w-7xl rounded-[24px] border border-radar-border bg-radar-bg p-8 font-mono text-radar-text-muted">
                    Loading tactical radar...
                  </div>
                </section>
              }
            >
              <SkillsRadar />
            </Suspense>

            {/* 05 — Mission Timeline */}
            <Timeline />

            {/* 06 — Certifications */}
            <Certifications />

            {/* 07 — Transmission / Contact */}
            <Transmission />
          </main>

          <ToastStack toasts={toasts} />

          <Suspense fallback={null}>
            <CommandPalette
              open={paletteOpen}
              onClose={() => setPaletteOpen(false)}
              commands={commands}
            />
          </Suspense>

          <Suspense fallback={null}>
            <SettingsPanel
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              theme={theme}
              accent={accent}
              onThemeChange={setTheme}
              onAccentChange={setAccent}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((current) => !current)}
            />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}
