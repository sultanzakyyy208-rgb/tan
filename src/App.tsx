/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CbtExamView } from './components/CbtExamView';
import { CbtReviewView } from './components/CbtReviewView';
import { MaterialsView } from './components/MaterialsView';
import { QuestionBankExplorer } from './components/QuestionBankExplorer';
import { questionsData } from './data/questions';
import { makalahList } from './data/materials';
import { ActiveTab, ExamMode, UserAnswers, FlaggedQuestions } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cbt');
  const [selectedMakalahId, setSelectedMakalahId] = useState<1 | 2 | 3>(1);
  const [activeMakalahFilter, setActiveMakalahFilter] = useState<1 | 2 | 3 | 'all'>('all');
  const [examMode, setExamMode] = useState<ExamMode>('official');

  // Exam States
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestions>({});
  const [timeLeft, setTimeLeft] = useState<number>(5400); // 90 minutes default

  // Filtered questions based on the active selection
  const currentQuestions = useMemo(() => {
    if (activeMakalahFilter === 'all') return questionsData;
    return questionsData.filter((q) => q.makalahId === activeMakalahFilter);
  }, [activeMakalahFilter]);

  const answeredCount = useMemo(() => {
    return currentQuestions.filter((q) => userAnswers[q.id] != null).length;
  }, [currentQuestions, userAnswers]);

  // Handlers
  const handleStartExam = (filter: 1 | 2 | 3 | 'all' = 'all') => {
    setActiveMakalahFilter(filter);
    const count = filter === 'all' ? 100 : filter === 1 ? 40 : 30;
    // Set timer based on question count: 90 mins for 100, 45 mins for 40, 35 mins for 30
    const duration = filter === 'all' ? 5400 : filter === 1 ? 2700 : 2100;
    setTimeLeft(duration);
    setCurrentQuestionIndex(0);
    setExamStarted(true);
    setExamCompleted(false);
    setActiveTab('cbt');
  };

  const handleFinishExam = () => {
    setExamStarted(false);
    setExamCompleted(true);
    setActiveTab('review');
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setExamStarted(false);
    setExamCompleted(false);
    setTimeLeft(5400);
    setActiveTab('cbt');
  };

  const handleSelectAnswer = (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleNavigateToMaterial = (makalahId: 1 | 2 | 3) => {
    setSelectedMakalahId(makalahId);
    setActiveTab('materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExamForMakalah = (makalahId: 1 | 2 | 3) => {
    setActiveMakalahFilter(makalahId);
    handleStartExam(makalahId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        examStarted={examStarted}
        onFinishExam={handleFinishExam}
        examCompleted={examCompleted}
        answeredCount={answeredCount}
        totalQuestions={currentQuestions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'cbt' && (
          <CbtExamView
            questions={questionsData}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectAnswer}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            examMode={examMode}
            setExamMode={setExamMode}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            examStarted={examStarted}
            onStartExam={handleStartExam}
            onFinishExam={handleFinishExam}
            onResetExam={handleResetExam}
            activeMakalahFilter={activeMakalahFilter}
            setActiveMakalahFilter={setActiveMakalahFilter}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsView
            makalahList={makalahList}
            selectedMakalahId={selectedMakalahId}
            setSelectedMakalahId={setSelectedMakalahId}
            onStartExamForMakalah={handleStartExamForMakalah}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionBankExplorer
            questions={questionsData}
            onStartExam={handleStartExam}
            onNavigateToMaterial={handleNavigateToMaterial}
          />
        )}

        {activeTab === 'review' && (
          <CbtReviewView
            questions={currentQuestions}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onResetExam={handleResetExam}
            onNavigateToMaterial={handleNavigateToMaterial}
          />
        )}
      </main>

      {/* Clean Footer adhering to Anti-Slop Guidelines */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-800">CBT EduTech Informatika</span>
            <span className="mx-2">·</span>
            <span>SMA Negeri 1 Simpang Empat, Kabupaten Tanah Bumbu</span>
            <span className="mx-2">·</span>
            <span>Tahun Ajaran 2026/2027</span>
          </div>
          <div>
            <span>Guru Pembimbing: </span>
            <span className="font-semibold text-slate-800">Cici Lia Dwi Hapsari, S.Pd.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
