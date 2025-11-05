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
    // update: Transformado a formato alumno-docente con preguntas específicas de estudiantes virtuales
    'photosynthesis': {
        title: "Fotosíntesis",
        studentPersona: "Los estudiantes muestran curiosidad sobre por qué las plantas del huerto escolar crecen mejor en ciertas áreas. Tienes la oportunidad de explicar la fotosíntesis usando elementos del entorno inmediato: las plantas del huerto, la luz que entra por la ventana, y los cultivos que las familias mantienen.",
        interactionTitle: "Pregunta de Carmen sobre fotosíntesis",
        context: "Carmen levanta la mano y pregunta: 'Profe, ¿qué proceso permite que las plantas fabriquen su alimento?'"
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
      title: 'Pregunta sobre la Pizarra',
      // update: Transformado a formato alumno-docente - pregunta de estudiante sobre uso de la pizarra
      context: 'María levanta la mano y pregunta: "Profe, ¿podemos usar la pizarra para dibujar cómo crecen nuestras plantas?"',
      options: [
        {
          id: 4,
          // update: Respuesta correcta - organizar pizarra visualmente para aprendizaje multigrado
          text: "Responder: '¡Excelente idea! Organizaremos la pizarra en secciones para que cada grado dibuje su parte del proceso. Usaremos colores para diferenciar cada etapa.'",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 0 },
          ramification: "Los estudiantes de diferentes grados pueden identificar fácilmente su sección. Los dibujos ayudan a estudiantes con dificultades de lectura. Las familias que visitan el aula pueden entender visualmente el trabajo realizado. María se siente valorada.",
          feedback: "✅ Excelente adaptación a la realidad multigrado. La organización visual y uso de dibujos es especialmente efectiva en contextos donde los estudiantes tienen distintos niveles de dominio del castellano o están en proceso de alfabetización."
        },
        {
          id: 5,
          // update: Respuesta parcialmente correcta - buena idea pero falta estructura
          text: "Responder: 'Sí, dibujen todos juntos en la pizarra, cada uno agregue lo que sabe.'",
          score: { empathy: 1, assertiveness: 0, inclusivity: 1, conflictManagement: 0 },
          ramification: "Los estudiantes comienzan a dibujar pero sin organización. Se superponen dibujos. Los más pequeños no alcanzan. Algunos estudiantes dominan el espacio. La actividad se vuelve caótica aunque participativa.",
          feedback: "⚠️ Buena intención de participación pero falta estructura. En aulas multigrado necesitas organizar el espacio y los turnos. Considera: asignar secciones, establecer turnos por grado, o invitar a estudiantes mayores a ayudar a los menores."
        },
        {
          id: 6,
          // update: Respuesta incorrecta - rechazar la creatividad del estudiante
          text: "Responder: 'No, mejor copien del libro. La pizarra es solo para lo que yo escribo.'",
          score: { empathy: -1, assertiveness: 1, inclusivity: -1, conflictManagement: 0 },
          ramification: "María se desanima y guarda silencio. Los estudiantes pierden interés en la actividad. Se refuerza la idea de que solo el profesor tiene el conocimiento válido. La creatividad estudiantil se desalienta.",
          feedback: "❌ Respuesta autoritaria que desvaloriza la iniciativa estudiantil. En contextos rurales donde la creatividad y el conocimiento local son valiosos, cerrar oportunidades de expresión visual limita el aprendizaje y reduce la participación."
        }
      ]
    },
    {
      id: 'window',
      title: 'Pregunta sobre el Entorno Natural',
      // update: Transformado a formato alumno-docente - pregunta de estudiante sobre cultura local y entorno
      context: 'Wayra observa por la ventana y pregunta: "Profe, ¿por qué aprendemos sobre plantas del libro si afuera tenemos las nuestras? ¿Por qué no usamos lo que vemos?"',
      options: [
        {
          id: 7,
          // update: Respuesta correcta - valorar conocimiento local y conectarlo con el curricular
          text: "Responder: 'Tienes razón, Wayra. Vamos a observar las plantas afuera primero. Luego compararemos con el libro para ver qué tenemos en común y qué es diferente. Tu conocimiento local es muy valioso.'",
          score: { empathy: 2, assertiveness: 1, inclusivity: 2, conflictManagement: 0 },
          ramification: "Los estudiantes comparten conocimientos de sus familias sobre señales naturales. Carmen explica cómo su abuelo predice lluvias. Wayra comparte nombres de plantas en asháninka. Otros aportan saberes locales. El aprendizaje se vuelve bidireccional y culturalmente relevante.",
          feedback: "✅ ¡Excepcional! Has practicado pedagogía situada. Al validar el conocimiento local y familiar, fortaleces la identidad cultural, aumentas la relevancia del aprendizaje y construyes puentes entre el saber comunitario y el curricular formal."
        },
        {
          id: 8,
          // update: Respuesta parcialmente correcta - buena idea pero falta valoración explícita
          text: "Responder: 'Buen punto. Podemos usar lo de afuera también, pero el libro tiene información científica que debemos aprender.'",
          score: { empathy: 1, assertiveness: 1, inclusivity: 1, conflictManagement: 0 },
          ramification: "Los estudiantes desarrollan pensamiento crítico al comparar. Identifican que sus cultivos son diferentes a los de las imágenes. Comprenden que existen diversas realidades geográficas pero los principios científicos son universales. Sin embargo, algunos sienten que su conocimiento local es menos importante.",
          feedback: "⚠️ Buena estrategia de conexión pero falta equilibrio. Al decir 'debemos aprender' del libro primero, implícitamente jerarquizas el conocimiento formal sobre el local. Mejora: 'Ambos son importantes. El libro nos da conceptos científicos, y lo que tú conoces nos da ejemplos reales de nuestra comunidad.'"
        },
        {
          id: 9,
          // update: Respuesta incorrecta - desvalorizar el conocimiento local
          text: "Responder: 'El libro tiene la información correcta y científica. Lo de afuera es solo lo que ven tus familias, pero necesitamos aprender lo oficial.'",
          score: { empathy: 0, assertiveness: 1, inclusivity: -1, conflictManagement: 0 },
          ramification: "Los estudiantes pierden conexión entre el aprendizaje abstracto y su realidad. Wayra se calla, sintiendo que su conocimiento familiar no vale. María, que podría aportar conocimiento sobre plantas locales, permanece callada. Se refuerza la idea de que el conocimiento válido solo está en los libros, desvalorizando el saber local.",
          feedback: "❌ Esta aproximación descontextualizada y desvalorizadora es muy perjudicial en contextos rurales. Desconectar el aprendizaje de la realidad inmediata reduce la motivación, pierde oportunidades de aprendizaje significativo y puede dañar la autoestima de estudiantes que poseen conocimiento cultural valioso."
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
  
  // update: Transformado a formato alumno-docente - pregunta incorrecta de estudiante sobre fotosíntesis
  if (topicId === 'photosynthesis') {
      // update: Agregar hotspot adicional solo para fotosíntesis con pregunta incorrecta de estudiante
      scenario.hotspots.push({ id: 'student-question', pitch: -10, yaw: 30, text: 'Pregunta de Luis' });
      
      // update: Agregar interacción adicional con pregunta incorrecta de estudiante
      scenario.interactions.push({
        id: 'student-question',
        title: 'Pregunta incorrecta de estudiante',
        context: 'Luis pregunta con confusión: "Profe, ¿la fotosíntesis es cuando las plantas respiran oxígeno como nosotros?"',
        options: [
          {
            id: 10,
            // update: Respuesta correcta del docente - corregir concepto erróneo con claridad
            text: "Responder: 'No, Luis. Las plantas durante la fotosíntesis PRODUCEN oxígeno, no lo respiran. Es como cuando tu mamá cocina: ella hace la comida, no la come en ese momento. Las plantas fabrican su alimento y liberan oxígeno.'",
            score: { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 },
            ramification: "Luis comprende la diferencia. Otros estudiantes también aclaran sus dudas. Carmen agrega: 'Entonces las plantas son como una fábrica de comida y aire.' La analogía ayuda a todos a entender mejor.",
            feedback: "✅ Excelente corrección pedagógica. Has usado una analogía familiar (cocinar) que conecta con la experiencia del estudiante. Corregir errores conceptuales con claridad y respeto es fundamental para el aprendizaje científico."
          },
          {
            id: 11,
            // update: Respuesta parcialmente correcta - correcta pero falta precisión
            text: "Responder: 'Casi, pero no exactamente. Las plantas también respiran, pero la fotosíntesis es diferente.'",
            score: { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 },
            ramification: "Luis sigue confundido. Otros estudiantes también muestran duda. La respuesta no aclara completamente la diferencia entre respiración y fotosíntesis. Las preguntas continúan.",
            feedback: "⚠️ Respuesta parcialmente correcta pero incompleta. Reconoces que hay diferencia pero no la explicas claramente. Los estudiantes necesitan entender que: fotosíntesis = producir alimento y oxígeno (día), respiración = usar alimento y consumir oxígeno (día y noche)."
          },
          {
            id: 12,
            // update: Respuesta incorrecta del docente - confirma el error del estudiante
            text: "Responder: 'Sí, exactamente. Las plantas respiran oxígeno igual que nosotros.'",
            score: { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 },
            ramification: "Todos los estudiantes adoptan este concepto erróneo. La confusión se propaga. Otros estudiantes repiten esta información incorrecta a sus familias. El error conceptual se refuerza en toda la clase.",
            feedback: "❌ Respuesta completamente incorrecta que refuerza el error conceptual. Las plantas SÍ respiran oxígeno, pero eso es diferente de la fotosíntesis. La fotosíntesis produce oxígeno. Es crucial distinguir entre estos dos procesos para evitar confusión."
          }
        ]
      });
      
      scenario.interactions[0].options.forEach((opt: any) => {
          opt.score = { empathy: 0, assertiveness: 0, inclusivity: 0, conflictManagement: 0 };
      });
      // update: Respuesta incorrecta del docente - concepto erróneo simplificado
      scenario.interactions[0].options[0].text = "Responder: 'Las plantas comen directamente la luz solar como su alimento.'";
      scenario.interactions[0].options[0].ramification = "Los estudiantes adoptan este concepto erróneo. Aunque la explicación es simple, refuerza una comprensión incorrecta que será difícil corregir después. Carmen repite esto en casa y confunde a su familia.";
      scenario.interactions[0].options[0].feedback = "❌ Concepto erróneo común que sacrifica precisión por simplicidad. Aunque parezca pedagógico, es fundamental desde el inicio distinguir entre energía y materia. La luz es ENERGÍA que la planta usa para FABRICAR su comida (glucosa) a partir de CO₂ y agua.";
      
      // update: Respuesta parcialmente correcta - correcta pero incompleta
      scenario.interactions[0].options[1].text = "Responder: 'Absorben dióxido de carbono y lo convierten en oxígeno para nosotros respirar.'";
      scenario.interactions[0].options[1].ramification = "Los estudiantes entienden parcialmente el proceso pero se enfocan solo en el oxígeno. Luis pregunta: '¿Entonces las plantas solo producen oxígeno?' Falta explicar que también producen su alimento. La comprensión queda incompleta.";
      scenario.interactions[0].options[1].feedback = "⚠️ Respuesta parcialmente correcta. Has mencionado un producto de la fotosíntesis (oxígeno) pero falta explicar que el propósito principal es fabricar alimento (glucosa) para la planta. Completar con: 'y también fabrican su propio alimento usando esa energía.'";
      
      // update: Respuesta correcta del docente - concepto completo y preciso
      scenario.interactions[0].options[2].text = "Responder: 'Transforman la luz solar en energía para producir su alimento. La planta toma CO₂ del aire, agua del suelo y usa la luz como energía para fabricar glucosa (su comida) y liberar oxígeno.'";
      scenario.interactions[0].options[2].ramification = "Carmen hace la conexión: '¡Por eso la papa crece mejor en la parte soleada de nuestra chacra!' Otros estudiantes relacionan con sus observaciones agrícolas. El concepto se ancla en su experiencia práctica familiar. Comprenden el proceso completo.";
      scenario.interactions[0].options[2].feedback = "✅ ¡Excelente! Has dado una explicación completa y precisa. Has conectado el concepto científico con la realidad agrícola de los estudiantes. La fotosíntesis deja de ser abstracta y se vuelve relevante para entender sus actividades cotidianas. Este es aprendizaje situado efectivo.";
  }

  return scenario;
};