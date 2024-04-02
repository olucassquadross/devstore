const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        // Manipular os dados recebidos, por exemplo:
        const products = data.results;

        // Criar elementos HTML dinamicamente
        const productList = document.createElement('ul');
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = product.title;
            productList.appendChild(listItem);
        });

        // Inserir na página HTML
        document.getElementById('product-list').appendChild(productList);
    })
    .catch(error => {
        console.error('Erro ao obter os dados:', error);
    });


