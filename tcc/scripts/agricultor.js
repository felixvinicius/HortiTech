// scripts/agricultor.js

// Carrega produtos
let produtos = JSON.parse(localStorage.getItem("produtos"));

if (!produtos || produtos.length === 0) {
  produtos = [
    { nome: "Alface", preco: 6.99, imagem: "alface.jpg", ativo: true },
    { nome: "Tomate", preco: 3.50, imagem: "tomate.jpg", ativo: true },
    { nome: "Batata Doce", preco: 4.20, imagem: "batataDoce.jpg", ativo: true },
    { nome: "Batata Inglesa", preco: 4.20, imagem: "batataInglesa.jpg", ativo: true },
    { nome: "Brócolis", preco: 4.20, imagem: "brocolis.webp", ativo: true },
    { nome: "Cenoura", preco: 6.99, imagem: "cenoura.jpg", ativo: true },
    { nome: "Cebola Roxa", preco: 3.50, imagem: "cebolaRoxa.jpg", ativo: true },
    { nome: "Pimentão Verde", preco: 4.20, imagem: "pimentaoVerde.webp", ativo: true }
  ];

  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}


// Exibe os produtos na página do agricultor

function renderProdutosAgricultor() {
  const container = document.getElementById("lista-produtos");
  container.innerHTML = "";

  produtos.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("produto-card");

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p><b>Preço atual:</b> R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
      <p><b>Status:</b> ${p.ativo ? "Ativo ✔️" : "Inativo ❌"}</p>

      <button class="btn-editar">Editar Preço</button>
      <button class="btn-toggle">${p.ativo ? "Desativar" : "Ativar"}</button>
    `;

    // Edição do preço
    card.querySelector(".btn-editar").onclick = () => {
      const entrada = prompt("Novo preço (use ponto para decimal):", p.preco);
      if (entrada === null) return;

      const novoPreco = parseFloat(entrada.replace(",", "."));

      if (!isNaN(novoPreco) && novoPreco > 0) {
        produtos[index].preco = novoPreco;
        salvarProdutos();
        renderProdutosAgricultor();
      } else {
        alert("Preço inválido.");
      }
    };

    // Ativa ou desativa o produto
    card.querySelector(".btn-toggle").onclick = () => {
      produtos[index].ativo = !produtos[index].ativo;
      salvarProdutos();
      renderProdutosAgricultor();
    };

    container.appendChild(card);
  });
}

// Inicializa a página
renderProdutosAgricultor();
