import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Scenario, Option, PedagogicalScore, Interaction } from './types';
import { getScenarioByTopicId } from './services/staticScenario';
import { Heart, Shield, Users, GitBranch, ArrowRight, BookOpen, UserCheck, X, Sparkles, Leaf, Target as TargetIcon, BookCopy, FlaskConical, BarChart3, User, Settings, Menu, ChevronDown, Home, Trophy, Trash2, Eye, RefreshCw } from 'lucide-react';


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
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="w-full max-w-3xl lg:max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 sm:mb-4">
            <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">Bienvenido a InnovaClass</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">Configura tu perfil para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del Docente <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
              className="w-full px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all text-base sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="school" className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Escuela o Institución
            </label>
            <input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Nombre de tu escuela (opcional)"
              className="w-full px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all text-base sm:text-lg"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nivel de Experiencia
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all text-base sm:text-lg"
            >
              <option value="beginner">Principiante (0-2 años)</option>
              <option value="intermediate">Intermedio (3-5 años)</option>
              <option value="advanced">Avanzado (6+ años)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-bold py-3.5 sm:py-4 lg:py-5 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:shadow-xl transform active:scale-[0.98] touch-manipulation text-base sm:text-lg lg:text-xl"
          >
            Continuar <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ml-2 flex-shrink-0" />
          </button>
        </form>
      </div>
    </div>
  );
};

// Función para obtener todos los puntajes guardados de un docente
const getAllSavedScores = (teacherName: string): Record<string, PedagogicalScore> => {
  const scores: Record<string, PedagogicalScore> = {};
  try {
    const prefix = `scores_${teacherName}_`;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const topicId = key.replace(prefix, '');
        const savedScore = localStorage.getItem(key);
        if (savedScore) {
          scores[topicId] = JSON.parse(savedScore);
        }
      }
    }
  } catch (error) {
    console.error('Error al obtener puntajes guardados:', error);
  }
  return scores;
};

// Función para eliminar todos los puntajes de un docente
const clearAllScores = (teacherName: string) => {
  try {
    const prefix = `scores_${teacherName}_`;
    const keysToDelete: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error al eliminar puntajes:', error);
  }
};

// Componente de Perfil del Docente
interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherProfile: TeacherProfile;
  savedScores: Record<string, PedagogicalScore>;
  onScoresCleared: () => void;
}

const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({ isOpen, onClose, teacherProfile, savedScores, onScoresCleared }) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const getTotalScore = (score: PedagogicalScore): number => {
    return Object.values(score).reduce((sum, val) => sum + val, 0);
  };

  const totalTopics = Object.keys(savedScores).length;
  const totalScore = Object.values(savedScores).reduce((sum, score) => sum + getTotalScore(score), 0);
  const avgScore = totalTopics > 0 ? (totalScore / totalTopics).toFixed(1) : '0';

  const handleClearScores = () => {
    clearAllScores(teacherProfile.name);
    onScoresCleared();
    setShowClearConfirm(false);
  };

  const experienceLabels = {
    beginner: 'Principiante (0-2 años)',
    intermediate: 'Intermedio (3-5 años)',
    advanced: 'Avanzado (6+ años)'
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" onClick={onClose}>
      <div className="relative w-full max-w-4xl lg:max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Perfil del Docente</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{teacherProfile.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Información del Perfil */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Escuela</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{teacherProfile.school || 'No especificada'}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nivel de Experiencia</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{experienceLabels[teacherProfile.experience as keyof typeof experienceLabels]}</p>
              </div>
            </div>
          </div>

          {/* Estadísticas Generales */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Estadísticas Generales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{totalTopics}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Temas Completados</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{totalScore > 0 ? `+${totalScore}` : totalScore}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Puntaje Total</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{avgScore}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Promedio</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg border border-pink-200 dark:border-pink-800">
                <p className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400">{allTopics.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Temas Disponibles</p>
              </div>
            </div>
          </div>

          {/* Puntajes por Tema */}
          {totalTopics > 0 ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                Puntajes Detallados por Tema
              </h3>
              <div className="space-y-3">
                {Object.entries(savedScores).map(([topicId, score]) => {
                  const topic = allTopics.find(t => t.id === topicId);
                  if (!topic) return null;
                  const total = getTotalScore(score);
                  
                  return (
                    <div key={topicId} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {React.createElement(topic.icon, { className: "w-5 h-5 text-blue-500" })}
                          <h4 className="font-semibold text-gray-800 dark:text-white">{topic.name}</h4>
                        </div>
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{total > 0 ? `+${total}` : total}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(score).map(([key, value]) => {
                          const config = scoreConfig[key as keyof PedagogicalScore];
                          const Icon = config.icon;
                          return (
                            <div key={key} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                              <Icon className={`w-4 h-4 ${config.color}`} />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{config.label}:</span>
                              <span className="text-sm font-bold text-gray-800 dark:text-white">{value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Aún no has completado ninguna simulación</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">¡Comienza a practicar para ver tus estadísticas!</p>
            </div>
          )}

          {/* Acciones */}
          {totalTopics > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-500" />
                Acciones
              </h3>
              {!showClearConfirm ? (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full md:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar Todos los Puntajes
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">¿Estás seguro de que deseas eliminar todos los puntajes? Esta acción no se puede deshacer.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleClearScores}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Sí, Eliminar
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen: React.FC<{ teacherName: string; teacherProfile: TeacherProfile | null; onStartSimulation: (topicId: string, topicName: string) => void; onEditProfile: () => void; refreshTrigger?: number }> = ({ teacherName, teacherProfile, onStartSimulation, onEditProfile, refreshTrigger }) => {
  const [savedScores, setSavedScores] = useState<Record<string, PedagogicalScore>>({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  useEffect(() => {
    // Cargar puntajes guardados al montar el componente o cuando cambie el trigger
    const scores = getAllSavedScores(teacherName);
    setSavedScores(scores);
  }, [teacherName, refreshTrigger]);
  
  const handleStart = (topicId: string, topicName: string) => {
    onStartSimulation(topicId, topicName);
  }
  
  // Función para obtener el puntaje total de un tema
  const getTotalScore = (score: PedagogicalScore): number => {
    return Object.values(score).reduce((sum, val) => sum + val, 0);
  }
  
  // Función para obtener el puntaje guardado de un tema
  const getTopicScore = (topicId: string): PedagogicalScore | null => {
    return savedScores[topicId] || null;
  }

  const handleScoresCleared = () => {
    const scores = getAllSavedScores(teacherName);
    setSavedScores(scores);
    setIsProfileModalOpen(false);
  }

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-3 sm:p-4 lg:p-6 overflow-y-auto landscape:overflow-hidden">
      <div className="w-full max-w-6xl lg:max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
        {/* Header compacto para landscape */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 relative landscape:mb-4">
          <div className="absolute top-0 right-0 flex gap-2">
            {teacherProfile && (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-colors touch-manipulation"
                title="Ver perfil completo"
                aria-label="Ver perfil completo"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            <button
              onClick={onEditProfile}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 active:scale-95 transition-colors touch-manipulation"
              title="Editar perfil"
              aria-label="Editar perfil"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <Sparkles className="mx-auto h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 landscape:h-10 landscape:w-10 text-blue-500 mb-2 sm:mb-3 landscape:mb-2 animate-pulse" />
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl landscape:text-2xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
            ¡Hola, {teacherName}!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg landscape:text-sm text-gray-600 dark:text-gray-400">Elige tu simulación para comenzar a practicar.</p>
        </div>
        
        {/* Sección de Puntajes Guardados */}
        {Object.keys(savedScores).length > 0 && (
          <div className="mb-4 sm:mb-6 lg:mb-8 landscape:mb-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 flex-shrink-0" />
              <span>Puntajes Guardados</span>
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(savedScores).map(([topicId, score]) => {
                const topic = allTopics.find(t => t.id === topicId);
                const totalScore = getTotalScore(score);
                if (!topic) return null;
                
                return (
                  <div 
                    key={topicId}
                    className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px] sm:max-w-[150px]">
                      {topic.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {Object.entries(score).map(([key, value]) => {
                        const config = scoreConfig[key as keyof PedagogicalScore];
                        if (value === 0) return null;
                        return (
                          <div 
                            key={key}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${config.bgColor} flex items-center justify-center shadow-sm`}
                            title={`${config.label}: ${value}`}
                          >
                            <span className="text-white font-bold text-[10px] sm:text-xs">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400">
                      {totalScore > 0 ? `+${totalScore}` : totalScore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Grid adaptativo: vertical en portrait, horizontal en landscape */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 landscape:grid-cols-2 landscape:gap-4">
          {/* Pedagogical Training Column */}
          <div className="flex flex-col space-y-2 sm:space-y-3 landscape:space-y-2">
            <h2 className="text-base sm:text-lg lg:text-xl landscape:text-base font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-1.5 sm:pb-2 landscape:pb-1.5 mb-1.5 sm:mb-2 landscape:mb-1.5 flex items-center">
              <BookCopy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 landscape:w-4 landscape:h-4 mr-2 flex-shrink-0"/> 
              <span>Capacitación Pedagógica</span>
            </h2>
            {pedagogicalTopics.map(topic => {
              const Icon = topic.icon;
              const topicScore = getTopicScore(topic.id);
              const totalScore = topicScore ? getTotalScore(topicScore) : null;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => handleStart(topic.id, topic.name)}
                  className="w-full p-2.5 sm:p-3 lg:p-4 landscape:p-2.5 flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 active:bg-blue-100 active:border-blue-400 dark:active:bg-blue-900/50 dark:active:border-blue-600 transition-all duration-200 transform active:scale-[0.98] touch-manipulation relative"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 landscape:h-5 landscape:w-5 mr-2 sm:mr-3 landscape:mr-2 text-blue-500 flex-shrink-0" />
                  <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs text-gray-700 dark:text-gray-200 text-left flex-1 truncate">{topic.name}</span>
                  {topicScore && (
                    <div className="flex items-center gap-1 mr-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-[10px] sm:text-xs">{totalScore}</span>
                      </div>
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 landscape:w-4 landscape:h-4 text-gray-400 flex-shrink-0" />
                </button>
              )
            })}
          </div>

          {/* Academic Training Column */}
          <div className="flex flex-col space-y-2 sm:space-y-3 landscape:space-y-2">
             <h2 className="text-base sm:text-lg lg:text-xl landscape:text-base font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-green-500 pb-1.5 sm:pb-2 landscape:pb-1.5 mb-1.5 sm:mb-2 landscape:mb-1.5 flex items-center">
               <Leaf className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 landscape:w-4 landscape:h-4 mr-2 flex-shrink-0"/> 
               <span>Capacitación Académica</span>
             </h2>
             {academicTopics.map(course => (
               <div key={course.course} className="bg-gray-50 dark:bg-gray-900/60 p-2.5 sm:p-3 lg:p-4 landscape:p-2.5 rounded-lg border border-gray-200 dark:border-gray-700">
                 <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs mb-1.5 sm:mb-2 landscape:mb-1.5 text-gray-600 dark:text-gray-400 flex items-center">
                   <course.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 landscape:w-3 landscape:h-3 mr-1.5 flex-shrink-0"/> 
                   <span className="truncate">Curso: {course.course}</span>
                 </h3>
                 <div className="space-y-1.5 sm:space-y-2 landscape:space-y-1.5">
                    {course.topics.map(topic => {
                      const Icon = topic.icon;
                      const topicScore = getTopicScore(topic.id);
                      const totalScore = topicScore ? getTotalScore(topicScore) : null;
                      
                      return (
                        <button
                          key={topic.id}
                          onClick={() => handleStart(topic.id, `${course.course}: ${topic.name}`)}
                          className="w-full p-2 sm:p-2.5 lg:p-3 landscape:p-2 flex items-center bg-white dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600 active:bg-green-100 active:border-green-400 dark:active:bg-green-900/50 dark:active:border-green-600 transition-all duration-200 transform active:scale-[0.98] touch-manipulation relative"
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 landscape:h-4 landscape:w-4 mr-2 text-green-500 flex-shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs text-gray-700 dark:text-gray-200 text-left flex-1 truncate">{topic.name}</span>
                          {topicScore && (
                            <div className="flex items-center gap-1 mr-2">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-[10px] sm:text-xs">{totalScore}</span>
                              </div>
                            </div>
                          )}
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 landscape:w-3 landscape:h-3 text-gray-400 flex-shrink-0" />
                        </button>
                      )
                    })}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
      {teacherProfile && (
        <TeacherProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          teacherProfile={teacherProfile}
          savedScores={savedScores}
          onScoresCleared={handleScoresCleared}
        />
      )}
    </>
  );
};


const scoreConfig = {
    empathy: { label: 'Empatía', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-500' },
    assertiveness: { label: 'Asertividad', icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    inclusivity: { label: 'Inclusividad', icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-500' },
    conflictManagement: { label: 'Manejo de Conflicto', icon: GitBranch, color: 'text-green-500', bgColor: 'bg-green-500' },
}

const Scoreboard: React.FC<{ score: PedagogicalScore }> = ({ score }) => (
  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full shadow-xl max-h-[85vh] overflow-y-auto">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 border-b-2 pb-2 sm:pb-3 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 flex items-center">
      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500 flex-shrink-0" />
      <span>Puntaje Pedagógico</span>
    </h2>
    <ul className="space-y-3 sm:space-y-4">
      {Object.entries(score).map(([key, value]) => {
        const config = scoreConfig[key as keyof PedagogicalScore];
        const Icon = config.icon;
        const percentage = Math.max(0, Math.min(100, ((value + 10) / 20) * 100)); // Normalizar a 0-100
        return (
          <li key={key} className="space-y-2">
            <div className="flex items-center justify-between text-base sm:text-lg mb-1">
              <div className="flex items-center flex-1 min-w-0">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 ${config.color}`} />
                <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{config.label}</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl ml-2 flex-shrink-0">{value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${config.bgColor}`}
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
  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-h-[85vh] overflow-y-auto">
    <h2 className="text-lg sm:text-xl font-semibold mb-3 border-b pb-2 sm:pb-3 border-gray-200 dark:border-gray-700 flex items-center text-gray-800 dark:text-gray-100">
      <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400 flex-shrink-0"/>
      <span>Objetivos de Aprendizaje</span>
    </h2>
    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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

const ScenarioContext: React.FC<{ interaction: Interaction, studentPersona: string }> = ({ interaction, studentPersona }) => {
  // Extraer el nombre del estudiante del contexto si está presente
  const studentName = interaction.context.match(/(?:Carmen|María|Luis|Wayra|Ana)/)?.[0] || 'Estudiante';
  
  return (
    <div className="w-full">
      {/* Mensaje del estudiante tipo chat - diseño limpio y completo */}
      <div className="flex items-start gap-2 sm:gap-3 landscape:gap-2 mb-3 sm:mb-4 landscape:mb-3">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 landscape:w-8 landscape:h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-4 landscape:h-4 text-white"/>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <span className="text-xs sm:text-sm landscape:text-xs font-semibold text-gray-700 dark:text-gray-300">{studentName}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">ahora</span>
          </div>
          <div className="bg-green-500 dark:bg-green-600 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-2.5 landscape:px-3 landscape:py-2 shadow-sm max-w-[90%] sm:max-w-[85%]">
            <p className="text-sm sm:text-base md:text-lg landscape:text-sm text-white leading-relaxed break-words whitespace-pre-wrap">{interaction.context}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Options: React.FC<{ options: Option[], onSelect: (option: Option) => void, disabled: boolean }> = ({ options, onSelect, disabled }) => {
  // Función para extraer solo la respuesta del docente (eliminar "Responder: '...'")
  const extractResponse = (text: string): string => {
    const match = text.match(/Responder:?\s*['"](.+?)['"]/);
    if (match) {
      return match[1];
    }
    // Si no tiene formato de respuesta, truncar si es muy largo (más corto para Cardboard)
    if (text.length > 100) {
      return text.substring(0, 97) + '...';
    }
    return text;
  };

  return (
    <div className="w-full space-y-2 sm:space-y-2.5 landscape:space-y-2">
      {options.map((option, index) => {
        const responseText = extractResponse(option.text);
        return (
          <button 
            key={option.id} 
            onClick={() => onSelect(option)} 
            disabled={disabled}
            className="w-full text-left flex items-start gap-2 sm:gap-3 landscape:gap-2 p-2.5 sm:p-3 landscape:p-2.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group transform active:scale-[0.98] touch-manipulation"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar del docente - alineado a la derecha */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 landscape:w-8 landscape:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md order-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-4 landscape:h-4 text-white"/>
            </div>
            {/* Mensaje del docente - alineado a la derecha */}
            <div className="flex-1 min-w-0 flex flex-col items-end order-1">
              <div className="mb-1">
                <span className="text-xs sm:text-sm landscape:text-xs font-semibold text-gray-700 dark:text-gray-300">Tú</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">ahora</span>
              </div>
              <div className="bg-blue-500 dark:bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 sm:px-4 sm:py-2.5 landscape:px-3 landscape:py-2 shadow-sm max-w-[85%] group-active:bg-blue-600 dark:group-active:bg-blue-700 transition-colors">
                <p className="text-sm sm:text-base md:text-lg landscape:text-sm text-white leading-relaxed break-words">{responseText}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const Feedback: React.FC<{ option: Option, onNext: () => void, isAcademic: boolean }> = ({ option, onNext, isAcademic }) => {
  const scoreTotal = Object.values(option.score).reduce((sum, val) => sum + val, 0);
  const isPositive = scoreTotal > 0;
  
  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-2.5 sm:p-3 md:p-4 lg:p-5 landscape:p-2.5 landscape:sm:p-3 rounded-xl shadow-2xl flex flex-col border-2 border-white/30 dark:border-gray-700/50 max-w-full">
      <div className="space-y-2 sm:space-y-3 landscape:space-y-2">
        <div className={`p-2.5 sm:p-3 md:p-4 landscape:p-2.5 rounded-lg ${isPositive ? 'bg-green-50/80 dark:bg-green-900/20' : 'bg-orange-50/80 dark:bg-orange-900/20'} border-2 ${isPositive ? 'border-green-200 dark:border-green-800' : 'border-orange-200 dark:border-orange-800'}`}>
          <h4 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl landscape:text-sm landscape:md:text-base text-gray-800 dark:text-gray-200 mb-1.5 sm:mb-2 landscape:mb-1.5 flex items-center">
            <span className="mr-1.5 sm:mr-2 text-base sm:text-lg md:text-xl landscape:text-base">{isPositive ? '✅' : '⚠️'}</span>
            <span>Consecuencia:</span>
          </h4>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs landscape:md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">{option.ramification}</p>
        </div>
        <div className="p-2.5 sm:p-3 md:p-4 landscape:p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl landscape:text-sm landscape:md:text-base text-blue-800 dark:text-blue-200 mb-1.5 sm:mb-2 landscape:mb-1.5 flex items-center">
            <span className="mr-1.5 sm:mr-2">{isAcademic ? "📚" : "💡"}</span>
            <span>{isAcademic ? "Explicación Académica:" : "Retroalimentación Pedagógica:"}</span>
          </h4>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs landscape:md:text-sm text-blue-700 dark:text-blue-300 leading-relaxed break-words">{option.feedback}</p>
        </div>
      </div>
      <button 
        onClick={onNext} 
        className="mt-2 sm:mt-3 landscape:mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-bold py-2.5 sm:py-3 md:py-4 landscape:py-2.5 landscape:sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg active:shadow-xl transform active:scale-[0.98] touch-manipulation text-xs sm:text-sm md:text-base lg:text-lg landscape:text-xs landscape:md:text-sm"
      >
        <span>Continuar Explorando</span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 landscape:w-3 landscape:md:w-4 ml-1.5 sm:ml-2 flex-shrink-0" />
      </button>
    </div>
  );
};

const ScoreModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" onClick={onClose}>
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in-up mx-4" onClick={(e) => e.stopPropagation()}>
                {children}
                <button 
                    onClick={onClose} 
                    className="absolute -top-3 -right-3 sm:-top-2 sm:-right-2 bg-white dark:bg-gray-800 rounded-full p-2 sm:p-2.5 shadow-lg active:scale-95 transition-transform touch-manipulation"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

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

  // Función para obtener la clave de almacenamiento de puntajes
  const getScoreStorageKey = useCallback((topicId: string, teacherName?: string) => {
    const name = teacherName || teacherProfile?.name || 'default';
    return `scores_${name}_${topicId}`;
  }, [teacherProfile?.name]);

  // Función para guardar puntajes en localStorage
  const saveScores = useCallback((scores: PedagogicalScore, topicId: string) => {
    if (!topicId) return;
    try {
      const storageKey = getScoreStorageKey(topicId);
      localStorage.setItem(storageKey, JSON.stringify(scores));
    } catch (error) {
      console.error('Error al guardar los puntajes:', error);
    }
  }, [getScoreStorageKey]);

  // Función para cargar puntajes guardados
  const loadScores = useCallback((topicId: string): PedagogicalScore | null => {
    if (!topicId) return null;
    try {
      const storageKey = getScoreStorageKey(topicId);
      const savedScores = localStorage.getItem(storageKey);
      if (savedScores) {
        return JSON.parse(savedScores);
      }
    } catch (error) {
      console.error('Error al cargar los puntajes guardados:', error);
    }
    return null;
  }, [getScoreStorageKey]);

  const handleSelectOption = useCallback((option: Option) => {
    setSelectedOption(option);
    setViewState('feedback');
    setScore(prev => {
      const newScore = {
        empathy: prev.empathy + option.score.empathy,
        assertiveness: prev.assertiveness + option.score.assertiveness,
        inclusivity: prev.inclusivity + option.score.inclusivity,
        conflictManagement: prev.conflictManagement + option.score.conflictManagement,
      };
      // Guardar los puntajes actualizados
      if (currentTopicId) {
        saveScores(newScore, currentTopicId);
      }
      return newScore;
    });
  }, [currentTopicId, saveScores]);

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
    
    // Cargar puntajes guardados o usar puntajes iniciales
    const savedScores = loadScores(topicId);
    setScore(savedScores || initialScore);
    
    setSelectedOption(null);
    setActiveInteraction(null);
    setViewState('exploring');
    setAppState('simulation');
  }, [loadScores]);
  
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

  // Guardar puntajes cuando cambien y haya un topicId activo
  useEffect(() => {
    if (currentTopicId && appState === 'simulation') {
      saveScores(score, currentTopicId);
    }
  }, [score, currentTopicId, appState, saveScores]);

  const handleReturnToWelcome = useCallback(() => {
    // Guardar puntajes antes de salir
    if (currentTopicId) {
      saveScores(score, currentTopicId);
    }
    setAppState('welcome');
    setCurrentScenario(null);
    setCurrentTopicName('');
    setCurrentTopicId('');
    // Incrementar trigger para refrescar los puntajes guardados
    setRefreshTrigger(prev => prev + 1);
  }, [currentTopicId, score, saveScores]);

  const handleEditProfile = useCallback(() => {
    setAppState('setup');
  }, []);

  if (appState === 'setup') {
    return <SetupScreen onComplete={handleSetupComplete} initialProfile={teacherProfile} />;
  }

  if (appState === 'welcome' || !currentScenario) {
    return <WelcomeScreen teacherName={teacherProfile?.name || 'Docente'} teacherProfile={teacherProfile} onStartSimulation={handleStartSimulation} onEditProfile={handleEditProfile} refreshTrigger={refreshTrigger} />;
  }
  
  const currentTopicConfig = allTopics.find(t => t.id === currentTopicId) || { type: 'pedagogical' };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-200 font-sans overflow-hidden">
      
      {/* Controles superiores: Botones */}
      <div className="fixed top-4 right-4 z-50">
        {/* Menú hamburguesa - punto de origen */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-gray-700/90 active:bg-gray-800 text-white rounded-full shadow-xl border-2 border-gray-700/50 dark:border-gray-600/50 flex items-center justify-center transition-all duration-300 touch-manipulation hover:scale-110 active:scale-95"
            aria-label="Menú"
          >
            <Menu className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
          </button>

          {/* Puntajes que salen hacia la izquierda */}
          {isMenuOpen && (
            <div className="absolute top-0 right-full mr-2 flex items-center gap-2">
              {Object.entries(score).map(([key, value], index) => {
                const config = scoreConfig[key as keyof PedagogicalScore];
                return (
                  <div 
                    key={key}
                    className="flex flex-col items-center animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div 
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${config.bgColor} bg-opacity-95 shadow-lg border-2 border-white/30 flex items-center justify-center transition-all duration-300`}
                      title={config.label}
                    >
                      <span className="text-white font-bold text-xs sm:text-sm">{value}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-white dark:text-gray-300 mt-1 text-center max-w-[50px] truncate drop-shadow-lg">{config.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Botón Home que sale hacia abajo */}
          {isMenuOpen && (
            <button
              onClick={handleReturnToWelcome}
              className="absolute top-full left-0 mt-2 w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-gray-700/90 active:bg-gray-800 text-white rounded-full shadow-xl border-2 border-gray-700/50 dark:border-gray-600/50 flex items-center justify-center transition-all duration-300 touch-manipulation hover:scale-110 active:scale-95 animate-slide-in-top"
              aria-label="Menú Principal"
              title="Menú Principal"
            >
              <Home className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}
        </div>
      </div>

      <main className="relative flex-grow">
        <ScenarioViewer scenario={currentScenario} onHotspotClick={handleHotspotClick} />

        
        {/* Interaction/Feedback Panel: Conditional overlay - Landscape optimized with safe margins */}
        {viewState !== 'exploring' && (
            <div className="absolute inset-0 z-20 p-4 sm:p-6 lg:p-8 xl:p-10 flex items-center justify-center pointer-events-none overflow-y-auto">
                <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl flex-grow flex flex-col justify-center pointer-events-auto pb-safe px-2 sm:px-4">
                    {viewState === 'interaction' && activeInteraction && (
                        <div className="animate-fade-in-up w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto space-y-3 sm:space-y-4 landscape:space-y-3 overflow-y-auto max-h-[85vh] px-1">
                            <ScenarioContext interaction={activeInteraction} studentPersona={currentScenario.studentPersona} />
                            <Options options={activeInteraction.options} onSelect={handleSelectOption} disabled={!!selectedOption} />
                        </div>
                    )}
                    {viewState === 'feedback' && selectedOption && (
                         <div className="max-w-3xl lg:max-w-4xl mx-auto w-full animate-fade-in-up px-2 sm:px-4">
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