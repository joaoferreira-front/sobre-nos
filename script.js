// Data de início: 28 de outubro de 2023, 18:40 (conforme seu HTML)
const dataInicio = new Date(2023, 9, 28, 18, 40, 0); // Mês é 0-indexado

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

    // Verifica se os elementos existem
    if (!cronometroElement) return;

    // Cria os elementos apenas na primeira vez
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
        // Atualiza apenas os números nas próximas execuções
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

    // Atualiza as informações
    if (infoElement) {
        const agora = new Date();
        infoElement.innerHTML = `
            Atualizado em tempo real • ${agora.toLocaleTimeString('pt-BR')}<br>
            <small>Início: ${formatarData(dataInicio)}</small>
        `;
    }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Pequeno delay para permitir que as animações CSS comecem primeiro
    setTimeout(() => {
        atualizarCronometro();
        
        // Atualiza a cada segundo
        setInterval(atualizarCronometro, 1000);
    }, 100);
});

// Opcional: Atualiza quando a aba ganha foco
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        atualizarCronometro();
    }
});