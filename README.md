# AgileBoard

Gerenciador de tarefas no estilo Kanban desenvolvido com HTML5, CSS e JavaScript puro, sem frameworks ou bibliotecas externas.

## Páginas

| Arquivo            | Descrição                                                |
| ------------------ | -------------------------------------------------------- |
| `login.html`       | Tela de entrada com validação de usuário e senha         |
| `dashboard.html`   | Painel com métricas e resumo das tarefas                 |
| `kanban.html`      | Quadro Kanban com drag-and-drop entre colunas            |
| `nova-tarefa.html` | Formulário de criação de tarefa com prévia em tempo real |

## Estrutura do projeto

```
agile-board/
├── css/
│   ├── style.css        # Estilos compartilhados
│   ├── login.css
│   ├── dashboard.css
│   ├── kanban.css
│   └── nova-tarefa.css
├── js/
│   ├── login.js
│   ├── dashboard.js
│   ├── kanban.js
│   └── nova-tarefa.js
├── login.html
├── dashboard.html
├── kanban.html
└── nova-tarefa.html
```

## Como executar

Abra o arquivo `login.html` diretamente no navegador.

## Usuários disponíveis

| Usuário  | Senha      |
| -------- | ---------- |
| admin    | 1234       |
| rafael   | rafa123    |
| arthur   | arthur123  |
| eduardo  | eduardo123 |
| leonardo | leo123     |

## Persistência de dados

Todos os dados são salvos no `localStorage` do navegador, sem necessidade de backend.

| Chave           | Conteúdo                               |
| --------------- | -------------------------------------- |
| `agile_usuario` | Dados da sessão do usuário logado      |
| `agile_tarefas` | Array com todas as tarefas cadastradas |

## Funcionalidades

- Login com validação de campos
- Dashboard com métricas dinâmicas (total, em andamento, concluídas, vencidas)
- Quadro Kanban com três colunas: A Fazer, Em Andamento e Concluído
- Mover tarefas entre colunas por drag-and-drop
- Filtrar tarefas por prioridade (Alta, Média, Baixa)
- Criar tarefas com título, descrição, prioridade, responsável e data de entrega
- Prévia do cartão em tempo real ao preencher o formulário
- Excluir tarefas
- Logout
