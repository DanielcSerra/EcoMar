document.addEventListener('mousemove', (e) => {
    const posicaoX = e.clientX / window.innerWidth;
    const posicaoY = e.clientY / window.innerHeight;
    
    const elementosComEfeito = document.querySelectorAll('h1, h2, h3, p, #botao');
    
    elementosComEfeito.forEach(elemento => {
        const velocidade = 0.02;
        const moverX = (posicaoX - 0.5) * velocidade * 100;
        const moverY = (posicaoY - 0.5) * velocidade * 100;
        
        elemento.style.transform = `translate(${moverX}px, ${moverY}px)`;
    });
});

document.addEventListener('mouseleave', () => {
    const elementosComEfeito = document.querySelectorAll('h1, h2, h3, p, #botao');
    elementosComEfeito.forEach(elemento => {
        elemento.style.transform = 'translate(0px, 0px)';
    });
});

const configuracaoFaq = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: '-25% 0px -25% 0px'
};

const configuracaoFormulario = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: '-25% 0px -25% 0px'
};

const observadorFaq = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        const elemento = entrada.target;
        const visibilidade = entrada.intersectionRatio;
        
        if (entrada.isIntersecting) {
            if (visibilidade > 0.5) {
                elemento.classList.add('visivel');
                elemento.classList.remove('oculto');
                elemento.style.opacity = visibilidade;
            } else {
                elemento.classList.remove('visivel');
                elemento.classList.add('oculto');
                elemento.style.opacity = visibilidade;
            }
        } else {
            elemento.classList.remove('visivel');
            elemento.classList.add('oculto');
            elemento.style.opacity = 0;
        }
    });
}, configuracaoFaq);

const observadorFormulario = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        const formulario = entrada.target;
        const visibilidade = entrada.intersectionRatio;
        
        if (entrada.isIntersecting) {
            if (visibilidade > 0.5) {
                formulario.classList.add('visivel');
                formulario.classList.remove('oculto');
                formulario.style.opacity = visibilidade;
            } else {
                formulario.classList.remove('visivel');
                formulario.classList.add('oculto');
                formulario.style.opacity = visibilidade;
            }
        } else {
            formulario.classList.remove('visivel');
            formulario.classList.add('oculto');
            formulario.style.opacity = 0;
        }
    });
}, configuracaoFormulario);

function controlarMusica() {
    const secoes = document.querySelectorAll('section');
    const alturaTela = window.innerHeight;
    
    secoes.forEach(secao => {
        const limites = secao.getBoundingClientRect();
        const noCentro = limites.top < alturaTela / 2 && limites.bottom > alturaTela / 2;
        
        if (noCentro) {
            const musica = document.getElementById('bg' + secao.id);
            if (musica) {
                musica.volume = 0.1;
                musica.play();
            }
        } else {
            const musica = document.getElementById('bg' + secao.id);
            if (musica) {
                musica.pause();
                musica.currentTime = 0;
            }
        }
    });
}

window.addEventListener('scroll', () => {
    const secaoFaq = document.getElementById('faq');
    const secaoFormulario = document.getElementById('formulario');
    
    const elementosFaq = document.querySelectorAll('.esquerda, .meio, .direita');
    const areaFaq = secaoFaq.getBoundingClientRect();
    const alturaTela = window.innerHeight;
    
    const alturaVisivelFaq = Math.min(areaFaq.bottom, alturaTela) - Math.max(areaFaq.top, 0);
    const visibilidadeFaq = Math.min(alturaVisivelFaq / alturaTela, 1);
    
    elementosFaq.forEach(elemento => {
        if (visibilidadeFaq > 0.5) {
            elemento.classList.add('visivel');
            elemento.classList.remove('oculto');
            elemento.style.opacity = visibilidadeFaq;
        } else if (visibilidadeFaq > 0) {
            elemento.classList.remove('visivel');
            elemento.classList.add('oculto');
            elemento.style.opacity = visibilidadeFaq;
        } else {
            elemento.classList.remove('visivel');
            elemento.classList.add('oculto');
            elemento.style.opacity = 0;
        }
    });
    
    const formulario = document.querySelector('#formulario form');
    const areaFormulario = secaoFormulario.getBoundingClientRect();
    const alturaVisivelForm = Math.min(areaFormulario.bottom, alturaTela) - Math.max(areaFormulario.top, 0);
    const visibilidadeForm = Math.min(alturaVisivelForm / alturaTela, 1);
    
    if (visibilidadeForm > 0.5) {
        formulario.classList.add('visivel');
        formulario.classList.remove('oculto');
        formulario.style.opacity = visibilidadeForm;
    } else if (visibilidadeForm > 0) {
        formulario.classList.remove('visivel');
        formulario.classList.add('oculto');
        formulario.style.opacity = visibilidadeForm;
    } else {
        formulario.classList.remove('visivel');
        formulario.classList.add('oculto');
        formulario.style.opacity = 0;
    }
    
    controlarMusica();
});

document.addEventListener('DOMContentLoaded', () => {
    const secoesFaq = document.querySelectorAll('.esquerda, .meio, .direita');
    secoesFaq.forEach(secao => {
        observadorFaq.observe(secao);
    });
    
    const formulario = document.querySelector('#formulario form');
    observadorFormulario.observe(formulario);
    
    controlarMusica();
});

document.getElementById('botao').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('formulario').scrollIntoView({
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    
    function emailValido(email) {
        const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formato.test(email);
    }

    function telefoneValido(telefone) {
        const formato = /^9[1236]\d{7}$/;
        return formato.test(telefone.replace(/\s/g, ''));
    }

    function idadeValida(idade) {
        return idade >= 16 && idade <= 100;
    }

    function nomeValido(nome) {
        return nome.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nome);
    }

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const primeiroNome = document.getElementById('pnome').value;
        const ultimoNome = document.getElementById('lnome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const idade = document.getElementById('idade').value;
        
        let erros = [];

        if (!nomeValido(primeiroNome)) {
            erros.push('O nome precisa ter pelo menos 2 letras');
        }

        if (!nomeValido(ultimoNome)) {
            erros.push('O sobrenome precisa ter pelo menos 2 letras');
        }

        if (!emailValido(email)) {
            erros.push('Email inválido');
        }

        if (!telefoneValido(telefone)) {
            erros.push('Telefone inválido (formato: 912 345 678)');
        }

        if (!idadeValida(parseInt(idade))) {
            erros.push('Idade deve ser entre 16 e 100 anos');
        }

        if (erros.length > 0) {
            alert('Erros no formulário:\n' + erros.join('\n'));
        } else {
            alert('Formulário enviado com sucesso! Obrigado pelo teu interesse.');
            formulario.reset();
        }
    });

    const campoTelefone = document.getElementById('telefone');
    campoTelefone.addEventListener('input', function(e) {
        let numero = e.target.value.replace(/\D/g, '');
        if (numero.length > 0) {
            numero = numero.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
        }
        e.target.value = numero;
    });

    const campoIdade = document.getElementById('idade');
    campoIdade.addEventListener('input', function(e) {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });
});