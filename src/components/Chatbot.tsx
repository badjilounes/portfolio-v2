'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isBot: boolean;
}

const KEYWORD_MAP: Record<string, string[]> = {
  experience: ['experience', 'expérience', 'experiencia', 'erfahrung', 'خبرة', 'опыт', 'travail', 'work', 'trabajo', 'arbeit', 'عمل', 'работа', 'career', 'carrière', 'carrera', 'karriere', 'مسيرة', 'карьера', 'parcours', 'journey', 'trayectoria', 'werdegang', 'مسار', 'путь'],
  skills: ['skill', 'compétence', 'habilidad', 'fähigkeit', 'مهارة', 'навык', 'tech', 'technologie', 'tecnología', 'technologie', 'تقنية', 'технология', 'stack', 'react', 'typescript', 'node', 'java', 'angular', 'next'],
  education: ['education', 'formation', 'formación', 'ausbildung', 'تعليم', 'образование', 'école', 'school', 'escuela', 'schule', 'مدرسة', 'школа', 'diplôme', 'degree', 'título', 'abschluss', 'شهادة', 'диплом', 'cpe', 'lyon', 'ingénieur', 'engineer'],
  location: ['location', 'lieu', 'ubicación', 'standort', 'موقع', 'местоположение', 'where', 'où', 'dónde', 'wo', 'أين', 'где', 'lyon', 'france'],
  lv: ['vuitton', 'louis', 'lv', 'luxe', 'luxury', 'lujo'],
  agicap: ['agicap', 'trésorerie', 'cash', 'treasury'],
  current: ['current', 'actuel', 'actual', 'aktuell', 'حالي', 'текущий', 'now', 'maintenant', 'ahora', 'jetzt', 'الآن', 'сейчас', 'tessi', 'today', "aujourd'hui"],
  github: ['github', 'git', 'repo', 'repository', 'projet', 'project', 'proyecto', 'projekt', 'مشروع', 'проект'],
  languages: ['language', 'langage', 'lenguaje', 'sprache', 'لغة', 'язык', 'programming', 'programmation', 'programación', 'programmierung', 'برمجة', 'программирование'],
  teaching: ['teach', 'enseign', 'profesor', 'dozent', 'مدرس', 'преподаватель', 'icoges', 'teacher', 'enseignant'],
};

export default function Chatbot() {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: t('greeting'), isBot: true }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findResponse = (query: string): string => {
    const lower = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (const [key, keywords] of Object.entries(KEYWORD_MAP)) {
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (lower.includes(normalizedKeyword)) {
          return t(`responses.${key}`);
        }
      }
    }

    return t('fallback');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(userMessage);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 300);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 flex items-center justify-center cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(500px, 70vh)' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                  LB
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{t('title')}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-white/5 text-gray-200 rounded-tl-sm'
                        : 'bg-violet-600/30 text-violet-100 rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-opacity"
                >
                  {t('send')}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
