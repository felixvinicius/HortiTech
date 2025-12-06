// Carrega Produtos do Agricultor
let produtosAgricultor = JSON.parse(localStorage.getItem("produtos")) || [];
if (!Array.isArray(produtosAgricultor)) {
    produtosAgricultor = [];
}

// Imagens dos produtos(links)
const IMAGE_URLS = {
    "Alface": "https://cdn.folhape.com.br/upload/dn_arquivo/2023/08/alface-crespa-organica.jpg",
    "Tomate": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThm01-CJeq755ByHRoZyhTlUAX3hfmVP_ULA&s",
    "Batata Doce": "https://www.estadao.com.br/resizer/v2/D7UTDTHHIJGFNI7Z4LGHTQH3FI.jpeg?quality=80&auth=b3e4c4f2c84ab4086e5d39592060f43a0e3a6c32ac2fd42a171da3d348332c7c&width=1075&height=527&focal=2650,1690",
    "Batata Inglesa": "https://conteudo.imguol.com.br/c/entretenimento/0e/2017/10/15/batata-crua-1508077604971_v2_450x450.jpg",
    "Brócolis": "https://conteudo.imguol.com.br/c/entretenimento/53/2020/05/04/brocolis-1588626077191_v2_4x3.jpg",
    "Cenoura": "https://s2-globorural.glbimg.com/h8QvDGM9836eeIp9UC6usQmK7Yc=/0x0:1920x1080/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_afe5c125c3bb42f0b5ae633b58923923/internal_photos/bs/2025/g/I/xY3NHVSK2GUdFZghgLIA/foto-3-cenoura.jpg",
    "Cebola Roxa": "https://cozinhadalbo.com.br/wp-content/uploads/2024/01/Chutney-de-Cebola-Roxa-3.jpg",
    "Pimentão Verde": "https://files.agro20.com.br/uploads/2020/07/piment%C3%A3o-verde-1-1024x576.jpg"
};

function getImagemProduto(p) {
    if (IMAGE_URLS[p.nome]) {
        return IMAGE_URLS[p.nome];
    }

    // 2) Se não tiver, gera um placeholder com o nome
    return `https://via.placeholder.com/400x250.png?text=${encodeURIComponent(p.nome)}`;
}

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
if (!Array.isArray(cart)) {
    cart = [];
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(cart));
}

function atualizarCarrinho() {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
    atualizarBotoesRemover();
    atualizarContadores();
    atualizarTotalCheckout();
}

function adicionarAoCarrinho(produto) {
    cart.push(produto);
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(nomeProduto) {
    const i = cart.findIndex(item => item.nome === nomeProduto);
    if (i !== -1) {
        cart.splice(i, 1);
        salvarCarrinho();
        atualizarCarrinho();
    }
}

// Quantidade de um produto no carrinho
function quantidadeProduto(nome) {
    return cart.filter(p => p.nome === nome).length;
}

function atualizarContadores() {
    document.querySelectorAll(".card").forEach(card => {
        const nome = card.querySelector(".desc").textContent;
        const contador = card.querySelector(".qnt");

        if (contador) {
            contador.textContent = quantidadeProduto(nome);
        }
    });
}

// Mostra e oculta botões de remover no carrinho
function atualizarBotoesRemover() {
    document.querySelectorAll(".card").forEach(card => {
        const nome = card.querySelector(".desc").textContent;
        const botaoRemover = card.querySelector(".remove");
        if (!botaoRemover) return;

        const quantidade = quantidadeProduto(nome);
        botaoRemover.style.display = quantidade > 0 ? "block" : "none";
    });
}

//  Renderização dos Cards da Vitrine
function renderizarVitrine() {
    const grid = document.getElementById("grid-produtos");
    if (!grid) return;

    grid.innerHTML = "";

    produtosAgricultor.forEach(p => {
        if (!p.ativo) return;

        const caminhoImagem = getImagemProduto(p);

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${caminhoImagem}" alt="${p.nome}">
            <div class="info">
                <p class="desc">${p.nome}</p>
                <p class="price">R$ ${p.preco.toFixed(2)}</p>
                <p class="qnt-label">Quantidade: <span class="qnt">0</span></p>
            </div>

            <button class="btn add">Adicionar ao Carrinho</button>
            <button class="btn remove">Remover do Carrinho</button>
        `;

        grid.appendChild(card);
    });

    configurarEventosDosCards();
}

// Eventos dos Botões 
function configurarEventosDosCards() {
    document.querySelectorAll(".card").forEach(card => {

        const nome = card.querySelector(".desc").textContent;
        const preco = card.querySelector(".price").textContent;
        const imagem = card.querySelector("img").src; // agora é URL online

        const addBtn = card.querySelector(".add");
        const removeBtn = card.querySelector(".remove");

        addBtn.onclick = () => {
            adicionarAoCarrinho({ nome, preco, imagem });
        };

        removeBtn.onclick = () => {
            removerDoCarrinho(nome);
        };
    });

    atualizarCarrinho();
}

// Atualização do total no checkout
function atualizarTotalCheckout() {
    let total = 0;

    cart.forEach(item => {
        let preco = parseFloat(
            item.preco.replace("R$", "").replace(",", ".").trim()
        );
        total += preco;
    });

    const campoCheckout = document.getElementById("checkout-total");
    if (campoCheckout) {
        campoCheckout.textContent =
            "Total: R$ " + total.toFixed(2).replace(".", ",");
    }
}

// Botão ir para checkout
const btnCheckout = document.getElementById("go-checkout");
if (btnCheckout) {
    // homeCliente.html e checkout.html estão na mesma pasta /pages
    btnCheckout.onclick = () => {
        window.location.href = "checkout.html";
    };
}


renderizarVitrine();
atualizarCarrinho();