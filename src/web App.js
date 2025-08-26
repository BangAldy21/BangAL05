import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Rocket,
  Code2,
  Phone,
  MessageCircle,
  X,
  Star,
} from "lucide-react";

// OPTIONAL: If you want Firebase chat, fill firebaseConfig below and ensure packages are installed:
// npm i firebase
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
// const app = initializeApp(firebaseConfig); const db = getFirestore(app);

/* ========================
   BASIC DATA (edit freely)
======================== */
const ME = {
  name: "Bang AL",
  role: "Web Developer",
  tagline:
    "Membangun aplikasi/web modern berperforma tinggi dengan UI elegan.",
  avatar: "/me.png", // ganti dengan foto kamu (letakkan di public/me.png)
  cvUrl: "/cv.pdf",
  socials: [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ],
};

const TOOLS = [
  "React",
  "Vite",
  "Tailwind",
  "Firebase",
  "Framer Motion",
  "TypeScript",
  "Node.js",
  "Figma",
  "Git/GitHub",
];

const PROJECTS = [
  { title: "Project One", img: "/p1.png", tech: ["React", "Tailwind"], link: "#", desc: "Deskripsi singkat project." },
  { title: "Project Two", img: "/p2.png", tech: ["React", "Firebase"], link: "#", desc: "Deskripsi singkat project." },
  { title: "Project Three", img: "/p3.webp", tech: ["Next.js"], link: "#", desc: "Deskripsi singkat project." },
  { title: "Project Four", img: "/p4.png", tech: ["Node.js"], link: "#", desc: "Deskripsi singkat project." },
  { title: "Project Five", img: "/p5.webp", tech: ["React"], link: "#", desc: "Deskripsi singkat project." },
  { title: "Project Six", img: "/p6.png", tech: ["TS"], link: "#", desc: "Deskripsi singkat project." },
];

/* ========================
   SMALL UTILITIES
======================== */
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-6 bg-white/5 backdrop-blur border border-white/10 shadow-[0_0_0_1px_rgba(148,163,184,0.12)] ${className}`}>
      {children}
    </div>
  );
}

function GradientAurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-violet-500/35 via-teal-400/25 to-fuchsia-500/25 blur-3xl" />
      <div className="absolute bottom-[-18rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-cyan-400/20 to-emerald-400/20 blur-3xl" />
    </div>
  );
}

function useScrambleText(text) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      const progress = Math.min(1, i / 20);
      const keep = Math.floor(text.length * progress);
      const scramble = text
        .split("")
        .map((ch, idx) => (idx < keep ? ch : chars[Math.floor(Math.random() * chars.length)]))
        .join("");
      setOut(scramble);
      if (progress === 1) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [text]);
  return out;
}

function useCountUp(target, startWhenInViewRef) {
  const isInView = useInView(startWhenInViewRef, { amount: 0.3, once: true });
  const [value, set] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      set(Math.floor(target * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return value;
}

/* ========================
   NAVBAR + PRELOADER
======================== */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="font-semibold tracking-tight text-white">Portofolio</a>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>☰</button>
        <div className={`gap-6 text-sm text-slate-300 md:flex ${open ? "flex" : "hidden"}`}>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#tools" className="hover:text-white">Tools</a>
          <a href="#projects" className="hover:text-white">Project</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>
    </header>
  );
}

function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0b0b10]">
      <div className="h-12 w-12 animate-pulse rounded-full border-2 border-violet-400 border-t-transparent" />
    </div>
  );
}

/* ========================
   HERO (match screenshot)
======================== */
function Hero() {
  const scrambled = useScrambleText("Hi I'm Bang AL");
  return (
    <section className="relative py-20">
      <GradientAurora />
      <div className="mx-auto max-w-6xl px-4 grid items-center gap-10 md:grid-cols-[1.3fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Rocket className="h-3.5 w-3.5" /> avoid or just undertake it
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(124,58,237,0.25)]">
              {scrambled}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-slate-300/90">
            Pengembang aplikasi dan web yang berfokus pada desain modern, performa tinggi,
            dan solusi berbasis teknologi. Berpengalaman membangun website
            interaktif serta mengintegrasikan AI/ML untuk inovasi yang bermanfaat.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={ME.cvUrl} className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition">
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition">
              <Code2 className="h-4 w-4" /> Explore My Projects
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            {ME.socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="rounded-full border border-white/15 bg-white/5 p-2 text-slate-200 hover:bg-white/10">
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="justify-self-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-600/50 via-transparent to-cyan-400/50 blur-xl" />
            <Card className="relative w-72 sm:w-80">
              <img src={ME.avatar} alt="Bang AL" className="h-56 w-full rounded-xl object-cover" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-white">Bang AL</h3>
                <p className="text-sm text-slate-300">Web Developer</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-slate-300">
                <span className="text-xs">@bangal</span>
                <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/10">Contact Me</a>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================
   ABOUT (GLB hook point)
======================== */
function About() {
  const ref = useRef(null);
  const years = useCountUp(3, ref);
  const projects = useCountUp(20, ref);
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-2" ref={ref}>
        <Card>
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="mt-3 text-slate-300">
            Saya fokus pada performa, aksesibilitas, dan UX. Suka UI gelap dengan animasi halus dan efek glass.
            Angka di bawah akan naik (CountUp) saat bagian ini terlihat.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-slate-200">
            <div>
              <div className="text-3xl font-bold">{projects}+</div>
              <div className="text-xs text-slate-400">Projects Finished</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{years}+</div>
              <div className="text-xs text-slate-400">Years of Experience</div>
            </div>
          </div>
        </Card>
        <Card className="min-h-[20rem] grid place-items-center">
          <div className="text-center">
            <div className="mb-3 text-sm text-slate-400">3D Card (.glb) placeholder</div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-slate-300 max-w-xs">
                Taruh file <code>public/card.glb</code>. Nanti bisa diganti dengan viewer 3D (react-three-fiber or model-viewer).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ========================
   TOOLS & TECH (ChromaGrid)
======================== */
function Tools() {
  return (
    <section id="tools" className="relative py-16">
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,_black,transparent_70%)]">
        {/* Chroma grid effect */}
        <div className="h-full w-full bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%)]" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-semibold text-white">Tools & Technologies</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {TOOLS.map((t) => (
            <div key={t} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
              <span>{t}</span>
              <Star className="h-4 w-4 opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================
   PROJECTS (modal)
======================== */
function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-semibold text-white">Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, idx) => (
            <Card key={p.title} className="cursor-pointer group" onClick={() => setOpen(idx)}>
              <div className="relative">
                <img src={p.img} alt={p.title} className="h-40 w-full rounded-xl object-cover" />
                <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/30 transition" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-slate-300">{p.desc}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111214] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{PROJECTS[open].title}</h3>
              <button onClick={() => setOpen(null)} className="rounded-full p-2 hover:bg-white/10"><X className="h-5 w-5"/></button>
            </div>
            <img src={PROJECTS[open].img} alt="preview" className="mt-3 h-64 w-full rounded-xl object-cover" />
            <p className="mt-3 text-slate-300">{PROJECTS[open].desc}</p>
            <a href={PROJECTS[open].link} className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition">
              Visit <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

/* ========================
   CONTACT + CHAT (Firebase-ready)
======================== */
function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, user: "System", text: "Selamat datang di web Portofolio!" },
    { id: 2, user: "System", text: "Login untuk mengirim pesan (Firebase)." },
  ]);
  const [text, setText] = useState("");

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // TODO: push to Firestore if configured
    setMessages((m) => [...m, { id: Date.now(), user: "Guest", text }]);
    setText("");
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-white flex items-center gap-2"><MessageCircle className="h-5 w-5"/> Chat Room</h4>
        <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">Login with Google</button>
      </div>
      <div className="mt-3 h-52 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="max-w-[85%] rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-200">
            <span className="text-xs text-slate-400 mr-2">{m.user}:</span> {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis pesan..." className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-violet-400/50" />
        <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">Kirim</button>
      </form>
    </Card>
  );
}

function Contact() {
  function submit(e) { e.preventDefault(); alert("Terima kasih! (form demo)"); }
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-2">
        <ChatRoom />
        <Card>
          <h3 className="text-2xl font-semibold text-white">Send a Message</h3>
          <form onSubmit={submit} className="mt-4 grid gap-3">
            <input required placeholder="Full Name" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-violet-400/50" />
            <input required type="email" placeholder="Email" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-violet-400/50" />
            <textarea required rows={5} placeholder="Message" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-violet-400/50" />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition">
              <Phone className="h-4 w-4" /> Send
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
}

/* ========================
   DOCK + FOOTER
======================== */
function Dock() {
  const items = [Github, Linkedin, Mail];
  return (
    <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur">
      <div className="flex items-end gap-3">
        {items.map((Icon, i) => (
          <a key={i} href="#" className="grid place-items-center rounded-xl p-2 transition-transform hover:scale-125">
            <Icon className="h-5 w-5 text-slate-200" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioApp() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-slate-200">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tools />
        <Projects />
        <Contact />
      </main>
      <Dock />
      <footer className="border-t border-white/10 py-10 mt-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Bang AL. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {ME.socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="rounded-full border border-white/15 bg-white/5 p-2 text-slate-200 hover:bg-white/10">
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
