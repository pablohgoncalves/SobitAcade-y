import { Category } from "@/hooks/useCourses";

export const mockCategories: Category[] = [
    {
        id: "modulo-contabil",
        title: "Módulo Contábil",
        description: "Aprenda tudo sobre nossa área Contábil.",
        lessons: [
            {
                id: "config-busca-extrato",
                title: "Config. Busca Extrato Cartão",
                description: "Aprenda a configurar a busca de extratos de cartão no sistema.",
                duration: "3:53",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-contabil",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "lancamento-txt",
                title: "Lançamento TXT",
                description: "Como realizar lançamentos através de arquivos TXT.",
                duration: "6:31",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-contabil",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "lancamento-contabil-ofx",
                title: "Lançamento Contábil OFX",
                description: "Realize lançamentos contábeis a partir de arquivos OFX.",
                duration: "2:33",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-contabil",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastrar-historicos",
                title: "Cadastrar os históricos...",
                description: "Configure históricos padrões para agilizar lançamentos.",
                duration: "8:33",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-contabil",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "de-para-filiais",
                title: "De Para Filiais",
                description: "Configure o mapeamento de contas entre filiais.",
                duration: "2:46",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-contabil",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            }
        ]
    },
    {
        id: "modulo-fiscal",
        title: "Módulo Fiscal",
        description: "Domine a emissão e gestão de documentos fiscais.",
        lessons: [
            {
                id: "emissao-nfe-nfce",
                title: "Emissão NFe e NFCe",
                description: "Aprenda a emitir notas fiscais eletrônicas e de consumidor.",
                duration: "5:18",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-fiscal",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastro-certificado-a1",
                title: "Cadastro de Certificado A1",
                description: "Configure o certificado digital A1 no sistema.",
                duration: "2:46",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-fiscal",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastro-clientes",
                title: "Cadastro de Clientes",
                description: "Cadastre e gerencie clientes no sistema.",
                duration: "2:26",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-fiscal",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "consulta-nfe-nfse",
                title: "Consulta NFe/NFSe",
                description: "Consulte notas fiscais emitidas e recebidas.",
                duration: "10:48",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-fiscal",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastro-fornecedores",
                title: "Cadastro de Fornecedores",
                description: "Cadastre e gerencie fornecedores no sistema.",
                duration: "2:43",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-fiscal",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            }
        ]
    },
    {
        id: "modulo-dp",
        title: "Módulo DP",
        description: "Gerencie o Departamento Pessoal com eficiência.",
        lessons: [
            {
                id: "cadastro-eventos",
                title: "Cadastro de Eventos",
                description: "Aprenda a cadastrar eventos no departamento pessoal.",
                duration: "2:35",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-dp",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "lancamento-ponto",
                title: "Lançamentos de Ponto Digital",
                description: "Gerencie lançamentos de ponto digital no sistema.",
                duration: "3:41",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "modulo-dp",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            }
        ]
    },
    {
        id: "variados",
        title: "Variados",
        description: "Recursos adicionais e funcionalidades extras do sistema.",
        lessons: [
            {
                id: "alteracao-senha",
                title: "Alteração de Senha",
                description: "Aprenda a trocar sua senha.",
                duration: "1:06",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "variados",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "arquivos-ged",
                title: "Arquivos GED",
                description: "Aprenda a importar e monitorar arquivos no GED.",
                duration: "2:35",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "variados",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastro-contadores",
                title: "Cadastro de Contadores",
                description: "Aprenda a cadastrar contadores.",
                duration: "2:20",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "variados",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "agenda-eventos",
                title: "Agenda (Eventos)",
                description: "Cadastro de Eventos na Agenda.",
                duration: "5:28",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "variados",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "cadastro-usuario",
                title: "Cadastro de usuário",
                description: "Aprenda a Cadastrar Usuários.",
                duration: "3:27",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "variados",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            }
        ]
    },
    {
        id: "novidades-da-versao",
        title: "Novidades da Versão",
        description: "Confira as últimas atualizações e novos recursos do sistema.",
        lessons: [
            {
                id: "novidades-05-25",
                title: "Novidades da versão 05-25",
                description: "Veja as novidades da versão!",
                duration: "4:47",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "novidades-da-versao",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            },
            {
                id: "novidades-08-25",
                title: "Novidades da Versão!",
                description: "Vejas as novidades da versão 08-25",
                duration: "5:42",
                thumbnail: "https://img.youtube.com/vi/placeholder/hqdefault.jpg",
                lessonCount: 1,
                category: "novidades-da-versao",
                videoUrl: "https://www.youtube.com/watch?v=placeholder"
            }
        ]
    }
];
