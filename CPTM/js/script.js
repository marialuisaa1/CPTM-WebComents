let comentarioAtual = 1; // Começa com ID 1
let maxComentario = 9; // Termina no ID 9

let nomeAtual = 1;
let maxNome = 9;

// Função para carregar comentários armazenados no localStorage
function loadComments() {
    for (let i = 1; i <= maxComentario; i++) {
        const comentario = localStorage.getItem(`comentario${i}`);
        const nome = localStorage.getItem(`nome${i}`);
        
        if (comentario && nome) {
            document.getElementById(`comment-card${i}`).getElementsByClassName("card-text")[0].textContent = comentario;
            document.getElementById(`card-title${i}`).textContent = nome;
            comentarioAtual++;
            nomeAtual++;
        }
    }
}

// Função para atualizar comentários a cada 5 minutos
function refreshComments() {
    let novosComentarios = false;

    for (let i = 1; i <= maxComentario; i++) {
        const comentario = localStorage.getItem(`comentario${i}`);
        const nome = localStorage.getItem(`nome${i}`);

        // Verifica se há novos comentários
        if (comentario && nome) {
            if (document.getElementById(`comment-card${i}`).getElementsByClassName("card-text")[0].textContent !== comentario ||
                document.getElementById(`card-title${i}`).textContent !== nome) {
                novosComentarios = true; // Encontrou um novo comentário
            }
        }
    }

    // Se houver novos comentários, atualiza a interface
    if (novosComentarios) {
        loadComments();
    }
}

// Função para enviar o comentário
function submitComment() {
    let comentario = document.getElementById("caixa-comentario").value;
    let nome = document.getElementById("name").value;

    if (comentario.trim() !== "" && nome.trim() !== "") {
        let cardAtual = document.getElementById(`comment-card${comentarioAtual}`);
        let nomeCardAtual = document.getElementById(`card-title${nomeAtual}`);

        if (cardAtual) {
            cardAtual.getElementsByClassName("card-text")[0].textContent = comentario;
            localStorage.setItem(`comentario${comentarioAtual}`, comentario);
            comentarioAtual++;
        }

        if (nomeCardAtual) {
            nomeCardAtual.textContent = nome;
            localStorage.setItem(`nome${nomeAtual}`, nome);
            nomeAtual++;
        }

        if (comentarioAtual > maxComentario || nomeAtual > maxNome) {
            alert("Caixas já preenchidas");
        }

        document.getElementById("caixa-comentario").value = "";
        document.getElementById("name").value = "";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Carrega os comentários ao iniciar a página
window.onload = function() {
    loadComments();
    setInterval(refreshComments, 5 * 60 * 1000); // Atualiza a cada 5 minutos
};

