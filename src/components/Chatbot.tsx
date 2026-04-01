'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isBot: boolean;
}

const KEYWORD_MAP: Record<string, string[]> = {
  hello: [
    'hello', 'hi', 'hey', 'bonjour', 'salut', 'coucou', 'bonsoir',
    'hola', 'buenos', 'hallo', 'guten',
    'مرحبا', 'سلام', 'أهلا',
    'привет', 'здравствуйте', 'добрый',
  ],
  contact: [
    'contact', 'contacter', 'contactar', 'kontakt',
    'اتصل', 'تواصل', 'связ', 'контакт',
    'email', 'mail', 'reach', 'joindre', 'phone', 'telephone',
    'hire', 'embaucher', 'recruter', 'recrutement', 'recruiting',
    'lounesbadji', 'gmail',
  ],
  strength: [
    'strength', 'force', 'fortaleza', 'stärke',
    'قوة', 'نقاط', 'сила', 'сильн',
    'point fort', 'atout', 'advantage', 'avantage', 'quality', 'qualité',
    'why', 'pourquoi', 'warum', 'por qué', 'لماذا', 'почему',
    '75%', 'deploy', 'deploiement',
  ],
  availability: [
    'available', 'disponible', 'disponible', 'verfügbar',
    'متاح', 'доступ',
    'dispo', 'availability', 'disponibilité', 'freelance', 'open to',
  ],
  methodology: [
    'method', 'méthode', 'método', 'methode',
    'منهج', 'метод',
    'agile', 'scrum', 'kanban', 'tdd', 'test', 'process', 'processus',
    'ddd', 'cqrs', 'domain', 'driven', 'clean', 'hexagonal',
    'cucumber', 'playwright', 'e2e',
  ],
  frontend: [
    'frontend', 'front-end', 'front end',
    'الواجهة الأمامية', 'фронтенд',
    'css', 'html', 'tailwind', 'redux', 'rxjs', 'ui', 'interface',
    'storybook', 'ionic', 'figma',
  ],
  backend: [
    'backend', 'back-end', 'back end',
    'الواجهة الخلفية', 'бэкенд', 'бекенд',
    'server', 'serveur', 'api', 'graphql', 'nestjs', 'express', 'rest',
    'orm', 'proxy', 'cache',
  ],
  saas: [
    'saas', 'software as a service', 'cloud', 'platform',
    'plateforme', 'plataforma', 'plattform',
    'منصة', 'платформ',
    'monitoring', 'runtime',
  ],
  leadership: [
    'lead', 'leader', 'leadership', 'manage', 'management',
    'chef', 'direction', 'diriger', 'dirigir', 'leitung',
    'قيادة', 'قائد', 'лидер', 'руковод',
    'mentor', 'mentorat', 'team', 'équipe', 'equipo',
    'head of production', '6 developpeurs', '6 developers',
  ],
  experience: [
    'experience', 'expérience', 'experiencia', 'erfahrung',
    'خبرة', 'опыт',
    'travail', 'work', 'trabajo', 'arbeit', 'عمل', 'работа',
    'career', 'carrière', 'carrera', 'karriere', 'مسيرة', 'карьера',
    'parcours', 'journey', 'trayectoria', 'werdegang', 'مسار', 'путь',
    'year', 'année', 'año', 'jahr', 'سنة', 'год', 'ans',
  ],
  skills: [
    'skill', 'compétence', 'habilidad', 'fähigkeit',
    'مهارة', 'навык',
    'tech', 'technologie', 'tecnología',
    'تقنية', 'технология',
    'stack', 'react', 'typescript', 'node', 'java', 'angular', 'next',
    'nx', 'monorepo',
  ],
  education: [
    'education', 'formation', 'formación', 'ausbildung',
    'تعليم', 'образование',
    'école', 'school', 'escuela', 'schule', 'مدرسة', 'школа',
    'diplôme', 'degree', 'título', 'abschluss', 'شهادة', 'диплом',
    'cpe', 'ingénieur', 'engineer', 'university', 'université',
    'chartreux', 'preparatoire', 'prepa', 'bac',
    'telecom', 'reseau', 'networking',
  ],
  location: [
    'location', 'lieu', 'ubicación', 'standort',
    'موقع', 'местоположение',
    'where', 'où', 'dónde', 'wo', 'أين', 'где',
    'lyon', 'france', 'ville', 'city',
  ],
  lv: [
    'vuitton', 'louis vuitton', 'lv', 'lvmh',
    'luxe', 'luxury', 'lujo', 'luxus', 'فخامة', 'люкс',
    'head of production',
  ],
  agicap: [
    'agicap', 'trésorerie', 'cash', 'treasury',
    'tresoreria', 'خزينة', 'казначейство',
    'billing', 'facturation', 'recouvrement', 'collection',
  ],
  current: [
    'current', 'actuel', 'actual', 'aktuell',
    'حالي', 'текущий',
    'now', 'maintenant', 'ahora', 'jetzt', 'الآن', 'сейчас',
    'tessi', 'today', "aujourd'hui", 'presente',
  ],
  github: [
    'github', 'git', 'repo', 'repository',
    'projet', 'project', 'proyecto', 'projekt',
    'مشروع', 'проект',
    'code', 'source', 'open source',
  ],
  languages: [
    'language', 'langage', 'lenguaje', 'sprache',
    'لغة', 'язык',
    'programming', 'programmation', 'programación', 'programmierung',
    'برمجة', 'программирование',
    'english', 'anglais', 'french', 'français', 'b2',
  ],
  teaching: [
    'teach', 'enseign', 'profesor', 'dozent',
    'مدرس', 'преподаватель',
    'icoges', 'teacher', 'enseignant', 'formateur', 'prof',
    'instructor', 'cours', 'course', 'bts',
  ],
  globaz: ['globaz', 'suisse', 'switzerland', 'schweiz', 'سويسرا', 'швейцария', 'assurance', 'insurance', 'compensation', 'caisse'],
  mygladys: ['mygladys', 'gladys', 'conciergerie', 'concierge', 'rendez-vous', 'appointment'],
  ubilab: ['ubilab', 'laboratoire', 'laboratory', 'clinique', 'clinic', 'hospital', 'hopital', 'e-learning'],
  trainme: ['trainme', 'coaching', 'sport', 'stage', 'internship', 'intern'],
  cv: [
    'cv', 'resume', 'résumé', 'curriculum', 'lebenslauf', 'سيرة ذاتية', 'резюме',
    'pdf', 'download', 'telecharger', 'télécharger', 'descargar', 'herunterladen', 'تحميل', 'скачать',
    'voir', 'view', 'consulter', 'visualiser', 'show', 'open', 'ouvrir',
  ],
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

    // Score each category by number of keyword matches
    const scores: Record<string, number> = {};
    for (const [key, keywords] of Object.entries(KEYWORD_MAP)) {
      scores[key] = 0;
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (lower.includes(normalizedKeyword)) {
          scores[key] += normalizedKeyword.length;
        }
      }
    }

    let bestKey = '';
    let bestScore = 0;
    for (const [key, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestKey = key;
      }
    }

    if (bestScore > 0) {
      return t(`responses.${bestKey}`);
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
    }, 500 + Math.random() * 700);
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl text-white flex items-center justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
          boxShadow: '0 4px 20px var(--accent-glow)',
        }}
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
            <div className="p-4" style={{ borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))' }}
                >
                  LB
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t('title')}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Online</span>
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
                    className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.isBot ? 'var(--glass-bg)' : 'var(--accent-glow)',
                      color: 'var(--text-primary)',
                      borderTopLeftRadius: msg.isBot ? '4px' : undefined,
                      borderTopRightRadius: msg.isBot ? undefined : '4px',
                    }}
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
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5" style={{ background: 'var(--glass-bg)' }}>
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3" style={{ borderTop: '1px solid var(--glass-border)' }}>
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
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="px-4 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-opacity"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))' }}
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
