/* eslint-disable style/max-len */

import type { ExamType, FollowUpType } from '@/types/shared'

export interface PopulationSuggestion {
  translationKey: string
  titleKey?: string
  descriptionKey: string
  subDescriptionKey?: string
  iconPath: string
  priority: number
}

/**
 * Sistema de Recomendações para Jornada Coletiva
 * Baseado em GERAL_JORNADA_COLETIVA.html
 *
 * Estrutura similar à jornada individual, mas adaptado para contexto populacional
 */

// Mapeamento de prioridades para cada sugestão
// Prioridade 1 = Muito Alta (críticas, segurança, adesão ao tratamento)
// Prioridade 2 = Alta (importantes, estilo de vida, prevenção)
// Prioridade 3 = Média (informativas, contextuais)
// Prioridade 4 = Baixa
const SUGGESTION_PRIORITY: Record<number, number> = {
  1: 1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
  2: 1, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
  3: 2, // Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.
  4: 3, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
  5: 3, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
  6: 2, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
  7: 2, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
  8: 2, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  9: 2, // Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.
  10: 2, // Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.
  11: 2, // Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.
  12: 2, // Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.
  13: 2, // Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.
  14: 2, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
  15: 2, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
  16: 2, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
  17: 2, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
  18: 1, // Sua pressão está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar problemas.
  19: 1, // Sua glicemia está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar complicações.
  20: 2, // Recomende sua equipe a reduzir bebidas alcoólicas, elas podem aumentar a pressão e alterar a glicemia, tornando o controle da saúde mais difícil. Pequenos cuidados fazem grande diferença.
  21: 3, // Lembre sua equipe: se a pressão estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
  22: 3, // Lembre sua equipe: se a glicemia estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
  23: 4, // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  24: 3, // Estimule sua equipe a realizar acompanhamento de rotina pelo menos uma vez ao ano. Manter a prevenção em dia é fundamental para a saúde.
  25: 2 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
}

// Mapeamento de ícones
const SUGGESTION_ICONS: Record<number, string> = {
  1: 'ui/suggestions/icon-heart.png',
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
  13: 'ui/suggestions/icon-doctor.png',
  14: 'ui/suggestions/icon-sos.png',
  15: 'ui/suggestions/icon-doctor.png',
  16: 'ui/suggestions/icon-axis.png',
  17: 'ui/suggestions/icon-axis.png',
  18: 'ui/suggestions/icon-heart.png',
  19: 'ui/suggestions/icon-heart.png',
  20: 'ui/suggestions/icon-heart-pressure.png',
  21: 'ui/suggestions/icon-warning-2.png',
  22: 'ui/suggestions/icon-warning-2.png',
  23: 'ui/suggestions/icon-warning-2.png',
  24: 'ui/suggestions/icon-warning-2.png',
  25: 'ui/suggestions/icon-heart-pressure.png'
}

// Referência rápida dos IDs (frases completas do translations.ts - populationSuggestions):
//  1 = "Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva."
//  2 = "Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde."
//  3 = "Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros."
//  4 = "Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos."
//  5 = "Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos."
//  6 = "Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde."
//  7 = "Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde."
//  8 = "Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos."
//  9 = "Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações."
// 10 = "Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento."
// 11 = "Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros."
// 12 = "Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético."
// 13 = "Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar."
// 14 = "Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle."
// 15 = "Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo."
// 16 = "Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos."
// 17 = "Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos."
// 18 = "Sua pressão está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar problemas."
// 19 = "Sua glicemia está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar complicações."
// 20 = "Recomende sua equipe a reduzir bebidas alcoólicas, elas podem aumentar a pressão e alterar a glicemia, tornando o controle da saúde mais difícil. Pequenos cuidados fazem grande diferença."
// 21 = "Lembre sua equipe: se a pressão estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos."
// 22 = "Lembre sua equipe: se a glicemia estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos."
// 23 = "Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde."
// 24 = "Estimule sua equipe a realizar acompanhamento de rotina pelo menos uma vez ao ano. Manter a prevenção em dia é fundamental para a saúde."
// 25 = "Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida."

// Mapeamento de cenários (condition-examType-followUpType)
const SUGGESTION_MAP: Record<string, number[]> = {
  // HIPERTENSÃO
  'hypertension-conventional-none': [
    21, // Lembre sua equipe: se a pressão estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'hypertension-conventional-annual': [
    18, // Sua pressão está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar problemas.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    3, // Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'hypertension-conventional-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    3, // Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'hypertension-pointOfCare-none': [
    21, // Lembre sua equipe: se a pressão estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'hypertension-pointOfCare-annual': [
    18, // Sua pressão está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar problemas.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    3, // Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'hypertension-pointOfCare-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    3, // Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],

  // DIABETES
  'diabetes-conventional-none': [
    22, // Lembre sua equipe: se a glicemia estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'diabetes-conventional-annual': [
    19, // Sua glicemia está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar complicações.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    9, // Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.
    10, // Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.
    11, // Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.
    12, // Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    20, // Recomende sua equipe a reduzir bebidas alcoólicas, elas podem aumentar a pressão e alterar a glicemia, tornando o controle da saúde mais difícil. Pequenos cuidados fazem grande diferença.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'diabetes-conventional-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    9, // Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.
    10, // Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.
    11, // Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.
    12, // Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'diabetes-pointOfCare-none': [
    22, // Lembre sua equipe: se a glicemia estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'diabetes-pointOfCare-annual': [
    19, // Sua glicemia está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar complicações.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    9, // Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.
    10, // Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.
    11, // Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.
    12, // Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    20, // Recomende sua equipe a reduzir bebidas alcoólicas, elas podem aumentar a pressão e alterar a glicemia, tornando o controle da saúde mais difícil. Pequenos cuidados fazem grande diferença.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'diabetes-pointOfCare-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    9, // Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.
    10, // Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.
    11, // Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.
    12, // Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],

  // SOBREPESO/OBESIDADE
  'overweight-conventional-none': [
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'overweight-conventional-annual': [
    13, // Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'overweight-conventional-semiannual': [
    13, // Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'overweight-pointOfCare-none': [
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'overweight-pointOfCare-annual': [
    13, // Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'overweight-pointOfCare-semiannual': [
    13, // Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],

  // LOMBALGIA
  'lowerBackPain-conventional-none': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],
  'lowerBackPain-conventional-annual': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],
  'lowerBackPain-conventional-semiannual': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],
  'lowerBackPain-pointOfCare-none': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],
  'lowerBackPain-pointOfCare-annual': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],
  'lowerBackPain-pointOfCare-semiannual': [
    15, // Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.
    16, // Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.
    17, // Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.
    14, // Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    8 // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.
  ],

  // SEM CONDIÇÕES CRÔNICAS - SEM DIAGNÓSTICO
  'noChronicConditions-conventional-none': [
    24, // Estimule sua equipe a realizar acompanhamento de rotina pelo menos uma vez ao ano. Manter a prevenção em dia é fundamental para a saúde.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'noChronicConditions-conventional-annual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'noChronicConditions-conventional-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    4, // Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'noChronicConditions-pointOfCare-none': [
    24, // Estimule sua equipe a realizar acompanhamento de rotina pelo menos uma vez ao ano. Manter a prevenção em dia é fundamental para a saúde.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'noChronicConditions-pointOfCare-annual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
  ],
  'noChronicConditions-pointOfCare-semiannual': [
    1, // Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.
    2, // Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.
    5, // Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.
    6, // Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.
    7, // Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.
    25, // Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.
    23 // Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.
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
function createSuggestionObject(num: number): PopulationSuggestion {
  const suggestionKey = `populationSuggestion${String(num).padStart(2, '0')}`
  const baseSuggestion: PopulationSuggestion = {
    translationKey: suggestionKey,
    titleKey: `populationSuggestions.${suggestionKey}.title`,
    descriptionKey: `populationSuggestions.${suggestionKey}.description`,
    iconPath: SUGGESTION_ICONS[num] || 'ui/suggestions/icon-robot.png',
    priority: SUGGESTION_PRIORITY[num] || 2
  }

  // Sugestão 23 tem subDescription (célula laranja na planilha)
  if (num === 23) {
    baseSuggestion.subDescriptionKey = `populationSuggestions.${suggestionKey}.subDescription`
  }

  return baseSuggestion
}

/**
 * Obtém sugestões para a jornada coletiva baseado nas condições, tipo de exame e distribuição de follow-up
 */
export function getPopulationSuggestions(
  conditions: { hypertension?: number, diabetes?: number, overweight?: number, lowerBackPain?: number },
  examType: ExamType,
  followUpDistribution: Record<string, { none: number, annual: number, semiannual: number }>
): PopulationSuggestion[] {
  const allSuggestionNumbers = new Set<number>()

  // Para cada condição ativa, incluir sugestões de TODOS os follow-ups que têm pessoas
  const activeConditions = Object.entries(conditions).filter(([_, count]) => count && count > 0)

  for (const [condition, count] of activeConditions) {
    if (!count) continue

    const distribution = followUpDistribution[condition]
    if (!distribution) continue

    // Incluir sugestões de TODOS os tipos de follow-up que têm pessoas (> 0%)
    if (distribution.none > 0) {
      addSuggestionsForCondition(condition, examType, 'none', allSuggestionNumbers)
    }
    if (distribution.annual > 0) {
      addSuggestionsForCondition(condition, examType, 'annual', allSuggestionNumbers)
    }
    if (distribution.semiannual > 0) {
      addSuggestionsForCondition(condition, examType, 'semiannual', allSuggestionNumbers)
    }
  }

  // Se nenhuma condição, usar hipertensão como padrão
  if (allSuggestionNumbers.size === 0) {
    addSuggestionsForCondition('hypertension', examType, 'annual', allSuggestionNumbers)
  }

  // Converter e ordenar por prioridade, depois por número
  const sortedNumbers = Array.from(allSuggestionNumbers).sort((a, b) => {
    const priorityA = SUGGESTION_PRIORITY[a] || 2
    const priorityB = SUGGESTION_PRIORITY[b] || 2

    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }

    return a - b
  })

  return sortedNumbers.map((num) => createSuggestionObject(num))
}

// Funções auxiliares para filtrar por prioridade
export function filterPopulationSuggestionsByPriority(
  suggestions: PopulationSuggestion[],
  priority: number
): PopulationSuggestion[] {
  return suggestions.filter((suggestion) => suggestion.priority === priority)
}

export function filterPopulationSuggestionsByPriorities(
  suggestions: PopulationSuggestion[],
  priorities: number[]
): PopulationSuggestion[] {
  return suggestions.filter((suggestion) => priorities.includes(suggestion.priority))
}
