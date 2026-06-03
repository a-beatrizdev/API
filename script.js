/* 1. Fetch()
- Faz a requisição para a API
- Que neste caso é a url */

fetch("https://jsonplaceholder.typicode.com/users")

/* 2. Esse .then() 
- Espera a resposta chegar
- Que é uma linguagem no JS */

.then((resposta)=> resposta.json())