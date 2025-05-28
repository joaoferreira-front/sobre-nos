// Data inicial - 28 de outubro de 2023 às 18:00
const dataInicial = new Date("2023-10-28T18:00:00")

// Elementos do cronômetro
const cronometroGrid = document.getElementById("cronometro")
const infoElement = document.getElementById("info")

// Função para calcular a diferença de tempo
function calcularTempo() {
  const agora = new Date()
  const diferenca = Math.abs(agora - dataInicial)

  // Cálculos de tempo
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000)

  // Cálculos adicionais
  const semanas = Math.floor(dias / 7)
  const meses = Math.floor(dias / 30.44) // Média de dias por mês

  return { dias, horas, minutos, segundos, semanas, meses }
}

// Função para atualizar o cronômetro
function atualizarCronometro() {
  const tempo = calcularTempo()

  // Limpar o grid
  cronometroGrid.innerHTML = ""

  // Adicionar itens ao grid
  adicionarItemCronometro(tempo.meses, "Meses")
  adicionarItemCronometro(tempo.semanas, "Semanas")
  adicionarItemCronometro(tempo.dias, "Dias")
  adicionarItemCronometro(tempo.horas, "Horas")
  adicionarItemCronometro(tempo.minutos, "Minutos")
  adicionarItemCronometro(tempo.segundos, "Segundos")

  // Atualizar informação adicional
  const dataFormatada = dataInicial.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  infoElement.textContent = `Contando desde ${dataFormatada}`
}

// Função para adicionar um item ao cronômetro
function adicionarItemCronometro(valor, label) {
  const item = document.createElement("div")
  item.className = "cronometro-item"

  const numero = document.createElement("div")
  numero.className = "cronometro-numero"
  numero.textContent = valor

  const texto = document.createElement("div")
  texto.className = "cronometro-label"
  texto.textContent = label

  item.appendChild(numero)
  item.appendChild(texto)
  cronometroGrid.appendChild(item)

  // Adicionar classe para ativar animação após um pequeno delay
  setTimeout(() => {
    item.classList.add("js-created")
  }, 100)
}

// Iniciar o cronômetro
atualizarCronometro()

// Atualizar a cada segundo
setInterval(atualizarCronometro, 1000)
// Função para configurar o carrossel em dispositivos móveis
function configurarCarrosselMobile() {
  // Verificar se é um dispositivo móvel (largura menor que 768px)
  if (window.innerWidth <= 768) {
    const container = document.querySelector(".nossas-fotos")
    const figuras = container.querySelectorAll("figure")

    // Criar indicadores
    const indicadoresContainer = document.createElement("div")
    indicadoresContainer.className = "carrossel-indicadores"

    // Criar navegação
    const navContainer = document.createElement("div")
    navContainer.className = "carrossel-nav"

    const btnAnterior = document.createElement("button")
    btnAnterior.innerHTML = "‹"
    btnAnterior.setAttribute("aria-label", "Foto anterior")

    const btnProximo = document.createElement("button")
    btnProximo.innerHTML = "›"
    btnProximo.setAttribute("aria-label", "Próxima foto")

    navContainer.appendChild(btnAnterior)
    navContainer.appendChild(btnProximo)

    // Adicionar indicadores para cada figura
    figuras.forEach((_, index) => {
      const indicador = document.createElement("div")
      indicador.className = "indicador"
      if (index === 0) indicador.classList.add("ativo")
      indicador.setAttribute("data-index", index)
      indicadoresContainer.appendChild(indicador)

      // Evento de clique no indicador
      indicador.addEventListener("click", () => {
        const figura = figuras[index]
        figura.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      })
    })

    // Adicionar elementos ao DOM
    const fotosSection = document.getElementById("nossas-fotos")
    fotosSection.appendChild(indicadoresContainer)
    fotosSection.appendChild(navContainer)

    // Eventos de navegação
    btnAnterior.addEventListener("click", () => {
      container.scrollBy({ left: -container.offsetWidth * 0.85, behavior: "smooth" })
    })

    btnProximo.addEventListener("click", () => {
      container.scrollBy({ left: container.offsetWidth * 0.85, behavior: "smooth" })
    })

    // Atualizar indicador ativo durante o scroll
    container.addEventListener("scroll", () => {
      const scrollPosition = container.scrollLeft
      const containerWidth = container.offsetWidth

      // Encontrar a figura mais visível
      let activeIndex = 0
      let maxVisibility = 0

      figuras.forEach((figura, index) => {
        const figuraLeft = figura.offsetLeft - container.offsetLeft
        const figuraCenter = figuraLeft + figura.offsetWidth / 2
        const containerCenter = scrollPosition + containerWidth / 2
        const visibility = 1 - Math.min(Math.abs(figuraCenter - containerCenter) / (containerWidth / 2), 1)

        if (visibility > maxVisibility) {
          maxVisibility = visibility
          activeIndex = index
        }
      })

      // Atualizar indicador ativo
      document.querySelectorAll(".indicador").forEach((ind, index) => {
        if (index === activeIndex) {
          ind.classList.add("ativo")
        } else {
          ind.classList.remove("ativo")
        }
      })
    })
  }
}

// Executar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", configurarCarrosselMobile)

// Reconfigurar quando a janela for redimensionada
window.addEventListener("resize", configurarCarrosselMobile)
