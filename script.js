// Data de início: 28 de outubro de 2023, 18:40
const dataInicio = new Date(2023, 9, 28, 18, 40, 0);

function calcularTempo() {
    const agora = new Date();
    const diferenca = agora.getTime() - dataInicio.getTime();

    const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return [
        { valor: anos, label: anos === 1 ? 'Ano' : 'Anos' },
        { valor: meses, label: meses === 1 ? 'Mês' : 'Meses' },
        { valor: dias, label: dias === 1 ? 'Dia' : 'Dias' },
        { valor: horas, label: horas === 1 ? 'Hora' : 'Horas' },
        { valor: minutos, label: minutos === 1 ? 'Minuto' : 'Minutos' },
        { valor: segundos, label: segundos === 1 ? 'Segundo' : 'Segundos' }
    ];
}

function formatarData(data) {
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function atualizarCronometro() {
    const tempo = calcularTempo();
    const cronometroElement = document.getElementById('cronometro');
    const infoElement = document.getElementById('info');

    if (!cronometroElement) return;

    if (cronometroElement.children.length === 0) {
        tempo.forEach((unidade, index) => {
            const item = document.createElement('div');
            item.className = 'cronometro-item';
            
            item.innerHTML = `
                <div class="cronometro-numero">${unidade.valor.toString().padStart(2, '0')}</div>
                <div class="cronometro-label">${unidade.label}</div>
            `;
            
            cronometroElement.appendChild(item);
        });
    } else {
        const itens = cronometroElement.querySelectorAll('.cronometro-item');
        tempo.forEach((unidade, index) => {
            if (itens[index]) {
                const numeroElement = itens[index].querySelector('.cronometro-numero');
                const labelElement = itens[index].querySelector('.cronometro-label');
                
                if (numeroElement) {
                    numeroElement.textContent = unidade.valor.toString().padStart(2, '0');
                }
                if (labelElement) {
                    labelElement.textContent = unidade.label;
                }
            }
        });
    }

    if (infoElement) {
        const agora = new Date();
        infoElement.innerHTML = `
            Atualizado em tempo real • ${agora.toLocaleTimeString('pt-BR')}<br>
            <small>Início: ${formatarData(dataInicio)}</small>
        `;
    }
}

// Função para configurar o carrossel no mobile
function configurarCarrosselMobile() {
    // Verifica se está em viewport mobile
    if (window.innerWidth <= 768) {
        const fotosContainer = document.querySelector('.nossas-fotos');
        if (!fotosContainer) return;
        
        // Adiciona indicadores de navegação
        if (!document.querySelector('.carrossel-indicadores')) {
            const indicadoresContainer = document.createElement('div');
            indicadoresContainer.className = 'carrossel-indicadores';
            
            const fotos = fotosContainer.querySelectorAll('figure');
            fotos.forEach((_, index) => {
                const indicador = document.createElement('div');
                indicador.className = 'indicador';
                if (index === 0) indicador.classList.add('ativo');
                
                indicador.addEventListener('click', () => {
                    const targetFoto = fotos[index];
                    targetFoto.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                });
                
                indicadoresContainer.appendChild(indicador);
            });
            
            // Insere após o container de fotos
            fotosContainer.parentNode.insertBefore(indicadoresContainer, fotosContainer.nextSibling);
            
            // Adiciona setas de navegação
            const navContainer = document.createElement('div');
            navContainer.className = 'carrossel-nav';
            
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&lt;';
            prevBtn.addEventListener('click', () => {
                fotosContainer.scrollBy({
                    left: -fotosContainer.offsetWidth * 0.85,
                    behavior: 'smooth'
                });
            });
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&gt;';
            nextBtn.addEventListener('click', () => {
                fotosContainer.scrollBy({
                    left: fotosContainer.offsetWidth * 0.85,
                    behavior: 'smooth'
                });
            });
            
            navContainer.appendChild(prevBtn);
            navContainer.appendChild(nextBtn);
            
            // Insere após os indicadores
            indicadoresContainer.parentNode.insertBefore(navContainer, indicadoresContainer.nextSibling);
            
            // Atualiza indicadores ao rolar
            fotosContainer.addEventListener('scroll', () => {
                const scrollPosition = fotosContainer.scrollLeft;
                const fotoWidth = fotosContainer.offsetWidth * 0.85;
                const currentIndex = Math.round(scrollPosition / fotoWidth);
                
                const indicadores = document.querySelectorAll('.indicador');
                indicadores.forEach((ind, i) => {
                    if (i === currentIndex) {
                        ind.classList.add('ativo');
                    } else {
                        ind.classList.remove('ativo');
                    }
                });
            });
        }
    }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Configura o carrossel para mobile
    configurarCarrosselMobile();
    
    // Atualiza o cronômetro
    setTimeout(() => {
        atualizarCronometro();
        setInterval(atualizarCronometro, 1000);
    }, 100);
    
    // Reconfigura o carrossel se a janela for redimensionada
    window.addEventListener('resize', configurarCarrosselMobile);
});

// Atualiza quando a aba ganha foco
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        atualizarCronometro();
    }
});