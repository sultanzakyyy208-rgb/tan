import React, { useState, useEffect, useCallback } from 'react';
import { Question, UserAnswers, FlaggedQuestions, ExamMode } from '../types';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Settings2,
  Eye,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CbtExamViewProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  userAnswers: UserAnswers;
  onSelectAnswer: (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  flaggedQuestions: FlaggedQuestions;
  onToggleFlag: (questionId: number) => void;
  examMode: ExamMode;
  setExamMode: (mode: ExamMode) => void;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  examStarted: boolean;
  onStartExam: (filterMakalahId?: 1 | 2 | 3 | 'all') => void;
  onFinishExam: () => void;
  onResetExam: () => void;
  activeMakalahFilter: 1 | 2 | 3 | 'all';
  setActiveMakalahFilter: (filter: 1 | 2 | 3 | 'all') => void;
}

export const CbtExamView: React.FC<CbtExamViewProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswers,
  onSelectAnswer,
  flaggedQuestions,
  onToggleFlag,
  examMode,
  setExamMode,
  timeLeft,
  setTimeLeft,
  examStarted,
  onStartExam,
  onFinishExam,
  onResetExam,
  activeMakalahFilter,
  setActiveMakalahFilter,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [gridFilter, setGridFilter] = useState<'all' | 'answered' | 'unanswered' | 'flagged'>('all');

  // Filter questions according to active makalah filter
  const filteredQuestions = React.useMemo(() => {
    if (activeMakalahFilter === 'all') return questions;
    return questions.filter((q) => q.makalahId === activeMakalahFilter);
  }, [questions, activeMakalahFilter]);

  // Ensure currentQuestionIndex is within bounds
  const currentQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const qId = currentQuestion ? currentQuestion.id : 1;

  // Stats calculation
  const totalInFilter = filteredQuestions.length;
  const answeredInFilter = filteredQuestions.filter((q) => userAnswers[q.id] != null).length;
  const flaggedInFilter = filteredQuestions.filter((q) => flaggedQuestions[q.id]).length;
  const unansweredInFilter = totalInFilter - answeredInFilter;

  // Timer countdown
  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, timeLeft, setTimeLeft, onFinishExam]);

  // Format timer
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!examStarted || !currentQuestion) return;
      if (['1', 'a', 'A'].includes(e.key)) onSelectAnswer(currentQuestion.id, 'A');
      if (['2', 'b', 'B'].includes(e.key)) onSelectAnswer(currentQuestion.id, 'B');
      if (['3', 'c', 'C'].includes(e.key)) onSelectAnswer(currentQuestion.id, 'C');
      if (['4', 'd', 'D'].includes(e.key)) onSelectAnswer(currentQuestion.id, 'D');
      if (['5', 'e', 'E'].includes(e.key)) onSelectAnswer(currentQuestion.id, 'E');

      if (e.key === 'ArrowRight' && currentQuestionIndex < totalInFilter - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
      if (e.key === ' ' && e.ctrlKey) {
        onToggleFlag(currentQuestion.id);
      }
    },
    [examStarted, currentQuestion, currentQuestionIndex, totalInFilter, onSelectAnswer, setCurrentQuestionIndex, onToggleFlag]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const selectedAnswer = currentQuestion ? userAnswers[currentQuestion.id] : null;
  const isFlagged = currentQuestion ? flaggedQuestions[currentQuestion.id] : false;

  // Font size classes
  const questionTextClass =
    fontSize === 'xlarge'
      ? 'text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-base leading-relaxed';

  const optionTextClass =
    fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm';

  // If exam hasn't started yet, show welcome & configuration screen
  if (!examStarted) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-linear-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Simulasi CBT Resmi · Kurikulum Merdeka</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Bank Soal CBT 100 Soal: Informatika & Etika Digital
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Uji pemahaman komprehensif Anda dari 3 materi makalah: <strong>Peraturan Perundang-Undangan TI</strong>,{' '}
              <strong>Membaca Lateral & Mengevaluasi Konten</strong>, dan <strong>Mesin Pencari</strong>. Dilengkapi
              timer standar ujian, navigasi kisi soal, serta review pembahasan mendalam.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Mode Selection */}
            <div>
              <label className="text-sm font-semibold text-slate-800 block mb-3">
                1. Pilih Mode Pengerjaan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setExamMode('official')}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    examMode === 'official'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Mode Ujian Resmi CBT</span>
                    <span className="text-xs font-mono tabular-nums text-slate-500">90 Menit</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kunci jawaban dan pembahasan disembunyikan sampai Anda menyelesaikan seluruh tes. Cocok untuk simulasi ujian sekolah sebenarnya.
                  </p>
                </div>

                <div
                  onClick={() => setExamMode('practice')}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    examMode === 'practice'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Mode Latihan Mandiri (Instant Feedback)</span>
                    <span className="text-xs text-indigo-600 font-medium">Belajar Langsung</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setiap kali Anda memilih opsi jawaban, sistem langsung menampilkan status Benar/Salah beserta dasar hukum dan pembahasan lengkapnya.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope / Category Selection */}
            <div>
              <label className="text-sm font-semibold text-slate-800 block mb-3">
                2. Pilih Cakupan Materi Soal:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMakalahFilter('all')}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    activeMakalahFilter === 'all'
                      ? 'border-indigo-600 bg-indigo-600 text-white font-medium shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold block">Semua Materi</span>
                  <span className="text-[11px] opacity-90">100 Soal Lengkap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMakalahFilter(1)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    activeMakalahFilter === 1
                      ? 'border-indigo-600 bg-indigo-600 text-white font-medium shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold block truncate">Makalah 1: Regulasi TI</span>
                  <span className="text-[11px] opacity-90">40 Soal (UU ITE & PDP)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMakalahFilter(2)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    activeMakalahFilter === 2
                      ? 'border-indigo-600 bg-indigo-600 text-white font-medium shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold block truncate">Makalah 2: Membaca Lateral</span>
                  <span className="text-[11px] opacity-90">30 Soal (Triangulasi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMakalahFilter(3)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    activeMakalahFilter === 3
                      ? 'border-indigo-600 bg-indigo-600 text-white font-medium shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-semibold block truncate">Makalah 3: Mesin Pencari</span>
                  <span className="text-[11px] opacity-90">30 Soal (Algoritma & E-E-A-T)</span>
                </button>
              </div>
            </div>

            {/* Instruction Checklist */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Petunjuk Pengerjaan CBT
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Gunakan tombol nomor soal di panel samping untuk berpindah antar pertanyaan dengan bebas.</li>
                <li>Tandai tombol <strong>Ragu-ragu</strong> jika Anda ingin memeriksa kembali jawaban tersebut nanti.</li>
                <li>Pintasan keyboard: Tekan huruf <strong>A, B, C, D, E</strong> atau angka <strong>1 - 5</strong> untuk memilih jawaban, serta tombol panah kiri/kanan untuk navigasi.</li>
                <li>Ujian akan otomatis tersimpan ketika waktu ujian habis atau ketika Anda mengklik tombol <strong>Selesai Ujian</strong>.</li>
              </ul>
            </div>

            {/* Launch CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Total Pertanyaan:{' '}
                <span className="font-semibold text-slate-800 font-mono tabular-nums">
                  {totalInFilter} Soal
                </span>{' '}
                · Estimasi:{' '}
                <span className="font-semibold text-slate-800 font-mono tabular-nums">
                  {Math.round(totalInFilter * 0.9)} Menit
                </span>
              </div>
              <button
                onClick={() => onStartExam(activeMakalahFilter)}
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2"
              >
                <span>Mulai Sesi Ujian Sekarang</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Test Information & Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Info Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {currentQuestionIndex + 1}
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span>{currentQuestion.makalahTitle}</span>
              <span>·</span>
              <span className="text-indigo-600 font-semibold">{currentQuestion.topic}</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">
              Soal Nomor {currentQuestionIndex + 1} dari {totalInFilter}
            </div>
          </div>
        </div>

        {/* Center: Timer & Mode Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
            <span className="text-slate-500">Mode:</span>
            <span className="font-semibold text-indigo-700">
              {examMode === 'official' ? 'Ujian Resmi CBT' : 'Latihan Mandiri'}
            </span>
          </div>

          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono tabular-nums text-sm font-semibold transition-colors ${
              timeLeft < 300
                ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                : 'bg-slate-900 text-white border-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Right: Font Zoom & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-0.5 text-xs font-medium">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded transition-colors ${
                fontSize === 'normal' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
              }`}
              title="Ukuran Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded transition-colors ${
                fontSize === 'large' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
              }`}
              title="Ukuran Besar"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded transition-colors ${
                fontSize === 'xlarge' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
              }`}
              title="Ukuran Sangat Besar"
            >
              A++
            </button>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
          >
            Selesai Ujian
          </button>
        </div>
      </div>

      {/* Main Grid: Question Card (Left 65%) + Navigation Panel (Right 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question & Options */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
            {/* Question Text */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Soal ID: #{currentQuestion.id}</span>
                {isFlagged && (
                  <span className="text-amber-600 font-semibold flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    Ragu-ragu
                  </span>
                )}
              </div>
              <h2 className={`font-medium text-slate-900 ${questionTextClass}`}>
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.key;
                const isCorrect = currentQuestion.correctAnswer === option.key;
                const showInstantFeedback = examMode === 'practice' && selectedAnswer != null;

                let optionStyles = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 text-slate-700';
                let circleStyles = 'border-slate-300 text-slate-600 bg-white';

                if (isSelected) {
                  optionStyles = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium ring-1 ring-indigo-500';
                  circleStyles = 'border-indigo-600 bg-indigo-600 text-white';
                }

                if (showInstantFeedback) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500';
                    circleStyles = 'border-emerald-600 bg-emerald-600 text-white';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400';
                    circleStyles = 'border-rose-600 bg-rose-600 text-white';
                  }
                }

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => onSelectAnswer(currentQuestion.id, option.key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionStyles}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${circleStyles}`}
                    >
                      {option.key}
                    </div>
                    <div className={`pt-0.5 ${optionTextClass} leading-normal`}>
                      {option.text}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instant Practice Mode Explanation Box */}
            {examMode === 'practice' && selectedAnswer != null && (
              <div className="mt-6 p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 text-slate-800 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Jawaban Anda Benar! (Kunci: {currentQuestion.correctAnswer})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-700">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Jawaban Kurang Tepat. Kunci Jawaban: {currentQuestion.correctAnswer}</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                {currentQuestion.lawReference && (
                  <div className="text-[11px] text-indigo-700 font-medium pt-1 border-t border-indigo-100">
                    Rujukan: {currentQuestion.lawReference}
                  </div>
                )}
              </div>
            )}

            {/* Question Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                  currentQuestionIndex === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleFlag(currentQuestion.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                  isFlagged
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50'
                }`}
              >
                <Flag className={`w-4 h-4 ${isFlagged ? 'fill-white' : ''}`} />
                <span>{isFlagged ? 'Hapus Tanda Ragu' : 'Ragu-ragu'}</span>
              </button>

              {currentQuestionIndex < totalInFilter - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="px-5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="px-5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Selesai Ujian</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Grid Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Daftar Nomor Soal</h3>
              <span className="text-xs font-mono tabular-nums text-slate-500">
                {answeredInFilter}/{totalInFilter} Selesai
              </span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-indigo-600 inline-block" />
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" />
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 inline-block" />
                <span>Belum</span>
              </div>
            </div>

            {/* Filter buttons inside navigation */}
            <div className="flex items-center gap-1 mb-3 text-xs">
              <button
                onClick={() => setGridFilter('all')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  gridFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Semua ({totalInFilter})
              </button>
              <button
                onClick={() => setGridFilter('answered')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  gridFilter === 'answered' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Sudah ({answeredInFilter})
              </button>
              <button
                onClick={() => setGridFilter('flagged')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  gridFilter === 'flagged' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Ragu ({flaggedInFilter})
              </button>
              <button
                onClick={() => setGridFilter('unanswered')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  gridFilter === 'unanswered' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Kosong ({unansweredInFilter})
              </button>
            </div>

            {/* Question Numbers Grid (1 - 100) */}
            <div className="max-h-[420px] overflow-y-auto pr-1">
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {filteredQuestions.map((q, idx) => {
                  const isAns = userAnswers[q.id] != null;
                  const isFlg = flaggedQuestions[q.id];
                  const isCur = idx === currentQuestionIndex;

                  // Apply filter visibility
                  if (gridFilter === 'answered' && !isAns) return null;
                  if (gridFilter === 'unanswered' && isAns) return null;
                  if (gridFilter === 'flagged' && !isFlg) return null;

                  let btnBg = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200';
                  if (isAns) {
                    btnBg = 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700';
                  }
                  if (isFlg) {
                    btnBg = 'bg-amber-400 text-amber-950 font-bold border-amber-500 hover:bg-amber-500';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all relative ${btnBg} ${
                        isCur ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                      }`}
                    >
                      <span>{q.id}</span>
                      {userAnswers[q.id] && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-indigo-900 rounded-full text-[9px] font-bold border border-indigo-300 flex items-center justify-center">
                          {userAnswers[q.id]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Submit CTA */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Konfirmasi Selesai Ujian
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Selesaikan Ujian Sekarang?</h3>
                <p className="text-xs text-slate-500">Pastikan Anda telah memeriksa semua jawaban.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Total Soal:</span>
                <span className="font-semibold font-mono tabular-nums">{totalInFilter} Soal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Sudah Dijawab:</span>
                <span className="font-semibold text-emerald-700 font-mono tabular-nums">{answeredInFilter} Soal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>Masih Ragu-ragu:</span>
                <span className="font-semibold text-amber-600 font-mono tabular-nums">{flaggedInFilter} Soal</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Belum Dijawab:</span>
                <span className="font-semibold text-rose-600 font-mono tabular-nums">{unansweredInFilter} Soal</span>
              </div>
            </div>

            {unansweredInFilter > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-relaxed">
                Peringatan: Masih ada <strong>{unansweredInFilter}</strong> soal yang belum Anda jawab. Soal kosong bernilai 0.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Kembali Periksa
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  onFinishExam();
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
