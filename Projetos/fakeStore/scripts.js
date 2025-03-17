allProducts = "https://fakestoreapi.com/products"

const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const filterBtn = document.getElementById('filterBtn');
const productsContainer = document.getElementById('productsContainer');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartBtn = document.getElementById('cartBtn')



async function carregarProdutos() {
    const response = await fetch(allProducts);
    const data = await response.json();
    console.log(data)

    localStorage.setItem('products', JSON.stringify(data));
    renderizarProdutos(data)
    return data


}


async function renderizarProdutos(produtos) {
    productsContainer.innerHTML = '';
    if (produtos) {
        for(const produto of produtos) {
            const productElement = document.createElement('div');
            productElement.classList.add('product')

            const precoConvertido = await converterParaReal(produto.price);
            const precoFormatado = precoConvertido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

            productElement.innerHTML = `
            <img src = "${produto.image}" alt="${produto.title}">
            <h2>${produto.title}</h2>
            <h3>${precoFormatado}</h3>
            <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
            `;

            productsContainer.appendChild(productElement)
          

        }
    }
}

async function carregarCategorias() {
    try {
        const response = await fetch(allProducts);
        const data = await response.json();
        const categorias = [...new Set(data.map(produto => produto.category))];
        console.log(categorias)

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoryFilter.appendChild(option);
        })
    }catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

async function buscarPorNome(nome) {
    try {
        const response = await fetch(allProducts);
        const data = await response.json();
        const produtosFiltrados = data.filter(produto =>
            produto.title.toLowerCase().includes(nome.toLowerCase())
        );

        return produtosFiltrados;
    }catch (error) {
        console.error('Erro ao buscar o produto:', error)
        return [];
    }
}

async function buscarPorpreco(valor) {
    try {
        const response = await fetch(allProducts);
        const data = await response.json();
        const produtosFiltrados = [];
        for (const produto of data) {
            const precoEmReais = await converterParaReal(produto.price);
            if (precoEmReais <= valor) {
                produtosFiltrados.push(produto);
                
            }
        }
        console.log(produtosFiltrados)
        return produtosFiltrados;
        
    }catch (error) {
        console.error('Erro ao buscar o produto:', error)
        return [];
    }
}

async function buscarCategoria(categoria) {
    console.log(categoria)
    try {
        const response = await fetch(allProducts);
        const data = await response.json();
        if (categoria === "all" || categoria.toLowerCase() === "todas as categorias") {
           
            return data;
        }
        const produtosFiltrados = data.filter(produto =>
            produto.category.toLowerCase() === categoria.toLowerCase()
        );
        return produtosFiltrados;
    }catch (error) {
        console.error('Erro ao buscar o produto:', error)
        return [];
    }

}


async function obterCotacao() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates.BRL;
    }catch (error) {
        console.error('Erro ao obter a cotação do dólar:', error);
        return 5.00;
    }
}


async function converterParaReal(valorEmDolar) {
    const cotacao = await obterCotacao();
    return valorEmDolar * cotacao;
}


searchInput.addEventListener('input', async () => {
    const nome = searchInput.value;
    if (nome) {
        const produtos = await buscarPorNome(nome);
        console.log(produtos)
        renderizarProdutos(produtos)
    }
    
})

categoryFilter.addEventListener('change', async () => {
    const categoria = categoryFilter.value;
    if (categoria) {
        const categorias = await buscarCategoria(categoria);
        renderizarProdutos(categorias)
    }
})

priceFilter.addEventListener('input', async () => {
    const preco = parseFloat(priceFilter.value);
    if (preco) {
        const produtos = await buscarPorpreco(preco);
        renderizarProdutos(produtos)
    }
})

document.getElementById('cartIcon').addEventListener('click', () => {
    abrirCarrinho();
});


carregarProdutos()
carregarCategorias()