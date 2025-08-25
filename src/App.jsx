import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { loginWithGoogle, logout, auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Card Component
function CardModel() {
  const { scene } = useGLTF("/card.glb");
  return <primitive object={scene} scale={1.2} />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: newMsg,
      uid: user.uid,
      name: user.displayName,
      photo: user.photoURL,
      createdAt: serverTimestamp(),
    });
    setNewMsg("");
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Preloader */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-black z-50"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          FEP
        </motion.h1>
      </motion.div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur bg-black/50 p-4 flex justify-between z-40">
        <h1 className="font-bold">Bang AL</h1>
        <div className="space-x-4">
          <a href="#about">About</a>
          <a href="#tools">Tools</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h2 className="text-4xl sm:text-6xl font-bold mb-4">Bang AL</h2>
        <p className="max-w-xl text-zinc-300">Welcome to my portfolio ✨</p>
        <div className="mt-6 flex space-x-4">
          <a
            href="/cv.pdf"
            className="px-4 py-2 bg-white text-black rounded-lg"
          >
            Download CV
          </a>
          <a href="#projects" className="px-4 py-2 bg-pink-600 rounded-lg">
            Explore Projects
          </a>
        </div>
      </section>

      {/* About with Card.glb */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center p-10"
      >
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="w-64 h-96 bg-zinc-900 rounded-xl overflow-hidden shadow-lg relative">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.6} />
            <OrbitControls enableZoom={false} />
            <CardModel />
          </Canvas>
        </div>
        <div className="mt-6 flex space-x-8 text-center">
          <div>
            <CountUp end={5} duration={3} className="text-3xl font-bold" />
            <p>Years Experience</p>
          </div>
          <div>
            <CountUp end={20} duration={3} className="text-3xl font-bold" />
            <p>Projects</p>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section
        id="tools"
        className="min-h-screen flex flex-col items-center justify-center p-10"
      >
        <h2 className="text-3xl font-bold mb-8">Tools & Technologies</h2>
        <div className="grid grid-cols-3 gap-6">
          {["react", "firebase", "tailwind", "vite", "framer", "three"].map(
            (t) => (
              <div key={t} className="p-4 bg-white/10 rounded-xl">
                <img
                  src={`/tools/${t}.png`}
                  alt={t}
                  className="w-16 h-16 mx-auto"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen p-10">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img src={`/projects/p${n}.png`} alt={`Project ${n}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact + Chat */}
      <section id="contact" className="min-h-screen p-10">
        <h2 className="text-3xl font-bold mb-8">Contact & Chat</h2>
        {!user ? (
          <button
            onClick={loginWithGoogle}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Login with Google
          </button>
        ) : (
          <div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 rounded-lg mb-4"
            >
              Logout
            </button>
            <div className="bg-white/10 p-4 rounded-xl max-w-md space-y-2">
              <div className="h-64 overflow-y-auto space-y-1">
                {messages.map((m) => (
                  <div key={m.id} className="p-2 bg-white/5 rounded">
                    <strong>{m.name}:</strong> {m.text}
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1 p-2 bg-black/50 border border-white/20 rounded"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="px-3 bg-green-600 rounded text-white"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black/80 p-6 text-center">
        <p className="text-zinc-500">
          © {new Date().getFullYear()} Bang AL. Built with ❤️
        </p>
      </footer>
    </div>
  );
        }
        
