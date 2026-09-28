import React, { useState, useMemo } from 'react';
import { Question } from '../types';
import {
  Layers,
  Search,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface QuestionBankExplorerProps {
  questions: Question[];
  onStartExam: (filterMakalahId?: 1 | 2 | 3 | 'all') => void;
  onNavigateToMaterial: (makalahId: 1 | 2 | 3) => void;
}

export const QuestionBankExplorer: React.FC<QuestionBankExplorerProps> = ({
  questions,
  onStartExam,
  onNavigateToMaterial,
}) => {
  const [selectedMakalah, setSelectedMakalah] = useState<'all' | 1 | 2 | 3>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllExplanations, setShowAllExplanations] = useState<boolean>(true);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  // Extract unique topics for the selected makalah
  const topics = useMemo(() => {
    const list = questions
      .filter((q) => selectedMakalah === 'all' || q.makalahId === selectedMakalah)
      .map((q) => q.topic);
    return Array.from(new Set(list));
  }, [questions, selectedMakalah]);

  // Filtered questions
  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (selectedMakalah !== 'all' && q.makalahId !== selectedMakalah) return false;
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesTop = q.topic.toLowerCase().includes(query);
        const matchesExp = q.explanation.toLowerCase().includes(query);
        const matchesOpt = q.options.some((o) => o.text.toLowerCase().includes(query));
        const matchesLaw = q.lawReference?.toLowerCase().includes(query);
        return matchesQ || matchesTop || matchesExp || matchesOpt || matchesLaw;
      }
      return true;
    });
  }, [questions, selectedMakalah, selectedTopic, searchQuery]);

  const toggleReveal = (qId: number) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Katalog Lengkap Soal & Pembahasan</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Eksplorasi Bank 100 Soal CBT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
            Telusuri seluruh bank butir soal berdasarkan judul makalah, kisi-kisi topik, atau kata kunci pencarian. Lengkap dengan kunci jawaban resmi dan pembahasan yuridis ilmiah.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowAllExplanations(!showAllExplanations)}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {showAllExplanations ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Sembunyikan Kunci</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Buka Semua Kunci</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onStartExam(selectedMakalah)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Ujian ({filtered.length} Soal)</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Top Filter Buttons for Makalah */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedMakalah('all');
              setSelectedTopic('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedMakalah === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Semua Makalah (100)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMakalah(1);
              setSelectedTopic('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedMakalah === 1
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Makalah 1: Regulasi TI (40)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMakalah(2);
              setSelectedTopic('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedMakalah === 2
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Makalah 2: Membaca Lateral (30)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMakalah(3);
              setSelectedTopic('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedMakalah === 3
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            Makalah 3: Mesin Pencari (30)
          </button>
        </div>

        {/* Search & Topic Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari kueri pertanyaan, pasal hukum, atau penjelasan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Topik:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500 max-w-[220px] truncate"
            >
              <option value="all">Semua Sub-Topik</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions Cards List */}
      <div className="space-y-5">
        <div className="text-xs text-slate-500 font-medium flex items-center justify-between px-1">
          <span>
            Menampilkan <strong className="text-slate-900">{filtered.length}</strong> butir soal
          </span>
          {searchQuery && (
            <span>
              Hasil penelusuran untuk: &quot;{searchQuery}&quot;
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-sm font-semibold text-slate-700">Tidak ada soal yang sesuai dengan pencarian Anda.</p>
            <p className="text-xs mt-1">Coba gunakan kata kunci lain atau pilih &apos;Semua Makalah&apos;.</p>
          </div>
        ) : (
          filtered.map((q) => {
            const isRevealed = showAllExplanations || revealedQuestions[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4 hover:border-slate-300 transition-colors"
              >
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      Soal #{q.id}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 font-medium">{q.makalahTitle}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-indigo-600 font-semibold">{q.topic}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleReveal(q.id)}
                    className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Sembunyikan Kunci' : 'Lihat Kunci & Pembahasan'}</span>
                  </button>
                </div>

                {/* Question */}
                <div className="text-base text-slate-900 font-medium leading-relaxed">
                  {q.question}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isKey = isRevealed && opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                          isKey
                            ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-medium'
                            : 'bg-slate-50/60 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                            isKey
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="pt-0.5">{opt.text}</span>
                        {isKey && (
                          <span className="text-[11px] font-bold text-emerald-700 ml-auto flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Kunci Jawaban
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Official Explanation Box if revealed */}
                {isRevealed && (
                  <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold text-indigo-950">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Pembahasan & Analisis Soal:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{q.explanation}</p>
                    {q.lawReference && (
                      <div className="text-[11px] text-indigo-800 font-semibold pt-2 border-t border-indigo-200/60 flex items-center justify-between">
                        <span>Rujukan: {q.lawReference}</span>
                        <button
                          type="button"
                          onClick={() => onNavigateToMaterial(q.makalahId)}
                          className="text-indigo-600 hover:text-indigo-900 underline font-medium"
                        >
                          Buka Materi Makalah {q.makalahId} →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
