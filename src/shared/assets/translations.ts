/**
 * Sistema de Traduções Multi-idioma
 *
 * Estrutura: TRANSLATIONS[idioma][categoria][subcategoria]
 *
 * Idiomas disponíveis:
 * - br: Português (Brasil) - COMPLETO
 * - en: English - COMPLETO
 * - es: Español - COMPLETO
 * - cn: 中文 (Chinese) - COMPLETO
 *
 * Para adicionar novos idiomas:
 * 1. Adicione a estrutura completa seguindo o padrão de 'br'
 * 2. Inclua TODAS as categorias: nav, category, table, step1-step4, suggestions, populationSuggestions, etc.
 * 3. Mantenha as mesmas chaves (keys) em todos os idiomas
 *
 * Exemplo para adicionar populationSuggestions em inglês:
 * en: {
 *   ...
 *   populationSuggestions: {
 *     populationSuggestion01: {
 *       title: 'COLLECTIVE SELF-CARE',
 *       description: 'Excellent! By following up, everyone will be taking...'
 *     },
 *     ...
 *   }
 * }
 */
const TRANSLATIONS = {
  br: {
    conventional: 'Convencional',
    pointOfCare: 'Point of Care',
    nav: {
      populationSimulator: 'Jornada Coletiva',
      patientJourney: 'Jornada Individual',
      changeLanguage: 'Alterar idioma',
      clearAll: 'Limpar tudo',
      clearAllTooltip: 'Limpar todos os dados',
      previous: 'Anterior',
      next: 'Próximo',
      last: 'Finalizar Simulação',
      viewResults: 'Ver Resultados',
      calculateResults: 'Calcular Resultados',
      processing: 'Processando...'
    },
    category: {
      material: 'Material',
      service: 'Serviço'
    },
    products: {
      vacutainer: 'Tubos de coleta a vácuo (vacutainer)',
      needle: 'Agulhas descartáveis',
      lancet: 'Lancetas',
      syringe: 'Seringas descartáveis',
      alcohol: 'Álcool 70%',
      cotton: 'Algodão',
      sterileGauze: 'Gaze estéril',
      bandage: 'Curativo adesivo',
      tape: 'Esparadrapo',
      gloves: 'Luvas descartáveis',
      tourniquet: 'Garrote',
      label: 'Etiquetas de identificação',
      pipette: 'Pipeta',
      glucoseSensor: 'Sensor para Glicose',
      capsule: 'Cápsula Hilab',
      cassette: 'Cassete',
      fundusEye: 'Fundo de olho',
      fundusEyeEasy: 'Fundo de olho (Retina Fácil)',
      xray: 'Raio X',
      tomography: 'Tomografia',
      resonance: 'Ressonância',
      thermography: 'Termografia',
      hospitalizationLowerBackPain: 'Internação: Dor Lombar',
      hospitalizationHypertension: 'Internação: Hipertensão (Emergência)',
      hospitalizationDiabetes: 'Internação: Diabetes (DKA)',
      hospitalizationOverweight: 'Internação: Sobrepeso/Obesidade (Bariátrica)',
      hospitalizationNoChronicConditions: 'Internação: Custo Base Evitável'
    },
    table: {
      product: 'Produto/Serviço',
      category: 'Categoria',
      followUp: 'Acompanhamento',
      quantity: 'Quantidade',
      total: 'Total de Emissões'
    },
    step1: {
      title: 'Você realiza acompanhamento médico periódico?',
      subtitle: 'Isso influencia a quantidade de insumos utilizados e, portanto, sua pegada de carbono.',
      navTitle: 'Selecione a opção compatível com a sua realidade',
      semiannual: 'Semestral',
      semiannualDesc: 'Consultas e exames a cada 6 meses',
      semiannualBenefit: 'Melhor controle e prevenção',
      annual: 'Anual',
      annualDesc: 'Consultas e exames uma vez por ano',
      annualBenefit: 'Controle básico das condições',
      none: 'Sem Acompanhamento Regular',
      noneDesc: 'Apenas atendimentos de emergência',
      noneBenefit: 'Maior risco de complicações',
      lowerBackPain: 'Dor lombar',
      hypertension: 'Hipertensão',
      diabetes: 'Diabetes',
      overweight: 'Sobrepeso/Obesidade',
      noChronicConditions: 'Sem diagnóstico',
      totalDescription: 'População total com DCNTs',
      totalSubDescription: 'Nessa etapa vamos contabilizar a quantidade de pessoas que entrarão para a simulação, então para cada condição de saúde que exista entre seus funcionários, defina o número total de pessoas afetadas. Repita isso em cada item relevante para termos um retrato completo.',
      totalPeople: 'Total: {count} pessoas'
    },
    step2: {
      title: 'Selecione uma ou mais condições de saúde que se aplicam ao seu caso.',
      navTitle: 'Selecione pelo menos 1 condição',
      population: {
        sectionTitle: 'Distribuição por Acompanhamento Médico',
        sectionSubtitle: 'Em cada condição, distribua os funcionários de acordo com a frequência do seu acompanhamento médico.',
        total: 'Total: ',
        totalMustBe: 'O total deve ser igual a: ',
        importantHint: 'Uma dica importante: ',
        importantHintText: 'A soma das pessoas em cada categoria (Semestral, Anual ou Sem Acompanhamento) deve ser igual ao total de funcionários com essa condição que você informou anteriormente.',
        example: 'Exemplo: ',
        exampleText: 'Se você informou 10 pessoas com hipertensão, a soma (ex.: 5 semestral + 3 anual + 2 sem acompanhamento) deve ser igual a 10.',
        clickButtonsHint: 'Clique nos botões para sinalizar a quantidade de pessoas por tipo de acompanhamento'
      },
      lowerBackPainDesc: 'Dor na região lombar da coluna',
      hypertensionDesc: 'Pressão arterial elevada',
      diabetesDesc: 'Diabetes mellitus tipo 1 ou 2',
      people: 'pessoas',
      overweightDesc: 'IMC acima de 25 kg/m²',
      noChronicConditionsDesc: 'Ausência de condições crônicas diagnosticadas',
      conditionsSelected: '{count} condição{plural} selecionada{plural}',
      noConditions: 'Nenhuma condição selecionada',
      calculateImpact: 'Vamos calcular o impacto ambiental',
      selectCondition: 'Selecione pelo menos uma condição',
      lowerBackPain: 'Dor lombar',
      hypertension: 'Hipertensão',
      diabetes: 'Diabetes',
      overweight: 'Sobrepeso/Obesidade',
      noChronicConditions: 'Sem diagnóstico'
    },
    step3: {
      title: 'Como você costuma ir até o local da consulta?',
      navTitle: 'Ajuste suas opções de deslocamento',
      transportationType: 'Selecione apenas 1 opção de deslocamento',
      transportationDistanceKm: 'Deslize a barra horizontal para a direita para indicar a distância',
      conventional: 'Convencional',
      pointOfCare: 'Point of Care',
      sectionTitle: 'Percurso',
      sectionSubtitle: 'Informe a quantidade de quilômetros que será percorrido',
      walking: 'Caminhada',
      motorcycle: 'Motocicleta',
      car: 'Carro',
      bus: 'Transporte Público',
      population: {
        selectMethodHint: 'Selecione um dos métodos para ter acesso aos detalhes do que é gerado de emissão por produtos, quantidade e tipo de acompanhamento',
        productsServicesTitle: 'Produtos e Serviços Utilizados',
        person: 'pessoa',
        people: 'pessoas',
        product: 'produto',
        products: 'produtos',
        final: 'Final'
      }
    },
    step4: {
      title: 'Produtos e Serviços do Paciente',
      navTitle: 'Dica: Você pode alternar entre os métodos',
      totalPopulation: 'População Total',
      productsGenerated: 'Produtos/Serviços Gerados',
      totalEmissions: 'Emissões Totais',
      productsServicesLabel: 'Produtos/Serviços:',
      transportationLabel: 'Deslocamento:',
      avoidableHospitalizations: 'Internações Evitáveis',
      emissionsByHospitalizations: 'Emissões por Internações',
      equivalentTrees: 'Árvores Equivalentes',
      examComparison: 'Comparação de Exames',
      followUpImpact: 'Impacto do Acompanhamento',
      withFollowUp: 'Com Acompanhamento',
      withoutFollowUp: 'Sem Acompanhamento',
      difference: 'Diferença: {percent}%',
      emissionsByDisease: 'Emissões por Doença',
      reductionSuggestions: 'Fica a dica',
      selectedConditions: 'Doenças existentes',
      population: {
        completeAnalysisTitle: 'Análise completa do impacto ambiental',
        annualDistributionNote: '* Simulação com distribuição atual convertida para acompanhamento anual'
      }
    },
    step5: {
      title: 'Resultados da Jornada Individual',
      navTitle: 'Você pode alternar entre os métodos clicando sobre os ícones',
      ncdsMonitored: 'DCNTs Monitoradas',
      chronicConditions: 'Condições Crônicas',
      productsGenerated: 'Produtos/Serviços Gerados',
      productsServices: 'produtos/serviços',
      materialsUsed: 'Materiais Utilizados',
      totalEmissions: 'Emissões Totais',
      productsServicesLabel: 'Produtos/Serviços:',
      transportationLabel: 'Deslocamento:',
      kgCO2ePerYear: 'kg CO₂e/ano',
      avoidableEmissions: 'Emissões Evitáveis',
      kgCO2eAvoidable: 'kg CO₂e evitáveis',
      emissionsByHospitalizations: 'Emissões Evitáveis por Internações',
      kgCO2eHospitalizations: 'kg CO₂e internações',
      percentTotalEmissions: '35% das emissões totais',
      equivalentTrees: 'Árvores Equivalentes Plantadas',
      treesToCompensate: 'árvores para compensar',
      treeAbsorption: '24 kg CO₂e/árvore/ano',
      examComparison: 'Comparação de Exames',
      conventional: 'Convencional',
      pointOfCare: 'Point of Care',
      pocReduction: 'POC reduz 30% das emissões',
      followUpImpact: 'Impacto do Acompanhamento',
      withFollowUp: 'Com acompanhamento',
      withoutFollowUp: 'Sem acompanhamento',
      noFollowUpWarning: 'Sem acompanhamento aumenta {percent}% as emissões',
      reductionSuggestions: 'Fica a Dica',
      recommendations: 'Recomendação',
      visualComparison: 'Comparação de Exames',
      percentOfEmissions: 'do total de emissões',
      currentScenario: 'Cenário Atual',
      withPOC: 'Point of Care',
      withPOCAnnual: 'Point of Care (Anual)',
      withConventional: 'Convencional',
      withConventionalAnnual: 'Convencional (Anual)',
      withoutFollowUpScenario: 'Sem Acompanhamento',
      exportPDF: 'Exportar PDF',
      exportExcel: 'Exportar Excel',
      newSimulation: 'Nova Simulação',
      different: 'Diferença',
      ofEmission: 'De emissão'
    },
    export: {
      openButtonLabel: 'Baixar Relatório',
      modalTitle: 'Preencha o campo a baixo com seu melhor email para que possamos enviar o relatório da sua simulação .',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com',
      invalidEmail: 'Email inválido.',
      sending: 'Enviando…',
      sendPdf: 'Enviar',
      cancel: 'Cancelar',
      success: 'Enviado! Verifique sua caixa de entrada.',
      fail: 'Erro ao enviar.'
    },
    noFollowUp: {
      title: 'SEM ACOMPANHAMENTO MÉDICO',
      body: 'Como você informou que não realiza acompanhamento regular, não haverão emissões de deslocamento, pois, as emissões estarão concentradas em possíveis internações.',
      footer: 'NÃO É POSSÍVEL INFORMAR O DESLOCAMENTO. PROSSIGA PARA O PRÓXIMO PASSO'
    },
    validation: {
      selectPopulation: 'Informe pelo menos uma população',
      completeDistribution: 'Complete até chegar em 100% de cada condição)',
      productsTable: 'Dica: Você pode alternar entre os métodos'
    },
    stepsIntro: {
      heading: 'Veja como suas escolhas de saúde influenciam as emissões de carbono com o simulador E-Carbon',
      steps: {
        step1: 'Selecione a frequência que você acompanha sua saúde',
        step2: 'Indique quais condições crônicas apresentadas',
        step3: 'Como é o deslocamento até as unidades de atendimento',
        step4: 'Será apresentado o comparativo de insumos e serviços',
        step5: 'Por fim, terá um dashboard comparativo com os resultados'
      },
      chooseJourney: 'Escolha por qual tipo de jornada você quer começar',
      individual: 'INDIVIDUAL',
      population: 'COLETIVA',
      footer: 'Esta iniciativa recebeu o apoio da Plataforma Inovação para a Indústria, realizado pelo SESI e outros parceiros.'
    },
    patientQuestionnaire: {
      intro: {
        p1: 'Vamos começar com algumas perguntas para que suas recomendações sejam personalizadas, e ressalto que independente da sua pegada de carbono, o acompanhamento de saúde quando necessário é sempre mais importante pois evita internações desnecessárias. As internações aumentam o custo, diminuem sua qualidade e expectativa de vida, além de serem mais danosas ao meio ambiente.',
        p2: 'Ah sim, antes que eu me esqueça, fique tranquilo, suas respostas são anônimas e confidenciais e não serão utilizadas de nenhuma outra forma que não seja para produzir o seu relatório de consumo de carbono por utilização ou não de insumos da saúde nas linhas de cuidado consideradas.',
        start: 'Vamos começar?'
      },
      common: {
        select: 'Selecione',
        none: 'Nenhum',
        saving: 'Salvando...',
        continue: 'Continuar',
        saveErrorPrefix: 'Erro ao salvar:'
      },
      options: {
        gender: { female: 'Feminino', male: 'Masculino', other: 'Outro' },
        nutrition: { fivePlus: '5 ou mais' },
        smoking: {
          no: 'Não',
          daily: 'Sim, diariamente',
          occasionally: 'Sim, ocasionalmente',
          former: 'Ex-fumante (há mais de 6 meses)'
        },
        consultations: {
          inPerson: 'Sim, presencial',
          telehealth: 'Sim, por teleconsulta',
          none: 'Não faço acompanhamento'
        },
        bloodTestsType: {
          conventional: 'Laboratórios convencionais',
          poc: 'Point of care'
        }
      },
      questions: {
        q1: { label: 'Qual é a sua idade?' },
        q2: { label: 'Qual seu gênero?' },
        q3a: { label: 'Em quantos dias da semana você anda por pelo menos 10 minutos continuamente?' },
        q3b: { label: 'Nos dias que você anda, quantos minutos permanece em movimento?' },
        q4a: { label: 'Em quantos dias da semana você pratica atividade física leve ou moderada por pelo menos 10 minutos?' },
        q4b: { label: 'Nos dias que você pratica atividade leve ou moderada, quantos minutos por dia você permanece em atividade?' },
        q5a: { label: 'Em quantos dias da semana você pratica atividade física intensa por pelo menos 10 minutos?' },
        q5b: { label: 'Nos dias que você pratica atividade intensa, quantos minutos por dia você permanece em atividade?' },
        q6: { label: 'Na maioria dos dias, quantas porções de verduras e legumes você come?' },
        q7: { label: 'Na maioria dos dias, quantas porções de frutas você come?' },
        q8: { label: 'Na maioria dos dias, quantas porções de alimentos processados ou ultraprocessados você consome?' },
        q9: { label: 'Você fuma atualmente?' },
        q10: { label: 'Em uma semana típica, incluindo fins de semana, quantos dias você bebe bebidas alcoólicas? (Caso não beba bebidas alcoólicas, marque zero)' },
        q11: { label: 'Nos dias em que você bebe bebidas alcoólicas, quantas doses você consome? (1 bebida = 1 long neck de cerveja (355 ml), 1 taça de vinho (148 ml) ou 1 dose de whisky, vodka ou cachaça (30 ml))' },
        q12: { label: 'Você realiza consultas ou acompanhamento por médico ou de outro profissional de saúde regularmente?' },
        q13: { label: 'Quantas vezes ao ano você faz exames de sangue?' },
        q14: { label: 'Se você faz exames, os faz em laboratórios convencionais ou os que utilizam point of care (onde testes diagnósticos são realizados no local de atendimento, sendo menos invasivos e com uso de tecnologias mais avançadas, tirando apenas uma gota de sangue)?' }
      }
    },
    // Perguntas específicas por condição na Jornada Individual - Step 2
    step2q: {
      hypertension: {
        emergencyVisits: {
          label: 'Nos últimos 12 meses, você precisou de internação ou atendimento de urgência por causa da pressão alta (como AVC, infarto, crise de pressão alta)?',
          none: 'Não',
          once: 'Sim, uma vez',
          twiceOrMore: 'Sim, duas ou mais vezes'
        },
        controlled: {
          label: 'Sua pressão arterial está controlada (últimas medições dentro da meta orientada pelo profissional de saúde)?',
          yes: 'Sim',
          no: 'Não',
          unknown: 'Não sei / não meço com frequência'
        },
        treatment: {
          label: 'Como você trata a pressão alta atualmente?',
          lifestyle: 'Mudança de hábitos (dieta, exercício)',
          oralMeds: 'Medicamentos orais, comprimidos.',
          stressMgmt: 'Gerenciamento do estresse',
          sleepMgmt: 'Gerenciamento do sono'
        }
      },
      diabetes: {
        controlled: {
          label: 'Suas últimas medições de glicose ou exame de hemoglobina glicada - o açúcar no sangue - têm ficado dentro da meta orientada pelo profissional de saúde?',
          yes: 'Sim',
          no: 'Não',
          unknown: 'Não sei / não faço acompanhamento regular'
        },
        emergencyVisits: {
          label: 'Nos últimos 12 meses, você precisou de internação ou atendimento de urgência por causa do diabetes?',
          none: 'Não',
          once: 'Sim, uma vez',
          twiceOrMore: 'Sim, duas ou mais vezes'
        },
        treatment: {
          label: 'Como você trata o diabetes atualmente?',
          lifestyle: 'Mudança de hábitos (dieta, exercício)',
          oralMeds: 'Medicamentos orais, comprimidos.',
          injectables: 'Medicamentos injetáveis',
          other: 'Outros'
        }
      },
      overweight: {
        bariatricSurgery: {
          label: 'Você já realizou cirurgia bariátrica?',
          no: 'Não',
          lessThan1Year: 'Sim, há menos de 1 ano',
          moreThan1Year: 'Sim, há mais de 1 ano'
        },
        recommendation: {
          label: 'Algum profissional de saúde já recomendou ou indicou cirurgia bariátrica para você?',
          formallyIndicated: 'Sim, já indicada formalmente',
          considered: 'Sim, já cogitada mas não indicada formalmente',
          no: 'Não'
        },
        medication: {
          label: 'Você faz uso de algum medicamento para emagrecimento?',
          no: 'Não',
          oral: 'Sim, oral',
          injectable: 'Sim, injetável semanal',
          both: 'Sim, ambos'
        },
        measures: {
          label: 'Que outras medidas você utiliza estratégia para emagrecimento?',
          none: 'Nenhuma',
          exercise: 'Exercícios físicos',
          healthyDiet: 'Alimentação saudável',
          dietAndExercise: 'Dieta e exercícios físicos combinados'
        }
      },
      lowerBackPain: {
        medication: {
          label: 'Você precisa usar medicamento para controle da dor?',
          daily: 'Sim, diário',
          occasional: 'Sim, esporádico',
          no: 'Não',
          unknown: 'Não sei dizer'
        },
        imagingExams: {
          label: 'Nos últimos 12 meses, quantas vezes realizou exames de imagem para investigar a dor lombar?',
          xray: 'Raio-X',
          tomography: 'Tomografia',
          mri: 'Ressonância magnética',
          none: 'Nenhum'
        },
        emergencyVisits: {
          label: 'Nos últimos 12 meses, você precisou de pronto-atendimento ou internação por causa da dor lombar?',
          none: 'Não',
          once: 'Sim, uma vez',
          twiceOrMore: 'Sim, duas ou mais vezes'
        }
      }
    },
    followUpTypes: {
      none: 'Sem Acompanhamento',
      annual: 'Anual',
      semiannual: 'Semestral'
    },
    recommendedSuggestion: {
      none: 'Realize acompanhamento pelo menos uma vez no ano (caso seja paciente compensado) ou duas vezes ao ano (caso seja paciente descompensado).'
    },
    // Sistema de sugestões baseado na planilha GERAL_JORNADA_INDIVIDUAL.html
    suggestions: {
      suggestion01: {
        title: 'Autocuidado',
        description: 'Parabéns, fazendo o acompanhamento desta maneira você está contribuindo para uma boa saúde.'
      },
      suggestion02: {
        title: 'Tratamento seguro',
        description: 'Faça uso do medicamento conforme prescrição médica'
      },
      suggestion03: {
        title: 'Autocuidado',
        description: 'Tente verificar sua pressão com frequência'
      },
      suggestion04: {
        title: 'Recomendação',
        description: 'Escolha laboratórios preocupados com a sustentabilidade ambiental, sugerimos modelos mais enxutos de uso de insumos de saúde, como os que utilizam o point of care, visando também um menor tempo de espera dos resultados, onde os procedimentos são menos invasivos e com uso de tecnologias mais avançadas.'
      },
      suggestion05: {
        title: 'Recomendação',
        description: 'Este é o meio de exame mais adequado, visando a sustentabilidade ambiental e o tempo de espera dos resultados, trazendo mais conforto e praticidade à você. São procedimentos menos invasivos e com uso de tecnologias mais avançadas.'
      },
      suggestion06: {
        title: 'Corpo Saudável',
        description: 'Busque sempre por alimentação saudável e praticar atividade física'
      },
      suggestion07: {
        title: 'Corpo Saudável',
        description: 'Mesmo sendo muito difícil cessar o hábito de fumar, será muito interessante que você pare, procure ajuda especializada se necessário.'
      },
      suggestion08: {
        title: 'Corpo Saudável',
        description: 'Evite consumir bebidas alcoólicas, elas aumentam a pressão, dificultando o bom controle.'
      },
      suggestion09: {
        title: 'Autocuidado',
        description: 'Tente verificar sua glicemia pelo menos duas vezes no dia'
      },
      suggestion10: {
        title: 'Autocuidado',
        description: 'Se você toma insulina, fique alternando o local de aplicação'
      },
      suggestion11: {
        title: 'Acompanhamento',
        description: 'Você precisa ser acompanhado por um oftalmologista pelo menos uma vez ao ano'
      },
      suggestion12: {
        title: 'Corpo saudável',
        description: 'Tenha cuidado com seus pés, mantenha-os hidratados para prevenir pé diabético'
      },
      suggestion13: {
        title: 'Corpo saudável',
        description: 'Evite consumir bebidas alcoólicas, elas aumentam a pressão, podendo causar também hipoglicemia e hiperglicemia, dificultando o bom controle.'
      },
      suggestion14: {
        title: 'Acompanhamento',
        description: 'Busque ajuda especializada, para lhe ajudar na perda de peso de forma saudável'
      },
      suggestion15: {
        title: 'Acompanhamento',
        description: 'Busque ajuda especializada para lhe ajudar nessa condição de saúde'
      },
      suggestion16: {
        title: 'Evite dores',
        description: 'Atente-se para sua postura e cuidado com levantamento de peso dentro e fora do trabalho; evite movimento bruscos'
      },
      suggestion17: {
        title: 'Evite dores',
        description: 'Mantenha seu peso adequado'
      },
      suggestion18: {
        title: 'Paciente compensado',
        description: 'Acompanhamento correto para paciente compensado (com medidas da pressão dentro dos limites)'
      },
      suggestion19: {
        title: 'Paciente compensado',
        description: 'Acompanhamento correto para paciente compensado (com medidas da glicemia dentro dos limites)'
      },
      suggestion20: {
        title: 'Acompanhamento',
        description: 'Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da pressão dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da pressão fora dos limites)'
      },
      suggestion21: {
        title: 'Acompanhamento',
        description: 'Realize acompanhamento pelo menos uma vez no ano (Paciente compensado - com medidas da glicemia dentro dos limites) ou duas vezes ao ano (Paciente descompensado - com medidas da glicemia fora dos limites)'
      },
      suggestion22: {
        title: 'Sem problemas',
        description: 'Caso não tenha acesso ao point of care ou prefira fazer exames em laboratórios convencionais, não se preocupe, o importante é não deixar de se cuidar e cuidar da sua saúde!',
        subDescription: 'Lembre-se: embora realizar o acompanhamento duas vezes ao ano envolva um maior consumo de carbono quando comparado a uma vez ao ano, o acompanhamento anual ou semestral depende se seu quadro clínico está compensado ou não, isso é mais importante para a sua saúde, pois isso garante um cuidado adequado à sua condição e ajuda a evitar futuras internações — que demandariam um uso de carbono muito maior.'
      },
      suggestion23: {
        title: 'Tratamento seguro',
        description: 'Faça uso do medicamento conforme prescrição médica, se prescrito'
      },
      suggestion24: {
        title: 'Acompanhamento',
        description: 'Realize acompanhamento pelo menos uma vez no ano.'
      },
      suggestion25: {
        title: 'Acompanhamento',
        description: 'Acompanhamento correto'
      },
      suggestion26: {
        title: 'Corpo Saudável',
        description: 'Evite consumir bebidas alcoólicas, pois elas estão associadas a diversos problemas de saúde.'
      }
    },
    healthRecommendations: {
      activity: {
        muito_ativo: {
          title: 'Parabéns pela sua atividade física!',
          description: 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável!'
        },
        ativo: {
          title: 'Parabéns pela sua atividade física!',
          description: 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável!'
        },
        irregularmente_ativo_a: {
          title: 'Aumente sua atividade física',
          description: 'Aumente seus exercícios na maioria dos dias. Você pode dividir em blocos ou fazer de uma vez, como preferir! Para mais benefícios, mantenha a regularidade e aumente o tempo progressivamente. Cada minuto conta!'
        },
        irregularmente_ativo_b: {
          title: 'Inicie atividades físicas',
          description: 'Aumente seus exercícios na maioria dos dias. Você pode dividir em blocos ou fazer de uma vez, como preferir! Para mais benefícios, mantenha a regularidade e aumente o tempo progressivamente. Cada minuto conta!'
        },
        sedentario: {
          title: 'Inicie atividades físicas',
          description: 'Se preferir exercícios moderados, pratique no mínimo 150 minutos por semana. Neles, você conversa com dificuldade, mas não canta, e a respiração/batimentos aumentam moderadamente. Já nas atividades vigorosas, o mínimo é de 75 minutos semanais; aqui, você não consegue conversar e a respiração/coração aceleram muito. Você pode combinar ambas as intensidades para bater a meta semanal. Além disso, não esqueça de incluir exercícios de fortalecimento dos músculos e ossos (como musculação ou peso do corpo) em pelo menos 2 dias da sua rotina.'
        }
      },
      nutrition: {
        saudavel: {
          title: 'Alimentação saudável',
          description: 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável!'
        },
        ruim: {
          title: 'Alimentação inadequada',
          description: 'Priorize na sua dieta: frutas, verduras, leguminosas (como feijões/lentilhas), nozes e grãos integrais (como aveia e arroz integral). Consuma no mínimo 400 g (cinco porções) de frutas e vegetais por dia (exclua raízes ricas em amido, como batatas e mandioca). Evite ao máximo os ultraprocessados! O Guia Alimentar Brasileiro desaconselha esses produtos industriais, que são ricos em açúcar, gordura, sal/calorias e pobres em nutrientes (ex: refrigerantes, salgadinhos e macarrão instantâneo).'
        }
      },
      smoking: {
        fumante: {
          title: 'Presença de Tabagismo',
          description: 'É importantíssimo que você deixe de fumar, pois não existe tabagismo seguro. Reconhecemos que é uma luta difícil; procure ajuda médica e explore medicações que podem auxiliar nessa caminhada. O fumo é fator causal de aproximadamente 50 doenças fatais e incapacitantes. A OMS (Organização Mundial da Saúde) estima que ele é responsável por 71% das mortes por câncer de pulmão, 42% das doenças respiratórias crônicas e 10% das cardiovasculares, além de ser risco para doenças como tuberculose.'
        }
      },
      alcohol: {
        consumidor: {
          title: 'Consumidores de álcool etílico',
          description: 'Atenção: Nenhum nível de consumo de álcool é seguro para a saúde. Os riscos e malefícios têm sido sistematicamente avaliados e estão bem documentados. A Organização Mundial da Saúde (OMS) declarou, inclusive na revista The Lancet Public Health, que não existe quantidade segura de álcool que não afete nossa saúde.'
        }
      },
      hypertension: {
        controlada: {
          title: 'Hipertensão Controlada',
          description: 'Parabéns! Mantenha o bom controle da sua pressão, seguindo o acompanhamento profissional e medindo-a com frequência. Lembre-se: o tratamento da pressão alta exige mudança de comportamento, e não apenas medicação e consultas. É crucial seguir estas recomendações: Mantenha o peso com hábitos alimentares adequados. Reduza o sal, usando outros temperos no lugar. Pratique atividade física regularmente. Aproveite momentos de lazer. Abandone o fumo. Modere o consumo de álcool. Evite alimentos gordurosos. Controle o diabetes (se for o caso).'
        },
        descompensada: {
          title: 'Hipertensão Descompensada',
          description: 'Atenção: É crucial que você assuma a gestão da sua saúde! Busque coordenar seu cuidado com a assistência médica, use corretamente as medicações e tire todas as suas dúvidas sobre a doença e o tratamento. Lembre-se: para evitar complicações, a adesão a um estilo de vida saudável é fundamental. Se for difícil, procure ajuda profissional. Para um melhor controle da sua pressão, siga estas recomendações: Mantenha o peso com hábitos alimentares adequados.Reduza o sal, usando outros temperos no lugar.Pratique atividade física regularmente.Aproveite momentos de lazer. Abandone o fumo. Modere o consumo de álcool. Evite alimentos gordurosos. Controle o diabetes (se for o caso).'
        }
      },
      diabetes: {
        controlada: {
          title: 'Diabetes controlada',
          description: 'Parabéns! Mantenha o bom controle do seu diabetes. Siga o acompanhamento profissional, faça seus exames regularmente e nunca se esqueça: o tratamento exige mudança de comportamento, não se resume a remédios e consultas. Um estilo de vida saudável é fundamental!'
        },
        descompensada: {
          title: 'Diabetes descompensada',
          description: 'É urgente iniciar mudanças no estilo de vida! Glicemia alta pode levar a sérias complicações (coração, rins, olhos, nervos e artérias). Por estar ligada ao estilo de vida, é essencial adotar hábitos saudáveis, diminuir carboidratos e eliminar o açúcar da dieta. Mantenha o acompanhamento profissional na periodicidade indicada. Para melhor controle, siga estas recomendações: Mantenha o peso com hábitos alimentares adequados. Pratique atividade física regularmente. Aproveite momentos de lazer. Modere o consumo de álcool. Use as medicações conforme a prescrição médica.'
        }
      },
      overweight: {
        recomendacao: {
          title: 'Sobrepeso e obesidade',
          description: 'Os pilares para tratar o sobrepeso e a obesidade são: educação alimentar (foco no déficit calórico), atividade física rotineira e mudança de estilo de vida. O sucesso depende da motivação e da adoção de hábitos adequados de alimentação e exercícios (incluindo aeróbicos e resistidos). Lembre-se: pequenas perdas de peso (5 a 10%) já trazem uma melhora significativa nas patologias associadas.'
        }
      },
      lowerBackPain: {
        presenca: {
          title: 'Lombalgia',
          description: 'Para prevenir a lombalgia, mantenha-se ativo, adote uma postura adequada e siga as recomendações ergonômicas no trabalho. Em caso de dor, procure atendimento médico e siga o tratamento prescrito. Mesmo com a medicação, estas medidas são cruciais para sua recuperação: Permaneça ativo e mantenha o peso ideal. Exercite-se: fortalece o corpo (flexibilidade, força) e a mente (melhora ansiedade e autoestima). Use bolsa térmica (se for o caso, sob orientação profissional). Faça aquecimento antes e relaxamento após a atividade física. Para mais detalhes sobre um estilo de vida ativo, consulte o Guia de Atividade Física para a População Brasileira.'
        }
      }
    },
    populationSuggestions: {
      sustainabilitySuggestion: {
        title: 'Recomendação',
        description: 'Estimule sua equipe a escolher laboratórios que tenham compromisso com a sustentabilidade ambiental, priorizando aqueles que adotam modelos mais enxutos no uso de insumos de saúde, como os que utilizam o point of care. Esses modelos reduzem o tempo de espera pelos resultados, tornam os procedimentos menos invasivos e utilizam tecnologias mais avançadas.'
      },
      populationSuggestion01: {
        title: 'Autocuidado coletivo',
        description: 'Excelente! Seguindo o acompanhamento, todos estarão cuidando da própria saúde de maneira eficaz e preventiva.'
      },
      populationSuggestion02: {
        title: 'Tratamento seguro',
        description: 'Oriente sua equipe para que todos utilizem os medicamentos conforme a prescrição médica. Seguir corretamente as orientações garante mais segurança e eficácia no cuidado com a saúde.'
      },
      populationSuggestion03: {
        title: 'Monitoramento',
        description: 'Incentive sua equipe a acompanhar a pressão regularmente. Esse cuidado simples ajuda a preservar a saúde e prevenir problemas futuros.'
      },
      populationSuggestion04: {
        title: 'Sustentabilidade',
        description: 'Estimule sua equipe a escolher laboratórios que se preocupam com o meio ambiente. Os que usam point of care são mais rápidos, menos invasivos e contam com tecnologias modernas, uma escolha que traz mais praticidade e conforto para todos.'
      },
      populationSuggestion05: {
        title: 'Exame recomendado',
        description: 'Explique à sua equipe que este tipo de exame é o mais indicado: sustentável, rápido e pensado para trazer mais conforto. Ele é menos invasivo e utiliza tecnologias modernas, tornando tudo mais prático para todos.'
      },
      populationSuggestion06: {
        title: 'Vida saudável',
        description: 'Incentive sua equipe a manter uma alimentação equilibrada e a praticar atividade física regularmente. Esses hábitos contribuem para o bem-estar geral e ajudam a prevenir diversas condições de saúde.'
      },
      populationSuggestion07: {
        title: 'Cessação do tabagismo',
        description: 'Parar de fumar é difícil, mas vale muito a pena. Estimule sua equipe a buscar apoio profissional, se necessário, pequenos passos fazem grande diferença para a saúde.'
      },
      populationSuggestion08: {
        title: 'Controle da pressão',
        description: 'Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois elas podem elevar a pressão arterial e dificultar o controle da saúde. Essa atenção ajuda a preservar o bem-estar de todos.'
      },
      populationSuggestion09: {
        title: 'Monitoramento glicêmico',
        description: 'Incentivar sua equipe a verificar a glicemia pelo menos duas vezes ao dia pode ajudar a manter a saúde sob controle e prevenir complicações.'
      },
      populationSuggestion10: {
        title: 'Uso de insulina',
        description: 'Lembrar sua equipe de variar o local de aplicação da insulina. Pequenas mudanças como essa aumentam o conforto e a eficácia do tratamento.'
      },
      populationSuggestion11: {
        title: 'Acompanhamento oftalmológico',
        description: 'Lembre sua equipe da importância de realizar acompanhamento com um oftalmologista pelo menos uma vez ao ano. Consultas regulares ajudam a preservar a saúde dos olhos e prevenir problemas futuros.'
      },
      populationSuggestion12: {
        title: 'Prevenção do pé diabético',
        description: 'Oriente sua equipe a cuidar bem dos pés, mantendo-os hidratados. Esse cuidado simples ajuda a prevenir complicações, como o pé diabético.'
      },
      populationSuggestion13: {
        title: 'Controle de peso',
        description: 'Estimule sua equipe a procurar apoio profissional para perder peso de maneira saudável. Pequenos passos com orientação certa fazem grande diferença no bem-estar.'
      },
      populationSuggestion14: {
        title: 'Adesão ao tratamento',
        description: 'Incentive sua equipe de usar os medicamentos conforme a prescrição médica, sempre que forem indicados. Cumprir essa orientação ajuda a manter a saúde de todos sob controle.'
      },
      populationSuggestion15: {
        title: 'Apoio profissional',
        description: 'Estimule sua equipe a procurar apoio profissional para cuidar melhor desta condição de saúde. Com a orientação certa, o processo fica mais seguro e tranquilo.'
      },
      populationSuggestion16: {
        title: 'Prevenção de lesões',
        description: 'Orientar a sua equipe a manter uma boa postura e tomar cuidado ao levantar peso, dentro ou fora do trabalho. Movimentos suaves ajudam a evitar lesões e desconfortos.'
      },
      populationSuggestion17: {
        title: 'Peso saudável',
        description: 'Incentive sua equipe a cuidar do peso e mantê-lo saudável. Pequenas escolhas diárias fazem grande diferença no bem-estar de todos.'
      },
      populationSuggestion18: {
        title: 'Pressão controlada',
        description: 'Sua pressão está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar problemas.'
      },
      populationSuggestion19: {
        title: 'Glicemia controlada',
        description: 'Sua glicemia está bem controlada! Continue acompanhando regularmente para manter sua saúde em dia e evitar complicações.'
      },
      populationSuggestion20: {
        title: 'Redução de álcool',
        description: 'Recomende sua equipe a reduzir bebidas alcoólicas, elas podem aumentar a pressão e alterar a glicemia, tornando o controle da saúde mais difícil. Pequenos cuidados fazem grande diferença.'
      },
      populationSuggestion21: {
        title: 'Frequência de acompanhamento',
        description: 'Lembre sua equipe: se a pressão estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.'
      },
      populationSuggestion22: {
        title: 'Frequência de acompanhamento',
        description: 'Lembre sua equipe: se a glicemia estiver bem controlada, faça acompanhamento pelo menos uma vez ao ano; se estiver fora dos limites, o ideal é consultar duas vezes ao ano. Manter esse cuidado faz diferença para a saúde de todos.'
      },
      populationSuggestion23: {
        title: 'Flexibilidade na escolha',
        description: 'Lembre sua equipe: se não for possível usar o point of care ou preferirem laboratórios convencionais, tudo bem. O essencial é continuar se cuidando e zelar pela própria saúde.',
        subDescription: 'Lembre sua equipe de que, embora realizar o acompanhamento semestral consuma mais carbono do que o anual, a frequência ideal depende do quadro clínico de cada pessoa. O mais importante é garantir um cuidado adequado à condição de saúde, prevenindo internações futuras — que gerariam um consumo de carbono ainda maior.'
      },
      populationSuggestion24: {
        title: 'Acompanhamento de rotina',
        description: 'Estimule sua equipe a realizar acompanhamento de rotina pelo menos uma vez ao ano. Manter a prevenção em dia é fundamental para a saúde.'
      },
      populationSuggestion25: {
        title: 'Prevenção do álcool',
        description: 'Oriente sua equipe a evitar o consumo de bebidas alcoólicas, pois o excesso está associado a diversos problemas de saúde que prejudicam a qualidade de vida.'
      }
    }
  },

  en: {
    conventional: 'Conventional',
    pointOfCare: 'Point of Care',
    nav: {
      populationSimulator: 'Collective Journey',
      patientJourney: 'Individual Journey',
      changeLanguage: 'Change language',
      clearAll: 'Clear all',
      clearAllTooltip: 'Clear all data',
      previous: 'Previous',
      next: 'Next',
      last: 'Finish Simulation',
      viewResults: 'View Results',
      calculateResults: 'Calculate Results',
      processing: 'Processing...'
    },
    category: {
      material: 'Material',
      service: 'Service'
    },
    products: {
      vacutainer: 'Vacutainer blood collection tubes',
      needle: 'Disposable needles',
      lancet: 'Lancets',
      syringe: 'Disposable syringes',
      alcohol: '70% Alcohol',
      cotton: 'Cotton',
      sterileGauze: 'Sterile gauze',
      bandage: 'Adhesive bandage',
      tape: 'Medical tape',
      gloves: 'Disposable gloves',
      tourniquet: 'Tourniquet',
      label: 'Identification labels',
      pipette: 'Pipette',
      glucoseSensor: 'Glucose sensor',
      capsule: 'Hilab capsule',
      cassette: 'Cassette',
      fundusEye: 'Fundus exam',
      fundusEyeEasy: 'Fundus exam (Easy Retina)',
      xray: 'X-ray',
      tomography: 'CT Scan',
      resonance: 'MRI',
      thermography: 'Thermography',
      hospitalizationLowerBackPain: 'Hospitalization: Lower Back Pain',
      hospitalizationHypertension: 'Hospitalization: Hypertension (Emergency)',
      hospitalizationDiabetes: 'Hospitalization: Diabetes (DKA)',
      hospitalizationOverweight: 'Hospitalization: Overweight/Obesity (Bariatric)',
      hospitalizationNoChronicConditions: 'Hospitalization: Avoidable Baseline Cost'
    },
    table: {
      product: 'Product/Service',
      category: 'Category',
      followUp: 'Follow-up',
      quantity: 'Quantity',
      total: 'Total Emissions'
    },
    step1: {
      title: 'Do you have regular medical follow-up?',
      subtitle: 'This influences the amount of supplies used and therefore your carbon footprint.',
      navTitle: 'Select the option that matches your reality',
      semiannual: 'Semi-annual',
      semiannualDesc: 'Appointments and exams every 6 months',
      semiannualBenefit: 'Better control and prevention',
      annual: 'Annual',
      annualDesc: 'Appointments and exams once a year',
      annualBenefit: 'Basic condition control',
      none: 'No Regular Follow-up',
      noneDesc: 'Emergency care only',
      noneBenefit: 'Higher risk of complications',
      lowerBackPain: 'Lower back pain',
      hypertension: 'Hypertension',
      diabetes: 'Diabetes',
      overweight: 'Overweight/Obesity',
      noChronicConditions: 'No chronic conditions',
      totalDescription: 'Total population with NCDs',
      totalSubDescription: 'At this stage we will count the number of people who will enter the simulation, so for each health condition that exists among your employees, define the total number of people affected. Repeat this for each relevant item to get a complete picture.',
      totalPeople: 'Total: {count} people'
    },
    step2: {
      title: 'Select one or more health conditions that apply to your case.',
      navTitle: 'Select at least 1 condition',
      population: {
        sectionTitle: 'Distribution by Medical Follow-up',
        sectionSubtitle: 'For each condition, distribute employees according to their medical follow-up frequency.',
        total: 'Total: ',
        totalMustBe: 'Total must equal: ',
        importantHint: 'An important tip: ',
        importantHintText: 'The sum of people in each category (Semi-annual, Annual or No Follow-up) must equal the total number of employees with this condition that you previously informed.',
        example: 'Example: ',
        exampleText: 'If you informed 10 people with hypertension, the sum (e.g.: 5 semi-annual + 3 annual + 2 no follow-up) must equal 10.',
        clickButtonsHint: 'Click the buttons to indicate the number of people per type of follow-up'
      },
      lowerBackPainDesc: 'Pain in the lumbar region of the spine',
      hypertensionDesc: 'High blood pressure',
      diabetesDesc: 'Type 1 or 2 diabetes mellitus',
      people: 'people',
      overweightDesc: 'BMI above 25 kg/m²',
      noChronicConditionsDesc: 'Absence of diagnosed chronic conditions',
      conditionsSelected: '{count} condition{plural} selected',
      noConditions: 'No conditions selected',
      calculateImpact: 'Let\'s calculate the environmental impact',
      selectCondition: 'Select at least one condition',
      lowerBackPain: 'Lower back pain',
      hypertension: 'Hypertension',
      diabetes: 'Diabetes',
      overweight: 'Overweight/Obesity',
      noChronicConditions: 'No Diagnosis'
    },
    step3: {
      title: 'How do you usually get to the appointment location?',
      navTitle: 'Adjust your commute options',
      transportationType: 'Select only 1 commute option',
      transportationDistanceKm: 'Slide the horizontal bar to the right to indicate distance',
      conventional: 'Conventional',
      pointOfCare: 'Point of Care',
      sectionTitle: 'Route',
      sectionSubtitle: 'Enter the number of kilometers to be traveled',
      walking: 'Walking',
      motorcycle: 'Motorcycle',
      car: 'Car',
      bus: 'Public Transport',
      population: {
        selectMethodHint: 'Select one of the methods to access the details of what is generated in emissions by products, quantity and type of follow-up',
        productsServicesTitle: 'Products and Services Used',
        person: 'person',
        people: 'people',
        product: 'product',
        products: 'products',
        final: 'Final'
      }
    },
    step4: {
      title: 'Patient Products and Services',
      navTitle: 'Tip: You can switch between methods',
      totalPopulation: 'Total Population',
      productsGenerated: 'Products/Services Generated',
      totalEmissions: 'Total Emissions',
      productsServicesLabel: 'Products/Services:',
      transportationLabel: 'Transportation:',
      avoidableHospitalizations: 'Preventable Hospitalizations',
      emissionsByHospitalizations: 'Emissions from Hospitalizations',
      equivalentTrees: 'Equivalent Trees',
      examComparison: 'Exam Comparison',
      followUpImpact: 'Follow-up Impact',
      withFollowUp: 'With Follow-up',
      withoutFollowUp: 'Without Follow-up',
      difference: 'Difference: {percent}%',
      emissionsByDisease: 'Emissions by Disease',
      reductionSuggestions: 'Here\'s a tip',
      selectedConditions: 'Existing diseases',
      population: {
        completeAnalysisTitle: 'Complete Environmental Impact Analysis',
        annualDistributionNote: '* Simulation with current distribution converted to annual follow-up'
      }
    },
    step5: {
      title: 'Individual Journey Results',
      navTitle: 'You can switch between methods by clicking on the icons',
      ncdsMonitored: 'Monitored NCDs',
      chronicConditions: 'Chronic Conditions',
      productsGenerated: 'Products/Services Generated',
      productsServices: 'products/services',
      materialsUsed: 'Materials Used',
      totalEmissions: 'Total Emissions',
      productsServicesLabel: 'Products/Services:',
      transportationLabel: 'Transportation:',
      kgCO2ePerYear: 'kg CO₂e/year',
      avoidableEmissions: 'Avoidable Emissions',
      kgCO2eAvoidable: 'kg CO₂e avoidable',
      emissionsByHospitalizations: 'Avoidable Emissions from Hospitalizations',
      kgCO2eHospitalizations: 'kg CO₂e hospitalizations',
      percentTotalEmissions: '35% of total emissions',
      equivalentTrees: 'Equivalent Trees Planted',
      treesToCompensate: 'trees to compensate',
      treeAbsorption: '24 kg CO₂e/tree/year',
      examComparison: 'Exam Comparison',
      conventional: 'Conventional',
      pointOfCare: 'Point of Care',
      pocReduction: 'POC reduces 30% of emissions',
      followUpImpact: 'Follow-up Impact',
      withFollowUp: 'With follow-up',
      withoutFollowUp: 'Without follow-up',
      noFollowUpWarning: 'Without follow-up increases {percent}% emissions',
      reductionSuggestions: 'Here\'s a Tip',
      recommendations: 'Recommendation',
      visualComparison: 'Exam Comparison',
      percentOfEmissions: 'of total emissions',
      currentScenario: 'Current Scenario',
      withPOC: 'Point of Care',
      withPOCAnnual: 'Point of Care (Annual)',
      withConventional: 'Conventional',
      withConventionalAnnual: 'Conventional (Annual)',
      withoutFollowUpScenario: 'Without Follow-up',
      exportPDF: 'Export PDF',
      exportExcel: 'Export Excel',
      newSimulation: 'New Simulation',
      different: 'Difference',
      ofEmission: 'Of emission'
    },
    export: {
      openButtonLabel: 'Download Report',
      modalTitle: 'Fill in the field below with your best email so we can send you your simulation report.',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      invalidEmail: 'Invalid email.',
      sending: 'Sending…',
      sendPdf: 'Send',
      cancel: 'Cancel',
      success: 'Sent! Check your inbox.',
      fail: 'Error sending.'
    },
    noFollowUp: {
      title: 'NO MEDICAL FOLLOW-UP',
      body: 'Since you indicated that you do not have regular follow-up, there will be no commuting emissions, as the emissions will be concentrated on possible hospitalizations.',
      footer: 'IT IS NOT POSSIBLE TO INFORM THE COMMUTE. PROCEED TO THE NEXT STEP'
    },
    validation: {
      selectPopulation: 'Enter at least one population',
      completeDistribution: 'Complete until reaching 100% for each condition)',
      productsTable: 'Tip: You can switch between methods'
    },
    followUpTypes: {
      none: 'No Follow-up',
      annual: 'Annual',
      semiannual: 'Semi-annual'
    },
    recommendedSuggestion: {
      none: 'Have follow-up at least once a year (compensated patient) or twice a year (decompensated patient).'
    },
    stepsIntro: {
      heading: 'See how your healthcare choices influence carbon emissions with the E-Carbon simulator',
      steps: {
        step1: 'Select how often you monitor your health',
        step2: 'Indicate which chronic conditions are present',
        step3: 'How you commute to care facilities',
        step4: 'A comparison of supplies and services will be presented',
        step5: 'Finally, a comparative dashboard with the results'
      },
      chooseJourney: 'Choose which journey you want to start with',
      individual: 'INDIVIDUAL',
      population: 'COLLECTIVE',
      footer: 'This initiative received support from the Industry Innovation Platform, carried out by SESI and other partners.'
    },
    patientQuestionnaire: {
      intro: {
        p1: 'Let\'s start with a few questions so that your recommendations are personalized. Regardless of your carbon footprint, regular healthcare follow-up when necessary is always more important, as it avoids unnecessary hospitalizations. Hospitalizations increase costs, reduce quality and life expectancy, and are also more harmful to the environment.',
        p2: 'Also, rest assured, your answers are anonymous and confidential and will only be used to produce your carbon consumption report related to the use or not of healthcare supplies in the considered care lines.',
        start: 'Shall we start?'
      },
      common: {
        select: 'Select',
        none: 'None',
        saving: 'Saving...',
        continue: 'Continue',
        saveErrorPrefix: 'Error saving:'
      },
      options: {
        gender: { female: 'Female', male: 'Male', other: 'Other' },
        nutrition: { fivePlus: '5 or more' },
        smoking: { no: 'No', daily: 'Yes, daily', occasionally: 'Yes, occasionally', former: 'Former smoker (more than 6 months)' },
        consultations: { inPerson: 'Yes, in person', telehealth: 'Yes, by telehealth', none: 'No follow-up' },
        bloodTestsType: { conventional: 'Conventional laboratories', poc: 'Point of care' }
      },
      questions: {
        q1: { label: 'How old are you?' },
        q2: { label: 'What is your gender?' },
        q3a: { label: 'On how many days per week do you walk for at least 10 minutes continuously?' },
        q3b: { label: 'On the days you walk, how many minutes do you stay in motion?' },
        q4a: { label: 'On how many days per week do you do light or moderate physical activity for at least 10 minutes?' },
        q4b: { label: 'On days with light or moderate activity, how many minutes per day do you stay active?' },
        q5a: { label: 'On how many days per week do you do vigorous physical activity for at least 10 minutes?' },
        q5b: { label: 'On vigorous activity days, how many minutes per day do you stay active?' },
        q6: { label: 'On most days, how many servings of vegetables do you eat?' },
        q7: { label: 'On most days, how many servings of fruit do you eat?' },
        q8: { label: 'On most days, how many servings of processed or ultra-processed foods do you consume?' },
        q9: { label: 'Do you currently smoke?' },
        q10: { label: 'In a typical week, including weekends, on how many days do you drink alcoholic beverages? (If you do not drink alcoholic beverages, mark zero)' },
        q11: { label: 'On the days you drink alcoholic beverages, how many drinks do you consume? (1 drink = 1 beer long neck (355 ml), 1 glass of wine (148 ml) or 1 shot of whisky, vodka or cachaça (30 ml))' },
        q12: { label: 'Do you regularly have medical appointments or follow-up with other health professionals?' },
        q13: { label: 'How many times a year do you have blood tests?' },
        q14: { label: 'If you take tests, do you do them in conventional laboratories or point-of-care (tests performed at the care site, less invasive and using more advanced technologies, with just a drop of blood)?' }
      }
    },
    step2q: {
      hypertension: {
        emergencyVisits: {
          label: 'In the last 12 months, did you require hospitalization or emergency care due to high blood pressure (such as stroke, heart attack, hypertensive crisis)?',
          none: 'No',
          once: 'Yes, once',
          twiceOrMore: 'Yes, two or more times'
        },
        controlled: {
          label: 'Is your blood pressure under control (recent measurements within the target set by your healthcare professional)?',
          yes: 'Yes',
          no: 'No',
          unknown: 'I don\'t know / I rarely measure'
        },
        treatment: {
          label: 'How do you currently manage high blood pressure?',
          lifestyle: 'Lifestyle changes (diet, exercise)',
          oralMeds: 'Oral medications (pills)',
          stressMgmt: 'Stress management',
          sleepMgmt: 'Sleep management'
        }
      },
      diabetes: {
        controlled: {
          label: 'Have your recent blood glucose measurements or HbA1c been within the target set by your healthcare professional?',
          yes: 'Yes',
          no: 'No',
          unknown: 'I don\'t know / I don\'t monitor regularly'
        },
        emergencyVisits: {
          label: 'In the last 12 months, did you require hospitalization or emergency care due to diabetes?',
          none: 'No',
          once: 'Yes, once',
          twiceOrMore: 'Yes, two or more times'
        },
        treatment: {
          label: 'How do you currently manage diabetes?',
          lifestyle: 'Lifestyle changes (diet, exercise)',
          oralMeds: 'Oral medications (pills)',
          injectables: 'Injectable medications',
          other: 'Other'
        }
      },
      overweight: {
        bariatricSurgery: {
          label: 'Have you undergone bariatric surgery?',
          no: 'No',
          lessThan1Year: 'Yes, less than 1 year ago',
          moreThan1Year: 'Yes, more than 1 year ago'
        },
        recommendation: {
          label: 'Has any healthcare professional recommended or indicated bariatric surgery for you?',
          formallyIndicated: 'Yes, formally indicated',
          considered: 'Yes, considered but not formally indicated',
          no: 'No'
        },
        medication: {
          label: 'Do you use any weight-loss medication?',
          no: 'No',
          oral: 'Yes, oral',
          injectable: 'Yes, weekly injectable',
          both: 'Yes, both'
        },
        measures: {
          label: 'What other strategies do you use for weight loss?',
          none: 'None',
          exercise: 'Physical exercise',
          healthyDiet: 'Healthy eating',
          dietAndExercise: 'Diet and exercise combined'
        }
      },
      lowerBackPain: {
        medication: {
          label: 'Do you need medication to control the pain?',
          daily: 'Yes, daily',
          occasional: 'Yes, occasional',
          no: 'No',
          unknown: 'I\'m not sure'
        },
        imagingExams: {
          label: 'In the last 12 months, how many times did you undergo imaging tests for lower back pain?',
          xray: 'X-ray',
          tomography: 'CT scan',
          mri: 'MRI',
          none: 'None'
        },
        emergencyVisits: {
          label: 'In the last 12 months, did you require emergency care or hospitalization due to lower back pain?',
          none: 'No',
          once: 'Yes, once',
          twiceOrMore: 'Yes, two or more times'
        }
      }
    },
    suggestions: {
      suggestion01: {
        title: 'Self-Care',
        description: 'Congratulations, following up this way you are contributing to good health.'
      },
      suggestion02: {
        title: 'Safe Treatment',
        description: 'Use medication as prescribed by your doctor'
      },
      suggestion03: {
        title: 'Self-Care',
        description: 'Try to check your blood pressure frequently'
      },
      suggestion04: {
        title: 'Recommendation',
        description: 'Choose laboratories concerned with environmental sustainability, we suggest leaner models of healthcare supply use, such as those using point of care, also aiming for shorter waiting times for results, where procedures are less invasive and use more advanced technologies.'
      },
      suggestion05: {
        title: 'Recommendation',
        description: 'This is the most appropriate exam method, aiming for environmental sustainability and result waiting time, bringing more comfort and practicality to you. These are less invasive procedures using more advanced technologies.'
      },
      suggestion06: {
        title: 'Healthy Body',
        description: 'Always seek healthy eating and physical activity'
      },
      suggestion07: {
        title: 'Healthy Body',
        description: 'Even though it is very difficult to quit smoking, it would be very interesting for you to stop, seek specialized help if necessary.'
      },
      suggestion08: {
        title: 'Healthy Body',
        description: 'Avoid consuming alcoholic beverages, they increase blood pressure, making good control difficult.'
      },
      suggestion09: {
        title: 'Self-Care',
        description: 'Try to check your blood glucose at least twice a day'
      },
      suggestion10: {
        title: 'Self-Care',
        description: 'If you take insulin, keep alternating the application site'
      },
      suggestion11: {
        title: 'Follow-up',
        description: 'You need to be monitored by an ophthalmologist at least once a year'
      },
      suggestion12: {
        title: 'Healthy Body',
        description: 'Take care of your feet, keep them moisturized to prevent diabetic foot'
      },
      suggestion13: {
        title: 'Healthy Body',
        description: 'Avoid consuming alcoholic beverages, they increase blood pressure and can also cause hypoglycemia and hyperglycemia, making good control difficult.'
      },
      suggestion14: {
        title: 'Follow-up',
        description: 'Seek specialized help to assist you in losing weight in a healthy way'
      },
      suggestion15: {
        title: 'Follow-up',
        description: 'Seek specialized help to assist you with this health condition'
      },
      suggestion16: {
        title: 'Avoid Pain',
        description: 'Pay attention to your posture and be careful with lifting weights inside and outside work; avoid sudden movements'
      },
      suggestion17: {
        title: 'Avoid Pain',
        description: 'Maintain adequate weight'
      },
      suggestion18: {
        title: 'Compensated Patient',
        description: 'Correct follow-up for compensated patient (with blood pressure measurements within limits)'
      },
      suggestion19: {
        title: 'Compensated Patient',
        description: 'Correct follow-up for compensated patient (with blood glucose measurements within limits)'
      },
      suggestion20: {
        title: 'Follow-up',
        description: 'Have follow-up at least once a year (Compensated patient - with blood pressure measurements within limits) or twice a year (Decompensated patient - with blood pressure measurements outside limits)'
      },
      suggestion21: {
        title: 'Follow-up',
        description: 'Have follow-up at least once a year (Compensated patient - with blood glucose measurements within limits) or twice a year (Decompensated patient - with blood glucose measurements outside limits)'
      },
      suggestion22: {
        title: 'No problem',
        description: 'If you don\'t have access to point of care or prefer to take exams at conventional laboratories, don\'t worry, the important thing is not to stop taking care of yourself and your health!',
        subDescription: 'Remember: although having follow-up twice a year involves greater carbon consumption compared to once a year, annual or semi-annual follow-up depends on whether your clinical condition is compensated or not, this is more important for your health, as it ensures adequate care for your condition and helps avoid future hospitalizations — which would require much higher carbon use.'
      },
      suggestion23: {
        title: 'Safe Treatment',
        description: 'Use the medication as prescribed by your doctor, if prescribed'
      },
      suggestion24: {
        title: 'Follow-up',
        description: 'Have follow-up at least once a year.'
      },
      suggestion25: {
        title: 'Follow-up',
        description: 'Correct follow-up'
      },
      suggestion26: {
        title: 'Healthy Body',
        description: 'Avoid consuming alcoholic beverages, as they are associated with several health problems.'
      }
    },
    healthRecommendations: {
      activity: {
        muito_ativo: {
          title: 'Congratulations on your physical activity!',
          description: 'Congratulations! You are on the right track: your physical activities follow the ideal WHO standard. Keep it up for a long and healthy life!'
        },
        ativo: {
          title: 'Congratulations on your physical activity!',
          description: 'Congratulations! You are on the right track: your physical activities follow the ideal WHO standard. Keep it up for a long and healthy life!'
        },
        irregularmente_ativo_a: {
          title: 'Increase your physical activity',
          description: 'Increase your exercises on most days. You can divide into blocks or do it all at once, as you prefer! For more benefits, maintain regularity and progressively increase the time. Every minute counts!'
        },
        irregularmente_ativo_b: {
          title: 'Start physical activities',
          description: 'Increase your exercises on most days. You can divide into blocks or do it all at once, as you prefer! For more benefits, maintain regularity and progressively increase the time. Every minute counts!'
        },
        sedentario: {
          title: 'Start physical activities',
          description: 'If you prefer moderate exercises, practice at least 150 minutes per week. In them, you talk with difficulty but don\'t sing, and breathing/heartbeats increase moderately. For vigorous activities, the minimum is 75 minutes per week; here, you cannot talk and breathing/heart accelerate a lot. You can combine both intensities to meet the weekly goal. In addition, don\'t forget to include muscle and bone strengthening exercises (such as weight training or bodyweight) in at least 2 days of your routine.'
        }
      },
      nutrition: {
        saudavel: {
          title: 'Healthy eating',
          description: 'Congratulations! You are on the right track: your physical activities follow the ideal WHO standard. Keep it up for a long and healthy life!'
        },
        ruim: {
          title: 'Inadequate nutrition',
          description: 'Prioritize in your diet: fruits, vegetables, legumes (such as lentils and beans), nuts and whole grains (such as oats and brown rice). Consume at least 400 g (five servings) of fruits and vegetables per day (exclude starchy roots such as potatoes and cassava). Avoid ultra-processed foods as much as possible! The Brazilian Food Guide discourages these industrial products, which are rich in sugar, fat, salt/calories and poor in nutrients (eg: soft drinks, snacks and instant noodles).'
        }
      },
      smoking: {
        fumante: {
          title: 'Presence of Smoking',
          description: 'It is extremely important that you quit smoking, as there is no safe smoking. We recognize that it is a difficult struggle; seek medical help and explore medications that can assist in this journey. Smoking is a causal factor in approximately 50 fatal and disabling diseases. The WHO (World Health Organization) estimates that it is responsible for 71% of deaths from lung cancer, 42% of chronic respiratory diseases and 10% of cardiovascular diseases, in addition to being a risk for diseases such as tuberculosis.'
        }
      },
      alcohol: {
        consumidor: {
          title: 'Ethyl alcohol consumers',
          description: 'Attention: No level of alcohol consumption is safe for health. The risks and harms have been systematically evaluated and are well documented. The World Health Organization (WHO) declared, including in the journal The Lancet Public Health, that there is no safe amount of alcohol that does not affect our health.'
        }
      },
      hypertension: {
        controlada: {
          title: 'Controlled Hypertension',
          description: 'Congratulations! Maintain good control of your blood pressure by following professional monitoring and measuring it frequently. Remember: treating high blood pressure requires behavioral changes, not just medication and appointments. It is crucial to follow these recommendations: Maintain weight with adequate eating habits. Reduce salt, using other seasonings instead. Practice regular physical activity. Enjoy leisure time. Quit smoking. Moderate alcohol consumption. Avoid fatty foods. Control diabetes (if applicable).'
        },
        descompensada: {
          title: 'Uncontrolled Hypertension',
          description: 'Attention: It is crucial that you take charge of your health management! Seek to coordinate your care with medical assistance, use medications correctly, and clarify all your doubts about the disease and treatment. Remember: to avoid complications, adherence to a healthy lifestyle is fundamental. If it is difficult, seek professional help. For better control of your blood pressure, follow these recommendations: Maintain weight with adequate eating habits. Reduce salt, using other seasonings instead. Practice regular physical activity. Enjoy leisure time. Quit smoking. Moderate alcohol consumption. Avoid fatty foods. Control diabetes (if applicable).'
        }
      },
      diabetes: {
        controlada: {
          title: 'Controlled Diabetes',
          description: 'Congratulations! Maintain good control of your diabetes. Follow professional monitoring, have your tests regularly, and never forget: treatment requires behavioral changes, it is not limited to medications and appointments. A healthy lifestyle is essential!'
        },
        descompensada: {
          title: 'Uncontrolled Diabetes',
          description: 'It is urgent to start lifestyle changes! High blood sugar can lead to serious complications (heart, kidneys, eyes, nerves and arteries). Since it is linked to lifestyle, it is essential to adopt healthy habits, reduce carbohydrates and eliminate sugar from the diet. Maintain professional follow-up at the indicated frequency. For better control, follow these recommendations: Maintain weight with adequate eating habits. Practice regular physical activity. Enjoy leisure time. Moderate alcohol consumption. Use medications as prescribed by your doctor.'
        }
      },
      overweight: {
        recomendacao: {
          title: 'Overweight and Obesity',
          description: 'The pillars for treating overweight and obesity are: food education (focus on caloric deficit), routine physical activity, and lifestyle change. Success depends on motivation and the adoption of adequate eating and exercise habits (including aerobic and resisted). Remember: small weight losses (5 to 10%) already bring significant improvement in associated pathologies.'
        }
      },
      lowerBackPain: {
        presenca: {
          title: 'Low Back Pain',
          description: 'To prevent low back pain, stay active, adopt proper posture, and follow ergonomic recommendations at work. In case of pain, seek medical attention and follow the prescribed treatment. Even with medication, these measures are crucial for your recovery: Stay active and maintain ideal weight. Exercise: strengthens the body (flexibility, strength) and mind (improves anxiety and self-esteem). Use a thermal bag (if applicable, under professional guidance). Warm up before and relax after physical activity. For more details on an active lifestyle, consult the Physical Activity Guide for the Brazilian Population.'
        }
      }
    },
    populationSuggestions: {
      sustainabilitySuggestion: {
        title: 'RECOMMENDATION',
        description: 'Encourage your team to choose laboratories committed to environmental sustainability, prioritizing those that adopt leaner models in healthcare supply use, such as those using point of care. These models reduce waiting time for results, make procedures less invasive and use more advanced technologies.'
      },
      populationSuggestion01: {
        title: 'COLLECTIVE SELF-CARE',
        description: 'Excellent! Following up, everyone will be taking care of their own health effectively and preventively.'
      },
      populationSuggestion02: {
        title: 'SAFE TREATMENT',
        description: 'Guide your team so everyone uses medications as prescribed. Following instructions correctly ensures more safety and effectiveness in health care.'
      },
      populationSuggestion03: {
        title: 'MONITORING',
        description: 'Encourage your team to monitor blood pressure regularly. This simple care helps preserve health and prevent future problems.'
      },
      populationSuggestion04: {
        title: 'SUSTAINABILITY',
        description: 'Encourage your team to choose laboratories concerned with the environment. Those using point of care are faster, less invasive and use modern technologies, a choice that brings more practicality and comfort to everyone.'
      },
      populationSuggestion05: {
        title: 'RECOMMENDED EXAM',
        description: 'Explain to your team that this type of exam is most suitable: sustainable, fast and designed to bring more comfort. It is less invasive and uses modern technologies, making everything more practical for everyone.'
      },
      populationSuggestion06: {
        title: 'HEALTHY LIFE',
        description: 'Encourage your team to maintain balanced eating and regular physical activity. These habits contribute to general well-being and help prevent various health conditions.'
      },
      populationSuggestion07: {
        title: 'SMOKING CESSATION',
        description: 'Quitting smoking is difficult, but very worthwhile. Encourage your team to seek professional support if necessary, small steps make a big difference for health.'
      },
      populationSuggestion08: {
        title: 'BLOOD PRESSURE CONTROL',
        description: 'Guide your team to avoid consuming alcoholic beverages, as they can raise blood pressure and make health control difficult. This attention helps preserve everyone\'s well-being.'
      },
      populationSuggestion09: {
        title: 'GLUCOSE MONITORING',
        description: 'Encouraging your team to check blood glucose at least twice a day can help keep health under control and prevent complications.'
      },
      populationSuggestion10: {
        title: 'INSULIN USE',
        description: 'Remind your team to vary the insulin application site. Small changes like this increase comfort and treatment effectiveness.'
      },
      populationSuggestion11: {
        title: 'OPHTHALMOLOGICAL FOLLOW-UP',
        description: 'Remind your team of the importance of ophthalmological follow-up at least once a year. Regular appointments help preserve eye health and prevent future problems.'
      },
      populationSuggestion12: {
        title: 'DIABETIC FOOT PREVENTION',
        description: 'Guide your team to take good care of their feet, keeping them moisturized. This simple care helps prevent complications such as diabetic foot.'
      },
      populationSuggestion13: {
        title: 'WEIGHT CONTROL',
        description: 'Encourage your team to seek professional support to lose weight healthily. Small steps with proper guidance make a big difference in well-being.'
      },
      populationSuggestion14: {
        title: 'TREATMENT ADHERENCE',
        description: 'Encourage your team to use medications as prescribed whenever indicated. Following this guidance helps keep everyone\'s health under control.'
      },
      populationSuggestion15: {
        title: 'PROFESSIONAL SUPPORT',
        description: 'Encourage your team to seek professional support to better care for this health condition. With proper guidance, the process becomes safer and calmer.'
      },
      populationSuggestion16: {
        title: 'INJURY PREVENTION',
        description: 'Guide your team to maintain good posture and be careful when lifting weights, inside or outside work. Smooth movements help avoid injuries and discomfort.'
      },
      populationSuggestion17: {
        title: 'HEALTHY WEIGHT',
        description: 'Encourage your team to care for and maintain healthy weight. Small daily choices make a big difference in everyone\'s well-being.'
      },
      populationSuggestion18: {
        title: 'CONTROLLED PRESSURE',
        description: 'Your blood pressure is well controlled! Continue monitoring regularly to keep your health up to date and avoid problems.'
      },
      populationSuggestion19: {
        title: 'CONTROLLED GLUCOSE',
        description: 'Your blood glucose is well controlled! Continue monitoring regularly to keep your health up to date and avoid complications.'
      },
      populationSuggestion20: {
        title: 'ALCOHOL REDUCTION',
        description: 'Recommend your team to reduce alcoholic beverages, they can increase blood pressure and alter blood glucose, making health control more difficult. Small cares make a big difference.'
      },
      populationSuggestion21: {
        title: 'FOLLOW-UP FREQUENCY',
        description: 'Remind your team: if blood pressure is well controlled, have follow-up at least once a year; if outside limits, ideally consult twice a year. Maintaining this care makes a difference for everyone\'s health.'
      },
      populationSuggestion22: {
        title: 'FOLLOW-UP FREQUENCY',
        description: 'Remind your team: if blood glucose is well controlled, have follow-up at least once a year; if outside limits, ideally consult twice a year. Maintaining this care makes a difference for everyone\'s health.'
      },
      populationSuggestion23: {
        title: 'FLEXIBILITY IN CHOICE',
        description: 'Remind your team: if it\'s not possible to use point of care or they prefer conventional laboratories, that\'s okay. The essential thing is to continue taking care and caring for one\'s own health.',
        subDescription: 'Remind your team that, although semi-annual follow-up consumes more carbon than annual, the ideal frequency depends on each person\'s clinical condition. The most important thing is to ensure adequate care for the health condition, preventing future hospitalizations — which would generate even higher carbon consumption.'
      },
      populationSuggestion24: {
        title: 'ROUTINE FOLLOW-UP',
        description: 'Encourage your team to have routine follow-ups at least once a year. Keeping prevention up to date is fundamental for health.'
      },
      populationSuggestion25: {
        title: 'ALCOHOL PREVENTION',
        description: 'Advise your team to avoid the consumption of alcoholic beverages, as excess is associated with various health problems that impair quality of life.'
      }
    }
  },

  es: {
    conventional: 'Convencional',
    pointOfCare: 'Point of Care',
    nav: {
      populationSimulator: 'Jornada Colectiva',
      patientJourney: 'Jornada Individual',
      changeLanguage: 'Cambiar idioma',
      clearAll: 'Limpiar todo',
      clearAllTooltip: 'Limpiar todos los datos',
      previous: 'Anterior',
      next: 'Siguiente',
      last: 'Finalizar Simulación',
      viewResults: 'Ver Resultados',
      calculateResults: 'Calcular Resultados',
      processing: 'Procesando...'
    },
    category: {
      material: 'Material',
      service: 'Servicio'
    },
    products: {
      vacutainer: 'Tubos de recolección al vacío (vacutainer)',
      needle: 'Agujas desechables',
      lancet: 'Lancetas',
      syringe: 'Jeringas desechables',
      alcohol: 'Alcohol 70%',
      cotton: 'Algodón',
      sterileGauze: 'Gasa estéril',
      bandage: 'Vendaje adhesivo',
      tape: 'Esparadrapo',
      gloves: 'Guantes desechables',
      tourniquet: 'Torniquete',
      label: 'Etiquetas de identificación',
      pipette: 'Pipeta',
      glucoseSensor: 'Sensor de Glucosa',
      capsule: 'Cápsula Hilab',
      cassette: 'Casete',
      fundusEye: 'Fondo de ojo',
      fundusEyeEasy: 'Fondo de ojo (Retina Fácil)',
      xray: 'Radiografía',
      tomography: 'Tomografía',
      resonance: 'Resonancia',
      thermography: 'Termografía',
      hospitalizationLowerBackPain: 'Hospitalización: Dolor Lumbar',
      hospitalizationHypertension: 'Hospitalización: Hipertensión (Emergencia)',
      hospitalizationDiabetes: 'Hospitalización: Diabetes (CAD)',
      hospitalizationOverweight: 'Hospitalización: Sobrepeso/Obesidad (Bariátrica)',
      hospitalizationNoChronicConditions: 'Hospitalización: Costo Base Evitable'
    },
    table: {
      product: 'Producto/Servicio',
      category: 'Categoría',
      followUp: 'Seguimiento',
      quantity: 'Cantidad',
      total: 'Total de Emisiones'
    },
    step1: {
      title: '¿Realiza seguimiento médico periódico?',
      subtitle: 'Esto influye en la cantidad de insumos utilizados y, por tanto, en su huella de carbono.',
      navTitle: 'Seleccione la opción compatible con su realidad',
      semiannual: 'Semestral',
      semiannualDesc: 'Consultas y exámenes cada 6 meses',
      semiannualBenefit: 'Mejor control y prevención',
      annual: 'Anual',
      annualDesc: 'Consultas y exámenes una vez al año',
      annualBenefit: 'Control básico de condiciones',
      none: 'Sin Seguimiento Regular',
      noneDesc: 'Solo atención de emergencia',
      noneBenefit: 'Mayor riesgo de complicaciones',
      lowerBackPain: 'Dolor lumbar',
      hypertension: 'Hipertensión',
      diabetes: 'Diabetes',
      overweight: 'Sobrepeso/Obesidad',
      noChronicConditions: 'Ningún diagnóstico',
      totalDescription: 'Población total con ENT',
      totalSubDescription: 'En esta etapa contabilizaremos la cantidad de personas que entrarán en la simulación, entonces para cada condición de salud que exista entre sus empleados, defina el número total de personas afectadas. Repita esto en cada ítem relevante para tener un retrato completo.',
      totalPeople: 'Total: {count} personas'
    },
    step2: {
      title: 'Seleccione una o más condiciones de salud que se aplican a su caso.',
      navTitle: 'Seleccione al menos 1 condición',
      population: {
        sectionTitle: 'Distribución por Seguimiento Médico',
        sectionSubtitle: 'En cada condición, distribuya los empleados según la frecuencia de su seguimiento médico.',
        total: 'Total: ',
        totalMustBe: 'El total debe ser igual a: ',
        importantHint: 'Un consejo importante: ',
        importantHintText: 'La suma de personas en cada categoría (Semestral, Anual o Sin Seguimiento) debe ser igual al total de empleados con esta condición que informó anteriormente.',
        example: 'Ejemplo: ',
        exampleText: 'Si informó 10 personas con hipertensión, la suma (ej.: 5 semestral + 3 anual + 2 sin seguimiento) debe ser igual a 10.',
        clickButtonsHint: 'Haga clic en los botones para indicar la cantidad de personas por tipo de seguimiento'
      },
      lowerBackPainDesc: 'Dolor en la región lumbar de la columna',
      hypertensionDesc: 'Presión arterial elevada',
      diabetesDesc: 'Diabetes mellitus tipo 1 o 2',
      people: 'personas',
      overweightDesc: 'IMC superior a 25 kg/m²',
      noChronicConditionsDesc: 'Ausencia de condiciones crónicas diagnosticadas',
      conditionsSelected: '{count} condición{plural} seleccionada{plural}',
      noConditions: 'Ninguna condición seleccionada',
      calculateImpact: 'Vamos a calcular el impacto ambiental',
      selectCondition: 'Seleccione al menos una condición',
      lowerBackPain: 'Dolor lumbar',
      hypertension: 'Hipertensión',
      diabetes: 'Diabetes',
      overweight: 'Sobrepeso/Obesidad',
      noChronicConditions: 'Ningún diagnóstico'
    },
    step3: {
      title: '¿Cómo suele ir al lugar de la consulta?',
      navTitle: 'Ajuste sus opciones de desplazamiento',
      transportationType: 'Seleccione solo 1 opción de desplazamiento',
      transportationDistanceKm: 'Deslice la barra horizontal a la derecha para indicar la distancia',
      conventional: 'Convencional',
      pointOfCare: 'Point of Care',
      sectionTitle: 'Recorrido',
      sectionSubtitle: 'Informe la cantidad de kilómetros que será recorrido',
      walking: 'Caminata',
      motorcycle: 'Motocicleta',
      car: 'Coche',
      bus: 'Transporte Público',
      population: {
        selectMethodHint: 'Seleccione uno de los métodos para acceder a los detalles de lo que se genera de emisiones por productos, cantidad y tipo de seguimiento',
        productsServicesTitle: 'Productos y Servicios Utilizados',
        person: 'persona',
        people: 'personas',
        product: 'producto',
        products: 'productos',
        final: 'Final'
      }
    },
    step4: {
      title: 'Productos y Servicios del Paciente',
      navTitle: 'Consejo: Puede alternar entre los métodos',
      totalPopulation: 'Población Total',
      productsGenerated: 'Productos/Servicios Generados',
      totalEmissions: 'Emisiones Totales',
      productsServicesLabel: 'Productos/Servicios:',
      transportationLabel: 'Desplazamiento:',
      avoidableHospitalizations: 'Hospitalizaciones Evitables',
      emissionsByHospitalizations: 'Emisiones por Hospitalizaciones',
      equivalentTrees: 'Árboles Equivalentes',
      examComparison: 'Comparación de Exámenes',
      followUpImpact: 'Impacto del Seguimiento',
      withFollowUp: 'Con Seguimiento',
      withoutFollowUp: 'Sin Seguimiento',
      difference: 'Diferencia: {percent}%',
      emissionsByDisease: 'Emisiones por Enfermedad',
      reductionSuggestions: 'Queda el consejo',
      selectedConditions: 'Enfermedades existentes',
      population: {
        completeAnalysisTitle: 'Análisis Completo del Impacto Ambiental',
        annualDistributionNote: '* Simulación con la distribución actual convertida a seguimiento anual'
      }
    },
    step5: {
      title: 'Resultados de la Jornada Individual',
      navTitle: 'Puede alternar entre los métodos haciendo clic en los iconos',
      ncdsMonitored: 'ENT Monitorizadas',
      chronicConditions: 'Condiciones Crónicas',
      productsGenerated: 'Productos/Servicios Generados',
      productsServices: 'productos/servicios',
      materialsUsed: 'Materiales Utilizados',
      totalEmissions: 'Emisiones Totales',
      productsServicesLabel: 'Productos/Servicios:',
      transportationLabel: 'Desplazamiento:',
      kgCO2ePerYear: 'kg CO₂e/año',
      avoidableEmissions: 'Emisiones Evitables',
      kgCO2eAvoidable: 'kg CO₂e evitables',
      emissionsByHospitalizations: 'Emisiones Evitables por Hospitalizaciones',
      kgCO2eHospitalizations: 'kg CO₂e hospitalizaciones',
      percentTotalEmissions: '35% de las emisiones totales',
      equivalentTrees: 'Árboles Equivalentes Plantados',
      treesToCompensate: 'árboles para compensar',
      treeAbsorption: '24 kg CO₂e/árbol/año',
      examComparison: 'Comparación de Exámenes',
      conventional: 'Convencional',
      pointOfCare: 'Point of Care',
      pocReduction: 'POC reduce 30% de las emisiones',
      followUpImpact: 'Impacto del Seguimiento',
      withFollowUp: 'Con seguimiento',
      withoutFollowUp: 'Sin seguimiento',
      noFollowUpWarning: 'Sin seguimiento aumenta {percent}% las emisiones',
      reductionSuggestions: 'Queda el Consejo',
      recommendations: 'Recomendación',
      visualComparison: 'Comparación de Exámenes',
      percentOfEmissions: 'del total de emisiones',
      currentScenario: 'Escenario Actual',
      withPOC: 'Point of Care',
      withPOCAnnual: 'Point of Care (Anual)',
      withConventional: 'Convencional',
      withConventionalAnnual: 'Convencional (Anual)',
      withoutFollowUpScenario: 'Sin Seguimiento',
      exportPDF: 'Exportar PDF',
      exportExcel: 'Exportar Excel',
      newSimulation: 'Nueva Simulación',
      different: 'Diferencia',
      ofEmission: 'De emisión'
    },
    export: {
      openButtonLabel: 'Descargar Informe',
      modalTitle: 'Complete el campo abajo con su mejor correo electrónico para que podamos enviarle el informe de su simulación.',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'usted@ejemplo.com',
      invalidEmail: 'Correo electrónico inválido.',
      sending: 'Enviando…',
      sendPdf: 'Enviar',
      cancel: 'Cancelar',
      success: '¡Enviado! Verifique su bandeja de entrada.',
      fail: 'Error al enviar.'
    },
    noFollowUp: {
      title: 'SIN SEGUIMIENTO MÉDICO',
      body: 'Como indicó que no realiza seguimiento regular, no habrá emisiones de desplazamiento, ya que las emisiones se concentrarán en posibles hospitalizaciones.',
      footer: 'NO ES POSIBLE INFORMAR EL DESPLAZAMIENTO. PROCEDA AL SIGUIENTE PASO'
    },
    validation: {
      selectPopulation: 'Informe al menos una población',
      completeDistribution: 'Complete hasta llegar al 100% de cada condición)',
      productsTable: 'Consejo: Puede alternar entre los métodos'
    },
    followUpTypes: {
      none: 'Sin Seguimiento',
      annual: 'Anual',
      semiannual: 'Semestral'
    },
    recommendedSuggestion: {
      none: 'Realice seguimiento al menos una vez al año (paciente compensado) o dos veces al año (paciente descompensado).'
    },
    stepsIntro: {
      heading: 'Vea cómo sus elecciones de salud influyen en las emisiones de carbono con el simulador E-Carbon',
      steps: {
        step1: 'Seleccione la frecuencia con la que acompaña su salud',
        step2: 'Indique qué condiciones crónicas están presentes',
        step3: 'Cómo es el desplazamiento hasta las unidades de atención',
        step4: 'Se presentará el comparativo de insumos y servicios',
        step5: 'Por último, habrá un panel comparativo con los resultados'
      },
      chooseJourney: 'Elija por qué tipo de jornada quiere empezar',
      individual: 'INDIVIDUAL',
      population: 'COLECTIVA',
      footer: 'Esta iniciativa recibió el apoyo de la Plataforma de Innovación para la Industria, realizada por el SESI y otros socios.'
    },
    patientQuestionnaire: {
      intro: {
        p1: 'Comencemos con algunas preguntas para personalizar sus recomendaciones. Independientemente de su huella de carbono, el seguimiento de salud cuando es necesario es más importante porque evita hospitalizaciones innecesarias. Las hospitalizaciones aumentan el costo, disminuyen su calidad y expectativa de vida y son más dañinas al medio ambiente.',
        p2: 'Sus respuestas son anónimas y confidenciales y solo se utilizarán para producir su informe de consumo de carbono por uso o no de insumos de salud en las líneas de cuidado consideradas.',
        start: '¿Empezamos?'
      },
      common: {
        select: 'Seleccione',
        none: 'Ninguno',
        saving: 'Guardando...',
        continue: 'Continuar',
        saveErrorPrefix: 'Error al guardar:'
      },
      options: {
        gender: { female: 'Femenino', male: 'Masculino', other: 'Otro' },
        nutrition: { fivePlus: '5 o más' },
        smoking: { no: 'No', daily: 'Sí, diariamente', occasionally: 'Sí, ocasionalmente', former: 'Exfumador (hace más de 6 meses)' },
        consultations: { inPerson: 'Sí, presencial', telehealth: 'Sí, por teleconsulta', none: 'No realizo seguimiento' },
        bloodTestsType: { conventional: 'Laboratorios convencionales', poc: 'Point of care' }
      },
      questions: {
        q1: { label: '¿Cuál es su edad?' },
        q2: { label: '¿Cuál es su género?' },
        q3a: { label: '¿En cuántos días de la semana camina por al menos 10 minutos de forma continua?' },
        q3b: { label: 'En los días que camina, ¿cuántos minutos permanece en movimiento?' },
        q4a: { label: '¿En cuántos días de la semana practica actividad física ligera o moderada por al menos 10 minutos?' },
        q4b: { label: 'En los días que practica actividad ligera o moderada, ¿cuántos minutos por día permanece en actividad?' },
        q5a: { label: '¿En cuántos días de la semana practica actividad física intensa por al menos 10 minutos?' },
        q5b: { label: 'En los días que practica actividad intensa, ¿cuántos minutos por día permanece en actividad?' },
        q6: { label: 'En la mayoría de los días, ¿cuántas porciones de verduras y hortalizas come?' },
        q7: { label: 'En la mayoría de los días, ¿cuántas porciones de frutas come?' },
        q8: { label: 'En la mayoría de los días, ¿cuántas porciones de alimentos procesados o ultraprocesados consume?' },
        q9: { label: '¿Fuma actualmente?' },
        q10: { label: 'En una semana típica, incluyendo fines de semana, ¿cuántos días bebe bebidas alcohólicas? (Si no bebe bebidas alcohólicas, marque cero)' },
        q11: { label: 'En los días que bebe bebidas alcohólicas, ¿cuántas dosis consume? (1 bebida = 1 long neck de cerveza (355 ml), 1 copa de vino (148 ml) o 1 dosis de whisky, vodka o cachaça (30 ml))' },
        q12: { label: '¿Realiza consultas o seguimiento por médico u otro profesional de salud regularmente?' },
        q13: { label: '¿Cuántas veces al año se hace análisis de sangre?' },
        q14: { label: 'Si se hace exámenes, ¿los hace en laboratorios convencionales o en point of care (donde las pruebas diagnósticas se realizan en el lugar de atención, menos invasivas y con tecnologías más avanzadas, extrayendo solo una gota de sangre)?' }
      }
    },
    step2q: {
      hypertension: {
        emergencyVisits: {
          label: 'En los últimos 12 meses, ¿necesitó hospitalización o atención de urgencia debido a la presión arterial alta (como ACV, infarto, crisis hipertensiva)?',
          none: 'No',
          once: 'Sí, una vez',
          twiceOrMore: 'Sí, dos o más veces'
        },
        controlled: {
          label: '¿Su presión arterial está controlada (mediciones recientes dentro del objetivo indicado por el profesional de salud)?',
          yes: 'Sí',
          no: 'No',
          unknown: 'No sé / mido con poca frecuencia'
        },
        treatment: {
          label: '¿Cómo maneja actualmente la presión alta?',
          lifestyle: 'Cambios de estilo de vida (dieta, ejercicio)',
          oralMeds: 'Medicamentos orales (pastillas)',
          stressMgmt: 'Manejo del estrés',
          sleepMgmt: 'Manejo del sueño'
        }
      },
      diabetes: {
        controlled: {
          label: '¿Sus mediciones recientes de glucosa o su HbA1c han estado dentro del objetivo indicado por el profesional de salud?',
          yes: 'Sí',
          no: 'No',
          unknown: 'No sé / no controlo regularmente'
        },
        emergencyVisits: {
          label: 'En los últimos 12 meses, ¿necesitó hospitalización o atención de urgencia debido a la diabetes?',
          none: 'No',
          once: 'Sí, una vez',
          twiceOrMore: 'Sí, dos o más veces'
        },
        treatment: {
          label: '¿Cómo maneja actualmente la diabetes?',
          lifestyle: 'Cambios de estilo de vida (dieta, ejercicio)',
          oralMeds: 'Medicamentos orales (pastillas)',
          injectables: 'Medicamentos inyectables',
          other: 'Otros'
        }
      },
      overweight: {
        bariatricSurgery: {
          label: '¿Se ha sometido a una cirugía bariátrica?',
          no: 'No',
          lessThan1Year: 'Sí, hace menos de 1 año',
          moreThan1Year: 'Sí, hace más de 1 año'
        },
        recommendation: {
          label: '¿Algún profesional de salud le ha recomendado o indicado cirugía bariátrica?',
          formallyIndicated: 'Sí, indicada formalmente',
          considered: 'Sí, considerada pero no indicada formalmente',
          no: 'No'
        },
        medication: {
          label: '¿Utiliza algún medicamento para bajar de peso?',
          no: 'No',
          oral: 'Sí, oral',
          injectable: 'Sí, inyectable semanal',
          both: 'Sí, ambos'
        },
        measures: {
          label: '¿Qué otras estrategias utiliza para bajar de peso?',
          none: 'Ninguna',
          exercise: 'Ejercicio físico',
          healthyDiet: 'Alimentación saludable',
          dietAndExercise: 'Dieta y ejercicio combinados'
        }
      },
      lowerBackPain: {
        medication: {
          label: '¿Necesita medicación para controlar el dolor?',
          daily: 'Sí, diaria',
          occasional: 'Sí, ocasional',
          no: 'No',
          unknown: 'No estoy seguro'
        },
        imagingExams: {
          label: 'En los últimos 12 meses, ¿cuántas veces se realizó estudios de imagen por dolor lumbar?',
          xray: 'Radiografía',
          tomography: 'Tomografía',
          mri: 'Resonancia magnética',
          none: 'Ninguno'
        },
        emergencyVisits: {
          label: 'En los últimos 12 meses, ¿necesitó atención de urgencia u hospitalización por dolor lumbar?',
          none: 'No',
          once: 'Sí, una vez',
          twiceOrMore: 'Sí, dos o más veces'
        }
      }
    },
    suggestions: {
      suggestion01: {
        title: 'Autocuidado',
        description: 'Felicitaciones, haciendo el seguimiento de esta manera está contribuyendo a una buena salud.'
      },
      suggestion02: {
        title: 'Tratamiento seguro',
        description: 'Use el medicamento según prescripción médica'
      },
      suggestion03: {
        title: 'AUTOCUIDADO',
        description: 'Intente verificar su presión con frecuencia'
      },
      suggestion04: {
        title: 'RECOMENDACIÓN',
        description: 'Elija laboratorios preocupados por la sostenibilidad ambiental, sugerimos modelos más ajustados de uso de insumos de salud, como los que utilizan point of care, buscando también un menor tiempo de espera de resultados, donde los procedimientos son menos invasivos y con uso de tecnologías más avanzadas.'
      },
      suggestion05: {
        title: 'RECOMENDACIÓN',
        description: 'Este es el medio de examen más adecuado, buscando la sostenibilidad ambiental y el tiempo de espera de resultados, trayendo más comodidad y practicidad a usted. Son procedimientos menos invasivos y con uso de tecnologías más avanzadas.'
      },
      suggestion06: {
        title: 'Cuerpo Saludable',
        description: 'Busque siempre una alimentación saludable y practicar actividad física'
      },
      suggestion07: {
        title: 'Cuerpo Saludable',
        description: 'Aunque sea muy difícil dejar el hábito de fumar, será muy interesante que pare, busque ayuda especializada si es necesario.'
      },
      suggestion08: {
        title: 'Cuerpo Saludable',
        description: 'Evite consumir bebidas alcohólicas, aumenta la presión, dificultando el buen control.'
      },
      suggestion09: {
        title: 'Autocuidado',
        description: 'Intente verificar su glucemia al menos dos veces al día'
      },
      suggestion10: {
        title: 'AUTOCUIDADO',
        description: 'Si toma insulina, alterne el lugar de aplicación'
      },
      suggestion11: {
        title: 'Seguimiento',
        description: 'Necesita ser acompañado por un oftalmólogo al menos una vez al año'
      },
      suggestion12: {
        title: 'Cuerpo Saludable',
        description: 'Tenga cuidado con sus pies, manténgalos hidratados para prevenir pie diabético'
      },
      suggestion13: {
        title: 'Cuerpo Saludable',
        description: 'Evite consumir bebidas alcohólicas, aumenta la presión, pudiendo causar también hipoglucemia e hiperglucemia, dificultando el buen control.'
      },
      suggestion14: {
        title: 'Seguimiento',
        description: 'Busque ayuda especializada para ayudarle en la pérdida de peso de forma saludable'
      },
      suggestion15: {
        title: 'Seguimiento',
        description: 'Busque ayuda especializada para ayudarle en esta condición de salud'
      },
      suggestion16: {
        title: 'Evite Dolores',
        description: 'Atienda su postura y cuidado con el levantamiento de peso dentro y fuera del trabajo; evite movimientos bruscos'
      },
      suggestion17: {
        title: 'Evite Dolores',
        description: 'Mantenga su peso adecuado'
      },
      suggestion18: {
        title: 'Paciente Compensado',
        description: 'Seguimiento correcto para paciente compensado (con medidas de presión dentro de los límites)'
      },
      suggestion19: {
        title: 'Paciente Compensado',
        description: 'Seguimiento correcto para paciente compensado (con medidas de glucemia dentro de los límites)'
      },
      suggestion20: {
        title: 'Seguimiento',
        description: 'Realice seguimiento al menos una vez al año (Paciente compensado - con medidas de presión dentro de los límites) o dos veces al año (Paciente descompensado - con medidas de presión fuera de los límites)'
      },
      suggestion21: {
        title: 'Seguimiento',
        description: 'Realice seguimiento al menos una vez al año (Paciente compensado - con medidas de glucemia dentro de los límites) o dos veces al año (Paciente descompensado - con medidas de glucemia fuera de los límites)'
      },
      suggestion22: {
        title: 'Sin problemas',
        description: 'Si no tiene acceso al point of care o prefiere hacer exámenes en laboratorios convencionales, no se preocupe, ¡lo importante es no dejar de cuidarse y cuidar de su salud!',
        subDescription: 'Recuerde: aunque realizar el seguimiento dos veces al año implica un mayor consumo de carbono comparado con una vez al año, el seguimiento anual o semestral depende de si su cuadro clínico está compensado o no, esto es más importante para su salud, pues esto garantiza un cuidado adecuado a su condición y ayuda a evitar futuras hospitalizaciones — que demandarían un uso de carbono mucho mayor.'
      },
      suggestion23: {
        title: 'Tratamiento seguro',
        description: 'Haga uso del medicamento de acuerdo a prescripción médica, si fue prescrito'
      },
      suggestion24: {
        title: 'Seguimiento',
        description: 'Realice seguimiento al menos una vez al año.'
      },
      suggestion25: {
        title: 'Seguimiento',
        description: 'Seguimiento correcto'
      },
      suggestion26: {
        title: 'Cuerpo Saludable',
        description: 'Evite consumir bebidas alcohólicas, ya que están asociadas a diversos problemas de salud.'
      }
    },
    healthRecommendations: {
      activity: {
        muito_ativo: {
          title: '¡Felicitaciones por su actividad física!',
          description: '¡Felicitaciones! Está en el camino correcto: sus actividades físicas siguen el estándar ideal de la OMS. ¡Continúe así para una vida larga y saludable!'
        },
        ativo: {
          title: '¡Felicitaciones por su actividad física!',
          description: '¡Felicitaciones! Está en el camino correcto: sus actividades físicas siguen el estándar ideal de la OMS. ¡Continúe así para una vida larga y saludable!'
        },
        irregularmente_ativo_a: {
          title: 'Aumente su actividad física',
          description: 'Aumente sus ejercicios en la mayoría de los días. ¡Puede dividir en bloques o hacerlo todo de una vez, como prefiera! Para más beneficios, mantenga la regularidad y aumente progresivamente el tiempo. ¡Cada minuto cuenta!'
        },
        irregularmente_ativo_b: {
          title: 'Inicie actividades físicas',
          description: 'Aumente sus ejercicios en la mayoría de los días. ¡Puede dividir en bloques o hacerlo todo de una vez, como prefiera! Para más beneficios, mantenga la regularidad y aumente progresivamente el tiempo. ¡Cada minuto cuenta!'
        },
        sedentario: {
          title: 'Inicie actividades físicas',
          description: 'Si prefiere ejercicios moderados, practique al menos 150 minutos por semana. En ellos, habla con dificultad pero no canta, y la respiración/latidos aumentan moderadamente. Para actividades vigorosas, el mínimo es de 75 minutos semanales; aquí, no puede hablar y la respiración/corazón aceleran mucho. Puede combinar ambas intensidades para alcanzar la meta semanal. Además, no olvide incluir ejercicios de fortalecimiento de músculos y huesos (como musculación o peso corporal) en al menos 2 días de su rutina.'
        }
      },
      nutrition: {
        saudavel: {
          title: 'Alimentación saludable',
          description: '¡Felicitaciones! Está en el camino correcto: sus actividades físicas siguen el estándar ideal de la OMS. ¡Continúe así para una vida larga y saludable!'
        },
        ruim: {
          title: 'Alimentación inadecuada',
          description: 'Priorice en su dieta: frutas, verduras, legumbres (como lentejas y frijoles), nueces y granos integrales (como avena y arroz integral). Consuma al menos 400 g (cinco porciones) de frutas y verduras por día (excluya raíces ricas en almidón como papas y yuca). ¡Evite al máximo los ultraprocesados! La Guía Alimentaria Brasileña desaconseja estos productos industriales, que son ricos en azúcar, grasa, sal/calorías y pobres en nutrientes (ej: refrescos, bocadillos y fideos instantáneos).'
        }
      },
      smoking: {
        fumante: {
          title: 'Presencia de Tabaquismo',
          description: 'Es extremadamente importante que deje de fumar, ya que no existe tabaquismo seguro. Reconocemos que es una lucha difícil; busque ayuda médica y explore medicamentos que puedan asistir en este camino. El tabaco es factor causal de aproximadamente 50 enfermedades fatales e incapacitantes. La OMS (Organización Mundial de la Salud) estima que es responsable del 71% de las muertes por cáncer de pulmón, 42% de las enfermedades respiratorias crónicas y 10% de las cardiovasculares, además de ser riesgo para enfermedades como tuberculosis.'
        }
      },
      alcohol: {
        consumidor: {
          title: 'Consumidores de alcohol etílico',
          description: 'Atención: Ningún nivel de consumo de alcohol es seguro para la salud. Los riesgos y perjuicios han sido sistemáticamente evaluados y están bien documentados. La Organización Mundial de la Salud (OMS) declaró, inclusive en la revista The Lancet Public Health, que no existe cantidad segura de alcohol que no afecte nuestra salud.'
        }
      },
      hypertension: {
        controlada: {
          title: 'Hipertensión Controlada',
          description: '¡Felicitaciones! Mantenga el buen control de su presión, siguiendo el acompañamiento profesional y midiéndola con frecuencia. Recuerde: el tratamiento de la presión alta requiere cambios de comportamiento, no solo medicación y consultas. Es crucial seguir estas recomendaciones: Mantenga el peso con hábitos alimentarios adecuados. Reduzca la sal, usando otras especias en su lugar. Practique actividad física regularmente. Disfrute momentos de ocio. Abandone el tabaco. Modere el consumo de alcohol. Evite alimentos grasos. Controle la diabetes (si aplica).'
        },
        descompensada: {
          title: 'Hipertensión Descompensada',
          description: '¡Atención: Es crucial que asuma la gestión de su salud! Busque coordinar su cuidado con la asistencia médica, use correctamente las medicaciones y aclare todas sus dudas sobre la enfermedad y el tratamiento. Recuerde: para evitar complicaciones, la adhesión a un estilo de vida saludable es fundamental. Si es difícil, busque ayuda profesional. Para un mejor control de su presión, siga estas recomendaciones: Mantenga el peso con hábitos alimentarios adecuados. Reduzca la sal, usando otras especias en su lugar. Practique actividad física regularmente. Disfrute momentos de ocio. Abandone el tabaco. Modere el consumo de alcohol. Evite alimentos grasos. Controle la diabetes (si aplica).'
        }
      },
      diabetes: {
        controlada: {
          title: 'Diabetes Controlada',
          description: '¡Felicitaciones! Mantenga el buen control de su diabetes. Siga el acompañamiento profesional, haga sus exámenes regularmente y nunca olvide: el tratamiento requiere cambios de comportamiento, no se resume a remedios y consultas. ¡Un estilo de vida saludable es fundamental!'
        },
        descompensada: {
          title: 'Diabetes Descompensada',
          description: '¡Es urgente iniciar cambios en el estilo de vida! La glucemia alta puede llevar a serias complicaciones (corazón, riñones, ojos, nervios y arterias). Al estar ligada al estilo de vida, es esencial adoptar hábitos saludables, disminuir carbohidratos y eliminar el azúcar de la dieta. Mantenga el acompañamiento profesional en la periodicidad indicada. Para mejor control, siga estas recomendaciones: Mantenga el peso con hábitos alimentarios adecuados. Practique actividad física regularmente. Disfrute momentos de ocio. Modere el consumo de alcohol. Use las medicaciones conforme a la prescripción médica.'
        }
      },
      overweight: {
        recomendacao: {
          title: 'Sobrepeso y Obesidad',
          description: 'Los pilares para tratar el sobrepeso y la obesidad son: educación alimentaria (enfoque en el déficit calórico), actividad física rutinaria y cambio de estilo de vida. El éxito depende de la motivación y la adopción de hábitos adecuados de alimentación y ejercicios (incluyendo aeróbicos y resistidos). Recuerde: pequeñas pérdidas de peso (5 a 10%) ya traen una mejora significativa en las patologías asociadas.'
        }
      },
      lowerBackPain: {
        presenca: {
          title: 'Lumbalgia',
          description: 'Para prevenir la lumbalgia, manténgase activo, adopte una postura adecuada y siga las recomendaciones ergonómicas en el trabajo. En caso de dolor, busque atención médica y siga el tratamiento prescrito. Incluso con la medicación, estas medidas son cruciales para su recuperación: Permanezca activo y mantenga el peso ideal. Ejercítese: fortalece el cuerpo (flexibilidad, fuerza) y la mente (mejora ansiedad y autoestima). Use bolsa térmica (si aplica, bajo guía profesional). Caliente antes y relájese después de la actividad física. Para más detalles sobre un estilo de vida activo, consulte la Guía de Actividad Física para la Población Brasileña.'
        }
      }
    },
    populationSuggestions: {
      sustainabilitySuggestion: {
        title: 'RECOMENDACIÓN',
        description: 'Estimule a su equipo a elegir laboratorios que tengan compromiso con la sostenibilidad ambiental, priorizando aquellos que adoptan modelos más ajustados en el uso de insumos de salud, como los que utilizan point of care. Estos modelos reducen el tiempo de espera por los resultados, hacen los procedimientos menos invasivos y utilizan tecnologías más avanzadas.'
      },
      populationSuggestion01: {
        title: 'AUTOCUIDADO COLECTIVO',
        description: '¡Excelente! Siguiendo el seguimiento, todos estarán cuidando de su propia salud de manera eficaz y preventiva.'
      },
      populationSuggestion02: {
        title: 'TRATAMIENTO SEGURO',
        description: 'Oriente a su equipo para que todos utilicen los medicamentos según la prescripción médica. Seguir correctamente las orientaciones garantiza más seguridad y eficacia en el cuidado de la salud.'
      },
      populationSuggestion03: {
        title: 'MONITOREO',
        description: 'Incentive a su equipo a acompañar la presión regularmente. Este cuidado simple ayuda a preservar la salud y prevenir problemas futuros.'
      },
      populationSuggestion04: {
        title: 'SOSTENIBILIDAD',
        description: 'Estimule a su equipo a elegir laboratorios que se preocupan por el medio ambiente. Los que usan point of care son más rápidos, menos invasivos y cuentan con tecnologías modernas, una elección que trae más practicidad y comodidad para todos.'
      },
      populationSuggestion05: {
        title: 'EXAMEN RECOMENDADO',
        description: 'Explique a su equipo que este tipo de examen es el más indicado: sostenible, rápido y pensado para traer más comodidad. Es menos invasivo y utiliza tecnologías modernas, haciendo todo más práctico para todos.'
      },
      populationSuggestion06: {
        title: 'VIDA SALUDABLE',
        description: 'Incentive a su equipo a mantener una alimentación equilibrada y practicar actividad física regularmente. Estos hábitos contribuyen al bienestar general y ayudan a prevenir diversas condiciones de salud.'
      },
      populationSuggestion07: {
        title: 'CESACIÓN DEL TABAQUISMO',
        description: 'Dejar de fumar es difícil, pero vale mucho la pena. Estimule a su equipo a buscar apoyo profesional, si es necesario, pequeños pasos hacen gran diferencia para la salud.'
      },
      populationSuggestion08: {
        title: 'CONTROL DE LA PRESIÓN',
        description: 'Oriente a su equipo a evitar el consumo de bebidas alcohólicas, pues pueden elevar la presión arterial y dificultar el control de la salud. Esta atención ayuda a preservar el bienestar de todos.'
      },
      populationSuggestion09: {
        title: 'MONITOREO GLUCÉMICO',
        description: 'Incentivar a su equipo a verificar la glucemia al menos dos veces al día puede ayudar a mantener la salud bajo control y prevenir complicaciones.'
      },
      populationSuggestion10: {
        title: 'USO DE INSULINA',
        description: 'Recordar a su equipo de variar el lugar de aplicación de la insulina. Pequeños cambios como este aumentan la comodidad y la eficacia del tratamiento.'
      },
      populationSuggestion11: {
        title: 'SEGUIMIENTO OFTALMOLÓGICO',
        description: 'Recuerde a su equipo la importancia de realizar seguimiento con un oftalmólogo al menos una vez al año. Consultas regulares ayudan a preservar la salud de los ojos y prevenir problemas futuros.'
      },
      populationSuggestion12: {
        title: 'PREVENCIÓN DEL PIE DIABÉTICO',
        description: 'Oriente a su equipo a cuidar bien de los pies, manteniéndolos hidratados. Este cuidado simple ayuda a prevenir complicaciones, como el pie diabético.'
      },
      populationSuggestion13: {
        title: 'CONTROL DE PESO',
        description: 'Estimule a su equipo a procurar apoyo profesional para perder peso de manera saludable. Pequeños pasos con orientación correcta hacen gran diferencia en el bienestar.'
      },
      populationSuggestion14: {
        title: 'ADHESIÓN AL TRATAMIENTO',
        description: 'Incentive a su equipo a usar los medicamentos según la prescripción médica, siempre que sean indicados. Cumplir esta orientación ayuda a mantener la salud de todos bajo control.'
      },
      populationSuggestion15: {
        title: 'APOYO PROFESIONAL',
        description: 'Estimule a su equipo a procurar apoyo profesional para cuidar mejor de esta condición de salud. Con la orientación correcta, el proceso se vuelve más seguro y tranquilo.'
      },
      populationSuggestion16: {
        title: 'PREVENCIÓN DE LESIONES',
        description: 'Orientar a su equipo a mantener una buena postura y tener cuidado al levantar peso, dentro o fuera del trabajo. Movimientos suaves ayudan a evitar lesiones y molestias.'
      },
      populationSuggestion17: {
        title: 'PESO SALUDABLE',
        description: 'Incentive a su equipo a cuidar del peso y mantenerlo saludable. Pequeñas elecciones diarias hacen gran diferencia en el bienestar de todos.'
      },
      populationSuggestion18: {
        title: 'PRESIÓN CONTROLADA',
        description: '¡Su presión está bien controlada! Continúe acompañando regularmente para mantener su salud al día y evitar problemas.'
      },
      populationSuggestion19: {
        title: 'GLUCEMIA CONTROLADA',
        description: '¡Su glucemia está bien controlada! Continúe acompañando regularmente para mantener su salud al día y evitar complicaciones.'
      },
      populationSuggestion20: {
        title: 'REDUCCIÓN DE ALCOHOL',
        description: 'Recomiende a su equipo reducir bebidas alcohólicas, pueden aumentar la presión y alterar la glucemia, haciendo el control de la salud más difícil. Pequeños cuidados hacen gran diferencia.'
      },
      populationSuggestion21: {
        title: 'FRECUENCIA DE SEGUIMIENTO',
        description: 'Recuerde a su equipo: si la presión está bien controlada, haga seguimiento al menos una vez al año; si está fuera de los límites, lo ideal es consultar dos veces al año. Mantener este cuidado hace diferencia para la salud de todos.'
      },
      populationSuggestion22: {
        title: 'FRECUENCIA DE SEGUIMIENTO',
        description: 'Recuerde a su equipo: si la glucemia está bien controlada, haga seguimiento al menos una vez al año; si está fuera de los límites, lo ideal es consultar dos veces al año. Mantener este cuidado hace diferencia para la salud de todos.'
      },
      populationSuggestion23: {
        title: 'FLEXIBILIDAD EN LA ELECCIÓN',
        description: 'Recuerde a su equipo: si no es posible usar point of care o prefieren laboratorios convencionales, está bien. Lo esencial es continuar cuidándose y velando por la propia salud.',
        subDescription: 'Recuerde a su equipo que, aunque realizar el seguimiento semestral consuma más carbono que el anual, la frecuencia ideal depende del cuadro clínico de cada persona. Lo más importante es garantizar un cuidado adecuado a la condición de salud, previniendo hospitalizaciones futuras — que generarían un consumo de carbono aún mayor.'
      },
      populationSuggestion24: {
        title: 'SEGUIMIENTO DE RUTINA',
        description: 'Anime a su equipo a realizar un seguimiento de rutina al menos una vez al año. Mantener la prevención al día es fundamental para la salud.'
      },
      populationSuggestion25: {
        title: 'PREVENCIÓN DEL ALCOHOL',
        description: 'Aconseje a su equipo evitar el consumo de bebidas alcohólicas, ya que el exceso está asociado a diversos problemas de salud que perjudican la calidad de vida.'
      }
    }
  },

  cn: {
    conventional: '传统',
    pointOfCare: '即时检验',
    nav: {
      populationSimulator: '集体旅程',
      patientJourney: '个人旅程',
      changeLanguage: '更改语言',
      clearAll: '清除全部',
      clearAllTooltip: '清除所有数据',
      previous: '上一步',
      next: '下一步',
      last: '完成模拟',
      viewResults: '查看结果',
      calculateResults: '计算结果',
      processing: '处理中...'
    },
    category: {
      material: '材料',
      service: '服务'
    },
    products: {
      vacutainer: '真空采血管',
      needle: '一次性针头',
      lancet: '采血针',
      syringe: '一次性注射器',
      alcohol: '70%酒精',
      cotton: '棉花',
      sterileGauze: '无菌纱布',
      bandage: '粘性绷带',
      tape: '医用胶带',
      gloves: '一次性手套',
      tourniquet: '止血带',
      label: '识别标签',
      pipette: '移液管',
      glucoseSensor: '血糖传感器',
      capsule: 'Hilab胶囊',
      cassette: '盒式试剂',
      fundusEye: '眼底检查',
      fundusEyeEasy: '眼底检查（简易视网膜）',
      xray: 'X光',
      tomography: 'CT扫描',
      resonance: '核磁共振',
      thermography: '热成像',
      hospitalizationLowerBackPain: '住院：下背痛',
      hospitalizationHypertension: '住院：高血压（急诊）',
      hospitalizationDiabetes: '住院：糖尿病（DKA）',
      hospitalizationOverweight: '住院：超重/肥胖（减重手术）',
      hospitalizationNoChronicConditions: '住院：可避免的基础成本'
    },
    table: {
      product: '产品/服务',
      category: '类别',
      followUp: '随访',
      quantity: '数量',
      total: '总排放量'
    },
    step1: {
      title: '您是否定期接受医疗随访？',
      subtitle: '这会影响使用的用品数量，从而影响您的碳足迹。',
      navTitle: '选择符合您实际情况的选项',
      semiannual: '半年一次',
      semiannualDesc: '每6个月进行一次检查和体检',
      semiannualBenefit: '更好的控制和预防',
      annual: '一年一次',
      annualDesc: '每年进行一次检查和体检',
      annualBenefit: '基本病情控制',
      none: '无定期随访',
      noneDesc: '仅急诊护理',
      noneBenefit: '并发症风险较高',
      lowerBackPain: '下背痛',
      hypertension: '高血压',
      diabetes: '糖尿病',
      overweight: '超重/肥胖',
      noChronicConditions: '无慢性病',
      totalDescription: '患有非传染性疾病的总人口',
      totalSubDescription: '在此阶段，我们将统计进入模拟的人数，因此对于员工中存在的每种健康状况，请定义受影响的总人数。对每个相关项目重复此操作以获得完整的情况。',
      totalPeople: '总计：{count}人'
    },
    step2: {
      title: '选择适用于您情况的一种或多种健康状况。',
      navTitle: '至少选择1种状况',
      population: {
        sectionTitle: '按医疗随访分布',
        sectionSubtitle: '对于每种状况，根据员工的医疗随访频率进行分配。',
        total: '总计：',
        totalMustBe: '总数必须等于：',
        importantHint: '重要提示：',
        importantHintText: '每个类别（半年一次、一年一次或无随访）的人数总和必须等于您之前告知的该状况员工总数。',
        example: '示例：',
        exampleText: '如果您告知有10名高血压员工，总和（例如：5名半年一次 + 3名一年一次 + 2名无随访）必须等于10。',
        clickButtonsHint: '点击按钮以指示每种随访类型的人数'
      },
      lowerBackPainDesc: '脊柱腰部区域疼痛',
      hypertensionDesc: '血压升高',
      diabetesDesc: '1型或2型糖尿病',
      people: '人',
      overweightDesc: 'BMI超过25 kg/m²',
      noChronicConditionsDesc: '无已诊断的慢性病症',
      conditionsSelected: '已选择{count}种状况',
      noConditions: '未选择状况',
      calculateImpact: '让我们计算环境影响',
      selectCondition: '至少选择一种状况',
      lowerBackPain: '下背痛',
      hypertension: '高血压',
      diabetes: '糖尿病',
      overweight: '超重/肥胖',
      noChronicConditions: '无慢性病'
    },
    step3: {
      title: '您通常如何前往就诊地点？',
      navTitle: '调整您的通勤选项',
      transportationType: '只选择1种通勤选项',
      transportationDistanceKm: '向右滑动横向条以指示距离',
      conventional: '传统',
      pointOfCare: '即时检验',
      sectionTitle: '路线',
      sectionSubtitle: '输入要行驶的公里数',
      walking: '步行',
      motorcycle: '摩托车',
      car: '汽车',
      bus: '公共交通',
      population: {
        selectMethodHint: '选择其中一种方法以访问按产品、数量和随访类型生成的排放详细信息',
        productsServicesTitle: '使用的产品和服务',
        person: '人',
        people: '人',
        product: '产品',
        products: '产品',
        final: '最终'
      }
    },
    step4: {
      title: '患者产品和服务',
      navTitle: '提示：您可以在方法之间切换',
      totalPopulation: '总人口',
      productsGenerated: '生成的产品/服务',
      totalEmissions: '总排放量',
      productsServicesLabel: '产品/服务:',
      transportationLabel: '交通:',
      avoidableHospitalizations: '可避免的住院',
      emissionsByHospitalizations: '住院产生的排放',
      equivalentTrees: '等效树木',
      examComparison: '检查比较',
      followUpImpact: '随访影响',
      withFollowUp: '有随访',
      withoutFollowUp: '无随访',
      difference: '差异：{percent}%',
      emissionsByDisease: '按疾病分类的排放',
      reductionSuggestions: '这里有一个提示',
      selectedConditions: '现有疾病',
      population: {
        completeAnalysisTitle: '完整的环境影响分析',
        annualDistributionNote: '* 将当前分布转换为年度随访的模拟'
      }
    },
    step5: {
      title: '个人旅程结果',
      navTitle: '您可以通过点击图标在方法之间切换',
      ncdsMonitored: '监测的非传染性疾病',
      chronicConditions: '慢性病',
      productsGenerated: '生成的产品/服务',
      productsServices: '产品/服务',
      materialsUsed: '使用的材料',
      totalEmissions: '总排放量',
      productsServicesLabel: '产品/服务:',
      transportationLabel: '交通:',
      kgCO2ePerYear: 'kg CO₂e/年',
      avoidableEmissions: '可避免的排放',
      kgCO2eAvoidable: 'kg CO₂e 可避免',
      emissionsByHospitalizations: '住院产生的可避免排放',
      kgCO2eHospitalizations: 'kg CO₂e 住院',
      percentTotalEmissions: '占总排放量的35%',
      equivalentTrees: '种植的等效树木',
      treesToCompensate: '棵树用于补偿',
      treeAbsorption: '24 kg CO₂e/树/年',
      examComparison: '检查比较',
      conventional: '传统',
      pointOfCare: '即时检验',
      pocReduction: 'POC减少30%的排放',
      followUpImpact: '随访影响',
      withFollowUp: '有随访',
      withoutFollowUp: '无随访',
      noFollowUpWarning: '无随访增加{percent}%的排放',
      reductionSuggestions: '这里有一个提示',
      recommendations: '建议',
      visualComparison: '检查比较',
      percentOfEmissions: '占总排放量',
      currentScenario: '当前情景',
      withPOC: '即时检验',
      withPOCAnnual: '即时检验（年度）',
      withConventional: '传统',
      withConventionalAnnual: '传统（年度）',
      withoutFollowUpScenario: '无随访',
      exportPDF: '导出PDF',
      exportExcel: '导出Excel',
      newSimulation: '新模拟',
      different: '差异',
      ofEmission: '排放'
    },
    export: {
      openButtonLabel: '下载报告',
      modalTitle: '在下面的字段中填写您最好的电子邮件，以便我们可以向您发送模拟报告。',
      emailLabel: '电子邮件',
      emailPlaceholder: 'you@example.com',
      invalidEmail: '电子邮件无效。',
      sending: '发送中…',
      sendPdf: '发送',
      cancel: '取消',
      success: '已发送！检查您的收件箱。',
      fail: '发送错误。'
    },
    noFollowUp: {
      title: '无医疗随访',
      body: '由于您表示不进行定期随访，因此不会有通勤排放，排放将集中在可能的住院治疗上。',
      footer: '无法告知通勤情况。请继续下一步'
    },
    validation: {
      selectPopulation: '至少输入一个人群',
      completeDistribution: '完成直到每种状况达到100%)',
      productsTable: '提示：您可以在方法之间切换'
    },
    followUpTypes: {
      none: '无随访',
      annual: '年度',
      semiannual: '半年度'
    },
    recommendedSuggestion: {
      none: '至少每年进行一次随访（病情控制良好的患者）或每年两次（病情未控制的患者）。'
    },
    stepsIntro: {
      heading: '使用 E-Carbon 模拟器，看看您的健康选择如何影响碳排放',
      steps: {
        step1: '选择您进行健康随访的频率',
        step2: '指出存在的慢性病状况',
        step3: '前往就诊地点的通勤方式',
        step4: '将展示耗材与服务的对比',
        step5: '最后会有结果对比仪表板'
      },
      chooseJourney: '请选择要开始的旅程类型',
      individual: '个人',
      population: '集体',
      footer: '该倡议获得了工业创新平台的支持，由 SESI 和其他合作伙伴实施。'
    },
    patientQuestionnaire: {
      intro: {
        p1: '我们先通过一些问题来个性化您的建议。无论您的碳足迹如何，必要时进行健康随访始终更重要，因为它可避免不必要的住院。住院会增加成本，降低生活质量和期望寿命，并且对环境更有害。',
        p2: '请放心，您的回答是匿名且保密的，仅用于生成关于在所考虑的护理路径中使用或不使用健康耗材的碳消耗报告。',
        start: '开始吗？'
      },
      common: {
        select: '选择',
        none: '无',
        saving: '保存中...',
        continue: '继续',
        saveErrorPrefix: '保存出错：'
      },
      options: {
        gender: { female: '女性', male: '男性', other: '其他' },
        nutrition: { fivePlus: '5 或以上' },
        smoking: { no: '否', daily: '是，每天', occasionally: '是，偶尔', former: '已戒烟（超过6个月）' },
        consultations: { inPerson: '是，面诊', telehealth: '是，远程问诊', none: '不进行随访' },
        bloodTestsType: { conventional: '传统实验室', poc: '即时检验' }
      },
      questions: {
        q1: { label: '您的年龄是？' },
        q2: { label: '您的性别是？' },
        q3a: { label: '您每周有多少天连续步行至少10分钟？' },
        q3b: { label: '在步行的日子里，您持续运动多少分钟？' },
        q4a: { label: '您每周有多少天进行至少10分钟的轻度或中度运动？' },
        q4b: { label: '在进行轻度或中度运动的日子里，您每天活动多少分钟？' },
        q5a: { label: '您每周有多少天进行至少10分钟的剧烈运动？' },
        q5b: { label: '在进行剧烈运动的日子里，您每天活动多少分钟？' },
        q6: { label: '在大多数日子里，您吃多少份蔬菜？' },
        q7: { label: '在大多数日子里，您吃多少份水果？' },
        q8: { label: '在大多数日子里，您食用多少份加工或超加工食品？' },
        q9: { label: '您目前吸烟吗？' },
        q10: { label: '在一个典型的星期（包括周末）中，您有多少天喝酒？（如果不喝，请选择0）' },
        q11: { label: '在喝酒的日子里，您喝多少杯？（1 杯 = 啤酒长瓶 355ml、葡萄酒 148ml 或威士忌/伏特加/卡莎萨 30ml）' },
        q12: { label: '您是否定期进行医生或其他健康专业人员的随访？' },
        q13: { label: '您每年做多少次血液检查？' },
        q14: { label: '如果会做检查，是在传统实验室还是在即时检验点进行？（即时检验在就诊现场进行，创伤更小并采用更先进的技术，仅需一滴血）' }
      }
    },
    step2q: {
      hypertension: {
        emergencyVisits: {
          label: '在过去的12个月中，您是否因高血压（如中风、心肌梗死、高血压危象）而需要住院或急诊？',
          none: '没有',
          once: '是，1次',
          twiceOrMore: '是，2次或以上'
        },
        controlled: {
          label: '您的血压是否受控（最近的测量在医生设定的目标范围内）？',
          yes: '是',
          no: '否',
          unknown: '不确定 / 很少测量'
        },
        treatment: {
          label: '您目前如何管理高血压？',
          lifestyle: '生活方式改变（饮食、运动）',
          oralMeds: '口服药物（片剂）',
          stressMgmt: '压力管理',
          sleepMgmt: '睡眠管理'
        }
      },
      diabetes: {
        controlled: {
          label: '您最近的血糖测量或糖化血红蛋白是否在医生设定的目标范围内？',
          yes: '是',
          no: '否',
          unknown: '不确定 / 不经常监测'
        },
        emergencyVisits: {
          label: '过去12个月中，您是否因糖尿病而需要住院或急诊？',
          none: '没有',
          once: '是，1次',
          twiceOrMore: '是，2次或以上'
        },
        treatment: {
          label: '您目前如何管理糖尿病？',
          lifestyle: '生活方式改变（饮食、运动）',
          oralMeds: '口服药物（片剂）',
          injectables: '注射类药物',
          other: '其他'
        }
      },
      overweight: {
        bariatricSurgery: {
          label: '您是否做过减重手术？',
          no: '没有',
          lessThan1Year: '是，少于1年',
          moreThan1Year: '是，多于1年'
        },
        recommendation: {
          label: '是否有卫生专业人员曾推荐或指出您需要减重手术？',
          formallyIndicated: '是，已正式指示',
          considered: '是，曾考虑但未正式指示',
          no: '没有'
        },
        medication: {
          label: '您是否正在使用任何减重药物？',
          no: '没有',
          oral: '是，口服',
          injectable: '是，每周注射',
          both: '是，两者都用'
        },
        measures: {
          label: '您还使用哪些其他减重策略？',
          none: '无',
          exercise: '体育锻炼',
          healthyDiet: '健康饮食',
          dietAndExercise: '饮食与锻炼结合'
        }
      },
      lowerBackPain: {
        medication: {
          label: '您需要用药来控制疼痛吗？',
          daily: '是，每天',
          occasional: '是，偶尔',
          no: '不需要',
          unknown: '不确定'
        },
        imagingExams: {
          label: '过去12个月里，您为下背痛做过多少次影像检查？',
          xray: 'X光',
          tomography: 'CT',
          mri: '核磁共振',
          none: '无'
        },
        emergencyVisits: {
          label: '过去12个月里，您是否因下背痛而需要急诊或住院？',
          none: '没有',
          once: '是，1次',
          twiceOrMore: '是，2次或以上'
        }
      }
    },
    suggestions: {
      suggestion01: {
        title: '自我保健',
        description: '恭喜，以这种方式进行随访有助于保持良好健康。'
      },
      suggestion02: {
        title: '安全治疗',
        description: '按医生处方使用药物'
      },
      suggestion03: {
        title: '自我保健',
        description: '尝试经常检查您的血压'
      },
      suggestion04: {
        title: '建议',
        description: '选择关注环境可持续性的实验室，我们建议使用更精简的医疗用品模型，例如使用即时检验的实验室，同时缩短等待结果的时间，这些程序侵入性较小并使用更先进的技术。'
      },
      suggestion05: {
        title: '建议',
        description: '这是最合适的检查方法，旨在实现环境可持续性和缩短结果等待时间，为您带来更多舒适和便利。这些程序侵入性较小并使用更先进的技术。'
      },
      suggestion06: {
        title: '健康身体',
        description: '始终寻求健康饮食和进行体育活动'
      },
      suggestion07: {
        title: '健康身体',
        description: '尽管戒烟非常困难，但停止吸烟对您来说非常有益，必要时寻求专业帮助。'
      },
      suggestion08: {
        title: '健康身体',
        description: '避免饮酒，它会升高血压，使良好的控制变得困难。'
      },
      suggestion09: {
        title: '自我保健',
        description: '尝试每天至少检查两次血糖'
      },
      suggestion10: {
        title: '自我保健',
        description: '如果您使用胰岛素，请不断更换注射部位'
      },
      suggestion11: {
        title: '随访',
        description: '您需要至少每年接受一次眼科医生的监测'
      },
      suggestion12: {
        title: '健康身体',
        description: '照顾好您的脚，保持水分以预防糖尿病足'
      },
      suggestion13: {
        title: '健康身体',
        description: '避免饮酒，它会升高血压，还可能导致低血糖和高血糖，使良好的控制变得困难。'
      },
      suggestion14: {
        title: '随访',
        description: '寻求专业帮助以健康方式减肥'
      },
      suggestion15: {
        title: '随访',
        description: '寻求专业帮助以应对这种健康状况'
      },
      suggestion16: {
        title: '避免疼痛',
        description: '注意您的姿势，在工作内外小心举重；避免突然移动'
      },
      suggestion17: {
        title: '避免疼痛',
        description: '保持适当的体重'
      },
      suggestion18: {
        title: '病情控制良好的患者',
        description: '病情控制良好的患者（血压测量值在限制范围内）的正确随访'
      },
      suggestion19: {
        title: '病情控制良好的患者',
        description: '病情控制良好的患者（血糖测量值在限制范围内）的正确随访'
      },
      suggestion20: {
        title: '随访',
        description: '至少每年进行一次随访（病情控制良好的患者 - 血压测量值在限制范围内）或每年两次（病情未控制的患者 - 血压测量值超出限制范围）'
      },
      suggestion21: {
        title: '随访',
        description: '至少每年进行一次随访（病情控制良好的患者 - 血糖测量值在限制范围内）或每年两次（病情未控制的患者 - 血糖测量值超出限制范围）'
      },
      suggestion22: {
        title: '没问题',
        description: '如果您无法使用即时检验或更喜欢在传统实验室进行检查，请不要担心，重要的是不要停止照顾自己和您的健康！',
        subDescription: '请记住：尽管每年进行两次随访比每年一次消耗更多的碳，但年度或半年度随访取决于您的临床状况是否得到控制，这对您的健康更重要，因为它确保了对您状况的适当护理，并有助于避免未来的住院治疗——这将需要更多的碳使用。'
      },
      suggestion23: {
        title: '安全治疗',
        description: '如已开处方，请遵医嘱使用药物'
      },
      suggestion24: {
        title: '随访',
        description: '每年至少进行一次随访。'
      },
      suggestion25: {
        title: '随访',
        description: '正确的随访'
      },
      suggestion26: {
        title: '健康身体',
        description: '避免饮酒，因为酒精与多种健康问题有关。'
      }
    },
    healthRecommendations: {
      activity: {
        muito_ativo: {
          title: '恭喜您的体育活动！',
          description: '恭喜！您走在正确的道路上：您的体育活动遵循世卫组织的理想标准。为长寿和健康的生活继续保持！'
        },
        ativo: {
          title: '恭喜您的体育活动！',
          description: '恭喜！您走在正确的道路上：您的体育活动遵循世卫组织的理想标准。为长寿和健康的生活继续保持！'
        },
        irregularmente_ativo_a: {
          title: '增加您的体育活动',
          description: '在大多数日子增加您的锻炼。您可以分成几个块或一次性完成，随您喜欢！为了更多好处，请保持规律并逐步增加时间。每分钟都很重要！'
        },
        irregularmente_ativo_b: {
          title: '开始体育活动',
          description: '在大多数日子增加您的锻炼。您可以分成几个块或一次性完成，随您喜欢！为了更多好处，请保持规律并逐步增加时间。每分钟都很重要！'
        },
        sedentario: {
          title: '开始体育活动',
          description: '如果您喜欢适度锻炼，请每周至少练习150分钟。在这些锻炼中，您说话有困难但不唱歌，呼吸/心跳适度增加。对于剧烈活动，最少每周75分钟；在这里，您无法说话，呼吸/心脏加速很多。您可以结合两种强度来达到每周目标。此外，不要忘记在您的日常生活中至少包括2天的肌肉和骨骼强化锻炼（例如举重或自重）。'
        }
      },
      nutrition: {
        saudavel: {
          title: '健康饮食',
          description: '恭喜！您走在正确的道路上：您的体育活动遵循世卫组织的理想标准。为长寿和健康的生活继续保持！'
        },
        ruim: {
          title: '营养不足',
          description: '在您的饮食中优先考虑：水果、蔬菜、豆类（例如扁豆和豆子）、坚果和全谷物（例如燕麦和糙米）。每天至少消耗400克（五份）水果和蔬菜（排除含淀粉的根茎如土豆和木薯）。尽可能避免超加工食品！巴西食品指南不鼓励这些工业产品，这些产品富含糖、脂肪、盐/卡路里且营养素贫乏（例如：软饮料、小吃和方便面）。'
        }
      },
      smoking: {
        fumante: {
          title: '吸烟存在',
          description: '戒烟极为重要，因为不存在安全的吸烟。我们认识到这是一场艰难的斗争；寻求医疗帮助并探索可以帮助这一过程的药物。吸烟是大致50种致命和致残疾病的因果因素。世卫组织（世界卫生组织）估计，它负责71%的肺癌死亡、42%的慢性呼吸疾病和10%的心血管疾病，此外还是结核病等疾病的风险因素。'
        }
      },
      alcohol: {
        consumidor: {
          title: '乙醇消费者',
          description: '注意：没有任何水平的酒精消费对健康是安全的。风险和危害已被系统评估并有充分记录。世界卫生组织（WHO）声明，包括在《柳叶刀公共卫生》杂志上，没有任何安全的酒精量不会影响我们的健康。'
        }
      },
      hypertension: {
        controlada: {
          title: '控制性高血压',
          description: '恭喜！通过遵循专业监测并经常测量血压来保持良好的血压控制。请记住：治疗高血压需要行为改变，而不仅仅是药物和预约。遵循这些建议至关重要：通过适当的饮食习惯保持体重。减少盐，使用其他调味品代替。定期进行体育活动。享受休闲时光。戒烟。适度饮酒。避免油腻食物。控制糖尿病（如果适用）。'
        },
        descompensada: {
          title: '失控性高血压',
          description: '注意：您必须承担健康管理责任至关重要！寻求与医疗协助协调您的护理，正确保用药物，并澄清您对疾病和治疗的所有疑问。请记住：为避免并发症，遵守健康生活方式至关重要。如果困难，请寻求专业帮助。为更好地控制您的血压，请遵循这些建议：通过适当的饮食习惯保持体重。减少盐，使用其他调味品代替。定期进行体育活动。享受休闲时光。戒烟。适度饮酒。避免油腻食物。控制糖尿病（如果适用）。'
        }
      },
      diabetes: {
        controlada: {
          title: '控制性糖尿病',
          description: '恭喜！保持对糖尿病的良好控制。遵循专业监测，定期进行检查，永远不要忘记：治疗需要行为改变，不限于药物和预约。健康生活方式至关重要！'
        },
        descompensada: {
          title: '失控性糖尿病',
          description: '紧急开始生活方式改变！高血糖可能导致严重并发症（心脏、肾脏、眼睛、神经和动脉）。由于与生活方式相关，必须采用健康习惯，减少碳水化合物并从饮食中消除糖。保持专业随访于指示频率。为更好地控制，请遵循这些建议：通过适当的饮食习惯保持体重。定期进行体育活动。享受休闲时光。适度饮酒。按照医生处方使用药物。'
        }
      },
      overweight: {
        recomendacao: {
          title: '超重和肥胖',
          description: '治疗超重和肥胖的支柱是：营养教育（专注于卡路里缺口）、常规体育活动和生活方式改变。成功取决于动力和采用适当的饮食和锻炼习惯（包括有氧和阻力）。请记住：小体重减轻（5-10%）已经带来相关病理的显著改善。'
        }
      },
      lowerBackPain: {
        presenca: {
          title: '腰痛',
          description: '为预防腰痛，请保持活跃，采用正确姿势，并在工作中遵循人体工程学建议。如果疼痛，请寻求医疗注意并遵循处方治疗。即使使用药物，这些措施对您的恢复也至关重要：保持活跃并维持理想体重。锻炼：增强身体（灵活性、力量）和心灵（改善焦虑和自尊）。使用热袋（如果适用，在专业指导下）。体育活动前热身，结束后放松。有关活跃生活方式的更多细节，请咨询巴西人口体育活动指南。'
        }
      }
    },
    populationSuggestions: {
      sustainabilitySuggestion: {
        title: '建议',
        description: '鼓励您的团队选择致力于环境可持续性的实验室，优先考虑那些在医疗用品使用中采用更精简模型的实验室，例如使用即时检验的实验室。这些模型减少了等待结果的时间，使程序侵入性降低并使用更先进的技术。'
      },
      populationSuggestion01: {
        title: '集体自我保健',
        description: '太好了！通过随访，每个人都将有效地预防性地照顾自己的健康。'
      },
      populationSuggestion02: {
        title: '安全治疗',
        description: '指导您的团队，让每个人都按处方使用药物。正确遵循指示可确保更安全和有效的健康护理。'
      },
      populationSuggestion03: {
        title: '监测',
        description: '鼓励您的团队定期监测血压。这种简单的护理有助于保持健康并预防未来的问题。'
      },
      populationSuggestion04: {
        title: '可持续性',
        description: '鼓励您的团队选择关注环境的实验室。那些使用即时检验的实验室更快、侵入性更小并使用现代技术，这种选择为每个人带来更多的便利和舒适。'
      },
      populationSuggestion05: {
        title: '推荐检查',
        description: '向您的团队解释这种类型的检查最合适：可持续、快速并旨在带来更多舒适。它侵入性较小并使用现代技术，使一切对每个人来说更加实用。'
      },
      populationSuggestion06: {
        title: '健康生活',
        description: '鼓励您的团队保持均衡饮食和定期体育活动。这些习惯有助于整体健康并有助于预防各种健康状况。'
      },
      populationSuggestion07: {
        title: '戒烟',
        description: '戒烟很困难，但非常值得。鼓励您的团队在必要时寻求专业支持，小步骤对健康产生很大影响。'
      },
      populationSuggestion08: {
        title: '血压控制',
        description: '指导您的团队避免饮酒，因为它们会升高血压并使健康控制变得困难。这种关注有助于保持每个人的健康。'
      },
      populationSuggestion09: {
        title: '血糖监测',
        description: '鼓励您的团队每天至少检查两次血糖可以帮助保持健康在控制之下并预防并发症。'
      },
      populationSuggestion10: {
        title: '胰岛素使用',
        description: '提醒您的团队更换胰岛素注射部位。像这样的小改变会增加舒适度和治疗效果。'
      },
      populationSuggestion11: {
        title: '眼科随访',
        description: '提醒您的团队至少每年进行一次眼科随访的重要性。定期就诊有助于保持眼睛健康并预防未来的问题。'
      },
      populationSuggestion12: {
        title: '糖尿病足预防',
        description: '指导您的团队好好照顾他们的脚，保持它们的水分。这种简单的护理有助于预防糖尿病足等并发症。'
      },
      populationSuggestion13: {
        title: '体重控制',
        description: '鼓励您的团队寻求专业支持以健康方式减肥。在适当的指导下采取小步骤会对健康产生很大影响。'
      },
      populationSuggestion14: {
        title: '治疗依从性',
        description: '鼓励您的团队在被指示时按处方使用药物。遵循这一指导有助于保持每个人的健康在控制之下。'
      },
      populationSuggestion15: {
        title: '专业支持',
        description: '鼓励您的团队寻求专业支持以更好地照顾这种健康状况。在适当的指导下，过程变得更安全、更平静。'
      },
      populationSuggestion16: {
        title: '损伤预防',
        description: '指导您的团队保持良好的姿势，在工作内外小心举重。平稳的动作有助于避免损伤和不适。'
      },
      populationSuggestion17: {
        title: '健康体重',
        description: '鼓励您的团队照顾和保持健康体重。日常的小选择对每个人的健康产生很大影响。'
      },
      populationSuggestion18: {
        title: '血压控制良好',
        description: '您的血压控制得很好！继续定期监测以保持健康并避免问题。'
      },
      populationSuggestion19: {
        title: '血糖控制良好',
        description: '您的血糖控制得很好！继续定期监测以保持健康并避免并发症。'
      },
      populationSuggestion20: {
        title: '减少酒精',
        description: '建议您的团队减少酒精饮料，它们会升高血压并改变血糖，使健康控制更加困难。小的护理会产生很大的影响。'
      },
      populationSuggestion21: {
        title: '随访频率',
        description: '提醒您的团队：如果血压控制得很好，至少每年进行一次随访；如果超出限制，理想情况下每年咨询两次。保持这种护理对每个人的健康都有所不同。'
      },
      populationSuggestion22: {
        title: '随访频率',
        description: '提醒您的团队：如果血糖控制得很好，至少每年进行一次随访；如果超出限制，理想情况下每年咨询两次。保持这种护理对每个人的健康都有所不同。'
      },
      populationSuggestion23: {
        title: '选择的灵活性',
        description: '提醒您的团队：如果无法使用即时检验或他们更喜欢传统实验室，没关系。最重要的是继续照顾和关心自己的健康。',
        subDescription: '提醒您的团队，尽管半年度随访比年度消耗更多的碳，但理想的频率取决于每个人的临床状况。最重要的是确保对健康状况的适当护理，预防未来的住院治疗——这将产生更高的碳消耗。'
      },
      populationSuggestion24: {
        title: '常规随访',
        description: '鼓励您的团队每年至少进行一次常规随访。保持预防对于健康至关重要。'
      },
      populationSuggestion25: {
        title: '酒精预防',
        description: '建议您的团队避免饮用酒精饮料，因为过量饮酒与损害生活质量的各种健康问题有关。'
      }
    }
  }
}

export default TRANSLATIONS
