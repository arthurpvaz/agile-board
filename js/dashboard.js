function verificarSessao() {
    var sessao = localStorage.getItem("agile_usuario");
    if (!sessao) {
        window.location.href = "login.html";
        return null;
    }
    return JSON.parse(sessao);
}

function logout() {
    localStorage.removeItem("agile_usuario");
    window.location.href = "login.html";
}

function carregarDados() {
    var tarefas = localStorage.getItem("agile_tarefas");
    if (!tarefas) {
        return [];
    }
    return JSON.parse(tarefas);
}

function calcularMetricas(tarefas) {
    var metricas = {
        total: tarefas.length,
        emAndamento: 0,
        concluidas: 0,
        vencidas: 0
    };

    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    for (var i = 0; i < tarefas.length; i++) {
        var tarefa = tarefas[i];

        if (tarefa.coluna === "em-andamento") {
            metricas.emAndamento++;
        }

        if (tarefa.coluna === "concluido") {
            metricas.concluidas++;
        }

        if (tarefa.dataEntrega && tarefa.coluna !== "concluido") {
            var dataEntrega = new Date(tarefa.dataEntrega + "T00:00:00");
            if (dataEntrega < hoje) {
                metricas.vencidas++;
            }
        }
    }

    return metricas;
}

function renderizarMetricas(metricas) {
    document.getElementById("totalTarefas").textContent = metricas.total;
    document.getElementById("totalEmAndamento").textContent = metricas.emAndamento;
    document.getElementById("totalConcluidas").textContent = metricas.concluidas;
    document.getElementById("totalVencidas").textContent = metricas.vencidas;
}

function traduzirColuna(coluna) {
    if (coluna === "a-fazer") return "A Fazer";
    if (coluna === "em-andamento") return "Em Andamento";
    if (coluna === "concluido") return "Concluído";
    return coluna;
}

function classeStatus(coluna) {
    if (coluna === "a-fazer") return "status-badge status-a-fazer";
    if (coluna === "em-andamento") return "status-badge status-em-andamento";
    if (coluna === "concluido") return "status-badge status-concluido";
    return "";
}

function listarTarefasRecentes(tarefas) {
    var container = document.getElementById("listaTarefas");

    if (tarefas.length === 0) {
        container.innerHTML = '<p class="sem-tarefas">Nenhuma tarefa cadastrada ainda.</p>';
        return;
    }

    var recentes = tarefas.slice(-5).reverse();

    var tabela = '<table class="tabela-tarefas">';
    tabela += '<thead><tr>';
    tabela += '<th>Título</th><th>Prioridade</th><th>Responsável</th><th>Status</th><th>Entrega</th>';
    tabela += '</tr></thead><tbody>';

    for (var i = 0; i < recentes.length; i++) {
        var t = recentes[i];
        tabela += '<tr>';
        tabela += '<td>' + t.titulo + '</td>';
        tabela += '<td><span class="prioridade-' + t.prioridade + '">' + t.prioridade.charAt(0).toUpperCase() + t.prioridade.slice(1) + '</span></td>';
        tabela += '<td>' + (t.responsavel || '—') + '</td>';
        tabela += '<td><span class="' + classeStatus(t.coluna) + '">' + traduzirColuna(t.coluna) + '</span></td>';
        tabela += '<td>' + (t.dataEntrega ? t.dataEntrega.split('-').reverse().join('/') : '—') + '</td>';
        tabela += '</tr>';
    }

    tabela += '</tbody></table>';
    container.innerHTML = tabela;
}

// Inicialização
var sessao = verificarSessao();
if (sessao) {
    document.getElementById("nomeUsuario").textContent = sessao.nome;
    var tarefas = carregarDados();
    var metricas = calcularMetricas(tarefas);
    renderizarMetricas(metricas);
    listarTarefasRecentes(tarefas);
}

document.getElementById("btnLogout").addEventListener("click", function(e) {
    e.preventDefault();
    logout();
});
