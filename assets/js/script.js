// Selecionar a Seção about 
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper")
const formulario = document.querySelector('#formulario')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/daniellesoares98')

        const perfil = await resposta.json()
        
        //console.log(perfil)

        about.innerHTML = ''

        about.innerHTML = `
        
                <figure class="about-image">
                    <img src="${perfil.avatar_url}" alt="Foto do perfil" -"${perfil.name}">
                </figure>

            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>
                Sou desenvolvedora em transição de carreira, atualmente cursando FullStack Java na Generation Brasil, onde venho trabalhando com Java, HTML, CSS, JavaScript, Angular, Node.js, Git/GitHub e MySQL. Antes de migrar pra tecnologia, passei anos atuando com recrutamento de profissionais de TI e também como psicóloga — experiências que me deram uma base sólida em comunicação, escuta ativa e resolução de problemas.
                </p>

                <p>
                Gosto de aprofundar conhecimento além do que é ensinado, entendendo o "porquê" por trás de cada solução, não só o "como". Quero atuar como desenvolvedora FullStack, colocando a mão na massa em projetos reais, aprendendo com mentoria e code review, e crescendo tecnicamente a cada entrega.
                </p>

                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="./assets/cv/Danielle_Soares_CV2026" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <div class="data-item">
                        <span class="data-number">${perfil.followers}</span>
                        <span class="data-label">Seguidores</span>
                    </div>
                    <div class="data-item">
                        <span class="data-number">${perfil.public_repos}</span>
                        <span class="data-label">Repositórios</span>
                    </div>
                    </div>
                </div>
            </article>

        `;
    }catch(error) {
        console.error("Erro ao buscar dados no GitHub", error)
    }
}

// Função para construção do Carrosel com o Swiper
async function getProjectsGitHub() {
    try{

        const resposta = await fetch('https://api.github.com/users/daniellesoares98/repos?sort=update&per_page=6')

        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

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

        repositorios.forEach( (repositorio) => {
            
            // Selecione o nome da linguagem padrão do repositório
            const linguagem = repositorio.language  || 'GitHub'

            // Seleciona o icone da linguagem padrão
            const logo = linguagens[linguagem] ?? linguagens['GitHub']

            // Construit o link do ícone 
            const urlLogo = `./assets/icons/icons/languages/${logo}.svg`

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

            // Define a descrição do Repositório
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
                        <div class="project-image">
                            <img src="${urlLogo}"             
                                alt="Ícone - ${linguagem}"
                                onerror="this.onerror=null; this.src='./assets/icons/icons/languages/github.svg';">
                        </div>
                
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
        });

    iniciarSwiper()
        

    }catch (error){
        console.error("Erro ao buscar os dados dos projetos no GitHub", error)
    }
}

// Função para inicializar o carrossel do Swiper
function iniciarSwiper() {
  new Swiper('.projects-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 40,
        centeredSlides: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 54,
        centeredSlides: false,
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  })
}

// Função de Validação do Formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = "Digite um e-mail válida.";
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erromensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length < 5) {
        erromensagem.innerHTML = 'A mensagem não pode ser vazia.';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }

});

getAboutGithub();
getProjectsGitHub();