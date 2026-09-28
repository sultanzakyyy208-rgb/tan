import React, { useState, useMemo } from 'react';
import { Question, UserAnswers, FlaggedQuestions } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Printer,
  BookOpen,
  Search,
  Filter,
  Check,
  X,
  FileText,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CbtReviewViewProps {
  questions: Question[];
  userAnswers: UserAnswers;
  flaggedQuestions: FlaggedQuestions;
  onResetExam: () => void;
  onNavigateToMaterial: (makalahId: 1 | 2 | 3) => void;
}

export const CbtReviewView: React.FC<CbtReviewViewProps> = ({
  questions,
  userAnswers,
  flaggedQuestions,
  onResetExam,
  onNavigateToMaterial,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');
  const [makalahFilter, setMakalahFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Performance calculations
  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    const perMakalah: Record<1 | 2 | 3, { total: number; correct: number }> = {
      1: { total: 0, correct: 0 },
      2: { total: 0, correct: 0 },
      3: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      perMakalah[q.makalahId].total += 1;

      if (!userAns) {
        unanswered += 1;
      } else if (userAns === q.correctAnswer) {
        correct += 1;
        perMakalah[q.makalahId].correct += 1;
      } else {
        wrong += 1;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 75;

    let predicate = 'Perlu Belajar Lebih Giat';
    if (score >= 90) predicate = 'Sangat Memuaskan (A)';
    else if (score >= 80) predicate = 'Memuaskan (B+)';
    else if (score >= 75) predicate = 'Lulus KKM (B)';
    else if (score >= 60) predicate = 'Cukup (C)';

    return {
      total: questions.length,
      correct,
      wrong,
      unanswered,
      score,
      passed,
      predicate,
      perMakalah,
    };
  }, [questions, userAnswers]);

  // Trigger celebration if score >= 75 once
  React.useEffect(() => {
    if (stats.score >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [stats.score]);

  // Filtered review questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const ans = userAnswers[q.id];
      const isCorrect = ans === q.correctAnswer;
      const isUnanswered = ans == null;

      // Status Filter
      if (filterType === 'correct' && !isCorrect) return false;
      if (filterType === 'wrong' && (isCorrect || isUnanswered)) return false;
      if (filterType === 'unanswered' && !isUnanswered) return false;

      // Makalah Filter
      if (makalahFilter !== 'all' && q.makalahId !== makalahFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const qText = q.question.toLowerCase();
        const topText = q.topic.toLowerCase();
        const explText = q.explanation.toLowerCase();
        const search = searchQuery.toLowerCase();
        return qText.includes(search) || topText.includes(search) || explText.includes(search);
      }

      return true;
    });
  }, [questions, userAnswers, filterType, makalahFilter, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Scoreboard */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Hasil Evaluasi Ujian CBT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Rekapitulasi Nilai & Pembahasan Soal
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Selamat atas penyelesaian ujian Anda. Tinjau setiap nomor soal di bawah untuk
              mempelajari pembahasan mendalam, pasal perundang-undangan, dan konsep teori terkait.
            </p>
          </div>

          {/* Big Score Display */}
          <div className="flex items-center gap-6 bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="text-center">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">Skor Akhir</span>
              <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-white">
                {stats.score}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Skala 100</span>
            </div>
            <div className="h-12 w-px bg-slate-700" />
            <div className="text-left space-y-1">
              <div
                className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                  stats.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {stats.passed ? 'LULUS UJIAN' : 'BELUM TUNTAS'}
              </div>
              <div className="text-xs text-slate-300 font-medium">{stats.predicate}</div>
              <div className="text-[11px] text-slate-400">KKM Sekolah: 75</div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Jawaban Benar</span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700">
              {stats.correct}{' '}
              <span className="text-xs font-normal text-slate-500">
                ({Math.round((stats.correct / stats.total) * 100)}%)
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Jawaban Salah</span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-rose-700">
              {stats.wrong}{' '}
              <span className="text-xs font-normal text-slate-500">
                ({Math.round((stats.wrong / stats.total) * 100)}%)
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span>Tidak Dijawab</span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-700">
              {stats.unanswered}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Total Bank Soal</span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.total} Soal
            </div>
          </div>
        </div>

        {/* Breakdown per Makalah Progress */}
        <div className="p-6 border-t border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Performa Per Judul Makalah
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Makalah 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 truncate">1. Peraturan Perundang-Undangan TI</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {stats.perMakalah[1].correct}/{stats.perMakalah[1].total}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (stats.perMakalah[1].correct / (stats.perMakalah[1].total || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                <span>40 Soal (UU ITE & PDP)</span>
                <button
                  onClick={() => onNavigateToMaterial(1)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5"
                >
                  <span>Baca Materi</span>
                </button>
              </div>
            </div>

            {/* Makalah 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 truncate">2. Membaca Lateral</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {stats.perMakalah[2].correct}/{stats.perMakalah[2].total}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (stats.perMakalah[2].correct / (stats.perMakalah[2].total || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                <span>30 Soal (Triangulasi Konten)</span>
                <button
                  onClick={() => onNavigateToMaterial(2)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5"
                >
                  <span>Baca Materi</span>
                </button>
              </div>
            </div>

            {/* Makalah 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 truncate">3. Mesin Pencari</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {stats.perMakalah[3].correct}/{stats.perMakalah[3].total}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (stats.perMakalah[3].correct / (stats.perMakalah[3].total || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                <span>30 Soal (Algoritma SERP & AI)</span>
                <button
                  onClick={() => onNavigateToMaterial(3)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5"
                >
                  <span>Baca Materi</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={onResetExam}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Simulasi Ujian</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Hasil / Simpan PDF</span>
            </button>
          </div>

          <div className="text-xs text-slate-500">
            Menampilkan <strong className="text-slate-800">{filteredQuestions.length}</strong> dari {questions.length} soal
          </div>
        </div>
      </div>

      {/* Filter and Search Bar for Review List */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            onClick={() => setFilterType('wrong')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === 'wrong'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hanya Salah ({stats.wrong})
          </button>
          <button
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === 'correct'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hanya Benar ({stats.correct})
          </button>
          <button
            onClick={() => setFilterType('unanswered')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === 'unanswered'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tidak Dijawab ({stats.unanswered})
          </button>
        </div>

        {/* Right: Makalah Dropdown & Search Input */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={makalahFilter}
            onChange={(e) => {
              const val = e.target.value;
              setMakalahFilter(val === 'all' ? 'all' : (Number(val) as 1 | 2 | 3));
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Semua Makalah</option>
            <option value="1">Makalah 1: Regulasi TI</option>
            <option value="2">Makalah 2: Membaca Lateral</option>
            <option value="3">Makalah 3: Mesin Pencari</option>
          </select>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari kata kunci soal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-sm font-medium">Tidak ada soal yang cocok dengan kriteria filter saat ini.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isUnanswered = userAns == null;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border shadow-xs p-6 space-y-5 transition-all ${
                  isCorrect
                    ? 'border-emerald-200/80 bg-white'
                    : isUnanswered
                    ? 'border-slate-200 bg-white'
                    : 'border-rose-200/80 bg-white'
                }`}
              >
                {/* Header of Question Card */}
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

                  {/* Status Indicator */}
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>BENAR</span>
                      </span>
                    ) : isUnanswered ? (
                      <span className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-xs">
                        <span>TIDAK DIJAWAB</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 text-xs">
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                        <span>SALAH</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <div className="text-base text-slate-900 font-medium leading-relaxed">
                  {q.question}
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isKeyCorrect = opt.key === q.correctAnswer;
                    const isUserChoice = opt.key === userAns;

                    let optBg = 'bg-slate-50/60 border-slate-200 text-slate-700';
                    let badge = null;

                    if (isKeyCorrect) {
                      optBg = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-medium';
                      badge = (
                        <span className="text-[11px] font-bold text-emerald-700 ml-auto flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          Kunci Benar
                        </span>
                      );
                    } else if (isUserChoice && !isKeyCorrect) {
                      optBg = 'bg-rose-50/80 border-rose-400 text-rose-950 font-medium';
                      badge = (
                        <span className="text-[11px] font-bold text-rose-700 ml-auto flex items-center gap-1">
                          <X className="w-3 h-3 stroke-[2.5]" />
                          Jawaban Anda
                        </span>
                      );
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-3 ${optBg}`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                            isKeyCorrect
                              ? 'bg-emerald-600 text-white'
                              : isUserChoice
                              ? 'bg-rose-600 text-white'
                              : 'bg-white text-slate-600 border border-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="pt-0.5">{opt.text}</span>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation and Legal / Theoretical Reference Box */}
                <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-950">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Pembahasan & Penjelasan Resmi:</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{q.explanation}</p>
                  {q.lawReference && (
                    <div className="text-[11px] text-indigo-800 font-semibold pt-2 border-t border-indigo-200/60 flex items-center justify-between">
                      <span>Rujukan Materi: {q.lawReference}</span>
                      <button
                        onClick={() => onNavigateToMaterial(q.makalahId)}
                        className="text-indigo-600 hover:text-indigo-900 underline font-medium"
                      >
                        Buka Bab Makalah →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
