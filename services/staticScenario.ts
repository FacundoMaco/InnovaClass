import { Scenario } from '../types';

// Referencia a la imagen local en la carpeta public
const CLASSROOM_IMAGE_URL = '/Assets/aularural.png';

const scenarioTopicMap: Record<string, { title: string, studentPersona: string, interactionTitle: string, context: string }> = {
    'conflict-management': {
        title: "Manejo de Conflictos",
        studentPersona: "En el aula multigrado, dos estudiantes de quinto grado, Ana y Luis, disputan por el único libro de Ciencias Naturales disponible. Ana llegó primero pero Luis argumenta que lo necesita para completar su tarea. Ambos elevan la voz y otros estudiantes observan la situación, interrumpiendo sus actividades.",
        interactionTitle: "Disputa por recursos limitados",
        context: "Ana y Luis discuten por el libro de Ciencias. Ambos lo necesitan para sus tareas, pero solo hay un ejemplar. La tensión aumenta y otros estudiantes dejan de trabajar para observar el conflicto."
    },
    'fostering-participation': {
        title: "Fomentando la Participación",
        studentPersona: "En un aula multigrado de zona rural, María (12 años) es una estudiante quechuahablante que rara vez participa en clase. Aunque domina el castellano, muestra inseguridad al expresarse frente a sus compañeros. Durante las actividades grupales, tiende a mantenerse en silencio mientras otros estudiantes dominan la conversación.",
        interactionTitle: "Promoviendo voces diversas",
        context: "Durante una actividad de grupo sobre cultivos locales, notas que María, quien posee conocimiento valioso sobre agricultura tradicional por su familia, permanece callada mientras otros estudiantes menos informados dominan la discusión."
    },
    'inclusion-diversity': {
        title: "Inclusión y Diversidad",
        studentPersona: "Wayra, un estudiante de 10 años de una comunidad asháninka, se ha trasladado recientemente a esta escuela rural andina. Habla asháninka como lengua materna y está aprendiendo castellano. Sus nuevos compañeros, principalmente quechuahablantes, mantienen distancia y no lo integran en sus juegos ni trabajos grupales.",
        interactionTitle: "Integración intercultural",
        context: "Durante el recreo, observas que Wayra está solo mientras sus compañeros juegan en grupos. En clase, cuando propones un trabajo grupal, los estudiantes forman equipos evitando incluirlo. Es momento de abordar esta situación para construir un ambiente verdaderamente inclusivo."
    },
    'photosynthesis': {
        title: "Fotosíntesis",
        studentPersona: "Los estudiantes muestran curiosidad sobre por qué las plantas del huerto escolar crecen mejor en ciertas áreas. Tienes la oportunidad de explicar la fotosíntesis usando elementos del entorno inmediato: las plantas del huerto, la luz que entra por la ventana, y los cultivos que las familias mantienen.",
        interactionTitle: "Explorando la fotosíntesis",
        context: "Carmen pregunta: 'Profesor, ¿por qué las plantas de papa de mi chacra crecen más grandes donde hay más sol?' Es el momento perfecto para explicar la fotosíntesis conectándola con su experiencia agrícola familiar."
    }
};

const defaultScenario: Scenario = {
  id: 'static-rural-classroom',
  title: '', // Will be replaced by topic
  image: CLASSROOM_IMAGE_URL,
  studentPersona: '', // Will be replaced by topic
  hotspots: [
    { id: 'students-desk', pitch: -15, yaw: 40, text: 'Escritorio de los estudiantes' },
    { id: 'blackboard', pitch: 0, yaw: -10, text: 'Pizarra' },
    { id: 'window', pitch: 10, yaw: -80, text: 'Ventana' },
  ],
  interactions: [
    {
      id: 'students-desk', // Main interaction point - conflict management
      title: '', // Will be replaced by topic
      context: '', // Will be replaced by topic
      options: [
        {
          id: 1,
          text: "Proponer que establezcan un sistema de turnos para el libro, creando un horario visible para todos.",
          score: { empathy: 1, assertiveness: 2, inclusivity: 2, conflictManagement: 2 },
          ramification: "Los estudiantes aceptan la solución. Implementas un sistema de préstamo por períodos de clase. Otros estudiantes aprenden a gestionar recursos compartidos. Ana y Luis se turnan y ambos completan sus tareas.",
          feedback: "Excelente gestión de recursos limitados. Has transformado un conflicto en una oportunidad de aprendizaje sobre organización comunitaria y uso equitativo de materiales escasos, habilidad fundamental en contextos rurales."
        },
        {
          id: 2,
          text: "Sugerir que trabajen juntos usando el libro compartido, aprovechando para formar un equipo colaborativo.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 2 },
          ramification: "Ana y Luis aceptan trabajar juntos. Descubren que pueden apoyarse mutuamente en diferentes temas. La colaboración se extiende a futuras actividades, creando un vínculo positivo.",
          feedback: "Extraordinario. Has convertido un conflicto en colaboración. En aulas multigrado y con recursos limitados, fomentar el trabajo cooperativo no solo resuelve el conflicto inmediato, sino que construye habilidades de ayuda mutua esenciales para comunidades rurales."
        },
        {
          id: 3,
          text: "Llamar la atención públicamente e imponer que Ana use el libro ahora porque llegó primero, sin más discusión.",
          score: { empathy: -1, assertiveness: 1, inclusivity: -1, conflictManagement: 0 },
          ramification: "Luis se siente tratado injustamente y Ana incómoda por la intervención autoritaria. La tensión permanece. Luis pierde motivación para participar en clase y evita acercarse cuando necesita ayuda.",
          feedback: "Esta intervención autoritaria genera resentimiento. En contextos rurales donde la colaboración comunitaria es un valor cultural, imponer soluciones sin diálogo puede dañar la confianza y perder oportunidades de enseñar resolución constructiva de conflictos."
        }
      ]
    },
    {
      id: 'blackboard',
      title: 'Estrategias con la Pizarra',
      context: 'La pizarra es uno de los recursos más valiosos en aulas rurales con tecnología limitada. Su uso efectivo puede compensar la falta de otros materiales y atender diferentes estilos de aprendizaje en un aula multigrado.',
      options: [
        {
          id: 4,
          text: "Organizar la pizarra en secciones claras por grado/tema, usando colores y dibujos simples para apoyar a estudiantes con diferentes niveles de lectoescritura.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 0 },
          ramification: "Los estudiantes de diferentes grados pueden identificar fácilmente su sección. Los dibujos ayudan a estudiantes con dificultades de lectura. Las familias que visitan el aula pueden entender visualmente el trabajo realizado.",
          feedback: "Excelente adaptación a la realidad multigrado. La organización visual y uso de dibujos es especialmente efectiva en contextos donde los estudiantes tienen distintos niveles de dominio del castellano o están en proceso de alfabetización."
        },
        {
          id: 5,
          text: "Invitar a estudiantes mayores a escribir en la pizarra mientras explican a los menores, promoviendo el aprendizaje entre pares.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 0 },
          ramification: "Los estudiantes mayores refuerzan su conocimiento al enseñar. Los menores se sienten más cómodos aprendiendo de sus pares. Se fortalece la colaboración multigrado, similar a la ayuda entre hermanos en el hogar rural.",
          feedback: "¡Extraordinario! Has aplicado el principio de aprendizaje entre pares, especialmente valioso en aulas multigrado. Esto replica la estructura de ayuda familiar común en comunidades rurales y maximiza el aprendizaje de todos los niveles."
        },
        {
          id: 6,
          text: "Llenar la pizarra con toda la información del tema sin estructura clara, esperando que los estudiantes copien todo rápidamente.",
          score: { empathy: -1, assertiveness: 0, inclusivity: -1, conflictManagement: 0 },
          ramification: "Los estudiantes más pequeños no pueden copiar a la velocidad requerida. Estudiantes con dificultades de escritura se frustran. Los de grados mayores copian sin comprender, perdiendo la oportunidad de aprender significativamente.",
          feedback: "En aulas multigrado, copiar extensivamente es ineficiente y excluyente. Considera que los estudiantes tienen diferentes ritmos y niveles de escritura. La claridad y selección de contenido esencial es más valiosa que la cantidad de información."
        }
      ]
    },
    {
      id: 'window',
      title: 'El Entorno como Recurso Pedagógico',
      context: 'En escuelas rurales, el entorno natural y comunitario es un laboratorio vivo. La ventana conecta el aula con la realidad inmediata de los estudiantes: sus chacras, el clima, los ciclos naturales que rigen la vida familiar y comunitaria.',
      options: [
        {
          id: 7,
          text: "Integrar el paisaje visible en la lección: usar el movimiento del sol para enseñar tiempo, las nubes para clima, los cultivos para ciclos biológicos, conectando con el conocimiento agrícola familiar.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 0 },
          ramification: "Los estudiantes comparten conocimientos de sus familias sobre señales naturales. Carmen explica cómo su abuelo predice lluvias. Otros aportan saberes locales. El aprendizaje se vuelve bidireccional y culturalmente relevante.",
          feedback: "¡Excepcional! Has practicado pedagogía situada. Al validar el conocimiento local y familiar, fortaleces la identidad cultural, aumentas la relevancia del aprendizaje y construyes puentes entre el saber comunitario y el curricular formal."
        },
        {
          id: 8,
          text: "Pedir a los estudiantes que comparen lo que observan afuera con imágenes del libro de texto, identificando similitudes y diferencias con otros ecosistemas.",
          score: { empathy: 1, assertiveness: 1, inclusivity: 1, conflictManagement: 0 },
          ramification: "Los estudiantes desarrollan pensamiento crítico al comparar. Identifican que sus cultivos son diferentes a los de las imágenes. Comprenden que existen diversas realidades geográficas pero los principios científicos son universales.",
          feedback: "Buena estrategia de conexión entre lo local y lo global. Ayudas a los estudiantes a entender su realidad particular dentro de conceptos más amplios, desarrollando tanto identidad local como comprensión de diversidad geográfica."
        },
        {
          id: 9,
          text: "Cerrar cortinas o pedir que no miren afuera para concentrarse solo en el contenido del libro, evitando distracciones.",
          score: { empathy: 0, assertiveness: 1, inclusivity: -1, conflictManagement: 0 },
          ramification: "Los estudiantes pierden conexión entre el aprendizaje abstracto y su realidad. María, que podría aportar conocimiento sobre plantas locales, permanece callada. Se refuerza la idea de que el conocimiento válido solo está en los libros, desvalorizando el saber local.",
          feedback: "Esta aproximación descontextualizada es menos efectiva en contextos rurales. Desconectar el aprendizaje de la realidad inmediata puede reducir la motivación y perder oportunidades de aprendizaje significativo que aprovecha los recursos naturales disponibles como herramienta pedagógica."
        }
      ]
    }
  ]
};

export const getScenarioByTopicId = (topicId: string): Scenario => {
  const topicConfig = scenarioTopicMap[topicId] || scenarioTopicMap['conflict-management'];

  // Create a deep copy to avoid modifying the original object
  const scenario = JSON.parse(JSON.stringify(defaultScenario));

  // Customize the scenario based on the selected topic
  scenario.id = `static-scenario-${topicId}`;
  scenario.title = topicConfig.title;
  scenario.studentPersona = topicConfig.studentPersona;

  if (scenario.interactions[0]) {
      scenario.interactions[0].title = topicConfig.interactionTitle;
      scenario.interactions[0].context = topicConfig.context;
  }
  
  // Customized options for fostering participation
  if (topicId === 'fostering-participation') {
      scenario.interactions[0].options[0] = {
          id: 1,
          text: "Hacer una pregunta directa a María frente a toda la clase, esperando que responda para integrarla.",
          score: { empathy: 0, assertiveness: 1, inclusivity: 0, conflictManagement: 0 },
          ramification: "María se siente presionada y responde con monosílabos. Su ansiedad aumenta y evita futuras participaciones por temor a ser puesta en evidencia nuevamente. Se refuerza su silencio.",
          feedback: "Exponer a estudiantes tímidos directamente puede ser contraproducente. En contextos rurales donde la timidez y el respeto por la palabra del adulto son marcados, es crucial crear espacios seguros y progresivos para la participación."
      };
      scenario.interactions[0].options[1] = {
          id: 2,
          text: "Reformular la actividad para que todos escriban sus ideas primero, luego invitar a compartir voluntariamente, valorando específicamente el conocimiento agrícola tradicional.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 1 },
          ramification: "María escribe sus ideas con confianza. Al mencionar que valoras el conocimiento sobre cultivos tradicionales, ella levanta la mano. Comparte información valiosa sobre rotación de cultivos que su familia practica. Otros estudiantes la escuchan con respeto.",
          feedback: "¡Excepcional! Has creado un espacio seguro que permite tiempo de procesamiento. Al valorar explícitamente el conocimiento cultural local, legitimas la voz de María y reconoces que el saber comunitario es tan válido como el académico."
      };
      scenario.interactions[0].options[2] = {
          id: 3,
          text: "Organizar la discusión en parejas primero, emparejando estratégicamente a María con un compañero colaborativo, antes de la plenaria grupal.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 1 },
          ramification: "María practica sus ideas en un ambiente menos intimidante. Su compañero la anima. Cuando llega el momento de compartir al grupo, María se ofrece a hablar porque ya ensayó. Gana confianza progresivamente.",
          feedback: "Estrategia pedagógica sólida. La participación escalonada (individual→parejas→grupo pequeño→plenaria) es especialmente efectiva con estudiantes que necesitan ganar confianza. Respeta los diferentes estilos de comunicación y reduce la ansiedad social."
      };
  }

  // Customized options for inclusion and diversity
  if (topicId === 'inclusion-diversity') {
      scenario.interactions[0].options[0] = {
          id: 1,
          text: "Asignar obligatoriamente a Wayra en un grupo, indicando a los estudiantes que deben incluirlo sin mayor explicación.",
          score: { empathy: 0, assertiveness: 1, inclusivity: 0, conflictManagement: 0 },
          ramification: "Los estudiantes incluyen físicamente a Wayra pero no lo integran realmente. Trabajan alrededor de él sin involucrarle. Wayra se siente más aislado aún, estando presente pero invisible. La inclusión superficial no genera pertenencia.",
          feedback: "La inclusión forzada sin trabajo previo de sensibilización raramente funciona. Es fundamental preparar al grupo para valorar la diversidad y entender la riqueza del intercambio cultural antes de formar equipos."
      };
      scenario.interactions[0].options[1] = {
          id: 2,
          text: "Realizar una actividad de valoración de la diversidad cultural donde cada estudiante comparta algo único de su comunidad, comenzando tú con un ejemplo de otra cultura.",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 1 },
          ramification: "Los estudiantes descubren similitudes y diferencias entre culturas. Wayra comparte sobre la cosmovisión asháninka y su relación con la naturaleza. Los demás muestran curiosidad genuina. Se generan preguntas respetuosas. Un compañero nota que ambos respetan la Pachamama/naturaleza, creando un punto de conexión.",
          feedback: "¡Extraordinario enfoque intercultural! Al crear un espacio donde todas las culturas son valoradas equitativamente, transformas la diferencia de barrera a puente. Promover el conocimiento mutuo es la base de la inclusión genuina en contextos multiculturales."
      };
      scenario.interactions[0].options[2] = {
          id: 3,
          text: "Implementar un sistema de 'embajadores culturales' donde estudiantes enseñan palabras o conceptos de su lengua originaria a compañeros, posicionando a Wayra como experto en asháninka.",
          score: { empathy: 2, assertiveness: 2, inclusivity: 2, conflictManagement: 1 },
          ramification: "Wayra enseña palabras en asháninka y se convierte en 'profesor' respetado. Los estudiantes quechuahablantes también enseñan su lengua. Se genera intercambio cultural recíproco. Wayra gana estatus y confianza. Sus compañeros ven su lengua como valiosa, no como barrera.",
          feedback: "¡Pedagogía transformadora! Has convertido lo que era visto como 'déficit' en 'fortaleza'. Al posicionar las lenguas originarias como conocimiento valioso y a los hablantes como expertos, inviertes las dinámicas de poder y construyes inclusión desde el respeto y la valoración mutua."
      };
  }
  
  // For academic topics, customize for photosynthesis
  if (topicId === 'photosynthesis') {
      scenario.interactions[0].options.forEach((opt: any) => {
          opt.score = { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 };
      });
      scenario.interactions[0].options[0].text = "Decir: 'La luz solar es como la comida que las plantas comen directamente.'";
      scenario.interactions[0].options[0].ramification = "Los estudiantes adoptan este concepto erróneo. Aunque la explicación es simple, refuerza una comprensión incorrecta que será difícil corregir después. Carmen repite esto en casa y confunde a su familia.";
      scenario.interactions[0].options[0].feedback = "Concepto erróneo común que sacrifica precisión por simplicidad. Aunque parezca pedagógico, es fundamental desde el inicio distinguir entre energía y materia. La luz es ENERGÍA que la planta usa para FABRICAR su comida (glucosa) a partir de CO₂ y agua.";
      
      scenario.interactions[0].options[1].text = "Explicar: 'Las plantas usan la luz del sol como energía para transformar el aire y el agua en su alimento' relacionándolo con cómo sus cultivos crecen mejor al sol.";
      scenario.interactions[0].options[1].ramification = "Carmen hace la conexión: '¡Por eso la papa crece mejor en la parte soleada de nuestra chacra!' Otros estudiantes relacionan con sus observaciones agrícolas. El concepto se ancla en su experiencia práctica familiar.";
      scenario.interactions[0].options[1].feedback = "¡Excelente! Has conectado el concepto científico con la realidad agrícola de los estudiantes. La fotosíntesis deja de ser abstracta y se vuelve relevante para entender sus actividades cotidianas. Este es aprendizaje situado efectivo.";
      
      scenario.interactions[0].options[2].text = "Usar el ciclo completo: explicar con el huerto escolar cómo la planta toma CO₂ del aire, agua del suelo, usa luz solar como energía y produce glucosa más oxígeno.";
      scenario.interactions[0].options[2].ramification = "Los estudiantes van al huerto a observar. Identifican las partes: hojas captando luz, raíces en tierra húmeda. Comprenden el ciclo completo. Proponen experimentos: comparar crecimiento en sombra vs sol. El aprendizaje se vuelve investigación activa.";
      scenario.interactions[0].options[2].feedback = "¡Pedagogía científica excepcional! Has convertido el aula en laboratorio vivo usando recursos disponibles. Al involucrar observación directa y experimentación, desarrollas pensamiento científico genuino mientras enseñas el concepto. Esto es educación STEM rural de calidad.";
  }

  return scenario;
};