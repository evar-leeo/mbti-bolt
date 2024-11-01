"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Heart, Lightbulb, Users } from 'lucide-react';
import styles from './MBTITest.module.scss';

const questions = [
  {
    id: 1,
    category: 'E/I',
    question: 'How do you prefer to recharge?',
    options: [
      { text: 'Spending time with others energizes me', value: 'E' },
      { text: 'I need alone time to recharge', value: 'I' }
    ]
  },
  {
    id: 2,
    category: 'S/N',
    question: 'When solving problems, do you prefer to:',
    options: [
      { text: 'Focus on concrete facts and details', value: 'S' },
      { text: 'Look for patterns and possibilities', value: 'N' }
    ]
  },
  {
    id: 3,
    category: 'T/F',
    question: 'When making decisions, do you tend to:',
    options: [
      { text: 'Analyze logically and objectively', value: 'T' },
      { text: 'Consider people and special circumstances', value: 'F' }
    ]
  },
  {
    id: 4,
    category: 'J/P',
    question: 'How do you prefer to live your life?',
    options: [
      { text: 'Follow a schedule and plan ahead', value: 'J' },
      { text: 'Stay flexible and go with the flow', value: 'P' }
    ]
  }
];

const personalityDescriptions: Record<string, { title: string; description: string; icon: JSX.Element }> = {
  INTJ: {
    title: 'The Architect',
    description: 'Imaginative and strategic thinkers with a plan for everything.',
    icon: <Brain className="w-12 h-12 text-indigo-600" />
  },
  INTP: {
    title: 'The Logician',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    icon: <Lightbulb className="w-12 h-12 text-amber-600" />
  },
  INFJ: {
    title: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    icon: <Heart className="w-12 h-12 text-rose-600" />
  },
  INFP: {
    title: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    icon: <Users className="w-12 h-12 text-emerald-600" />
  }
  // Add more personality types as needed
};

export default function MBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [personalityType, setPersonalityType] = useState<string | null>(null);

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].category]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculatePersonalityType(newAnswers);
    }
  };

  const calculatePersonalityType = (finalAnswers: Record<string, string>) => {
    const type = Object.values(finalAnswers).join('');
    setPersonalityType(type);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setPersonalityType(null);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <AnimatePresence mode="wait">
          {!personalityType ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.content}
            >
              <h1 className={styles.title}>MBTI Personality Test</h1>
              <Progress value={progress} className="mb-8" />
              
              <div className={styles.questionContainer}>
                <h2 className={styles.question}>{questions[currentQuestion].question}</h2>
                <div className={styles.options}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={styles.optionButton}
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.result}
            >
              <div className={styles.resultContent}>
                {personalityDescriptions[personalityType]?.icon}
                <h2 className={styles.resultTitle}>
                  {personalityType}: {personalityDescriptions[personalityType]?.title}
                </h2>
                <p className={styles.resultDescription}>
                  {personalityDescriptions[personalityType]?.description}
                </p>
                <Button onClick={resetTest} className={styles.resetButton}>
                  Take Test Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}