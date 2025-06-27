// Solace Journaling Component with Auto-Save, PDF Export, and Stickers
import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

const themes = [
  { name: "Lavender", bg: "#EBDFFC", text: "#4B3869" },
  { name: "Peach", bg: "#FFE5B4", text: "#6B3E26" },
  { name: "Mint", bg: "#D0F0C0", text: "#355E3B" },
  { name: "Sky", bg: "#D6F0FF", text: "#3A3A8C" },
  { name: "Rose", bg: "#FFE4E1", text: "#6D3F3F" }
];

const stickerList = ["🌸", "✨", "💖", "🌿", "🐧", "🌈", "🦋", "☁️"];

export default function JournalingPrompts() {
  const [toast, setToast] = useState('');
  const [entry, setEntry] = useState(localStorage.getItem('solace_entry') || '');
  const [lyrics, setLyrics] = useState(localStorage.getItem('solace_lyrics') || '');
  const [bgColor, setBgColor] = useState(localStorage.getItem('solace_bgColor') || '#ffffff');
  const [textColor, setTextColor] = useState(localStorage.getItem('solace_textColor') || '#000000');
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('solace_fontFamily') || 'sans-serif');
  const [stickers, setStickers] = useState(JSON.parse(localStorage.getItem('solace_stickers') || '[]'));
  const journalRef = useRef(null);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  useEffect(() => {
    localStorage.setItem('solace_entry', entry);
  }, [entry]);

  useEffect(() => {
    localStorage.setItem('solace_lyrics', lyrics);
  }, [lyrics]);

  useEffect(() => {
    localStorage.setItem('solace_bgColor', bgColor);
  }, [bgColor]);

  useEffect(() => {
    localStorage.setItem('solace_textColor', textColor);
  }, [textColor]);

  useEffect(() => {
    localStorage.setItem('solace_fontFamily', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('solace_stickers', JSON.stringify(stickers));
  }, [stickers]);

  const exportPDF = () => {
    if (!journalRef.current) return;

    const opt = {
      margin:       0.5,
      filename:     'solace_journal.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      html2pdf().set(opt).from(journalRef.current).save();
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Something went wrong while exporting. Please try again.");
    }
  };

  const addSticker = (sticker) => {
    setStickers([...stickers, sticker]);
  };

  const restoreLastSaved = () => {
    setToast('🔁 Journal restored from last saved version.');
    setEntry(localStorage.getItem('solace_entry') || '');
    setLyrics(localStorage.getItem('solace_lyrics') || '');
    setBgColor(localStorage.getItem('solace_bgColor') || '#ffffff');
    setTextColor(localStorage.getItem('solace_textColor') || '#000000');
    setFontFamily(localStorage.getItem('solace_fontFamily') || 'sans-serif');
    setStickers(JSON.parse(localStorage.getItem('solace_stickers') || '[]'));
  };

  const clearJournal = () => {
    setToast('🗑️ Journal cleared.');
    localStorage.removeItem('solace_entry');
    localStorage.removeItem('solace_lyrics');
    localStorage.removeItem('solace_bgColor');
    localStorage.removeItem('solace_textColor');
    localStorage.removeItem('solace_fontFamily');
    localStorage.removeItem('solace_stickers');
    setEntry('');
    setLyrics('');
    setBgColor('#ffffff');
    setTextColor('#000000');
    setFontFamily('sans-serif');
    setStickers([]);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F4] p-6">
      <h2 className="text-3xl font-bold text-[#4B3869] mb-4">📝 Journal with Solace</h2>

      <div className="flex gap-4 flex-wrap mb-4">
        {themes.map(theme => (
          <button
            key={theme.name}
            onClick={() => { setBgColor(theme.bg); setTextColor(theme.text); }}
            className="px-3 py-1 rounded border text-sm shadow"
            style={{ backgroundColor: theme.bg, color: theme.text }}
          >
            {theme.name}
          </button>
        ))}
        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="border rounded px-2">
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="cursive">Cursive</option>
          <option value="monospace">Mono</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="text-[#6B3E26] font-medium mb-2">Add a sticker to your journal ✨</p>
        <div className="flex gap-2 flex-wrap">
          {stickerList.map((sticker, index) => (
            <button
              key={index}
              onClick={() => addSticker(sticker)}
              className="text-xl px-2 py-1 bg-white border rounded shadow hover:bg-gray-100"
            >
              {sticker}
            </button>
          ))}
        </div>
      </div>

      <div ref={journalRef} style={{ backgroundColor: bgColor, color: textColor, fontFamily }} className="rounded-lg p-4 shadow-md">
        <div className="text-2xl mb-2 flex gap-2 flex-wrap">
          {stickers.map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <textarea
          rows={8}
          placeholder="Write your thoughts..."
          value={entry}
          onChange={e => setEntry(e.target.value)}
          className="w-full border rounded p-2 mb-2 text-sm"
        />
        <textarea
          rows={3}
          placeholder="🎵 Add meaningful lyrics..."
          value={lyrics}
          onChange={e => setLyrics(e.target.value)}
          className="w-full border rounded p-2 text-sm italic"
        />
      </div>

      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-3">
          <button onClick={restoreLastSaved} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg shadow hover:bg-green-200">
            ♻️ Restore Last Saved
          </button>
          <button onClick={clearJournal} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg shadow hover:bg-red-200">
            🗑️ Clear Journal
          </button>
        </div>
        <button onClick={exportPDF} className="px-5 py-2 bg-[#EBDFFC] text-[#4B3869] font-semibold rounded-lg shadow hover:bg-[#e1d4f7]">
          📄 Export as PDF
        </button>
      </div>

      {toast && (
        <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-sm transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
