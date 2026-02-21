import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "phrases" | "listening" | "practice";

interface Phrase {
  id: number;
  english: string;
  russian: string;
  transcription: string;
}

const phrases: Phrase[] = [
  { id: 1, english: "to get old", russian: "стареть", transcription: "/tə ɡɛt oʊld/" },
  { id: 2, english: "to take advantage", russian: "воспользоваться случаем", transcription: "/tə teɪk ədˈvæntɪdʒ/" },
  { id: 3, english: "to break a promise", russian: "нарушить обещание", transcription: "/tə breɪk ə ˈprɒmɪs/" },
  { id: 4, english: "to get a chance", russian: "получить шанс", transcription: "/tə ɡɛt ə tʃɑːns/" },
  { id: 5, english: "do research", russian: "проводить исследование", transcription: "/duː ˈriːsɜːtʃ/" },
  { id: 6, english: "take a break", russian: "сделать перерыв", transcription: "/teɪk ə breɪk/" },
  { id: 7, english: "to come up with", russian: "придумать", transcription: "/tə kʌm ʌp wɪð/" },
  { id: 8, english: "to get fired", russian: "быть уволенным", transcription: "/tə ɡɛt ˈfaɪərd/" },
  { id: 9, english: "to make a mess", russian: "устроить беспорядок", transcription: "/tə meɪk ə mɛs/" },
  { id: 10, english: "to get a call", russian: "получить звонок", transcription: "/tə ɡɛt ə kɔːl/" },
  { id: 11, english: "say no more", russian: "не нужно больше слов", transcription: "/seɪ noʊ mɔːr/" },
  { id: 12, english: "to have a drink", russian: "выпить", transcription: "/tə hæv ə drɪŋk/" },
  { id: 13, english: "do the cooking", russian: "готовить еду", transcription: "/duː ðə ˈkʊkɪŋ/" },
  { id: 14, english: "come close", russian: "подойти ближе", transcription: "/kʌm kloʊz/" },
  { id: 15, english: "make an appearance", russian: "появиться, показаться", transcription: "/meɪk ən əˈpɪərəns/" },
  { id: 16, english: "it's none of your business", russian: "не твоё дело", transcription: "/ɪts nʌn əv jɔːr ˈbɪznɪs/" },
  { id: 17, english: "I mean it", russian: "я серьёзно", transcription: "/aɪ miːn ɪt/" },
  { id: 18, english: "I have no idea", russian: "понятия не имею", transcription: "/aɪ hæv noʊ aɪˈdɪə/" },
  { id: 19, english: "I don't care", russian: "мне всё равно", transcription: "/aɪ doʊnt kɛr/" },
  { id: 20, english: "it's up to you", russian: "решать тебе", transcription: "/ɪts ʌp tə juː/" },
  { id: 21, english: "What are you driving at?", russian: "К чему ты клонишь?", transcription: "/wɒt ɑːr juː ˈdraɪvɪŋ æt/" },
  { id: 22, english: "give or take", russian: "плюс-минус", transcription: "/ɡɪv ɔːr teɪk/" },
  { id: 23, english: "How come?", russian: "Как так?", transcription: "/haʊ kʌm/" },
  { id: 24, english: "help yourself!", russian: "угощайся!", transcription: "/hɛlp jɔːrˈsɛlf/" },
  { id: 25, english: "once and for all", russian: "раз и навсегда", transcription: "/wʌns ænd fɔːr ɔːl/" },
  { id: 26, english: "at once", russian: "немедленно", transcription: "/æt wʌns/" },
  { id: 27, english: "binge watch", russian: "смотреть запоем", transcription: "/bɪndʒ wɒtʃ/" },
  { id: 28, english: "why don't you/we/they/I", russian: "почему бы тебе/нам/им/мне не…", transcription: "/waɪ doʊnt juː/" },
  { id: 29, english: "I'm positive", russian: "я уверен", transcription: "/aɪm ˈpɒzɪtɪv/" },
  { id: 30, english: "I'm all ears", russian: "я весь внимание", transcription: "/aɪm ɔːl ɪərz/" },
];

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
          <span>Аудио произношение</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
          Говори по-английски<br />
          <span className="text-blue-600">уверенно</span>
        </h1>
        <p className="text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-xl mx-auto">
          30 живых фраз с произношением, аудированием и практикой. Только реальный английский.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate("phrases")}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover-scale shadow-sm"
          >
            Смотреть фразы
          </button>
          <button
            onClick={() => onNavigate("listening")}
            className="px-8 py-3.5 bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-all hover-scale"
          >
            Аудирование
          </button>
        </div>
      </section>

      <section className="py-10 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "30", label: "Фраз в базе" },
            { value: "3", label: "Режима обучения" },
            { value: "100%", label: "Разговорный язык" },
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
            { icon: "BookOpen", title: "Изучай фразы", desc: "Просматривай все 30 фраз с транскрипцией и переводом" },
            { icon: "Headphones", title: "Аудирование", desc: "Слушай фразу и угадывай значение — тренируй слух" },
            { icon: "Brain", title: "Практика", desc: "Угадывай переводы в режиме карточек и закрепляй знания" },
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
          <p className="text-gray-400 mb-8">Твоя первая фраза — уже через секунду</p>
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
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [revealedId, setRevealedId] = useState<number | null>(null);

  const handlePlay = useCallback((phrase: Phrase) => {
    setPlayingId(phrase.id);
    speakPhrase(phrase.english);
    setTimeout(() => setPlayingId(null), 2500);
  }, []);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-2">Фразы</h1>
      <p className="text-gray-500 mb-8">Нажми ▶ чтобы услышать произношение · нажми на карточку чтобы увидеть перевод</p>

      <div className="grid sm:grid-cols-2 gap-3">
        {phrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => setRevealedId(revealedId === phrase.id ? null : phrase.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-mono w-5 shrink-0">{phrase.id}.</span>
                  <p className="font-semibold text-gray-900 leading-snug">{phrase.english}</p>
                </div>
                <p className="text-blue-400 text-xs font-mono ml-7">{phrase.transcription}</p>
                {revealedId === phrase.id && (
                  <p className="text-gray-600 text-sm mt-2 ml-7 animate-fade-in">{phrase.russian}</p>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handlePlay(phrase); }}
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  playingId === phrase.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
                title="Послушать"
              >
                <Icon name={playingId === phrase.id ? "Volume2" : "Play"} size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Listening ────────────────────────────────────────────────────────────────
function ListeningPage() {
  const [shuffled] = useState(() => [...phrases].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [played, setPlayed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [options, setOptions] = useState<Phrase[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const current = shuffled[currentIndex];

  const generateOptions = useCallback((correct: Phrase, all: Phrase[]) => {
    const wrong = all.filter((p) => p.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return [...wrong, correct].sort(() => Math.random() - 0.5);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setPlayed(true);
    speakPhrase(current.english);
    if (options.length === 0) {
      setOptions(generateOptions(current, shuffled));
    }
    setTimeout(() => setIsPlaying(false), 2500);
  };

  const handleSelect = (phrase: Phrase) => {
    if (selected !== null) return;
    setSelected(phrase.id);
    setRevealed(true);
    const correct = phrase.id === current.id;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setPlayed(false);
      setRevealed(false);
      setSelected(null);
      setOptions([]);
      setIsPlaying(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setPlayed(false);
    setRevealed(false);
    setSelected(null);
    setOptions([]);
    setScore({ correct: 0, wrong: 0 });
    setDone(false);
    setIsPlaying(false);
  };

  if (done) {
    const total = score.correct + score.wrong;
    const pct = Math.round((score.correct / total) * 100);
    return (
      <div className="animate-fade-in max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl mb-6">{pct >= 70 ? "🎉" : "💪"}</div>
        <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-3">Результат</h2>
        <p className="text-gray-500 mb-10">Ты угадал {score.correct} из {total} фраз</p>
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
        <button onClick={restart} className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover-scale">
          Ещё раз
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-semibold text-gray-900">Аудирование</h1>
          <p className="text-gray-500 text-sm mt-1">Фраза {currentIndex + 1} из {shuffled.length}</p>
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

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm mb-6 text-center">
        <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider">Послушай и выбери значение</p>

        <button
          onClick={handlePlay}
          className={`mx-auto flex items-center gap-3 px-8 py-4 rounded-full text-lg font-medium transition-all ${
            isPlaying ? "bg-blue-600 text-white scale-105" : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover-scale"
          }`}
        >
          <Icon name={isPlaying ? "Volume2" : "Headphones"} size={22} />
          {isPlaying ? "Слушаем..." : played ? "Послушать ещё раз" : "Нажми и слушай"}
        </button>

        {played && !revealed && (
          <p className="text-gray-400 text-sm mt-4 animate-fade-in">Теперь выбери правильный перевод ↓</p>
        )}

        {revealed && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
            <p className="text-gray-400 text-sm mb-1">Фраза:</p>
            <p className="font-semibold text-gray-900 text-xl">{current.english}</p>
            <p className="text-blue-400 text-sm font-mono mt-1">{current.transcription}</p>
          </div>
        )}
      </div>

      {played && options.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4 animate-fade-in">
          {options.map((opt) => {
            let style = "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100";
            if (selected !== null) {
              if (opt.id === current.id) style = "bg-emerald-50 text-emerald-700 border border-emerald-200";
              else if (opt.id === selected) style = "bg-rose-50 text-rose-600 border border-rose-200";
              else style = "bg-gray-50 text-gray-400 border border-gray-100";
            }
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className={`py-4 px-4 rounded-2xl font-medium text-sm transition-all text-left leading-snug ${style}`}
              >
                {opt.russian}
              </button>
            );
          })}
        </div>
      )}

      {revealed && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-all animate-fade-in"
        >
          {currentIndex + 1 >= shuffled.length ? "Завершить" : "Следующая →"}
        </button>
      )}
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────
function PracticePage() {
  const [shuffled] = useState(() => [...phrases].sort(() => Math.random() - 0.5));
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
        <button onClick={restart} className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all hover-scale">
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
            playingId === current.id ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
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
    { id: "listening" as Page, label: "Аудирование", icon: "Headphones" },
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
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
        {page === "listening" && <ListeningPage />}
        {page === "practice" && <PracticePage />}
      </main>
    </div>
  );
}
