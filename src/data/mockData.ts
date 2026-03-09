import { Code2, FileCode2, Paintbrush, LayoutTemplate, Database, Layers } from "lucide-react";

export type Status = "not-started" | "in-progress" | "completed";

export interface Topic {
  id: string;
  title: string;
  description: string;
  status: Status;
  duration: string;
  summary: string;
  keyConcepts: string[];
  codeExample: string;
  videoUrl: string;
  timestamps: { time: string; description: string }[];
  reviewQuestions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon
  totalTopics: number;
  completedTopics: number;
  topics: Topic[];
}

export const mockData: Module[] = [
  {
    id: "typescript-basic",
    title: "TypeScript (Básico)",
    description: "Fundamentos de tipagem estática com TypeScript.",
    icon: FileCode2,
    totalTopics: 8,
    completedTopics: 0,
    topics: [
      {
        id: "ts-1",
        title: "Fundamentos de Tipagem",
        description: "Entenda por que usar TypeScript e como ele funciona.",
        status: "not-started",
        duration: "15 min",
        summary: "TypeScript é um superset do JavaScript que adiciona tipagem estática ao código. Isso significa que você pode definir o tipo de cada variável antes de executar o programa. Diferente do JavaScript tradicional, onde os tipos são descobertos apenas em tempo de execução, o TypeScript verifica erros ainda durante o desenvolvimento. Isso ajuda a evitar bugs, torna o código mais previsível e melhora a experiência no editor.",
        keyConcepts: ["Superset", "Static Typing", "Dynamic Typing", "Compilation", "Primitive Types"],
        codeExample: "function saudarUsuario(nome: string, idade: number) {\n  return `Olá, ${nome}! Você tem ${idade} anos.`;\n}\n\nconsole.log(saudarUsuario(\"Carlos\", 28));",
        videoUrl: "https://www.youtube.com/watch?v=sv9ekpBTk_A",
        timestamps: [
          { time: "00:13", description: "O que é TypeScript e o conceito de superset" },
          { time: "01:06", description: "Processo de compilação para JavaScript" },
          { time: "02:34", description: "Problemas da tipagem dinâmica no JavaScript" },
          { time: "05:30", description: "Tipagem dinâmica vs tipagem estática" },
          { time: "08:33", description: "Exemplos de tipagem em funções e arrays" },
          { time: "14:16", description: "Devo aprender JavaScript ou TypeScript primeiro?" }
        ],
        reviewQuestions: [
          {
            question: "O que significa dizer que TypeScript é um superset do JavaScript?",
            options: [
              "É uma linguagem completamente diferente",
              "É uma camada que adiciona funcionalidades ao JavaScript",
              "É um framework para backend",
              "É uma biblioteca de UI"
            ],
            correctAnswer: "É uma camada que adiciona funcionalidades ao JavaScript"
          },
          {
            question: "Qual a principal vantagem da tipagem estática?",
            options: [
              "Deixar o site mais rápido",
              "Detectar erros antes da execução",
              "Eliminar a necessidade de JavaScript",
              "Converter automaticamente tipos"
            ],
            correctAnswer: "Detectar erros antes da execução"
          },
          {
            question: "O que acontece se você atribuir uma string a uma variável tipada como number?",
            options: [
              "O TypeScript ignora",
              "O código quebra apenas no navegador",
              "O editor mostra erro de tipo",
              "A variável vira array"
            ],
            correctAnswer: "O editor mostra erro de tipo"
          }
        ]
      },
      {
        id: "ts-2",
        title: "Tipos Primitivos",
        description: "Os tipos básicos de dados no TypeScript.",
        status: "not-started",
        duration: "20 min",
        summary: "O TypeScript é um superconjunto do JavaScript que adiciona tipagem estática à linguagem. Isso significa que podemos definir o formato dos dados que uma variável pode armazenar antes mesmo do código rodar. Os tipos primitivos são os blocos de construção mais básicos para representar esses dados. Os três principais são: texto (string), números (number) e valores lógicos verdadeiro/falso (boolean).\nUtilizar esses tipos ajuda a evitar bugs inesperados, pois o editor de código avisa imediatamente se tentarmos colocar o formato errado de dado em uma variável.",
        keyConcepts: ["string", "number", "boolean", "Tipagem Explícita", "Tipagem Implícita", "any"],
        codeExample: "let nomeDoUsuario: string = \"Carlos\";\nlet idade: number = 28;\nlet possuiContaAtiva: boolean = true;\nlet pontuacao = 150;\nlet dadoMisterioso: any = \"Texto\";\ndadoMisterioso = 100;",
        videoUrl: "https://www.youtube.com/watch?v=J_9lFQG4i7o",
        timestamps: [
          { time: "00:00", description: "Introdução à tipagem estática" },
          { time: "00:17", description: "Tipos primitivos: boolean, number, string, bigint e symbol" },
          { time: "00:50", description: "Diferença entre tipos explícitos e implícitos" },
          { time: "01:21", description: "Exemplo prático de erro pego pela tipagem estática" },
          { time: "01:47", description: "Como funciona o tipo any e por que ter cuidado" },
          { time: "02:29", description: "Introdução a Arrays" }
        ],
        reviewQuestions: [
          {
            question: "Qual tipo primitivo é o mais adequado para representar se um usuário está logado ou não em um sistema?",
            options: ["string", "number", "boolean", "any"],
            correctAnswer: "boolean"
          },
          {
            question: "O que acontece se você declarar let cidade: string = \"São Paulo\"; e depois tentar fazer cidade = 10;?",
            options: [
              "O código roda perfeitamente e converte o número para texto",
              "O TypeScript acusa um erro informando que number não pode ser atribuído a string",
              "A variável muda automaticamente para number",
              "O TypeScript altera o valor para \"10\""
            ],
            correctAnswer: "O TypeScript acusa um erro informando que number não pode ser atribuído a string"
          },
          {
            question: "O que é inferência de tipo no TypeScript?",
            options: [
              "É a obrigatoriedade de escrever o tipo de todas as variáveis",
              "É a capacidade do TypeScript de entender automaticamente o tipo com base no valor inicial",
              "É o processo de converter TypeScript para JavaScript",
              "É uma falha do sistema que permite usar qualquer formato de dado"
            ],
            correctAnswer: "É a capacidade do TypeScript de entender automaticamente o tipo com base no valor inicial"
          },
          {
            question: "Por que o uso constante do tipo any não é recomendado?",
            options: [
              "Porque deixa o código mais lento",
              "Porque só aceita textos e números",
              "Porque desativa a checagem de tipos e tira a segurança do TypeScript",
              "Porque exige mais linhas de código"
            ],
            correctAnswer: "Porque desativa a checagem de tipos e tira a segurança do TypeScript"
          }
        ]
      },
      {
        id: "ts-3",
        title: "Arrays e Objetos",
        description: "Como tipar coleções e estruturas de dados.",
        status: "not-started",
        duration: "20 min",
        summary: "Aprenda a definir tipos para arrays e objetos complexos no TypeScript.",
        keyConcepts: ["Array types", "Object types", "Record"],
        codeExample: "let numbers: number[] = [1, 2, 3];\nlet user: { name: string; age: number } = { name: 'Alice', age: 30 };",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ts-4",
        title: "Interfaces",
        description: "Criando contratos para objetos.",
        status: "not-started",
        duration: "35 min",
        summary: "Interfaces e Type Aliases são usados para nomear tipos e definir contratos no seu código. Eles são fundamentais para tipar objetos, funções e props no React.",
        keyConcepts: ["Contratos", "Interfaces", "Type Aliases", "Extensão de tipos"],
        codeExample: "interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: \"João\"\n};",
        videoUrl: "https://youtube.com/watch?v=exemplo-ts-2",
        timestamps: [
          { time: "00:00", description: "O que são Interfaces" },
          { time: "07:30", description: "Propriedades opcionais" },
          { time: "14:10", description: "Interface vs Type" }
        ]
      },
      {
        id: "ts-5",
        title: "Type Aliases",
        description: "Criando nomes personalizados para tipos.",
        status: "not-started",
        duration: "20 min",
        summary: "Type aliases permitem criar um nome para qualquer tipo, não apenas objetos.",
        keyConcepts: ["Type alias", "Diferença entre type e interface"],
        codeExample: "type ID = string | number;\ntype Point = { x: number; y: number };",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ts-6",
        title: "Propriedades Opcionais",
        description: "Lidando com propriedades que podem não existir.",
        status: "not-started",
        duration: "15 min",
        summary: "Use o modificador ? para marcar propriedades como opcionais em interfaces e types.",
        keyConcepts: ["Modificador ?", "undefined"],
        codeExample: "interface Config {\n  url: string;\n  timeout?: number;\n}",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ts-7",
        title: "Union Types",
        description: "Tipos que podem ser uma de várias opções.",
        status: "not-started",
        duration: "20 min",
        summary: "Union types permitem que um valor seja de um tipo OU de outro.",
        keyConcepts: ["Operador |", "Type narrowing"],
        codeExample: "function printId(id: number | string) {\n  console.log(id);\n}",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ts-8",
        title: "Tipagem de Funções",
        description: "Tipando parâmetros e retornos de funções.",
        status: "not-started",
        duration: "40 min",
        summary: "Generics fornecem uma maneira de criar componentes e funções que podem trabalhar com uma variedade de tipos em vez de um único tipo, mantendo a segurança da tipagem.",
        keyConcepts: ["Reutilização", "Tipos dinâmicos", "Type Variables", "Flexibilidade"],
        codeExample: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nlet output = identity<string>(\"myString\");",
        videoUrl: "https://youtube.com/watch?v=exemplo-ts-3",
        timestamps: [
          { time: "00:00", description: "Problema sem Generics" },
          { time: "05:45", description: "Sintaxe básica" },
          { time: "13:20", description: "Generics com Interfaces" }
        ]
      }
    ]
  },
  {
    id: "react-basic",
    title: "React (Básico)",
    description: "Fundamentos da biblioteca React para construção de interfaces.",
    icon: Code2,
    totalTopics: 8,
    completedTopics: 0,
    topics: [
      {
        id: "react-1",
        title: "O que é o React",
        description: "Introdução à biblioteca React.",
        status: "completed",
        duration: "15 min",
        summary: "React é uma biblioteca JavaScript para construir interfaces visuais de forma modular. A grande virada de chave do React é abandonar o pensamento de \"página inteira de cima a baixo\" e adotar a \"maneira React de pensar\": olhar para uma interface e dividi-la em pequenos pedaços reutilizáveis chamados Componentes. Um Componente é, no código, uma função JavaScript que retorna JSX (um HTML especial). Em vez de copiar e colar blocos de HTML pela página, você agrupa esse código, dá um nome e usa como se fosse uma tag HTML própria (ex: <Header />, <Section />, <ListItem />). Para tornar componentes flexíveis, usamos Props (propriedades): funcionam como atributos HTML (como src ou controls), mas para seus próprios componentes. Através das props você passa dados diferentes para o mesmo componente, tornando-o dinâmico e reutilizável. A interface é construída como blocos de montar, no conceito de pai e filho: componentes menores encaixados dentro de componentes maiores.",
        keyConcepts: [
          "Biblioteca: Conjunto de ferramentas prontas que aceleram o desenvolvimento de interfaces visuais",
          "Componente: Função JavaScript que retorna JSX; representa um \"pedaço de interface\" reutilizável",
          "JSX: Sintaxe parecida com HTML usada dentro de funções JavaScript no React",
          "Props: Propriedades passadas a um componente, funcionam como atributos HTML customizados",
          "Reutilização: Usar o mesmo componente várias vezes com props diferentes, sem copiar código",
          "Pai e Filho: Componentes podem conter outros componentes, formando uma árvore de interface",
          "Children: Prop especial que permite passar conteúdo entre as tags de abertura e fechamento de um componente"
        ],
        codeExample: `// Componente simples com props
function ListItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Componente pai usando ListItem com props diferentes
function App() {
  return (
    <div>
      <Header />
      <Section>
        <ListItem title="O que é React" description="Uma biblioteca para interfaces." />
        <ListItem title="Componentes" description="Funções que retornam JSX." />
        <ListItem title="Props" description="Dados passados entre componentes." />
      </Section>
    </div>
  );
}`,
        videoUrl: "https://www.youtube.com/watch?v=K65wUN-2no4",
        timestamps: [
          { time: "00:03:47", description: "O que é o React e como ele ajuda" },
          { time: "00:04:56", description: "A teoria de componentes: dividindo a interface em pedaços" },
          { time: "00:05:51", description: "Transformando componentes em tags HTML próprias" },
          { time: "00:12:38", description: "Definição no código: função que retorna JSX" },
          { time: "00:16:18", description: "Prática: criando o componente Header" },
          { time: "00:21:09", description: "Prática: criando o componente Section" },
          { time: "00:24:05", description: "O que são Props" },
          { time: "00:25:32", description: "Como receber e exibir Props no componente" },
          { time: "00:27:33", description: "Prática: criando o componente ListItem" },
          { time: "00:34:42", description: "O conceito de children" }
        ],
        reviewQuestions: [
          {
            question: "O que é o React?",
            options: [
              "Um framework backend em Node.js",
              "Uma biblioteca JavaScript para construir interfaces de usuário",
              "Um banco de dados relacional",
              "Um gerenciador de pacotes"
            ],
            correctAnswer: "Uma biblioteca JavaScript para construir interfaces de usuário"
          },
          {
            question: "O que é JSX?",
            options: [
              "Uma linguagem de programação concorrente ao JavaScript",
              "Um formato de imagem otimizado para web",
              "Uma sintaxe parecida com HTML usada dentro de funções JavaScript",
              "Um banco de dados NoSQL"
            ],
            correctAnswer: "Uma sintaxe parecida com HTML usada dentro de funções JavaScript"
          },
          {
            question: "O que são Props no React?",
            options: [
              "Propriedades passadas a um componente, funcionando como atributos HTML customizados",
              "Variáveis de estado interno de um componente",
              "Funções que buscam dados de uma API",
              "Estilos CSS aplicados globalmente"
            ],
            correctAnswer: "Propriedades passadas a um componente, funcionando como atributos HTML customizados"
          },
          {
            question: "Qual é a principal vantagem de usar componentes no React?",
            options: [
              "Eles executam no servidor, melhorando o SEO",
              "Permitem dividir a interface em pedaços reutilizáveis e independentes",
              "Substituem a necessidade de usar CSS",
              "Fazem o download de imagens mais rápido"
            ],
            correctAnswer: "Permitem dividir a interface em pedaços reutilizáveis e independentes"
          }
        ]
      },
      {
        id: "react-2",
        title: "Componentes",
        description: "Criando blocos de construção de UI.",
        status: "in-progress",
        duration: "25 min",
        summary: "Componentes permitem dividir a UI em partes independentes e reutilizáveis. Props (propriedades) são a forma como passamos dados de um componente pai para um componente filho.",
        keyConcepts: ["Reutilização", "Props", "Composição", "One-way data flow"],
        codeExample: "interface Props {\n  name: string;\n}\n\nconst Greeting = ({ name }: Props) => {\n  return <h1>Olá, {name}!</h1>;\n};",
        videoUrl: "https://youtube.com/watch?v=exemplo-react-2",
        timestamps: [
          { time: "00:00", description: "O que são componentes" },
          { time: "05:10", description: "Passando props" },
          { time: "12:30", description: "Composição de componentes" }
        ]
      },
      {
        id: "react-3",
        title: "Props",
        description: "Passando dados entre componentes.",
        status: "not-started",
        duration: "20 min",
        summary: "Props são argumentos passados para componentes React, semelhantes a atributos HTML.",
        keyConcepts: ["Argumentos", "Read-only", "Comunicação pai-filho"],
        codeExample: "function Welcome(props: { name: string }) {\n  return <h1>Hello, {props.name}</h1>;\n}",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "react-4",
        title: "Estado",
        description: "Gerenciando dados que mudam ao longo do tempo.",
        status: "not-started",
        duration: "30 min",
        summary: "O hook useState permite adicionar estado local a componentes funcionais. Quando o estado muda, o React re-renderiza o componente para refletir a nova interface.",
        keyConcepts: ["Hooks", "Estado local", "Imutabilidade", "Re-renderização"],
        codeExample: "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Cliques: {count}</button>;\n};",
        videoUrl: "https://youtube.com/watch?v=exemplo-react-3",
        timestamps: [
          { time: "00:00", description: "Introdução aos Hooks" },
          { time: "04:15", description: "Sintaxe do useState" },
          { time: "09:50", description: "Atualizando o estado" }
        ]
      },
      {
        id: "react-5",
        title: "Renderização",
        description: "Como o React atualiza a tela.",
        status: "not-started",
        duration: "20 min",
        summary: "Entenda o ciclo de renderização do React e como ele decide o que atualizar no DOM.",
        keyConcepts: ["Render phase", "Commit phase", "Reconciliation"],
        codeExample: "// React handles rendering automatically when state changes",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "react-6",
        title: "Listas e Keys",
        description: "Renderizando múltiplas instâncias de componentes.",
        status: "not-started",
        duration: "20 min",
        summary: "Aprenda a renderizar arrays de dados e a importância da prop 'key'.",
        keyConcepts: ["Array.map", "Keys únicas", "Performance"],
        codeExample: "items.map(item => <li key={item.id}>{item.name}</li>)",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "react-7",
        title: "Hooks Básicos",
        description: "Usando recursos do React em componentes funcionais.",
        status: "not-started",
        duration: "30 min",
        summary: "Hooks permitem usar state e outros recursos do React sem escrever uma classe.",
        keyConcepts: ["useState", "useEffect", "Regras dos Hooks"],
        codeExample: "useEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "react-8",
        title: "Composição de Componentes",
        description: "Construindo UIs complexas a partir de componentes simples.",
        status: "not-started",
        duration: "25 min",
        summary: "A composição é o modelo de design principal do React para construir UIs.",
        keyConcepts: ["Children prop", "Containment", "Specialization"],
        codeExample: "function Dialog({ children }) {\n  return <div className=\"dialog\">{children}</div>;\n}",
        videoUrl: "",
        timestamps: []
      }
    ]
  },
  {
    id: "framework",
    title: "Framework (Next / Vite)",
    description: "Ferramentas para construir e servir aplicações React.",
    icon: LayoutTemplate,
    totalTopics: 7,
    completedTopics: 0,
    topics: [
      {
        id: "fw-1",
        title: "O que o Vite faz",
        description: "Entendendo o build tool Vite.",
        status: "not-started",
        duration: "15 min",
        summary: "Vite é uma ferramenta de build que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta para projetos web modernos.",
        keyConcepts: ["Dev server rápido", "ES Modules", "Build otimizado"],
        codeExample: "// vite.config.ts\nexport default defineConfig({\n  plugins: [react()]\n})",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-2",
        title: "Como a aplicação inicia",
        description: "O ponto de entrada de uma aplicação React.",
        status: "not-started",
        duration: "15 min",
        summary: "Aprenda como o React é montado no DOM a partir do arquivo index.html e main.tsx.",
        keyConcepts: ["index.html", "main.tsx", "createRoot"],
        codeExample: "createRoot(document.getElementById('root')!).render(<App />);",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-3",
        title: "Estrutura do Projeto",
        description: "Organizando arquivos e pastas.",
        status: "not-started",
        duration: "20 min",
        summary: "Padrões comuns para organizar componentes, hooks, utilitários e assets em um projeto React.",
        keyConcepts: ["src folder", "components", "pages", "assets"],
        codeExample: "src/\n  components/\n  pages/\n  hooks/\n  App.tsx",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-4",
        title: "Páginas e Rotas",
        description: "Navegação em aplicações React.",
        status: "not-started",
        duration: "25 min",
        summary: "Como usar bibliotecas como React Router para criar navegação entre diferentes páginas.",
        keyConcepts: ["React Router", "Route", "Link", "Navegação client-side"],
        codeExample: "<Routes>\n  <Route path=\"/\" element={<Home />} />\n</Routes>",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-5",
        title: "Conceito de SPA",
        description: "Single Page Applications explicadas.",
        status: "not-started",
        duration: "20 min",
        summary: "Entenda o que é uma SPA e como ela difere de sites tradicionais multi-page.",
        keyConcepts: ["Sem recarregamento de página", "Client-side routing", "AJAX"],
        codeExample: "// SPAs load a single HTML page and update the body dynamically",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-6",
        title: "Diferença entre Vite e Next.js",
        description: "Comparando ferramentas do ecossistema React.",
        status: "not-started",
        duration: "25 min",
        summary: "Vite é focado em SPAs (Client-Side Rendering), enquanto Next.js é um framework full-stack com suporte a Server-Side Rendering (SSR).",
        keyConcepts: ["CSR vs SSR", "Build tool vs Framework", "Roteamento"],
        codeExample: "// Vite: CSR\n// Next.js: SSR / SSG / CSR",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "fw-7",
        title: "Quando usar cada um",
        description: "Escolhendo a ferramenta certa para o trabalho.",
        status: "not-started",
        duration: "20 min",
        summary: "Critérios para escolher entre Vite (SPAs simples, dashboards) e Next.js (SEO, e-commerce, blogs).",
        keyConcepts: ["SEO requirements", "Complexidade", "Backend needs"],
        codeExample: "// Choose Vite for internal dashboards\n// Choose Next.js for public landing pages",
        videoUrl: "",
        timestamps: []
      }
    ]
  },
  {
    id: "ui-components",
    title: "Componentização e UI",
    description: "Construindo interfaces bonitas e consistentes.",
    icon: Paintbrush,
    totalTopics: 7,
    completedTopics: 0,
    topics: [
      {
        id: "ui-1",
        title: "Componentes Reutilizáveis",
        description: "Criando componentes UI genéricos.",
        status: "not-started",
        duration: "20 min",
        summary: "Como projetar componentes como botões e inputs para serem usados em toda a aplicação.",
        keyConcepts: ["Design System", "Variantes", "Props flexíveis"],
        codeExample: "function Button({ variant = 'primary', ...props }) { ... }",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ui-2",
        title: "Estrutura de UI",
        description: "Organizando a interface do usuário.",
        status: "not-started",
        duration: "20 min",
        summary: "Padrões comuns de layout de aplicações web, como headers, sidebars e content areas.",
        keyConcepts: ["Layouts", "Containers", "Navegação"],
        codeExample: "<AppLayout>\n  <Sidebar />\n  <MainContent />\n</AppLayout>",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ui-3",
        title: "Layout com Tailwind",
        description: "Usando Tailwind para estruturar a página.",
        status: "completed",
        duration: "25 min",
        summary: "O Tailwind facilita a criação de layouts complexos fornecendo utilitários diretos para CSS Flexbox e Grid, permitindo alinhar e distribuir elementos rapidamente.",
        keyConcepts: ["Flexbox", "CSS Grid", "Alinhamento", "Distribuição de espaço"],
        codeExample: "<div class=\"grid grid-cols-3 gap-4\">\n  <div class=\"bg-blue-500 p-4\">1</div>\n  <div class=\"bg-blue-500 p-4\">2</div>\n  <div class=\"bg-blue-500 p-4\">3</div>\n</div>",
        videoUrl: "https://youtube.com/watch?v=exemplo-tw-2",
        timestamps: [
          { time: "00:00", description: "Introdução ao Flexbox" },
          { time: "08:20", description: "Introdução ao Grid" },
          { time: "15:40", description: "Gap e Alinhamento" }
        ]
      },
      {
        id: "ui-4",
        title: "Espaçamento e Hierarquia Visual",
        description: "Princípios de design aplicados ao CSS.",
        status: "completed",
        duration: "10 min",
        summary: "Tailwind CSS é um framework CSS utility-first. Em vez de escrever CSS personalizado, você usa classes utilitárias predefinidas diretamente no seu HTML para construir designs.",
        keyConcepts: ["Utility-first", "Produtividade", "Semântica de classes", "Customização"],
        codeExample: "<div class=\"p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4\">\n  <div class=\"text-xl font-medium text-black\">ChitChat</div>\n  <p class=\"text-slate-500\">You have a new message!</p>\n</div>",
        videoUrl: "https://youtube.com/watch?v=exemplo-tw-1",
        timestamps: [
          { time: "00:00", description: "O que é Utility-first" },
          { time: "04:30", description: "Espaçamento e Cores" },
          { time: "10:15", description: "Tipografia" }
        ]
      },
      {
        id: "ui-5",
        title: "Básico de shadcn",
        description: "Introdução à biblioteca de componentes shadcn/ui.",
        status: "not-started",
        duration: "25 min",
        summary: "shadcn/ui não é uma biblioteca de componentes tradicional, mas uma coleção de componentes que você copia e cola no seu projeto.",
        keyConcepts: ["Copy-paste components", "Acessibilidade", "Customização"],
        codeExample: "npx shadcn-ui@latest add button",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ui-6",
        title: "Básico de Radix",
        description: "Componentes primitivos não estilizados.",
        status: "not-started",
        duration: "25 min",
        summary: "Radix UI fornece componentes primitivos acessíveis e sem estilo que servem como base para bibliotecas como shadcn.",
        keyConcepts: ["Headless UI", "Acessibilidade", "Primitivos"],
        codeExample: "import * as Dialog from '@radix-ui/react-dialog';",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "ui-7",
        title: "Composição de Blocos de UI",
        description: "Juntando tudo para criar páginas completas.",
        status: "completed",
        duration: "20 min",
        summary: "O Tailwind usa modificadores responsivos (como sm:, md:, lg:) baseados em mobile-first. Isso permite aplicar estilos diferentes para diferentes tamanhos de tela facilmente.",
        keyConcepts: ["Mobile-first", "Breakpoints", "Modificadores", "Adaptação"],
        codeExample: "<div class=\"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4\">\n  <p class=\"text-base md:text-lg\">Texto responsivo</p>\n</div>",
        videoUrl: "https://youtube.com/watch?v=exemplo-tw-3",
        timestamps: [
          { time: "00:00", description: "Conceito Mobile-first" },
          { time: "05:15", description: "Breakpoints do Tailwind" },
          { time: "11:30", description: "Exemplos práticos" }
        ]
      }
    ]
  },
  {
    id: "state-management",
    title: "Gerenciamento de Estado",
    description: "Gerenciando o estado global da aplicação.",
    icon: Layers,
    totalTopics: 6,
    completedTopics: 0,
    topics: [
      {
        id: "state-1",
        title: "Estado Local vs Estado Compartilhado",
        description: "Entendendo os diferentes escopos de estado.",
        status: "not-started",
        duration: "15 min",
        summary: "Estado local pertence a um único componente, enquanto estado compartilhado é acessado por múltiplos componentes.",
        keyConcepts: ["useState", "Elevação de estado", "Estado global"],
        codeExample: "// Local: const [isOpen, setIsOpen] = useState(false);\n// Shared: const user = useUserStore();",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "state-2",
        title: "Prop Drilling",
        description: "O problema de passar props por muitos níveis.",
        status: "not-started",
        duration: "15 min",
        summary: "Prop drilling ocorre quando você precisa passar dados através de muitos componentes intermediários que não precisam desses dados.",
        keyConcepts: ["Árvore de componentes", "Acoplamento", "Manutenção"],
        codeExample: "<Grandparent data={data}>\n  <Parent data={data}>\n    <Child data={data} />\n  </Parent>\n</Grandparent>",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "state-3",
        title: "Básico de Context",
        description: "A API de Contexto nativa do React.",
        status: "not-started",
        duration: "25 min",
        summary: "React Context fornece uma maneira de passar dados pela árvore de componentes sem ter que passar props manualmente em cada nível.",
        keyConcepts: ["createContext", "Provider", "useContext"],
        codeExample: "const ThemeContext = createContext('light');\n// ...\nconst theme = useContext(ThemeContext);",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "state-4",
        title: "Básico de Zustand",
        description: "Uma biblioteca de gerenciamento de estado simples e rápida.",
        status: "not-started",
        duration: "25 min",
        summary: "Zustand é uma solução de gerenciamento de estado pequena, rápida e escalável que usa hooks.",
        keyConcepts: ["Store", "Actions", "Selectors"],
        codeExample: "const useStore = create((set) => ({\n  bears: 0,\n  increase: () => set((state) => ({ bears: state.bears + 1 })),\n}))",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "state-5",
        title: "Quando usar cada um",
        description: "Context API vs Zustand.",
        status: "not-started",
        duration: "20 min",
        summary: "Context é bom para dados que mudam raramente (temas, idioma). Zustand é melhor para estado de aplicação complexo e frequente.",
        keyConcepts: ["Performance", "Re-renders", "Complexidade"],
        codeExample: "// Use Context for Theme\n// Use Zustand for Shopping Cart",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "state-6",
        title: "Exemplos Práticos em Apps",
        description: "Padrões comuns de estado global.",
        status: "not-started",
        duration: "30 min",
        summary: "Exemplos de como gerenciar carrinho de compras, preferências do usuário e estado de autenticação.",
        keyConcepts: ["Persistência", "Sincronização", "Boas práticas"],
        codeExample: "const { cart, addToCart } = useCartStore();",
        videoUrl: "",
        timestamps: []
      }
    ]
  },
  {
    id: "integrations",
    title: "Integrações e Autenticação",
    description: "Conectando sua aplicação ao mundo exterior.",
    icon: Database,
    totalTopics: 6,
    completedTopics: 0,
    topics: [
      {
        id: "api-1",
        title: "O que é uma API",
        description: "Introdução a Interfaces de Programação de Aplicações.",
        status: "not-started",
        duration: "15 min",
        summary: "APIs permitem que diferentes sistemas de software se comuniquem entre si, geralmente via HTTP na web.",
        keyConcepts: ["REST", "Endpoints", "JSON", "HTTP Methods"],
        codeExample: "// GET /api/users -> Returns list of users",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "api-2",
        title: "Básico de fetch",
        description: "Fazendo requisições HTTP no navegador.",
        status: "not-started",
        duration: "20 min",
        summary: "A API fetch fornece uma interface JavaScript para acessar e manipular partes do pipeline HTTP.",
        keyConcepts: ["Promises", "Response object", "JSON parsing"],
        codeExample: "const response = await fetch('/api/data');\nconst data = await response.json();",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "api-3",
        title: "Fluxo de Dados Assíncrono",
        description: "Lidando com dados assíncronos no React.",
        status: "not-started",
        duration: "25 min",
        summary: "Como buscar dados, mostrar estados de carregamento e lidar com erros em componentes React.",
        keyConcepts: ["useEffect", "Loading state", "Error handling"],
        codeExample: "const [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "api-4",
        title: "Básico de Supabase",
        description: "Introdução ao backend-as-a-service Supabase.",
        status: "not-started",
        duration: "25 min",
        summary: "Supabase é uma alternativa open source ao Firebase que fornece banco de dados Postgres, autenticação e armazenamento.",
        keyConcepts: ["BaaS", "PostgreSQL", "Supabase Client"],
        codeExample: "import { createClient } from '@supabase/supabase-js'\nconst supabase = createClient(URL, KEY)",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "api-5",
        title: "Básico de Autenticação e Fluxo de Login",
        description: "Implementando login de usuários.",
        status: "not-started",
        duration: "30 min",
        summary: "Como autenticar usuários, gerenciar sessões e criar formulários de login/registro.",
        keyConcepts: ["JWT", "Sessões", "OAuth", "Sign in/Sign up"],
        codeExample: "const { user, error } = await supabase.auth.signInWithPassword({ email, password })",
        videoUrl: "",
        timestamps: []
      },
      {
        id: "api-6",
        title: "Conteúdo Protegido e Salvando Dados",
        description: "Restringindo acesso e persistindo dados.",
        status: "not-started",
        duration: "30 min",
        summary: "Como criar rotas protegidas que exigem login e como ler/escrever dados no banco de dados.",
        keyConcepts: ["Protected Routes", "CRUD operations", "Row Level Security"],
        codeExample: "const { data, error } = await supabase.from('todos').insert([{ task: 'Learn React' }])",
        videoUrl: "",
        timestamps: []
      }
    ]
  }
];
