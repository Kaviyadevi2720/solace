// Solace Landing Page - Soft, calming intro to the chatbot with breathing penguin
import React from 'react';
import { motion } from 'framer-motion';
import { PiBirdBold } from 'react-icons/pi';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF7F4] flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-[#4B3869] mb-4"
      >
        Welcome to Solace🕊️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg md:text-xl text-[#6B3E26] max-w-2xl mb-8"
      >
        Your safe, soothing space to breathe, journal, and feel heard — anytime you need comfort🦋
      </motion.p>

      <motion.div
        className="mb-6"
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.95, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-6xl text-[#6B3E26]">
          <PiBirdBold />
        </div>
        <p className="text-sm text-[#999] mt-1">Breathe with Solace</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-4 items-center"
      >
        <a href="/journal" className="px-6 py-3 bg-[#D0F0C0] text-[#355E3B] text-lg font-semibold rounded-xl shadow hover:bg-[#c4e8b7] transition">
          Start Journaling
        </a>
        <a href="/chatbot" className="px-6 py-3 bg-[#EBDFFC] text-[#4B3869] text-lg font-semibold rounded-xl shadow hover:bg-[#e1d4f7] transition">
          Talk to Solace 🤍
        </a>
      </motion.div>

      <footer className="mt-12 text-sm text-[#999]">
        Made with 💗 for every lonely soul needing comfort.
      </footer>
    </div>
  );
}
