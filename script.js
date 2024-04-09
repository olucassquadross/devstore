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
            
            // Criar imagem do produto
            const image = document.createElement('img');
            image.src = product.thumbnail;// URL da imagem
            image.alt = product.title; //texto alternativo
            listItem.appendChild(image);    

            // Criar título do produto
            const title = document.createElement('span');
            title.textContent = product.title;
            listItem.appendChild(title);
        
            // Criar preço do produto
            const price = document.createElement('span');
            price.textContent = ' - R$ ' + product.price.toFixed(2); // Formatando o preço
            listItem.appendChild(price);

            productList.appendChild(listItem);
        });

        // Inserir na página HTML
        document.getElementById('product-list').appendChild(productList);
    })
    .catch(error => {
        console.error('Erro ao obter os dados:', error);
    });
