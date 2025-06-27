// Updated Solace to allow adding lyrics to journal + 5 pastel themes + safer PDF export
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";

const pastelThemes = [
  { name: "Lavender", bg: "#EBDFFC", text: "#4B3869" },
  { name: "Peach", bg: "#FFE5B4", text: "#6B3E26" },
  { name: "Mint", bg: "#D0F0C0", text: "#355E3B" },
  { name: "Sky", bg: "#D6F0FF", text: "#3A3A8C" },
  { name: "Rose", bg: "#FFE4E1", text: "#6D3F3F" }
];

function JournalingPrompts({ onClose }) {
  const [entry, setEntry] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const journalRef = useRef(null);

  const exportPDF = () => {
    if (!journalRef.current) {
      alert("Journal content not found.");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: "solace_journal.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      html2pdf().set(opt).from(journalRef.current).save();
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again later.");
    }
  };

  const applyTheme = (theme) => {
    setBgColor(theme.bg);
    setTextColor(theme.text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">📝 Journal Your Thoughts</h2>

        <div className="flex flex-wrap gap-2 mb-2">
          <label className="text-sm">BG: <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} /></label>
          <label className="text-sm">Text: <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} /></label>
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="text-sm border px-2 py-1 rounded">
            <option value="sans-serif">Sans</option>
            <option value="serif">Serif</option>
            <option value="cursive">Cursive</option>
            <option value="monospace">Mono</option>
          </select>
        </div>

        <div className="flex gap-2 flex-wrap mb-2">
          {pastelThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => applyTheme(theme)}
              className="px-2 py-1 rounded text-sm border hover:bg-gray-100"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              {theme.name}
            </button>
          ))}
        </div>

        <div
          id="journal-export"
          ref={journalRef}
          style={{ backgroundColor: bgColor, color: textColor, fontFamily }}
          className="border p-4 rounded-md"
        >
          <textarea
            rows={6}
            value={entry}
            onChange={e => setEntry(e.target.value)}
            placeholder="Write about your thoughts, feelings, or experience today..."
            className="w-full p-2 rounded border text-sm mb-2"
          />
          <textarea
            rows={3}
            value={lyrics}
            onChange={e => setLyrics(e.target.value)}
            placeholder="🎵 Add your favorite lyrics that resonate with you..."
            className="w-full p-2 rounded border text-sm italic"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
          <button onClick={exportPDF} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Export as PDF</button>
        </div>
      </div>
    </div>
  );
}

export default JournalingPrompts;
