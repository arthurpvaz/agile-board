var usuarios = [
    { usuario: "admin", senha: "1234", nome: "Administrador" },
    { usuario: "rafael", senha: "rafa123", nome: "Rafael Cappra" },
    { usuario: "arthur", senha: "arthur123", nome: "Arthur Vaz" },
    { usuario: "eduardo", senha: "eduardo123", nome: "Eduardo Benelli" },
    { usuario: "leonardo", senha: "leo123", nome: "Leonardo Machado" }
];

function verificarSessao() {
    var sessao = localStorage.getItem("agile_usuario");
    if (sessao) {
        window.location.href = "dashboard.html";
    }
}

function limparErros() {
    document.getElementById("erroUsuario").style.display = "none";
    document.getElementById("erroSenha").style.display = "none";
    document.getElementById("erroGeral").style.display = "none";
    document.getElementById("usuario").classList.remove("erro");
    document.getElementById("senha").classList.remove("erro");
}

function exibirErro(campo, mensagem) {
    var input = document.getElementById(campo);
    var erro = document.getElementById("erro" + campo.charAt(0).toUpperCase() + campo.slice(1));
    input.classList.add("erro");
    erro.textContent = mensagem;
    erro.style.display = "block";
}

function validarCampos() {
    var valido = true;
    var usuario = document.getElementById("usuario").value.trim();
    var senha = document.getElementById("senha").value.trim();

    if (usuario === "") {
        exibirErro("usuario", "Campo obrigatório.");
        valido = false;
    }

    if (senha === "") {
        exibirErro("senha", "Campo obrigatório.");
        valido = false;
    }

    return valido;
}

function salvarSessao(usuario) {
    localStorage.setItem("agile_usuario", JSON.stringify(usuario));
}

function autenticar(evento) {
    evento.preventDefault();
    limparErros();

    if (!validarCampos()) {
        return;
    }

    var usuario = document.getElementById("usuario").value.trim();
    var senha = document.getElementById("senha").value.trim();

    var encontrado = null;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === usuario && usuarios[i].senha === senha) {
            encontrado = usuarios[i];
            break;
        }
    }

    if (encontrado) {
        salvarSessao(encontrado);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("erroGeral").style.display = "block";
    }
}

verificarSessao();
document.getElementById("formLogin").addEventListener("submit", autenticar);
