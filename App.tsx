import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Scenario, Option, PedagogicalScore, Interaction } from './types';
import { getScenarioByTopicId } from './services/staticScenario';
import { Heart, Shield, Users, GitBranch, ArrowRight, BookOpen, UserCheck, X, Sparkles, Leaf, Target as TargetIcon, BookCopy, FlaskConical, BarChart3, User, Settings } from 'lucide-react';


declare global {
  interface Window {
    pannellum: any;
  }
}

const initialScore: PedagogicalScore = { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 };
type ViewState = 'exploring' | 'interaction' | 'feedback';
type AppState = 'setup' | 'welcome' | 'simulation';

interface TeacherProfile {
  name: string;
  school: string;
  experience: string;
}

const pedagogicalTopics = [
  { id: 'conflict-management', name: 'Manejo de Conflictos', icon: GitBranch, type: 'pedagogical' },
  { id: 'fostering-participation', name: 'Fomentando la Participación', icon: Users, type: 'pedagogical' },
  { id: 'inclusion-diversity', name: 'Inclusión y Diversidad', icon: BookOpen, type: 'pedagogical' },
];

const academicTopics = [
  { 
    course: 'Bioquímica', 
    icon: FlaskConical,
    topics: [
      { id: 'photosynthesis', name: 'Fotosíntesis', icon: Leaf, type: 'academic' },
    ]
  }
];

const allTopics = [
  ...pedagogicalTopics,
  ...academicTopics.flatMap(course => course.topics)
];

const SetupScreen: React.FC<{ onComplete: (profile: TeacherProfile) => void; initialProfile?: TeacherProfile | null }> = ({ onComplete, initialProfile }) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [school, setSchool] = useState(initialProfile?.school || '');
  const [experience, setExperience] = useState(initialProfile?.experience || 'beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), school: school.trim(), experience });
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Bienvenido a InnovaClass</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Configura tu perfil para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del Docente <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all"
            />
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Escuela o Institución
            </label>
            <input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Nombre de tu escuela (opcional)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nivel de Experiencia
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all"
            >
              <option value="beginner">Principiante (0-2 años)</option>
              <option value="intermediate">Intermedio (3-5 años)</option>
              <option value="advanced">Avanzado (6+ años)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Continuar <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

const WelcomeScreen: React.FC<{ teacherName: string; onStartSimulation: (topicId: string, topicName: string) => void; onEditProfile: () => void; }> = ({ teacherName, onStartSimulation, onEditProfile }) => {
  
  const handleStart = (topicId: string, topicName: string) => {
    onStartSimulation(topicId, topicName);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10 relative">
          <button
            onClick={onEditProfile}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Editar perfil"
          >
            <Settings className="w-5 h-5" />
          </button>
          <Sparkles className="mx-auto h-16 w-16 text-blue-500 mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            ¡Hola, {teacherName}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Elige tu simulación para comenzar a practicar.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pedagogical Training Column */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-2 flex items-center"><BookCopy className="w-6 h-6 mr-2"/> Capacitación Pedagógica</h2>
            {pedagogicalTopics.map(topic => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleStart(topic.id, topic.name)}
                  className="w-full p-4 flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-blue-100 hover:border-blue-400 dark:hover:bg-blue-900/50 dark:hover:border-blue-600 transition-all duration-200"
                >
                  <Icon className="h-7 w-7 mr-4 text-blue-500" />
                  <span className="font-semibold text-md text-gray-700 dark:text-gray-200">{topic.name}</span>
                  <ArrowRight className="w-6 h-6 ml-auto text-gray-400" />
                </button>
              )
            })}
          </div>

          {/* Academic Training Column */}
          <div className="flex flex-col space-y-4">
             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-green-500 pb-2 mb-2 flex items-center"><Leaf className="w-6 h-6 mr-2"/> Capacitación Académica</h2>
             {academicTopics.map(course => (
               <div key={course.course} className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                 <h3 className="font-bold text-lg mb-3 text-gray-600 dark:text-gray-400 flex items-center"><course.icon className="w-5 h-5 mr-2"/> Curso: {course.course}</h3>
                 <div className="space-y-3">
                    {course.topics.map(topic => {
                      const Icon = topic.icon;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => handleStart(topic.id, `${course.course}: ${topic.name}`)}
                          className="w-full p-3 flex items-center bg-white dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-green-100 hover:border-green-400 dark:hover:bg-green-900/50 dark:hover:border-green-600 transition-all duration-200"
                        >
                          <Icon className="h-6 w-6 mr-3 text-green-500" />
                          <span className="font-semibold text-md text-gray-700 dark:text-gray-200">{topic.name}</span>
                          <ArrowRight className="w-5 h-5 ml-auto text-gray-400" />
                        </button>
                      )
                    })}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const scoreConfig = {
    empathy: { label: 'Empatía', icon: Heart, color: 'text-pink-500' },
    assertiveness: { label: 'Asertividad', icon: Shield, color: 'text-blue-500' },
    inclusivity: { label: 'Inclusividad', icon: Users, color: 'text-purple-500' },
    conflictManagement: { label: 'Manejo de Conflicto', icon: GitBranch, color: 'text-green-500' },
}

const Scoreboard: React.FC<{ score: PedagogicalScore }> = ({ score }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full shadow-xl">
    <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-3 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 flex items-center">
      <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
      Puntaje Pedagógico
    </h2>
    <ul className="space-y-4">
      {Object.entries(score).map(([key, value]) => {
        const config = scoreConfig[key as keyof PedagogicalScore];
        const Icon = config.icon;
        const percentage = Math.max(0, Math.min(100, ((value + 10) / 20) * 100)); // Normalizar a 0-100
        return (
          <li key={key} className="space-y-2">
            <div className="flex items-center justify-between text-lg mb-1">
              <div className="flex items-center">
                <Icon className={`w-6 h-6 mr-3 ${config.color}`} />
                <span className="font-medium text-gray-700 dark:text-gray-300">{config.label}</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-xl">{value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${config.color.replace('text-', 'bg-')}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

const AcademicContext: React.FC<{ topic: string }> = ({ topic }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full">
    <h2 className="text-xl font-semibold mb-3 border-b pb-3 border-gray-200 dark:border-gray-700 flex items-center text-gray-800 dark:text-gray-100">
      <TargetIcon className="w-6 h-6 mr-3 text-blue-400"/>
      Objetivos de Aprendizaje
    </h2>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      Utilizar el entorno para explicar los conceptos clave de <strong>{topic.split(': ')[1] || topic}</strong>.
    </p>
  </div>
);

const ScenarioViewer: React.FC<{ scenario: Scenario; onHotspotClick: (id: string) => void;}> = ({ scenario, onHotspotClick }) => {
  const panoramaRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar que Pannellum esté disponible
    if (!window.pannellum) {
      console.error('Pannellum no está disponible. Asegúrate de que el script esté cargado.');
      setImageError('La librería Pannellum no está disponible');
      return;
    }

    if (!panoramaRef.current || !scenario.image) {
      return;
    }

    // Limpiar el viewer anterior si existe
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch (error) {
        console.warn('Error al destruir el viewer anterior:', error);
      }
      viewerRef.current = null;
    }

    // Resetear el error
    setImageError(null);

    try {
      viewerRef.current = window.pannellum.viewer(panoramaRef.current, {
        type: 'equirectangular',
        panorama: scenario.image,
        autoLoad: true,
        showControls: true,
        autoRotate: 0,
        hotSpots: scenario.hotspots.map(spot => ({
          pitch: spot.pitch,
          yaw: spot.yaw,
          type: 'custom',
          cssClass: 'custom-hotspot',
          text: spot.text,
          clickHandlerFunc: () => onHotspotClick(spot.id),
        })),
        onError: (error: any) => {
          console.error('Error al cargar la imagen panorámica:', error);
          setImageError(`Error al cargar la imagen: ${error.message || 'Imagen no encontrada'}`);
        }
      });
    } catch (error: any) {
      console.error('Error al inicializar Pannellum:', error);
      setImageError(`Error al inicializar el visor: ${error.message || 'Error desconocido'}`);
    }

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (error) {
          console.warn('Error al destruir el viewer en cleanup:', error);
        }
        viewerRef.current = null;
      }
    };
  }, [scenario.image, scenario.hotspots, onHotspotClick]);

  if (imageError) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-8">
          <p className="text-xl mb-4">⚠️ Error al cargar la imagen panorámica</p>
          <p className="text-gray-400">{imageError}</p>
          <p className="text-sm text-gray-500 mt-4">Ruta intentada: {scenario.image}</p>
        </div>
      </div>
    );
  }

  return <div ref={panoramaRef} className="absolute inset-0 w-full h-full" />;
};

const ScenarioContext: React.FC<{ interaction: Interaction, studentPersona: string }> = ({ interaction, studentPersona }) => (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl p-6 border-2 border-white/30 dark:border-gray-700/50">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          {interaction.title}
        </h2>
        <div className="space-y-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Contexto:</h3>
                    <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{interaction.context}</p>
                </div>
            </div>
             <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                  <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400"/>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Elementos Clave:</h3>
                    <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{studentPersona}</p>
                </div>
            </div>
        </div>
    </div>
);

const Options: React.FC<{ options: Option[], onSelect: (option: Option) => void, disabled: boolean }> = ({ options, onSelect, disabled }) => (
  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30 dark:border-gray-700/50">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">¿Qué harías en esta situación?</h3>
    <div className="space-y-3">
      {options.map((option, index) => (
        <button 
          key={option.id} 
          onClick={() => onSelect(option)} 
          disabled={disabled}
          className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group transform hover:scale-[1.02] hover:shadow-lg"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-200 font-medium transition-colors">{option.text}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const Feedback: React.FC<{ option: Option, onNext: () => void, isAcademic: boolean }> = ({ option, onNext, isAcademic }) => {
  const scoreTotal = Object.values(option.score).reduce((sum, val) => sum + val, 0);
  const isPositive = scoreTotal > 0;
  
  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-2xl flex flex-col border-2 border-white/30 dark:border-gray-700/50">
      <div>
        <div className={`mb-4 p-4 rounded-lg ${isPositive ? 'bg-green-50/80 dark:bg-green-900/20' : 'bg-orange-50/80 dark:bg-orange-900/20'} border-2 ${isPositive ? 'border-green-200 dark:border-green-800' : 'border-orange-200 dark:border-orange-800'}`}>
          <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            {isPositive ? '✅' : '⚠️'} Consecuencia:
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{option.ramification}</p>
        </div>
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-2">
              {isAcademic ? "📚 Explicación Académica:" : "💡 Retroalimentación Pedagógica:"}
          </h4>
          <p className="text-blue-700 dark:text-blue-300 leading-relaxed">{option.feedback}</p>
        </div>
      </div>
      <button 
        onClick={onNext} 
        className="mt-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        Continuar Explorando <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

const ScoreModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
            <div className="relative w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
                <div className="animate-fade-in-up">
                    {children}
                </div>
                 <button onClick={onClose} className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentTopicName, setCurrentTopicName] = useState('');
  const [currentTopicId, setCurrentTopicId] = useState('');
  const [score, setScore] = useState<PedagogicalScore>(initialScore);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [activeInteraction, setActiveInteraction] = useState<Interaction | null>(null);
  const [viewState, setViewState] = useState<ViewState>('exploring');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const handleSetupComplete = useCallback((profile: TeacherProfile) => {
    setTeacherProfile(profile);
    setAppState('welcome');
    // Guardar perfil en localStorage para futuras sesiones
    localStorage.setItem('teacherProfile', JSON.stringify(profile));
  }, []);

  // Cargar perfil guardado al iniciar
  useEffect(() => {
    const savedProfile = localStorage.getItem('teacherProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setTeacherProfile(profile);
        setAppState('welcome');
      } catch (error) {
        console.error('Error al cargar el perfil guardado:', error);
      }
    }
  }, []);


  const handleHotspotClick = useCallback((id: string) => {
    const interaction = currentScenario?.interactions.find(i => i.id === id);
    if (interaction) {
        setActiveInteraction(interaction);
        setViewState('interaction');
    }
  }, [currentScenario]);

  const handleSelectOption = useCallback((option: Option) => {
    setSelectedOption(option);
    setViewState('feedback');
    setScore(prev => ({
      empathy: prev.empathy + option.score.empathy,
      assertiveness: prev.assertiveness + option.score.assertiveness,
      inclusivity: prev.inclusivity + option.score.inclusivity,
      conflictManagement: prev.conflictManagement + option.score.conflictManagement,
    }));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setActiveInteraction(null);
    setViewState('exploring');
  }, []);

  const handleStartSimulation = useCallback((topicId: string, topicName: string) => {
    setCurrentTopicId(topicId);
    setCurrentTopicName(topicName);
    const newScenario = getScenarioByTopicId(topicId);
    setCurrentScenario(newScenario);
    setScore(initialScore);
    setSelectedOption(null);
    setActiveInteraction(null);
    setViewState('exploring');
    setAppState('simulation');
  }, []);
  
  const handleTriggerInteraction = useCallback(() => {
    if (viewState !== 'exploring') return; // Prevent triggering while another interaction is active
    if (currentScenario && currentScenario.interactions.length > 0) {
        // Find a representative interaction to trigger. The first one is a good default.
        const interaction = currentScenario.interactions[0];
        setActiveInteraction(interaction);
        setSelectedOption(null);
        setViewState('interaction');
    }
  }, [currentScenario, viewState]);

  const handleReturnToWelcome = useCallback(() => {
    setAppState('welcome');
    setCurrentScenario(null);
    setCurrentTopicName('');
    setCurrentTopicId('');
  }, []);

  const handleEditProfile = useCallback(() => {
    setAppState('setup');
  }, []);

  if (appState === 'setup') {
    return <SetupScreen onComplete={handleSetupComplete} initialProfile={teacherProfile} />;
  }

  if (appState === 'welcome' || !currentScenario) {
    return <WelcomeScreen teacherName={teacherProfile?.name || 'Docente'} onStartSimulation={handleStartSimulation} onEditProfile={handleEditProfile} />;
  }
  
  const currentTopicConfig = allTopics.find(t => t.id === currentTopicId) || { type: 'pedagogical' };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-200 font-sans overflow-hidden">
      
      <header className="bg-gray-800/80 backdrop-blur-md shadow-md z-30 border-b border-white/10 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-bold text-blue-400">InnovaClass - Simulador 360°</h1>
              {teacherProfile && (
                <span className="text-sm text-gray-400 hidden sm:inline">| {teacherProfile.name}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                 <button 
                    onClick={() => setIsScoreModalOpen(true)}
                    className="px-3 py-2 bg-gray-700/50 hover:bg-gray-700/90 text-white font-semibold rounded-lg transition duration-300 flex items-center text-sm sm:text-base shadow-lg hover:shadow-xl"
                  >
                     <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2"/>
                     Ver Puntaje
                </button>
                 <button 
                    onClick={handleTriggerInteraction}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 flex items-center text-sm sm:text-base shadow-lg hover:shadow-xl"
                  >
                    Iniciar Interacción
                </button>
                <button 
                    onClick={handleReturnToWelcome}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300 flex items-center text-sm sm:text-base shadow-lg hover:shadow-xl"
                  >
                    Volver al Menú
                </button>
            </div>
        </div>
      </header>
      <main className="relative flex-grow">
        <ScenarioViewer scenario={currentScenario} onHotspotClick={handleHotspotClick} />

        <ScoreModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)}>
            {currentTopicConfig.type === 'academic' ? (
                <AcademicContext topic={currentTopicName} />
            ) : (
                <Scoreboard score={score} />
            )}
        </ScoreModal>
        
        {/* Interaction/Feedback Panel: Conditional overlay */}
        {viewState !== 'exploring' && (
            <div className="absolute inset-0 z-20 p-4 sm:p-6 lg:p-8 flex items-end justify-center pointer-events-none">
                <div className="w-full max-w-7xl flex-grow flex flex-col justify-end pointer-events-auto">
                    {viewState === 'interaction' && activeInteraction && (
                        <div className="animate-fade-in-up grid grid-cols-1 xl:grid-cols-2 gap-6 items-end">
                            <ScenarioContext interaction={activeInteraction} studentPersona={currentScenario.studentPersona} />
                            <Options options={activeInteraction.options} onSelect={handleSelectOption} disabled={!!selectedOption} />
                        </div>
                    )}
                    {viewState === 'feedback' && selectedOption && (
                         <div className="max-w-3xl mx-auto w-full animate-fade-in-up">
                           <Feedback option={selectedOption} onNext={handleNext} isAcademic={currentTopicConfig.type === 'academic'}/>
                         </div>
                    )}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;