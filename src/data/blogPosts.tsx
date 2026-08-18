import type { ReactNode } from "react";

export type PostType = "article" | "tip" | "faq";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readingTime: string;
  type: PostType;
  featured?: boolean;
  createdAt?: string;
  tags?: string[];
  author?: string;
  content?: ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "como-escolher-revestimento-ideal",
    title: "Como escolher o revestimento ideal para cada ambiente",
    description:
      "Descubra os melhores tipos de revestimento para banheiro, cozinha, sala e áreas externas. Guia completo para não errar na escolha.",
    image:
      "https://www.shutterstock.com/shutterstock/photos/2733387713/display_1500/stock-photo-a-worker-spreads-mortar-on-a-wall-in-a-construction-area-during-the-day-he-focuses-on-his-task-2733387713.jpg",
    category: "REVESTIMENTO",
    readingTime: "6 min",
    type: "article",
    featured: true,
    createdAt: "2025-03-15",
    tags: ["revestimento", "acabamento", "obra"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Introdução</h2>
        <p>
          Escolher o revestimento certo é uma das decisões mais importantes de
          qualquer obra. Além da estética, ele impacta diretamente na
          durabilidade, manutenção e conforto do ambiente.
        </p>

        <h2 id="tipos-de-revestimento">Tipos de revestimento mais usados</h2>
        <h3 id="porcelanato">1. Porcelanato</h3>
        <p>
          O porcelanato é uma das opções mais versáteis do mercado. Possui baixa
          absorção de água e alta resistência.
        </p>

        <h3 id="ceramica">2. Cerâmica</h3>
        <p>
          Mais econômica que o porcelanato, a cerâmica continua sendo excelente
          escolha para muitos projetos.
        </p>

        <h2 id="como-escolher">Como escolher por ambiente</h2>
        <ul>
          <li>Banheiro: porcelanato ou cerâmica com baixa absorção</li>
          <li>Cozinha: porcelanato acetinado para fácil limpeza</li>
          <li>Sala: porcelanato ou laminado para conforto térmico</li>
        </ul>

        <h2 id="conclusao">Conclusão</h2>
        <p>
          O revestimento ideal combina estética, funcionalidade e custo-benefício.
        </p>
      </>
    ),
  },
  {
    id: 2,
    slug: "tipo-de-cimento-ideal",
    title: "Qual o tipo de cimento ideal para a sua obra?",
    description:
      "CP-II, CP-III, CP-IV ou CP-V? Entenda as diferenças e saiba qual cimento usar em cada etapa da sua construção.",
    image:
      "https://pointer.com.br/blog/wp-content/uploads/2017/08/tipos-de-cimento-conheca-as-principais-diferencas-entre-eles.jpeg",
    category: "CIMENTO",
    readingTime: "5 min",
    type: "article",
    createdAt: "2025-04-02",
    tags: ["cimento", "materiais", "obra"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Introdução</h2>
        <p>
          O cimento é um dos materiais mais importantes da obra e deve ser
          escolhido conforme a aplicação e as condições de uso.
        </p>
        <h2 id="conclusao">Conclusão</h2>
        <p>
          A escolha certa do cimento impacta diretamente na resistência e na
          durabilidade da estrutura.
        </p>
      </>
    ),
  },
  {
    id: 3,
    slug: "dicas-para-pintar-paredes",
    title: "Dicas para preparar e pintar paredes",
    description:
      "Aprenda o passo a passo correto para preparar a superfície e conseguir um acabamento profissional na pintura.",
    image:
      "https://casadastintasitapema.com.br/wp-content/uploads/2024/04/woman-paint-1024x768-1.jpeg",
    category: "ACABAMENTO",
    readingTime: "7 min",
    type: "tip",
    createdAt: "2025-04-10",
    tags: ["pintura", "acabamento", "parede"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Preparação da superfície</h2>
        <p>
          A pintura profissional começa com uma superfície limpa, seca e bem
          preparada.
        </p>
        <h2 id="conclusao">Conclusão</h2>
        <p>
          Pequenos cuidados na preparação fazem toda a diferença no resultado final.
        </p>
      </>
    ),
  },
  {
    id: 4,
    slug: "como-calcular-quantidade-de-tijolos",
    title: "Como calcular a quantidade de tijolos para sua obra",
    description:
      "Evite desperdício e falta de material. Veja a fórmula simples para calcular a quantidade correta de tijolos.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop",
    category: "ALVENARIA",
    readingTime: "4 min",
    type: "tip",
    createdAt: "2025-05-01",
    tags: ["alvenaria", "cálculo", "obra"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Como calcular</h2>
        <p>
          Para calcular a quantidade de tijolos, some a área total das paredes e
          multiplique pelo número de peças por metro quadrado.
        </p>
      </>
    ),
  },
  {
    id: 5,
    slug: "diferenca-entre-argamassa-e-reboco",
    title: "Qual a diferença entre argamassa e reboco?",
    description:
      "Muita gente confunde. Entenda de uma vez por todas a diferença e a função de cada um na obra.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&h=500&fit=crop",
    category: "MATERIAIS",
    readingTime: "3 min",
    type: "faq",
    createdAt: "2025-05-08",
    tags: ["argamassa", "reboco", "acabamento"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Diferenças principais</h2>
        <p>
          A argamassa é usada para assentamento e fixação, enquanto o reboco é a
          camada final de acabamento da superfície.
        </p>
      </>
    ),
  },
  {
    id: 6,
    slug: "quando-usar-impermeabilizante",
    title: "Quando e onde usar impermeabilizante?",
    description:
      "Proteja sua obra contra infiltrações. Saiba em quais locais o impermeabilizante é obrigatório.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=500&fit=crop",
    category: "IMPERMEABILIZAÇÃO",
    readingTime: "5 min",
    type: "faq",
    createdAt: "2025-05-20",
    tags: ["impermeabilização", "manutenção", "obra"],
    author: "Equipe Construbet",
    content: (
      <>
        <h2 id="introducao">Quando aplicar</h2>
        <p>
          O impermeabilizante é fundamental em áreas molhadas, lajes, caixas de
          gordura e regiões com risco de infiltração.
        </p>
      </>
    ),
  },
];
