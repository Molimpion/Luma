# 💻 Luma

Desenvolvido por **CodeSquad**

Projeto Luma desenvolvido em React, TypeScript e Vite, com JSON Server como backend mock para prototipagem rápida de API.

## Descrição

Luma é uma aplicação front-end desenvolvida para ser uma plataforma web de registro de ponto. Construída com Vite e TypeScript, ela consome uma API simulada (JSON Server) que otimiza o processo de desenvolvimento e teste.

## Funcionalidades Principais

- Mock de API com JSON Server para endpoints REST (GET, POST, PUT/PATCH, DELETE)
- Frontend em React + TypeScript, com rotas e componentes organizados em `src/`.
- Interface responsiva (utilizando, por exemplo, a biblioteca MUI).
- Fluxo de dados via fetch apontando para o JSON Server.
- Scripts de desenvolvimento para rodar simultaneamente frontend e servidor mock.

## Tecnologias

- **Frontend Core**: **React** (v18.2.0), **Vite** (v6.2.0), **TypeScript** (~v5.7.2).
- **Roteamento**: **React Router DOM** (v7.5.3) para navegação na aplicação.
- **Estilo e Componentes UI**:
  - **Material UI (MUI)**: Inclui `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` para componentes de interface e ícones.
  - **Styled Components** (v6.1.18): Para estilos componentizados.
- **Manipulação de Dados e Visualização**:
  - **Day.js** (v1.11.13): Para manipulação de datas.
  - **MUI X-Charts** (v8.3.0): Para gráficos.
  - **MUI X-Data-Grid** (v8.2.0): Para tabelas de dados avançadas.
  - **MUI X-Date-Pickers** (v8.2.0): Para seleção de datas.
  - **MUI X-Tree-View** (v8.2.0): Para componentes de visualização em árvore.
- **Animações**: **React Spring** (`@react-spring/web` v10.0.0).
- **Mapas**:

  - **Leaflet** (v1.9.4) e **React Leaflet** (v4.2.1): Para componentes de mapa.

- **Mock Backend**: **JSON Server** (v1.0.0-beta.3) para simular endpoints RESTful.
- **Ferramentas de Desenvolvimento**:
  - **ESLint** (v9.27.0) e **Prettier**: Para padronização de código e linting.
  - **Vite** (v6.2.0): Como bundler e ambiente de desenvolvimento.
  - **npm scripts**: Para automação de tarefas.

## Próximos passos

- [ ] Atualizar o sistema de registrar ponto (Para conter 4 batidas de ponto: Entrada, Entrada e Saída do Almoço e Saída).
- [ ] Implementar a lógica de faltas e transcrever isso visualmente para o projeto a partir do calendário.
- [ ] Inserir informações mais descritivas para o espelho de ponto além do horário da entrada e saída.
- [ ] Utilizar bibliotecas para criar PDF para os seguintes botões: Baixar Espelho de Ponto, Acessar Resumo do Período e Banco de Horas.
- [ ] Fazer a Frequência Mensal ficar funcional e exibir corretamente nos gráficos.
- [ ] Criar as telas de Férias e Fale com o RH.
- [ ] Utilizar uma linguagem real de back-end para deixar o projeto mais rico.

## Pré-requisitos

- Node.js (versão compatível conforme `.nvmrc`).
- npm ou yarn instalado localmente.

## Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/jrcarlos99/Luma.git
   cd Luma
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Em uma aba no terminal, inicie o json server

   ```
   npm run start:server

   ```

4. Em outra aba, inicie o front-end

   ```
      npm run dev
   ```

**Membros:**

| 👨‍💻 Programadores    | 🎨 Designers       |
| ------------------- | ------------------ |
| João Carlos         | Thiago Vinícius    |
| Manoel Olimpio      | Virginia Fernandes |
| Victória de Gouveia | Maria Eduarda      |
| Maria Isabela       | Amanda Cruz        |
