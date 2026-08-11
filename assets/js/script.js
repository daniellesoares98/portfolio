// Selecionar a Seção about 
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swipperWrapper = document.querySelector(".swipper-wrapper")

async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/daniellesoares98')

        const perfil = await resposta.json()
        
        //console.log(perfil)

        about.innerHTML = ''

        about.innerHTML = `
        
        <figure class="about-image">
            <img 
                src="${perfil.avatar_url}" 
                alt="${perfil.name}">
                </figure>

                <article class="about-content">
                    <h2>Sobre mim</h2>
                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div class="about-buttons-data">
                        <div class="buttons-container">
                            <a href="#" target="_blank" class="botao">GitHub</a>
                            <a href="#" target="_blank" class="botao-outline">Currículo</a>
                        </div>

                        <div class="data-container">
                            <div class="data-item">
                                <span class="data-number">100</span>
                                <span class="data-label">Seguidores</span>
                            </div>
                            <div class="data-item">
                                <span class="data-number">10</span>
                                <span class="data-label">Repositórios</span>
                            </div>
                        </div>
                    </div>
                </article>

        `

    }catch(error){
        console.error("Erro ao buscar dados no GitHub", error)
    }
}

// Função para construção do Carrosel com o Swiper
async function getProjectsGitHub() {
    try{

        const resposta = await fetch('https://api.github.com/users/daniellesoares98/repos?sort=update&per_page=6')

        const repositorios = await resposta.json()

        swipperWrapper.innerHTML = ''

        // Ícones das linguagens
		const linguagens = {
			'JavaScript': 'javascript',
			'TypeScript': 'typescript',
			'Python': 'python',
			'Java': 'java',
			'HTML': 'html',
			'CSS': 'css',
			'PHP': 'php',
			'C#': 'csharp',
			'Go': 'go',
			'Kotlin': 'kotlin',
			'Swift': 'swift',
			'C': 'c',
			'C++': 'c_plus',
			'GitHub': 'github',
		}

        repositorios.array.forEach( (repositorio) => {
            
            // Selecione o nome da linguagem padrão do repositório
            const linguagem = repositorio.language  || 'GitHub'

            // Seleciona o icone da linguagem padrão
            const icone = linguagens[linguagem] ?? linguagens['GitHub']

            // Construit o link do ícone 
            const urlIcone = `./assets/icons/languages/${icone}.svg`

            // Formata o Nome do Repositório
			const nomeFormatado = repositorio.name
				.replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
				.replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
				.toUpperCase() // Converte a string em letras maiúsculas

            // Função para truncar texto
            // Se a descrição possuir mais de 100 carcateres
            // seleciona os primeiros 97 e acrescenta '...' no final
            // Senão retorna o mesmo texto
			const truncar = (texto, limite) => texto.length > limite
            ? texto.substring(0, limite) + '...'
            : texto

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub'

            // tags
            const tags = repositorio.topics?.length > 0
             ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
             : `<span class="tag">${linguagem}</span>`;

            // Cria o botão Deploy

            const botaoDeploy = repositorio.homepage
            ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
            : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                     </a>
                     ${botaoDeploy}
                </div>
            `;

            // Constrói o Card
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                
                    <article class="project-card">
                
                    <!-- Ícone da Tecnologia padrão do projeto -->
                <figure class="project-image">
                <img src="${urlIcone}"
                    alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                >
                </figure>
                
                    <!-- Conteúdo do Projeto -->
                <div class="project-content">
                
                    <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>
                
                    <!-- Tags do Projeto -->
                <div class="project-tags">
                    ${tags}
                </div>
                
                    ${botoesAcao}
                
                </div>
                
            </article>
                
                </div>
            `
        })

        };

    }catch (error){
        console.error("Erro ao buscar os dados dos projetos no GitHub", error)
    }


getAboutGithub();