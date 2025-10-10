document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const elementosParallax = document.querySelectorAll('h1, h2, h3, p, #botao');
    
    elementosParallax.forEach(elemento => {
        const velocidade = 0.02;
        const x = (mouseX - 0.5) * velocidade * 100;
        const y = (mouseY - 0.5) * velocidade * 100;
        
        elemento.style.transform = `translate(${x}px, ${y}px)`;
    });
});

document.addEventListener('mouseleave', () => {
    const elementosParallax = document.querySelectorAll('h1, h2, h3, p, #botao');
    elementosParallax.forEach(elemento => {
        elemento.style.transform = 'translate(0px, 0px)';
    });
});

const opcoesObservadorFaq = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: '-25% 0px -25% 0px'
};

const opcoesObservadorForm = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: '-25% 0px -25% 0px'
};

const observadorFaq = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        const elemento = entrada.target;
        const proporcaoIntersecao = entrada.intersectionRatio;
        const visibilidade = proporcaoIntersecao;
        
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
}, opcoesObservadorFaq);

const observadorForm = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        const formulario = entrada.target;
        const proporcaoIntersecao = entrada.intersectionRatio;
        const visibilidade = proporcaoIntersecao;
        
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
}, opcoesObservadorForm);

window.addEventListener('scroll', () => {
    const secaoFaq = document.getElementById('faq');
    const secaoFormulario = document.getElementById('formulario');
    
    const elementosFaq = document.querySelectorAll('.esquerda, .meio, .direita');
    const retanguloFaq = secaoFaq.getBoundingClientRect();
    const alturaViewport = window.innerHeight;
    
    const alturaVisivelFaq = Math.min(retanguloFaq.bottom, alturaViewport) - Math.max(retanguloFaq.top, 0);
    const visibilidadeFaq = Math.min(alturaVisivelFaq / alturaViewport, 1);
    
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
    const retanguloForm = secaoFormulario.getBoundingClientRect();
    const alturaVisivelForm = Math.min(retanguloForm.bottom, alturaViewport) - Math.max(retanguloForm.top, 0);
    const visibilidadeForm = Math.min(alturaVisivelForm / alturaViewport, 1);
    
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
});

document.addEventListener('DOMContentLoaded', () => {
    const secoesFaq = document.querySelectorAll('.esquerda, .meio, .direita');
    secoesFaq.forEach(secao => {
        observadorFaq.observe(secao);
    });
    
    const formulario = document.querySelector('#formulario form');
    observadorForm.observe(formulario);
});

document.getElementById('botao').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('formulario').scrollIntoView({
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarTelefone(telefone) {
        const regex = /^9[1236]\d{7}$/;
        return regex.test(telefone.replace(/\s/g, ''));
    }

    function validarIdade(idade) {
        return idade >= 16 && idade <= 100;
    }

    function validarNome(nome) {
        return nome.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nome);
    }

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pnome = document.getElementById('pnome').value;
        const lnome = document.getElementById('lnome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const idade = document.getElementById('idade').value;
        
        let erros = [];

        if (!validarNome(pnome)) {
            erros.push('O nome precisa ter pelo menos 2 letras');
        }

        if (!validarNome(lnome)) {
            erros.push('O sobrenome precisa ter pelo menos 2 letras');
        }

        if (!validarEmail(email)) {
            erros.push('Email inválido');
        }

        if (!validarTelefone(telefone)) {
            erros.push('Telefone inválido (formato: 912 345 678)');
        }

        if (!validarIdade(parseInt(idade))) {
            erros.push('Idade deve ser entre 16 e 100 anos');
        }

        if (erros.length > 0) {
            alert('Erros no formulário:\n' + erros.join('\n'));
        } else {
            alert('Formulário enviado com sucesso! Obrigado pelo teu interesse.');
            formulario.reset();
        }
    });

    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 0) {
            valor = valor.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
        }
        e.target.value = valor;
    });

    const idadeInput = document.getElementById('idade');
    idadeInput.addEventListener('input', function(e) {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });
});