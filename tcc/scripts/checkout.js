// Carrega o carrinho existente
let cart = JSON.parse(localStorage.getItem("carrinho")) || [];


// Atualiza contador no topo
function atualizarCarrinho() {
    document.getElementById("cart-count").textContent = cart.length;
}


// Agrupa itens iguais (ex: 3 Batatas → quantidade 3)
function agruparProdutos() {
    const mapa = {};

    cart.forEach(item => {
        if (!mapa[item.nome]) {
            mapa[item.nome] = { ...item, quantidade: 1 };
        } else {
            mapa[item.nome].quantidade++;
        }
    });

    return Object.values(mapa);
}


// Carrega os produtos no checkout
function renderCheckout() {
    const lista = document.getElementById("checkout-list");
    lista.innerHTML = "";

    const produtos = agruparProdutos();

    let totalGeral = 0;

    produtos.forEach(p => {

        let preco = parseFloat(p.preco.replace("R$", "").replace(",", ".").trim());
        let subtotal = preco * p.quantidade;
        totalGeral += subtotal;

        const card = document.createElement("div");
        card.classList.add("checkout-item");

        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}">
            
            <div class="checkout-info">
                <h3>${p.nome}</h3>
                <p>Preço: R$ ${preco.toFixed(2).replace(".", ",")}</p>
                <p>Quantidade: ${p.quantidade}</p>
                <p><strong>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</strong></p>
            </div>
        `;

        lista.appendChild(card);
    });

    document.getElementById("total-geral").textContent =
        "R$ " + totalGeral.toFixed(2).replace(".", ",");
}


// Finalizar pedido
document.getElementById("finalizar-btn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Pedido finalizado com sucesso! Obrigado pela compra.");

    // limpa carrinho
    cart = [];
    localStorage.setItem("carrinho", JSON.stringify(cart));

    // redireciona para a vitrine
    window.location.href = "homeCliente.html";
});


// Inicialização
atualizarCarrinho();
renderCheckout();
