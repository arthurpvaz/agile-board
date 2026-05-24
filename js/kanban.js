var cartaoArrastado = null;

function verificarSessao() {
    var sessao = localStorage.getItem("agile_usuario");
    if (!sessao) {
        window.location.href = "login.html";
    }
}

function carregarTarefas() {
    var tarefas = localStorage.getItem("agile_tarefas");
    if (!tarefas) {
        return [];
    }
    return JSON.parse(tarefas);
}

function salvarTarefas(tarefas) {
    localStorage.setItem("agile_tarefas", JSON.stringify(tarefas));
}

function criarCartao(tarefa) {
    var div = document.createElement("div");
    div.className = "cartao prioridade-" + tarefa.prioridade;
    div.setAttribute("draggable", "true");
    div.setAttribute("data-id", tarefa.id);

    div.addEventListener("dragstart", function(evento) {
        iniciarDrag(evento);
    });

    var dataFormatada = tarefa.dataEntrega
        ? tarefa.dataEntrega.split('-').reverse().join('/')
        : '—';

    div.innerHTML =
        '<div class="cartao-header">' +
            '<h4>' + tarefa.titulo + '</h4>' +
            '<button class="btn-excluir" onclick="excluirTarefa(\'' + tarefa.id + '\')">&#x2715;</button>' +
        '</div>' +
        (tarefa.descricao ? '<p>' + tarefa.descricao + '</p>' : '') +
        '<span class="prioridade-' + tarefa.prioridade + '">' + tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1) + '</span>' +
        '<div class="cartao-footer">' +
            '<span>&#128100; ' + (tarefa.responsavel || '—') + '</span>' +
            '<span>&#128197; ' + dataFormatada + '</span>' +
        '</div>';

    return div;
}

function renderizarQuadro(tarefas) {
    var colunas = ["a-fazer", "em-andamento", "concluido"];

    for (var i = 0; i < colunas.length; i++) {
        var coluna = colunas[i];
        var container = document.getElementById("cartoes-" + coluna);
        container.innerHTML = "";
    }

    var filtro = document.getElementById("filtroPrioridade").value;
    var tarefasFiltradas = tarefas;

    if (filtro !== "todas") {
        tarefasFiltradas = [];
        for (var j = 0; j < tarefas.length; j++) {
            if (tarefas[j].prioridade === filtro) {
                tarefasFiltradas.push(tarefas[j]);
            }
        }
    }

    for (var k = 0; k < tarefasFiltradas.length; k++) {
        var tarefa = tarefasFiltradas[k];
        var container = document.getElementById("cartoes-" + tarefa.coluna);
        if (container) {
            container.appendChild(criarCartao(tarefa));
        }
    }

    atualizarContadores(tarefas);
}

function atualizarContadores(tarefas) {
    var contadores = { "a-fazer": 0, "em-andamento": 0, "concluido": 0 };

    for (var i = 0; i < tarefas.length; i++) {
        if (contadores[tarefas[i].coluna] !== undefined) {
            contadores[tarefas[i].coluna]++;
        }
    }

    document.getElementById("contador-a-fazer").textContent = contadores["a-fazer"];
    document.getElementById("contador-em-andamento").textContent = contadores["em-andamento"];
    document.getElementById("contador-concluido").textContent = contadores["concluido"];
}

function iniciarDrag(evento) {
    cartaoArrastado = evento.target.closest(".cartao");
    cartaoArrastado.classList.add("dragging");
    evento.dataTransfer.setData("text/plain", cartaoArrastado.getAttribute("data-id"));
}

function permitirDrop(evento) {
    evento.preventDefault();
    evento.currentTarget.classList.add("drag-over");
}

function soltarCartao(evento, coluna) {
    evento.preventDefault();
    evento.currentTarget.classList.remove("drag-over");

    var id = evento.dataTransfer.getData("text/plain");
    var tarefas = carregarTarefas();

    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].coluna = coluna;
            break;
        }
    }

    salvarTarefas(tarefas);

    if (cartaoArrastado) {
        cartaoArrastado.classList.remove("dragging");
        cartaoArrastado = null;
    }

    renderizarQuadro(tarefas);
}

function excluirTarefa(id) {
    if (!confirm("Deseja excluir esta tarefa?")) {
        return;
    }

    var tarefas = carregarTarefas();
    var novas = [];

    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id !== id) {
            novas.push(tarefas[i]);
        }
    }

    salvarTarefas(novas);
    renderizarQuadro(novas);
}

function filtrarPorPrioridade(evento) {
    var tarefas = carregarTarefas();
    renderizarQuadro(tarefas);
}

// Remover highlight de drag-over quando sair da coluna
var colunas = document.querySelectorAll(".coluna");
for (var i = 0; i < colunas.length; i++) {
    colunas[i].addEventListener("dragleave", function(evento) {
        evento.currentTarget.classList.remove("drag-over");
    });
}

// Inicialização
verificarSessao();
var tarefas = carregarTarefas();
renderizarQuadro(tarefas);

document.getElementById("filtroPrioridade").addEventListener("change", filtrarPorPrioridade);

document.getElementById("btnLogout").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("agile_usuario");
    window.location.href = "login.html";
});
