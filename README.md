Gerenciador de Despesas

Uma aplicação web simples e intuitiva para controle de gastos pessoais. Permite cadastrar despesas, categorizá-las e acompanhar o total gasto de forma dinâmica.

Tecnologias Utilizadas

Este projeto foi construído com foco em boas práticas de tipagem e estruturação moderna:

TypeScript: Tipagem estática para maior segurança e prevenção de erros.
Vite: Build tool ultrarrápido e estruturação do projeto.
HTML5 e CSS3: Estrutura e estilização da interface.
DOM API: Manipulação dinâmica dos elementos da tela.
⚙️ Funcionalidades
 Cadastro de despesas com título, valor e categoria.
 Validação de formulário (impede campos vazios ou valores inválidos) com feedback visual.
 Tipagem forte para as categorias (evitando dados corrompidos).
 Cálculo automático do total geral.
 Cálculo automático do total gasto por categoria.
 Estado vazio (mensagem amigável quando não há despesas cadastradas).
 Geração de ID único para cada despesa.
O que foi praticado

Mais do que apenas escrever código, o foco deste projeto foi a tomada de decisões:

Separação de responsabilidades: Funções específicas para validar, renderizar, limpar erros e calcular totais.
Type Guards: Uso de funções personalizadas para garantir que os dados vindos do HTML (strings) sejam tratados como tipos seguros (ex: Categoria).
Organização de arquivos: Separação de tipos, estilos e lógica de negócio.
Manipulação segura do DOM: Criação de elementos via JavaScript e controle de visibilidade.
🔧 Como rodar o projeto localmente
Clone este repositório:
bash
git clone https://github.com/estevao7/painel-de-despesas.git
Acesse a pasta do projeto:
bash
cd painel-de-despesas
Instale as dependências:
bash
npm install
Inicie o servidor de desenvolvimento:
bash
npm run dev
Abra o endereço mostrado no terminal (geralmente http://localhost:5173) no seu navegador.

Desenvolvido como parte da minha jornada de aprendizado em Desenvolvimento.
