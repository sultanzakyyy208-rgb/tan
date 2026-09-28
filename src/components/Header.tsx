import React from 'react';
import { ActiveTab } from '../types';
import { BookOpen, CheckSquare, FileText, Layers, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  examStarted: boolean;
  onFinishExam: () => void;
  examCompleted: boolean;
  answeredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  examStarted,
  onFinishExam,
  examCompleted,
  answeredCount,
  totalQuestions,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('cbt')}
              className="text-left group flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-indigo-700 transition-colors">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  CBT EduTech
                </span>
                <span className="text-[11px] text-slate-500 font-medium block">
                  SMAN 1 Simpang Empat · Informatika
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('cbt')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cbt'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Simulasi CBT</span>
              {examStarted && (
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800 tabular-nums font-semibold">
                  {answeredCount}/{totalQuestions}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'materials'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Materi 3 Makalah</span>
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'bank'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Bank 100 Soal</span>
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'review'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Review & Kunci</span>
              {examCompleted && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            {examStarted ? (
              <button
                onClick={onFinishExam}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Selesai Ujian</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('cbt');
                }}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Mulai CBT</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-1.5 bg-slate-50 text-xs">
        <button
          onClick={() => setActiveTab('cbt')}
          className={`px-2.5 py-1.5 rounded-md font-medium ${
            activeTab === 'cbt' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          CBT Test
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-2.5 py-1.5 rounded-md font-medium ${
            activeTab === 'materials' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Materi
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`px-2.5 py-1.5 rounded-md font-medium ${
            activeTab === 'bank' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          100 Soal
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`px-2.5 py-1.5 rounded-md font-medium ${
            activeTab === 'review' ? 'bg-white shadow-xs text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          Review
        </button>
      </div>
    </header>
  );
};
