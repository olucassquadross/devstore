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
            price.textContent = ' - R$ ' + product.price.toFixed(2); // Formatando o preço
            productDiv.appendChild(price);

            // Adicionar a div do produto ao contêiner principal
            productListContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao obter os dados:', error);
    });
