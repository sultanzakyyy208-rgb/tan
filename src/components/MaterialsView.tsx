import React, { useState } from 'react';
import { Makalah } from '../types';
import {
  BookOpen,
  Search,
  Scale,
  Users,
  Calendar,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Globe,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface MaterialsViewProps {
  makalahList: Makalah[];
  selectedMakalahId: 1 | 2 | 3;
  setSelectedMakalahId: (id: 1 | 2 | 3) => void;
  onStartExamForMakalah: (makalahId: 1 | 2 | 3) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  makalahList,
  selectedMakalahId,
  setSelectedMakalahId,
  onStartExamForMakalah,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const currentMakalah =
    makalahList.find((m) => m.id === selectedMakalahId) || makalahList[0];

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Paper Selector Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {makalahList.map((m) => {
            const isSelected = m.id === selectedMakalahId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMakalahId(m.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5 opacity-90">
                    <span className="font-semibold uppercase tracking-wider">
                      Makalah {m.id}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums">
                      {m.stats.questionCount} Soal CBT
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug line-clamp-2">
                    {m.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-current/15 flex items-center justify-between text-[11px] opacity-80">
                  <span>{m.school}</span>
                  <span className="font-medium">Baca Materi →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Makalah Hero Information Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-linear-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-2">
            <span>Makalah {currentMakalah.id}</span>
            <span>·</span>
            <span>{currentMakalah.subject}</span>
            <span>·</span>
            <span>Tahun Ajaran {currentMakalah.year}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {currentMakalah.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-4">
            {currentMakalah.subtitle}
          </p>

          {/* Authors and Advisor */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block mb-1">Disusun oleh:</span>
              <span className="font-medium text-white">
                {currentMakalah.authors.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Guru Pembimbing:</span>
              <span className="font-medium text-white">{currentMakalah.advisor}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onStartExamForMakalah(currentMakalah.id)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Uji {currentMakalah.stats.questionCount} Soal Materi Ini</span>
              </button>
            </div>
          </div>
        </div>

        {/* Paper Overview & Quick Highlights */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-semibold block mb-1">
            Ringkasan Eksekutif Makalah:
          </strong>
          <p>{currentMakalah.summary}</p>
        </div>
      </div>

      {/* Main Layout: Sidebar Navigation (Left 30%) + Content View (Right 70%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Table of Contents & Quick Action */}
        <div className="lg:col-span-4 space-y-5 sticky top-24">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Daftar Isi Makalah {currentMakalah.id}</span>
            </h3>

            <nav className="space-y-1 text-xs">
              {currentMakalah.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex items-center justify-between ${
                    activeSectionId === sec.id
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                </button>
              ))}
            </nav>

            {/* Jump to Quiz CTA */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onStartExamForMakalah(currentMakalah.id)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Kerjakan {currentMakalah.stats.questionCount} Soal CBT Makalah Ini</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Search inside this paper */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Cari Kata Kunci di Makalah</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Pasal 28, Triangulasi, E-E-A-T..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <p className="text-[11px] text-indigo-600">
                Gunakan Ctrl+F di peramban untuk melompat langsung ke kata kunci.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Full Makalah Content & Special Tables */}
        <div className="lg:col-span-8 space-y-8">
          {/* If Makalah 1, render the Key Law Table directly */}
          {currentMakalah.id === 1 && currentMakalah.keyLawTable && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Matriks Sanksi Pidana UU ITE (UU No. 1/2024) & KUHP
                  </h3>
                  <p className="text-xs text-slate-500">
                    Rujukan yuridis sanksi pidana dan denda pada kejahatan siber di Indonesia
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                      <th className="p-2.5">Bentuk Pelanggaran</th>
                      <th className="p-2.5">Pasal Rujukan</th>
                      <th className="p-2.5">Ancaman Sanksi Maksimal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentMakalah.keyLawTable.map((law, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-2.5 font-semibold text-slate-900">
                          {law.category}
                          <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                            {law.details}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-indigo-700 font-medium">
                          {law.article}
                        </td>
                        <td className="p-2.5 font-medium text-rose-700">
                          {law.sanction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* If Makalah 3, render Comparative Search Engine Table */}
          {currentMakalah.id === 3 && currentMakalah.comparativeTable && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Perbandingan 4 Jenis Mesin Pencari Modern
                  </h3>
                  <p className="text-xs text-slate-500">
                    Karakteristik, kelebihan, dan kelemahan mesin pencari umum, privasi, vertikal, dan AI
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                      <th className="p-2.5">Kategori Mesin</th>
                      <th className="p-2.5">Contoh Platform</th>
                      <th className="p-2.5">Kelebihan Utama</th>
                      <th className="p-2.5">Kelemahan / Tantangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentMakalah.comparativeTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-2.5 font-semibold text-slate-900">{row.type}</td>
                        <td className="p-2.5 font-mono text-[11px] text-indigo-700">{row.examples}</td>
                        <td className="p-2.5 text-emerald-800">{row.pros}</td>
                        <td className="p-2.5 text-slate-600">{row.cons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Full Sections Breakdown */}
          {currentMakalah.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                {section.title}
              </h2>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Subsections if available */}
              {section.subsections && section.subsections.length > 0 && (
                <div className="space-y-4 pt-3">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2.5"
                    >
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {sub.title}
                      </h3>
                      {sub.paragraphs && (
                        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                          {sub.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      )}
                      {sub.bullets && (
                        <ul className="space-y-2 text-xs text-slate-700">
                          {sub.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bottom Call to Action: Start Test on This Paper */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center space-y-3">
            <h3 className="text-base font-bold text-indigo-950">
              Siap Menguji Penguasaan Materi {currentMakalah.title}?
            </h3>
            <p className="text-xs text-indigo-800 max-w-xl mx-auto leading-relaxed">
              Terdapat {currentMakalah.stats.questionCount} butir soal pilihan ganda berstandar CBT
              yang dirancang khusus untuk menguji pemahaman Anda terhadap bab ini.
            </p>
            <button
              type="button"
              onClick={() => onStartExamForMakalah(currentMakalah.id)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mulai Uji CBT Khusus Makalah Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
