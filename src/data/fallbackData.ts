export const fallbackData = {
  profile: {
    full_name: 'Jeison Molina',
    title_es: 'Fullstack High-Code | Agentes IA & Orquestación Low-Code (n8n) | CloudOps & DevOps',
    title_en: 'Fullstack High-Code Developer | AI Agents & Low-Code Orchestrator (n8n) | CloudOps & DevOps',
    title: 'Fullstack High-Code | Agentes IA & Orquestación Low-Code (n8n) | CloudOps & DevOps',
    bio_es: 'Ingeniero de Software y Desarrollador con un perfil híbrido 10x enfocado en 3 pilares clave:\n\n1. 💻 FULLSTACK HIGH-CODE: Creación de aplicaciones web modernas, REST APIs escalables y gestión de datos transaccionales (React 19, Fastify 5, Node.js, PostgreSQL 16).\n2. ⚡ AGENTES IA & ORQUESTACIÓN LOW-CODE: Diseño de agentes autónomos, integración de LLMs locales (Ollama Llama 3.2), RAG y flujos en n8n para acelerar entregas empresariales 10x sin deuda técnica.\n3. 🛠️ CLOUDOPS & INFRAESTRUCTURA: Autohospedaje de servidores Ubuntu dedicados, redes cifradas con Cloudflare Zero Trust, Docker Compose y administración de identidades en Microsoft 365.',
    bio_en: 'Software Engineer and Hybrid Developer with a 10x productivity profile structured around 3 pillars:\n\n1. 💻 FULLSTACK HIGH-CODE: Building scalable web applications and high-throughput REST APIs using React 19, Fastify 5, Node.js, and PostgreSQL 16.\n2. ⚡ AI AGENTS & LOW-CODE ORCHESTRATION: Autonomous multi-agent pipelines, local LLMs (Ollama Llama 3.2), and n8n workflows for 10x faster enterprise delivery.\n3. 🛠️ CLOUDOPS & INFRASTRUCTURE: Self-hosting dedicated Ubuntu servers, encrypted Cloudflare Zero Trust tunnels, Docker Compose, and Microsoft 365 identity management.',
    bio: 'Ingeniero de Software enfocado en Fullstack High-Code, Agentes de IA y Orquestación Low-Code con n8n.',
    location: 'Bogotá, Colombia',
    whatsapp: '+573505498014',
    email: 'andreyyeisonmg@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jeison-molina12/',
    github: 'https://github.com/jeisonmolina',
    image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    cv_url: '/cv-fullstack.pdf',
    cv_backend_url: '/cv-fullstack.pdf',
    cv_automation_url: '/cv-automation.pdf',
    cv_helpdesk_url: '/cv-helpdesk.pdf'
  },
  skills: [
    // Perfil 1: Fullstack High-Code
    { id: 1, name: 'JavaScript (ES6+)', category: 'Fullstack' },
    { id: 2, name: 'TypeScript', category: 'Fullstack' },
    { id: 3, name: 'React 19', category: 'Fullstack' },
    { id: 4, name: 'Node.js / Fastify 5', category: 'Fullstack' },
    { id: 5, name: 'REST & WebSocket APIs', category: 'Fullstack' },
    { id: 6, name: 'Tailwind CSS / HTML5', category: 'Fullstack' },
    // Perfil 2: Agentes IA & Low-Code
    { id: 7, name: 'n8n Workflow Automation', category: 'IA & Low-Code' },
    { id: 8, name: 'Ollama & Local LLMs (Llama 3.2)', category: 'IA & Low-Code' },
    { id: 9, name: 'Python RPA & Pandas ETL', category: 'IA & Low-Code' },
    { id: 10, name: 'LangChain & RAG Pipelines', category: 'IA & Low-Code' },
    { id: 11, name: 'Microsoft Graph API & Webhooks', category: 'IA & Low-Code' },
    // Perfil 3: CloudOps & Infraestructura
    { id: 12, name: 'Docker & Docker Compose', category: 'CloudOps' },
    { id: 13, name: 'Ubuntu Server & Homeserver', category: 'CloudOps' },
    { id: 14, name: 'Cloudflare Zero Trust Tunnels', category: 'CloudOps' },
    { id: 15, name: 'Microsoft 365 & Active Directory', category: 'CloudOps' },
    { id: 16, name: 'ServiceNow / Jira ITIL v4', category: 'CloudOps' },
    // Bases de Datos & Herramientas
    { id: 17, name: 'PostgreSQL 16 / PGVector', category: 'Bases de Datos' },
    { id: 18, name: 'GitOps & CI/CD', category: 'Herramientas' }
  ],
  experience: [
    {
      id: 1,
      company: 'Fundación Universitaria Horizonte',
      role: 'Desarrollador Fullstack & Asistente de Tecnología / Soporte TI',
      period: 'Julio 2025 – Marzo 2026',
      description: 'Liderazgo técnico en el diseño e implementación del Sistema de Carnetización Digital Institucional. Desarrollo completo de la API REST con Node.js/Express, arquitectura de base de datos PostgreSQL y la interfaz de usuario en React. Adicionalmente, brindé soporte técnico N1/N2 (ServiceNow, Jira), gestioné cuentas/licencias de usuarios en Microsoft 365 / Active Directory y realicé el mantenimiento preventivo y correctivo de la infraestructura tecnológica de la universidad.',
      skills: 'React, Node.js, Express, PostgreSQL, REST APIs, JWT, Soporte TI, Microsoft 365, Active Directory, ServiceNow, Jira, Troubleshooting, Redes, ITIL v4'
    },
    {
      id: 2,
      company: 'Fundación Universitaria Horizonte',
      role: 'Especialista en Automatización de Procesos (Python / RPA)',
      period: 'Julio 2025 – Marzo 2026',
      description: 'Diseño, desarrollo y orquestación de soluciones de automatización corporativa de alto impacto: Proyecto Kairós (pipeline ETL en Python con Pandas y ZKTeco API para ingesta y validación de 50k+ registros biométricos diarios, ahorrando 12 días de trabajo manual al mes) y Proyecto Hermes (sincronización automática de identidades en Microsoft Azure AD mediante n8n, Python y Microsoft Graph API).',
      skills: 'Python, Pandas, n8n, Microsoft Graph API, ZKTeco API, ETL, OAuth 2.0, JSON, SQL, Automatización de Procesos, scripting'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Sistema de Carnetización Digital Institucional',
      description: 'Plataforma web Fullstack para la generación, validación y gestión centralizada de carnets digitales. Arquitectura basada en roles, autenticación segura JWT y API REST.',
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina',
      demo_url: null,
      tech_stack: 'React, Node.js, Express, PostgreSQL, Tailwind CSS'
    },
    {
      id: 2,
      title: 'Proyecto Kairós – Automatización Control de Accesos Biométricos',
      description: 'Sistema de automatización en Python para procesamiento masivo de datos de torniquetes biométricos ZKTeco. Automatiza la conciliación de horarios, ahorrando 12 días de trabajo manual al mes.',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina',
      demo_url: null,
      tech_stack: 'Python, Pandas, ZKTeco API, PostgreSQL, ETL'
    },
    {
      id: 3,
      title: 'Proyecto Hermes – Sincronización Automática Microsoft 365',
      description: 'Orquestador híbrido de automatización (Python + n8n + Graph API) que sincroniza en tiempo real usuarios entre el sistema educativo Q10 y Microsoft Azure AD.',
      image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina/hermes',
      demo_url: 'https://github.com/jeisonmolina/hermes#architecture',
      tech_stack: 'Python, n8n, Microsoft Graph API, OAuth 2.0'
    },
    {
      id: 4,
      title: 'Mesa de Ayuda TI & Gestión de Activos Informáticos',
      description: 'Flujo estructurado para mesa de ayuda e inventario informático. Protocolo de atención de incidencias N1/N2, monitoreo de SLAs y gestión de hardware/software.',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      github_url: 'https://github.com/jeisonmolina',
      demo_url: null,
      tech_stack: 'ServiceNow, Jira Service Desk, Active Directory, Troubleshooting N1/N2'
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Corporación Unificada Nacional – CUN',
      degree: 'Ingeniería de Sistemas',
      period: 'En curso (7mo Semestre)',
      description: 'Formación en arquitectura de software, redes de computadoras, gestión de bases de datos y seguridad informática.'
    },
    {
      id: 2,
      institution: 'Servicio Nacional de Aprendizaje – SENA',
      degree: 'Tecnólogo en Análisis y Desarrollo de Software',
      period: 'Graduación 2026',
      description: 'Ciclo de vida de software, metodologías ágiles y bases de datos relacionales.'
    }
  ]
};

