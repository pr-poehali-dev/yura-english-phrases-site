import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "phrases" | "practice";
type Category = "all" | "greeting" | "travel" | "business" | "daily";

interface Phrase {
  id: number;
  english: string;
  russian: string;
  transcription: string;
  category: Category;
  level: "beginner" | "intermediate" | "advanced";
}

const phrases: Phrase[] = [
  { id: 1, english: "How are you doing?", russian: "Как дела?", transcription: "/haʊ ɑːr juː ˈduːɪŋ/", category: "greeting", level: "beginner" },
  { id: 2, english: "Nice to meet you.", russian: "Рад познакомиться.", transcription: "/naɪs tə miːt juː/", category: "greeting", level: "beginner" },
  { id: 3, english: "Could you repeat that, please?", russian: "Не могли бы вы повторить?", transcription: "/kʊd juː rɪˈpiːt ðæt/", category: "daily", level: "beginner" },
  { id: 4, english: "Where is the nearest hotel?", russian: "Где ближайший отель?", transcription: "/wɛr ɪz ðə ˈnɪərɪst həʊˈtɛl/", category: "travel", level: "beginner" },
  { id: 5, english: "I'd like to make a reservation.", russian: "Я хотел бы сделать бронь.", transcription: "/aɪd laɪk tə meɪk ə ˌrɛzəˈveɪʃən/", category: "travel", level: "intermediate" },
  { id: 6, english: "Let's get down to business.", russian: "Давайте перейдём к делу.", transcription: "/lɛts ɡɛt daʊn tə ˈbɪznɪs/", category: "business", level: "intermediate" },
  { id: 7, english: "Could we schedule a meeting?", russian: "Можем ли мы назначить встречу?", transcription: "/kʊd wiː ˈskɛdʒuːl ə ˈmiːtɪŋ/", category: "business", level: "intermediate" },
  { id: 8, english: "I'm afraid I don't understand.", russian: "Боюсь, я не понимаю.", transcription: "/aɪm əˈfreɪd aɪ dəʊnt ˌʌndəˈstænd/", category: "daily", level: "beginner" },
  { id: 9, english: "What do you recommend?", russian: "Что вы рекомендуете?", transcription: "/wɒt duː juː ˌrɛkəˈmɛnd/", category: "travel", level: "beginner" },
  { id: 10, english: "It's a pleasure working with you.", russian: "Приятно с вами работать.", transcription: "/ɪts ə ˈplɛʒər ˈwɜːkɪŋ wɪð juː/", category: "business", level: "intermediate" },
  { id: 11, english: "Could you give me a hand?", russian: "Не могли бы вы помочь?", transcription: "/kʊd juː ɡɪv miː ə hænd/", category: "daily", level: "beginner" },
  { id: 12, english: "I'll take that into consideration.", russian: "Я приму это во внимание.", transcription: "/aɪl teɪk ðæt ˈɪntə kənˌsɪdəˈreɪʃən/", category: "business", level: "advanced" },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "greeting", label: "Знакомство" },
  { value: "travel", label: "Путешествия" },
  { value: "business", label: "Бизнес" },
  { value: "daily", label: "Повседневное" },
];

const levelColors = {
  beginner: "bg-emerald-50 text-emerald-700",
  intermediate: "bg-amber-50 text-amber-700",
  advanced: "bg-rose-50 text-rose-700",
};

const levelLabels = {
  beginner: "Начальный",
  intermediate: "Средний",
  advanced: "Продвинутый",
};

function speakPhrase(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))) ||
    voices.find((v) => v.lang.startsWith("en"));
  if (enVoice) utterance.voice = enVoice;
  window.speechSynthesis.speak(utterance);
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="animate-fade-in">
      <section className="pt-24 pb-20 px-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
          <span>🎙️</span>
          <span>Аудио от носителей языка</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
          Говори по-английски<br />
          <span className="text-blue-600">уверенно</span>
        </h1>
        <p className="text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          Учи живые фразы с произношением носителей языка. Без скуки, без зубрёжки — только реальный английский.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate("phrases")}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover-scale shadow-sm"
          >
            Начать учиться
          </button>
          <button
            onClick={() => onNavigate("practice")}
            className="px-8 py-3.5 bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-all hover-scale"
          >
            Попрактиковаться
          </button>
        </div>
      </section>

      <section className="py-10 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "12+", label: "Фраз в базе" },
            { value: "4", label: "Категории" },
            { value: "3", label: "Уровня сложности" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl font-semibold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold text-center text-gray-900 mb-14">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "BookOpen", title: "Изучай фразы", desc: "Просматривай фразы по категориям с транскрипцией и переводом" },
            { icon: "Volume2", title: "Слушай произношение", desc: "Нажми кнопку — услышишь фразу голосом носителя языка" },
            { icon: "Brain", title: "Тренируй память", desc: "Угадывай переводы в режиме практики и закрепляй знания" },
          ].map((f) => (
            <div key={f.title} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-100 transition-colors">
                <Icon name={f.icon} size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-3xl p-10 text-center">
          <h2 className="font-serif text-3xl font-semibold text-white mb-4">Готов начать?</h2>
          <p className="text-gray-400 mb-8">Твоя первая фраза — уже через минуту</p>
          <button
            onClick={() => onNavigate("phrases")}
            className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all hover-scale"
          >
            Открыть фразы
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Phrases ──────────────────────────────────────────────────────────────────
function PhrasesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filtered = activeCategory === "all" ? phrases : phrases.filter((p) => p.category === activeCategory);

  const handlePlay = useCallback((phrase: Phrase) => {
    setPlayingId(phrase.id);
    speakPhrase(phrase.english);
    setTimeout(() => setPlayingId(null), 2500);
  }, []);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-2">Фразы</h1>
      <p className="text-gray-500 mb-8">Нажми ▶ чтобы услышать произношение</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.value ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <span className="font-semibold text-gray-900 text-lg">{phrase.english}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[phrase.level]}`}>
                  {levelLabels[phrase.level]}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{phrase.russian}</p>
              <p className="text-blue-400 text-xs font-mono">{phrase.transcription}</p>
            </div>
            <button
              onClick={() => handlePlay(phrase)}
              className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                playingId === phrase.id ? "bg-blue-600 text-white pulse-audio" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
              title="Послушать произношение"
            >
              <Icon name={playingId === phrase.id ? "Volume2" : "Play"} size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────
function PracticePage() {
  const [shuffled] = useState(() => [...phrases].sort(() => Math.random() - 0.5).slice(0, 8));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const current = shuffled[currentIndex];

  const handlePlay = () => {
    if (!current) return;
    setPlayingId(current.id);
    speakPhrase(current.english);
    setTimeout(() => setPlayingId(null), 2500);
  };

  const handleAnswer = (correct: boolean) => {
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
    if (currentIndex + 1 >= shuffled.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setRevealed(false);
    setScore({ correct: 0, wrong: 0 });
    setDone(false);
  };

  if (done) {
    const total = score.correct + score.wrong;
    const pct = Math.round((score.correct / total) * 100);
    return (
      <div className="animate-fade-in max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-6">{pct >= 70 ? "🎉" : "💪"}</div>
        <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-3">Результат</h2>
        <p className="text-gray-500 mb-10">Ты ответил правильно на {score.correct} из {total} фраз</p>
        <div className="flex gap-4 justify-center mb-10">
          <div className="px-8 py-5 bg-emerald-50 rounded-2xl">
            <div className="text-3xl font-semibold text-emerald-600">{score.correct}</div>
            <div className="text-sm text-emerald-700 mt-1">Верно</div>
          </div>
          <div className="px-8 py-5 bg-rose-50 rounded-2xl">
            <div className="text-3xl font-semibold text-rose-600">{score.wrong}</div>
            <div className="text-sm text-rose-700 mt-1">Ошибок</div>
          </div>
        </div>
        <button
          onClick={restart}
          className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover-scale"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-semibold text-gray-900">Практика</h1>
          <p className="text-gray-500 text-sm mt-1">Карточка {currentIndex + 1} из {shuffled.length}</p>
        </div>
        <div className="flex gap-3 text-sm font-medium">
          <span className="text-emerald-600">✓ {score.correct}</span>
          <span className="text-rose-500">✗ {score.wrong}</span>
        </div>
      </div>

      <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / shuffled.length) * 100}%` }}
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-4 text-center">
        <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Переведи фразу</p>
        <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-3 leading-snug">{current.english}</h2>
        <p className="text-blue-400 text-sm font-mono mb-6">{current.transcription}</p>

        <button
          onClick={handlePlay}
          className={`mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            playingId === current.id ? "bg-blue-600 text-white pulse-audio" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          <Icon name="Volume2" size={16} />
          Послушать
        </button>

        {revealed && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
            <p className="text-gray-500 text-sm mb-1">Перевод:</p>
            <p className="text-xl font-semibold text-gray-900">{current.russian}</p>
          </div>
        )}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3.5 border border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all"
        >
          Показать перевод
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAnswer(false)} className="py-3.5 bg-rose-50 text-rose-600 rounded-2xl font-medium hover:bg-rose-100 transition-all">
            ✗ Не знал
          </button>
          <button onClick={() => handleAnswer(true)} className="py-3.5 bg-emerald-50 text-emerald-700 rounded-2xl font-medium hover:bg-emerald-100 transition-all">
            ✓ Знал
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const navItems = [
    { id: "home" as Page, label: "Главная", icon: "Home" },
    { id: "phrases" as Page, label: "Фразы", icon: "BookOpen" },
    { id: "practice" as Page, label: "Практика", icon: "Brain" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="font-serif text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            PhraseUp
          </button>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  page === item.id ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon name={item.icon} size={15} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {page === "home" && <HomePage onNavigate={setPage} />}
        {page === "phrases" && <PhrasesPage />}
        {page === "practice" && <PracticePage />}
      </main>
    </div>
  );
}