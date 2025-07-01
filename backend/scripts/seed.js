import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

const cursos = [
  {
    id: "dev-web-react-nextjs",
    nome: "Desenvolvimento Web com React e Next.js",
    descricao: "Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.",
    capa: "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png",
    inscricoes: 1234,
    inicio: new Date(2024, 5, 20),
  },
  {
    id: "intro-ia",
    nome: "Introdução à Inteligência Artificial",
    descricao: "Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.",
    capa: "https://www.eucapacito.com.br/wp-content/uploads/2024/04/Introducao-a-Inteligencia-Artificial.jpg",
    inscricoes: 5678,
    inicio: new Date(2024, 6, 15)
  },
  {
    id: "foto-iniciantes",
    nome: "Fotografia para Iniciantes",
    descricao: "Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.",
    capa: "https://www.clubemis.com.br/wp-content/uploads/2022/10/matt-roskovec-fB3-uW_TUcs-unsplash-1024x576.jpg",
    inscricoes: 9012,
    inicio: new Date(2024, 7, 10)
  },
  {
    id: "ingles-instrumental",
    nome: "Inglês Instrumental para o Mercado de Trabalho",
    descricao: "Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.",
    capa: "https://www.openenglish.com.br/blog/wp-content/uploads/sites/20/2022/01/qual-a-importancia-do-ingles-para-o-mercado-de-trabalho.jpg",
    inscricoes: 13579,
    inicio: new Date(2024, 8, 5),
  },
  {
    id: "financas-iniciantes",
    nome: "Finanças Pessoais para Iniciantes",
    descricao: "Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.",
    capa: "https://digital.sebraers.com.br/wp-content/uploads/2024/10/AdobeStock_789124188-scaled.jpeg",
    inscricoes: 17263,
    inicio: new Date(2024, 9, 1)
  },
  {
    id: "culinaria-vegetariana",
    nome: "Culinária Vegetariana",
    descricao: "Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.",
    capa: "https://www.academiaassai.com.br/sites/default/files/cardapio-vegano-cardapio-vegetariano-diferencas.jpg",
    inscricoes: 21947,
    inicio: new Date(2024, 9, 20),
  },
  {
    id: "yoga-iniciantes",
    nome: "Yoga para Iniciantes",
    descricao: "Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.",
    capa: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2021/09/08/713609709-yoga-para-iniciantes-18141.jpg",
    inscricoes: 26631,
    inicio: new Date(2024, 10, 15)
  },
  {
    id: "produtividade-pessoal",
    nome: "Produtividade Pessoal",
    descricao: "Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.",
    capa: "https://www.tempoeficiente.com.br/wp-content/uploads/2024/08/image-17.png",
    inscricoes: 31315,
    inicio: new Date(2024, 11, 5)
  }
];

export async function seedCursos() {
  console.log('🔁 Verificando cursos existentes...')

  for (const curso of cursos) {
    await prisma.curso.upsert({
      where: { id: curso.id },
      update: {},
      create: curso
    })
  }

  console.log('✅ Cursos semeados com sucesso.')
}