# E-Carbon

**E-Carbon** is a carbon emissions calculation system focused on the **patient journey**, designed to demonstrate the environmental impact of different healthcare approaches.

The platform enables the analysis and comparison of carbon emissions generated throughout different stages of patient care, helping healthcare organizations better understand how clinical pathways, examinations, follow-up strategies, and hospitalizations can influence environmental sustainability.

The project was developed within **SESI/SENAI**, two major Brazilian institutions that support the industrial sector through education, occupational health and safety, professional training, research, innovation, and technological development.

**SESI (Industry Social Service)** works to promote the health, well-being, education, and quality of life of industrial workers and their communities, while **SENAI (National Industrial Apprenticeship Service)** is one of Brazil's leading institutions for professional and technological education, applied research, innovation, and technical solutions for industry.

The project was **presented by SESI/SENAI at COP30**, highlighting the use of technology, healthcare data, and carbon-emissions analysis to support more sustainable healthcare practices.

## Production

### Requirements

* Docker

### How to Run

1. Copy `.env.production` and rename it to `.env`.

2. Start the service:

```bash
docker compose up -d --build
```

---

### Useful Commands

To stop and remove all services:

```bash
docker compose down
```

## Development

### How to Run

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build
```

---

## Overview

E-Carbon is a **carbon emissions calculation system for the patient journey**, designed to assess and demonstrate the environmental impact of different healthcare approaches.

The system analyzes emissions generated across different stages of patient care, allowing different care strategies to be compared and providing insights into how healthcare decisions can affect environmental sustainability.

By combining healthcare data with carbon emission calculations, the platform helps visualize the environmental consequences of different patient pathways and supports the development of more sustainable healthcare practices.

The project was **presented by SESI/SENAI at COP30** as an initiative combining technology, healthcare, data analysis, and environmental sustainability.

## Technologies

* **React 18** + **TypeScript**
* **Vite** - Build tool
* **TailwindCSS** - Styling
* **Radix UI** - Accessible UI components
* **Context API** - State management

## Environmental Impact

The system calculates carbon emissions based on:

* Type of patient follow-up (none, annual, or semiannual)
* Type of examination (conventional vs. point-of-care)
* Patient medical conditions
* Frequency of medical appointments

To understand how the calculations work, see the [business rules documentation](docs/files/Markdown/DOMAIN_RULES.md).

## Objective

The main objective is to compare carbon emissions between:

* **Conventional Examinations** - Traditional laboratory testing, generally involving more materials and resources
* **Point-of-Care Examinations** - Rapid tests performed closer to the patient, generally requiring fewer materials

The system also evaluates the environmental impact of **regular preventive follow-up compared with potentially avoidable hospitalizations**, helping illustrate how different healthcare strategies can affect both patient care and carbon emissions.

## Project Structure

```text
src/
├── components/
│   ├── patient/         # Patient journey components (4 steps)
│   └── ui/              # Reusable UI components
├── context/             # Context API (Patient, Wizard, Language)
├── hooks/               # Custom hooks
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## Documentation

* **[Business Rules](docs/files/Markdown/DOMAIN_RULES.md)** - Complete documentation covering domain rules, entities, calculations, and architectural decisions
* **[Material Emission Factors](docs/files/Markdown/FATORES_EMISSAO_INSUMOS.md)**
* **[Carbon Calculation](docs/files/Markdown/CALCULO_CARBONO_CIS_MS.md)**

---

**Version:** 1.0.0
**Last Updated:** November 2025
