const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        // Manipular os dados recebidos, por exemplo:
        const products = data.results;

        // Selecionar o elemento onde os produtos serão renderizados
        const productListContainer = document.getElementById('product-list');

        // Criar uma div para cada produto e renderizar os produtos dentro delas
        products.forEach(product => {
            // Criar uma div para o produto
            const productDiv = document.createElement('div');
            productDiv.classList.add('product'); // Adicionar uma classe para estilização

            // Criar imagem do produto
            const image = document.createElement('img');
            image.src = product.thumbnail; // URL da imagem
            image.alt = product.title; // Texto alternativo da imagem
            productDiv.appendChild(image);

            // Criar título do produto
            const title = document.createElement('span');
            title.textContent = product.title;
            productDiv.appendChild(title);

            // Criar preço do produto
            const price = document.createElement('span');
            price.innerHTML = `<h3>R$ ${product.price.toFixed(2)}</h3>`;            
            productDiv.appendChild(price);

            // Criar botão "Comprar" para adicionar ao carrinho
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', () => addToCart(product));
            productDiv.appendChild(buyButton);

            // Adicionar a div do produto ao contêiner principal
            productListContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao obter os dados:', error);
    });

// Função para adicionar o produto ao carrinho
function addToCart(product) {
    let cart = localStorage.getItem('cart');

    if (!cart) {
        // Se não houver carrinho, criar um array vazio
        cart = [];
    } else {
        // Se houver um carrinho, converter a string JSON para array
        cart = JSON.parse(cart);
    }

    // Adicionar o produto ao carrinho
    cart.push(product);

    // Atualizar o carrinho no armazenamento local
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para exibir os itens do carrinho na página do carrinho
function displayCartItems() {
    // Selecionar o elemento onde os itens do carrinho serão exibidos
    const cartContainer = document.getElementById('cart-items');
    // Selecionar o elemento onde o total será exibido
    const totalElement = document.getElementById('total');
    // Selecionar o botão "Encerrar Compra"
    const checkoutButton = document.getElementById('checkout-button');

    // Verificar se há itens no carrinho no armazenamento local
    let cart = localStorage.getItem('cart');

    if (!cart) {
        cartContainer.textContent = 'Seu carrinho está vazio';
        totalElement.textContent = 'Total: R$ 0.00'; // Definir total como 0
        return;
    }

    // Se houver itens no carrinho, converter a string JSON para array
    cart = JSON.parse(cart);

    // Limpar o conteúdo anterior do carrinho
    cartContainer.innerHTML = '';

    // Inicializar total como 0
    let total = 0;

    // Iterar sobre os itens do carrinho e exibir cada um deles
    cart.forEach(item => {
        // Criar um elemento para exibir o título do produto
        const title = document.createElement('div');
        title.textContent = item.title;
        cartContainer.appendChild(title);

        // Criar um elemento para exibir o preço do produto
        const price = document.createElement('div');
        price.textContent = 'Preço: R$ ' + item.price.toFixed(2);
        cartContainer.appendChild(price);

        // Adicionar o preço do produto ao total
        total += item.price;

        // Adicionar uma linha divisória entre os itens do carrinho
        const divider = document.createElement('hr');
        cartContainer.appendChild(divider);
    });

    // Exibir o total dos itens do carrinho
    totalElement.textContent = 'Total: R$ ' + total.toFixed(2);

    // Adicionar um ouvinte de evento ao botão "Encerrar Compra"
    checkoutButton.addEventListener('click', () => checkout());
}

// Função para encerrar a compra (limpar o carrinho e exibir mensagem)
function checkout() {
    // Limpar o carrinho (removendo o item 'cart' do armazenamento local)
    localStorage.removeItem('cart');

    // Exibir mensagem de compra encerrada
    alert('Compra encerrada. Obrigado por comprar conosco!');

    // Redirecionar para a página inicial
    window.location.href = 'index.html';
}

// Chamar a função displayCartItems para exibir os itens do carrinho na página do carrinho (cart.html)
displayCartItems();