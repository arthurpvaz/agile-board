function verificarSessao() {
    var sessao = localStorage.getItem("agile_usuario");
    if (!sessao) {
        window.location.href = "login.html";
    }
}

function gerarId() {
    return "tarefa-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function atualizarCorPrioridade(evento) {
    var prioridade = document.getElementById("prioridade").value;
    var previa = document.getElementById("previaCartao");
    var badge = document.getElementById("previaPrioridade");

    previa.style.borderLeftColor = "";
    previa.className = "previa-cartao";

    badge.className = "";

    if (prioridade === "alta") {
        previa.style.borderLeftColor = "#dc2626";
        badge.className = "prioridade-alta";
        badge.textContent = "Alta";
    } else if (prioridade === "media") {
        previa.style.borderLeftColor = "#f59e0b";
        badge.className = "prioridade-media";
        badge.textContent = "Média";
    } else {
        previa.style.borderLeftColor = "#16a34a";
        badge.className = "prioridade-baixa";
        badge.textContent = "Baixa";
    }
}

function atualizarPrevia() {
    var titulo = document.getElementById("titulo").value.trim();
    var descricao = document.getElementById("descricao").value.trim();
    var responsavel = document.getElementById("responsavel").value.trim();
    var dataEntrega = document.getElementById("dataEntrega").value;

    document.getElementById("previaTitulo").textContent = titulo || "Título da tarefa";

    var pDesc = document.getElementById("previaDescricao");
    if (descricao) {
        pDesc.textContent = descricao;
        pDesc.style.display = "block";
    } else {
        pDesc.style.display = "none";
    }

    document.getElementById("previaResponsavel").textContent = "👤 " + (responsavel || "—");

    if (dataEntrega) {
        var partes = dataEntrega.split("-");
        document.getElementById("previaData").textContent = "📅 " + partes[2] + "/" + partes[1] + "/" + partes[0];
    } else {
        document.getElementById("previaData").textContent = "📅 —";
    }

    atualizarCorPrioridade();
}

function validarFormulario(evento) {
    evento.preventDefault();

    var titulo = document.getElementById("titulo").value.trim();
    var valido = true;

    document.getElementById("erroTitulo").style.display = "none";
    document.getElementById("titulo").classList.remove("erro");

    if (titulo === "") {
        document.getElementById("erroTitulo").textContent = "Campo obrigatório.";
        document.getElementById("erroTitulo").style.display = "block";
        document.getElementById("titulo").classList.add("erro");
        valido = false;
    }

    if (!valido) {
        return;
    }

    var novaTarefa = {
        id: gerarId(),
        titulo: titulo,
        descricao: document.getElementById("descricao").value.trim(),
        prioridade: document.getElementById("prioridade").value,
        responsavel: document.getElementById("responsavel").value.trim(),
        dataEntrega: document.getElementById("dataEntrega").value,
        coluna: document.getElementById("coluna").value
    };

    salvarTarefa(novaTarefa);
}

function salvarTarefa(tarefa) {
    var tarefas = localStorage.getItem("agile_tarefas");
    var lista = tarefas ? JSON.parse(tarefas) : [];

    lista.push(tarefa);
    localStorage.setItem("agile_tarefas", JSON.stringify(lista));

    window.location.href = "kanban.html";
}

function cancelar() {
    window.location.href = "kanban.html";
}

// Inicialização
verificarSessao();

document.getElementById("formNovaTarefa").addEventListener("submit", validarFormulario);
document.getElementById("titulo").addEventListener("input", atualizarPrevia);
document.getElementById("descricao").addEventListener("input", atualizarPrevia);
document.getElementById("prioridade").addEventListener("change", atualizarPrevia);
document.getElementById("responsavel").addEventListener("input", atualizarPrevia);
document.getElementById("dataEntrega").addEventListener("change", atualizarPrevia);

document.getElementById("btnLogout").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("agile_usuario");
    window.location.href = "login.html";
});

// Mostrar cor inicial da prévia
atualizarCorPrioridade();
