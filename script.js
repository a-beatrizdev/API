/* 1. Fetch()
- Faz a requisição para a API
- Que neste caso é a url */

fetch("https://jsonplaceholder.typicode.com/users")

    /* 2. Esse .then() 
    - Espera a resposta chegar
    - Que é uma linguagem no JS
    - E depois resposta.json() 
    - Transforma os dados em objeto JavaScript */

    .then((resposta) => resposta.json())
    .then((dados) => {

        console.log(dados)

    })

// =====================================
// ELEMENTOS - USUÁRIOS
// =====================================

const btnUsuarios = document.getElementById("btnUsuarios");
const usuariosDiv = document.getElementById("usuarios");
const loadingUsuarios = document.getElementById("loadingUsuarios");

// =====================================
// BUSCAR USUÁRIOS
// =====================================

btnUsuarios.addEventListener("click", async () => {

    usuariosDiv.innerHTML = "";

    loadingUsuarios.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <span>Carregando usuários...</span>
        </div>
    `;

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuários");
        }

        const usuarios = await resposta.json();

        loadingUsuarios.innerHTML = "";

        usuarios.forEach(usuario => {

            usuariosDiv.innerHTML += `
                <div class="usuario">
                    <strong>${usuario.name}</strong>
                    <span>${usuario.email}</span>
                </div>
            `;

        });

    } catch (erro) {

        loadingUsuarios.innerHTML = "";

        usuariosDiv.innerHTML = `
            <p class="erro">
                ❌ Erro ao buscar usuários.
            </p>
        `;
    }

});


// =====================================
// ELEMENTOS - CEP
// =====================================

const btnCep = document.getElementById("btnCep");
const cepInput = document.getElementById("cep");
const resultadoCep = document.getElementById("resultadoCep");
const loadingCep = document.getElementById("loadingCep");

// =====================================
// EVENTOS
// =====================================

btnCep.addEventListener("click", buscarCEP);

cepInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        buscarCEP();
    }

});

// =====================================
// BUSCAR CEP
// =====================================

async function buscarCEP() {

    const cep = cepInput.value.trim();

    resultadoCep.innerHTML = "";

    if (cep.length !== 8 || isNaN(cep)) {

        resultadoCep.innerHTML = `
            <p class="erro">
                ❌ Digite um CEP válido com 8 números.
            </p>
        `;

        return;
    }

    loadingCep.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <span>Consultando CEP...</span>
        </div>
    `;

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na consulta");
        }

        const dados = await resposta.json();

        loadingCep.innerHTML = "";

        if (dados.erro) {

            resultadoCep.innerHTML = `
                <p class="erro">
                    ❌ CEP não encontrado.
                </p>
            `;

            return;
        }

        resultadoCep.innerHTML = `
            <div class="endereco">

                <p>
                    <strong>Rua:</strong>
                    ${dados.logradouro || "Não informado"}
                </p>

                <p>
                    <strong>Bairro:</strong>
                    ${dados.bairro || "Não informado"}
                </p>

                <p>
                    <strong>Cidade:</strong>
                    ${dados.localidade}
                </p>

                <p>
                    <strong>Estado:</strong>
                    ${dados.uf}
                </p>

                <p>
                    <strong>CEP:</strong>
                    ${dados.cep}
                </p>

            </div>
        `;

    } catch (erro) {

        loadingCep.innerHTML = "";

        resultadoCep.innerHTML = `
            <p class="erro">
                ❌ Erro ao consultar o CEP.
            </p>
        `;
    }

}
