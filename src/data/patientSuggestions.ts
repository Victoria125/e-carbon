/* eslint-disable style/max-len */

import type { PatientSuggestions } from '@/types/patient'
import type { ExamType, FollowUpType } from '@/types/shared'

export interface SuggestionScenario {
  examType: ExamType
  followUpType: FollowUpType
  suggestions: PatientSuggestions[]
}

/**
 * Sistema de Prioridades de Sugestões
 *
 * Prioridade 1 (Alta) - Críticas para saúde e segurança:
 * - Adesão ao tratamento medicamentoso
 * - Alertas de falta de acompanhamento
 * - Cessação de tabagismo
 * - Reforços positivos importantes
 *
 * Prioridade 2 (Média) - Importantes para prevenção e qualidade de vida:
 * - Monitoramento regular
 * - Estilo de vida saudável
 * - Prevenção de complicações
 * - Acompanhamento especializado
 *
 * Prioridade 3 (Baixa) - Informativas e contextuais:
 * - Informações sobre sustentabilidade
 * - Contextos adicionais
 * - Observações gerais
 *
 * Uso:
 *
 * // Obter todas as sugestões (já ordenadas por prioridade)
 * const allSuggestions = getSuggestionsByScenario(examType, followUpType, ...)
 *
 * // Filtrar apenas prioridade 1 (alta)
 * const highPriority = filterSuggestionsByPriority(allSuggestions, 1)
 *
 * // Filtrar prioridades 1 e 2 (alta e média)
 * const important = filterSuggestionsByPriorities(allSuggestions, [1, 2])
 */

// Mapeamento de sugestões por cenário baseado na planilha GERAL_JORNADA_INDIVIDUAL.html
// Estrutura das colunas:
// - Hipertensão: Convencional (sem/anual/semestral), POC (sem/anual/semestral)
// - Diabetes: Convencional (sem/anual/semestral), POC (sem/anual/semestral)
// - Sobrepeso: Convencional (sem/anual/semestral), POC (sem/anual/semestral)
// - Lombalgia: Convencional (sem/anual/semestral), POC (sem/anual/semestral)

// Mapeamento de prioridades para cada sugestão
// Prioridade 1 = Muito Alta (críticas, segurança, adesão ao tratamento)
// Prioridade 2 = Alta (importantes, estilo de vida, prevenção)
// Prioridade 3 = Média (informativas, contextuais)
// Prioridade 4 = Baixa
const SUGGESTION_PRIORITY: Record<number, number> = {
  1: 3, // Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.
  2: 3, // Faça uso do medicamento conforme prescrição médica
  3: 4, // Tente verificar sua pressão com frequência
  4: 2, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
  5: 2, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
  6: 4, // Busque sempre por alimentação saudável e praticar atividade física
  7: 4, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
  8: 4, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  9: 4, // Tente verificar sua glicemia pelo menos duas vezes no dia
  10: 4, // Se você toma insulina, fique alternando o local de aplicação
  11: 4, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
  12: 4, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
  13: 4, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
  14: 4, // Busque ajuda especializada, para lhe ajudar na perda de peso de forma saudável
  15: 4, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
  16: 4, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
  17: 4, // Mantenha seu peso adequado
  18: 3, // Acompanhamento correto para paciente compensado (com medidas da pressão dentro dos limites)
  19: 3, // Acompanhamento correto para paciente compensado (com medidas da glicemia dentro dos limites)
  20: 3, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)
  21: 3, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da glicemia dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da glicemia fora dos limites)
  22: 1, // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  23: 3, // Faça uso do medicamento conforme prescrição médica, se prescrito
  24: 3, // Realize acompanhamento pelo menos uma vez no ano.
  25: 3, // Acompanhamento correto
  26: 4 // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
}

// Mapeamento de ícones para cada sugestão
// Adicione os caminhos dos seus ícones aqui
const SUGGESTION_ICONS: Record<number, string> = {
  1: '',
  2: 'ui/suggestions/icon-sos.png',
  3: 'ui/suggestions/icon-pressure.png',
  4: 'ui/suggestions/icon-peace.png',
  5: 'ui/suggestions/icon-peace.png',
  6: 'ui/suggestions/icon-heart.png',
  7: 'ui/suggestions/icon-heart.png',
  8: 'ui/suggestions/icon-heart-pressure.png',
  9: 'ui/suggestions/icon-glucose.png',
  10: 'ui/suggestions/icon-injection.png',
  11: 'ui/suggestions/icon-doctor.png',
  12: 'ui/suggestions/icon-drop.png',
  13: 'ui/suggestions/icon-heart.png',
  14: 'ui/suggestions/icon-doctor.png',
  15: 'ui/suggestions/icon-doctor.png',
  16: 'ui/suggestions/icon-axis.png',
  17: 'ui/suggestions/icon-axis.png',
  18: 'ui/suggestions/icon-heart.png',
  19: 'ui/suggestions/icon-heart.png',
  20: 'ui/suggestions/icon-warning-2.png',
  21: 'ui/suggestions/icon-warning-2.png',
  22: 'ui/suggestions/icon-warning-2.png',
  23: 'ui/suggestions/icon-sos.png',
  24: 'ui/suggestions/icon-warning-2.png',
  25: 'ui/suggestions/icon-heart.png',
  26: 'ui/suggestions/icon-heart-pressure.png'
}

// Referência rápida dos IDs (frases completas do translations.ts):
//  1 = "Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde."
//  2 = "Faça uso do medicamento conforme prescrição médica"
//  3 = "Tente verificar sua pressão com frequência"
//  4 = "Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas."
//  5 = "Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas."
//  6 = "Busque sempre por alimentação saudável e praticar atividade física"
//  7 = "Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário."
//  8 = "Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle."
//  9 = "Tente verificar sua glicemia pelo menos duas vezes no dia"
// 10 = "Se você toma insulina, fique alternando o local de aplicação"
// 11 = "Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano"
// 12 = "Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético"
// 13 = "Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle."
// 14 = "Busque ajuda especializada, para lhe ajudar na perda de peso de forma saudável"
// 15 = "Busque ajuda especializada para lhe ajudar nessa condição de saúde"
// 16 = "Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos"
// 17 = "Mantenha seu peso adequado"
// 18 = "Acompanhamento correto para paciente compensado (com medidas da pressão dentro dos limites)"
// 19 = "Acompanhamento correto para paciente compensado (com medidas da glicemia dentro dos limites)"
// 20 = "Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)"
// 21 = "Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da glicemia dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da glicemia fora dos limites)"
// 22 = "Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!"
// 23 = "Faça uso do medicamento conforme prescrição médica, se prescrito"
// 24 = "Realize acompanhamento pelo menos uma vez no ano."
// 25 = "Acompanhamento correto"
// 26 = "Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde."

const SUGGESTION_MAP: Record<string, number[]> = {
  // HIPERTENSÃO
  'hypertension-conventional-none': [
    20, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'hypertension-conventional-annual': [
    18, // Acompanhamento correto para paciente compensado (com medidas da pressão dentro dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'hypertension-conventional-semiannual': [
    1, // Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'hypertension-pointOfCare-none': [
    20, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'hypertension-pointOfCare-annual': [
    18, // Acompanhamento correto para paciente compensado (com medidas da pressão dentro dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'hypertension-pointOfCare-semiannual': [
    1, // Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.
    2, // Faça uso do medicamento conforme prescrição médica
    3, // Tente verificar sua pressão com frequência
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],

  // DIABETES
  'diabetes-conventional-none': [
    21, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da glicemia dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da glicemia fora dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'diabetes-conventional-annual': [
    19, // Acompanhamento correto para paciente compensado (com medidas da glicemia dentro dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'diabetes-conventional-semiannual': [
    1, // Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'diabetes-pointOfCare-none': [
    21, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da glicemia dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da glicemia fora dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'diabetes-pointOfCare-annual': [
    19, // Acompanhamento correto para paciente compensado (com medidas da glicemia dentro dos limites)
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'diabetes-pointOfCare-semiannual': [
    1, // Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.
    2, // Faça uso do medicamento conforme prescrição médica
    9, // Tente verificar sua glicemia pelo menos duas vezes no dia
    10, // Se você toma insulina, fique alternando o local de aplicação
    11, // Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano
    12, // Tenha cuidado com seus pés, mantenha-o hidratado para prevenir pé diabético
    13, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],

  // SOBREPESO/OBESIDADE
  'overweight-conventional-none': [
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'overweight-conventional-annual': [
    20, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'overweight-conventional-semiannual': [
    14, // Busque ajuda especializada, para lhe ajudar na perda de peso de forma saudável
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'overweight-pointOfCare-none': [
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'overweight-pointOfCare-annual': [
    20, // Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'overweight-pointOfCare-semiannual': [
    14, // Busque ajuda especializada, para lhe ajudar na perda de peso de forma saudável
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8, // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],

  // LOMBALGIA
  'lowerBackPain-conventional-none': [
    15, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
    23, // Faça uso do medicamento conforme prescrição médica, se prescrito
    16, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
    17, // Mantenha seu peso adequado
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8 // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  ],
  'lowerBackPain-conventional-annual': [
    15, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
    16, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
    17, // Mantenha seu peso adequado
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8 // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  ],
  'lowerBackPain-conventional-semiannual': [
    15, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
    16, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
    17, // Mantenha seu peso adequado
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8 // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  ],
  'lowerBackPain-pointOfCare-none': [],
  'lowerBackPain-pointOfCare-annual': [
    15, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
    16, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
    17, // Mantenha seu peso adequado
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8 // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  ],
  'lowerBackPain-pointOfCare-semiannual': [
    15, // Busque ajuda especializada para lhe ajudar nessa condição de saúde
    16, // Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos
    17, // Mantenha seu peso adequado
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    8 // Evite consumir bebidas alcóolicas, ela aumenta a pressão, dificultando o bom controle.
  ],

  // SEM CONDIÇÕES CRÔNICAS - SEM DIAGNÓSTICO
  'noChronicConditions-conventional-none': [
    24, // Realize acompanhamento pelo menos uma vez no ano.
    2, // Faça uso do medicamento conforme prescrição médica
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'noChronicConditions-conventional-annual': [
    25, // Acompanhamento correto
    2, // Faça uso do medicamento conforme prescrição médica
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'noChronicConditions-conventional-semiannual': [
    25, // Acompanhamento correto
    2, // Faça uso do medicamento conforme prescrição médica
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'noChronicConditions-pointOfCare-none': [
    24, // Realize acompanhamento pelo menos uma vez no ano.
    2, // Faça uso do medicamento conforme prescrição médica
    4, // Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'noChronicConditions-pointOfCare-annual': [
    25, // Acompanhamento correto
    2, // Faça uso do medicamento conforme prescrição médica
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ],
  'noChronicConditions-pointOfCare-semiannual': [
    25, // Acompanhamento correto
    2, // Faça uso do medicamento conforme prescrição médica
    5, // Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.
    6, // Busque sempre por alimentação saudável e praticar atividade física
    7, // Mesmo sendo muito difícil cessar o habito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.
    26, // Evite consumir bebidas alcóolicas, pois elas estão associadas a diversos problemas de saúde.
    22 // Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!
  ]
}

// Helper: Adiciona sugestões de uma condição ao Set
function addSuggestionsForCondition(
  conditionName: string,
  examType: ExamType,
  followUpType: FollowUpType,
  suggestionSet: Set<number>
) {
  const key = `${conditionName}-${examType}-${followUpType}`
  const numbers = SUGGESTION_MAP[key] || []
  for (const num of numbers) {
    suggestionSet.add(num)
  }
}

// Helper: Cria objeto de sugestão a partir do número
function createSuggestionObject(num: number): PatientSuggestions {
  const suggestionKey = `suggestion${String(num).padStart(2, '0')}`
  const baseSuggestion: PatientSuggestions = {
    pretitle: '',
    title: '',
    reduction: '',
    description: '',
    translationKey: suggestionKey,
    titleKey: `suggestions.${suggestionKey}.title`,
    descriptionKey: `suggestions.${suggestionKey}.description`,
    iconPath: SUGGESTION_ICONS[num] || 'ui/suggestions/icon-robot.png',
    priority: SUGGESTION_PRIORITY[num] || 2 // Default: prioridade média
  }

  // Apenas suggestion22 tem subDescription (célula laranja na planilha)
  if (num === 22) {
    baseSuggestion.subDescriptionKey = `suggestions.${suggestionKey}.subDescription`
  }

  return baseSuggestion
}

// Função para obter sugestões por cenário
export function getSuggestionsByScenario(
  examType: ExamType,
  followUpType: FollowUpType,
  _pocReductionPercent: number,
  _followUpReductionPercent: number,
  conditions?: { hypertension?: boolean, diabetes?: boolean, overweight?: boolean, lowerBackPain?: boolean, noChronicConditions: boolean },
  _language: string = 'br'
): PatientSuggestions[] {
  // Coletar sugestões de TODAS as condições ativas (sem duplicatas)
  const allSuggestionNumbers = new Set<number>()

  if (conditions) {
    if (conditions.diabetes) {
      addSuggestionsForCondition('diabetes', examType, followUpType, allSuggestionNumbers)
    }
    if (conditions.hypertension) {
      addSuggestionsForCondition('hypertension', examType, followUpType, allSuggestionNumbers)
    }
    if (conditions.overweight) {
      addSuggestionsForCondition('overweight', examType, followUpType, allSuggestionNumbers)
    }
    if (conditions.lowerBackPain) {
      addSuggestionsForCondition('lowerBackPain', examType, followUpType, allSuggestionNumbers)
    }
    if (conditions.noChronicConditions) {
      addSuggestionsForCondition('noChronicConditions', examType, followUpType, allSuggestionNumbers)
    }
  }

  // Se nenhuma condição foi selecionada, usar hipertensão como padrão
  if (allSuggestionNumbers.size === 0) {
    addSuggestionsForCondition('hypertension', examType, followUpType, allSuggestionNumbers)
  }

  // Converter Set para array e ordenar pelos números originais (mais eficiente)
  // Depois criar objetos já na ordem correta
  const sortedNumbers = Array.from(allSuggestionNumbers).sort((a, b) => {
    // Ordena por prioridade primeiro
    const priorityA = SUGGESTION_PRIORITY[a] || 2
    const priorityB = SUGGESTION_PRIORITY[b] || 2

    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }

    // Se mesma prioridade, ordena por número (já são números!)
    return a - b
  })

  // Agora cria os objetos já na ordem final
  return sortedNumbers.map((num) => createSuggestionObject(num))
}

// Função auxiliar: filtra sugestões por prioridade específica
export function filterSuggestionsByPriority(
  suggestions: PatientSuggestions[],
  priority: number
): PatientSuggestions[] {
  return suggestions.filter((suggestion) => suggestion.priority === priority)
}

// Função auxiliar: filtra sugestões por prioridades (array)
export function filterSuggestionsByPriorities(
  suggestions: PatientSuggestions[],
  priorities: number[]
): PatientSuggestions[] {
  return suggestions.filter((suggestion) => priorities.includes(suggestion.priority))
}

export function getSuggestions(): PatientSuggestions[] {
  return []
}
