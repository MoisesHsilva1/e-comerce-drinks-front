<h1> e-comerce-drinks-front</h1>

<p>Frontend do projeto E-Commerce de Bebidas, uma aplicação moderna, escalável, acessível e responsiva para venda online de drinks. Desenvolvida para transformar e impulsionar negócios digitais, oferecendo uma experiência impactante e inclusiva aos usuários.</p>

<h2>Arquitetura</h2>

<p>Este projeto adota o <strong>Atomic Design</strong> para organizar os componentes React de forma modular e reutilizável. Isso proporciona:</p>

<ul>
  <li>Separação clara por responsabilidade (atoms, molecules, organisms, templates, pages)</li>
  <li>Facilidade de manutenção e escalabilidade</li>
  <li>Melhor legibilidade e reusabilidade dos componentes</li>
</ul>

<h2> Tecnologias e Ferramentas</h2>

<ul>
  <li><strong>React JS</strong> – Biblioteca moderna e declarativa para construção de interfaces reativas.</li>
  <li><strong>Tailwind CSS</strong> – Framework utilitário para estilização rápida e responsiva com design consistente.</li>
  <li><strong>Vitest</strong> – Testes unitários rápidos e simples com suporte nativo ao ecossistema Vite/React.</li>
  <li><strong>Vite</strong> – Ferramenta de build extremamente rápida para desenvolvimento moderno.</li>
  <li><strong>CI/CD com GitHub Actions</strong> – Pipeline de integração contínua para testes, análise e deploy.</li>
  <li><strong>Deploy via Vercel</strong> – Hospedagem com build otimizado e entregas contínuas.</li>
</ul>

<h2> Testes Automatizados</h2>

<p>Todos os componentes e regras de negócio estão cobertos por testes com <strong>Vitest</strong>, garantindo segurança na evolução da aplicação.</p>

<h2>CI/CD</h2>

<p>Pipeline automatizado via <strong>GitHub Actions</strong>, realizando:</p>

<ol>
  <li>Instalação e build</li>
  <li>Execução dos testes com Vitest</li>
  <li>Análise de segurança com <code>npm audit</code> e Snyk</li>
  <li>Deploy automático para produção via <strong>Vercel</strong></li>
</ol>

<h2>Deploy</h2>

<p>A aplicação está disponível em produção através da <strong>Vercel</strong>, com cada push na branch <code>main</code> automaticamente disparando um novo deploy (após testes e validações).</p>

<p><a href="https://e-comerce-drinks-front.vercel.app" target="_blank" rel="noopener noreferrer">Acesse a aplicação em produção</a></p>

<h2>🧪 Scripts</h2>

<pre><code>npm install     # Instala dependências
npm run dev     # Inicia ambiente de desenvolvimento
npm run build   # Gera build para produção
npm run test    # Executa testes unitários
</code></pre>
