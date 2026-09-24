# E-Carbon

## Produção

- Requisitos: Docker

Como executar

1. Copiar `.env.production` e renomear para `.env`.

2. Para iniciar o serviço: `docker compose up -d --build`

---

Comandos Úteis

1. Para apagar todos os serviços: `docker compose down`

## Desenvolvimento

Como Executar

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build
```

---

## Resumo

Sistema de cálculo de emissões de carbono na jornada do paciente, demonstrando o impacto ambiental de diferentes abordagens de cuidado médico.

## Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Context API** - Gerenciamento de estado

## Impacto Ambiental

O sistema calcula emissões baseado em:

- Tipo de acompanhamento (sem/nenhum, anual, semestral)
- Tipo de exame (convencional vs. point of care)
- Condições médicas do paciente
- Frequência de consultas

Para entender como os cálculos funcionam, consulte a [documentação de regras de negócio](docs/files/Markdown/DOMAIN_RULES.md).

## Objetivo

Comparar as emissões de carbono entre:

- **Exames Convencionais** (laboratório tradicional, mais materiais)
- **Exames Point of Care** (testes rápidos, menos materiais)

O sistema também avalia o impacto do acompanhamento preventivo regular versus internações hospitalares evitáveis.

## Estrutura do Projeto

```text
src/
├── components/
│   ├── patient/         # Componentes da jornada do paciente (4 steps)
│   └── ui/              # Componentes reutilizáveis
├── context/             # Context API (Patient, Wizard, Language)
├── hooks/               # Custom hooks
├── types/               # Definições TypeScript
└── utils/               # Funções utilitárias
```

## Documentação

- **[Regras de Negócio](docs/files/Markdown/DOMAIN_RULES.md)** - Documentação completa das regras de domínio, entidades, cálculos e decisões de arquitetura
- **[Fatores de Insumos](docs/files/Markdown/FATORES_EMISSAO_INSUMOS.md)**
- **[Cálculo de Carbono](docs/files/Markdown/CALCULO_CARBONO_CIS_MS.md)**

---

**Versão:** 1.0.0
**Última atualização:** Novembro 2025
