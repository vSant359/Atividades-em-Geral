// URL base para buscar detalhes da receita por ID
const API_URL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const start = document.getElementById('btn')


// Função para buscar os detalhes da receita com base no ID
async function buscarDetalhesReceita(id) {
    try {
        const response = await fetch(`${API_URL_DETAILS}${id}`);
        const data = await response.json();
        console.log(data.meals)
        return data.meals[0];
    } catch (error) {
        console.error('Erro ao buscar detalhes: ', error)
        return [];

    }
}

let list; //global
function atualizarTela(receita) {
    if (receita) {
        document.getElementById('recipe-title').textContent = receita.strMeal;
        document.getElementById('recipe-image').src = receita.strMealThumb;
        const instructionsContainer = document.getElementById('recipe-instructions');
        instructionsContainer.innerHTML = '';

        const steps = receita.strInstructions.split('. ').filter(step => step.trim() !== '');

        list = document.createElement('ul');
        list.className = 'instruction-list';

        steps.forEach(step => {
            const listItem = document.createElement('li');
            listItem.textContent = step.trim();
            list.appendChild(listItem);
        });

        instructionsContainer.appendChild(list);

    }
}



// Função para extrair o ID da receita da URL
function obterIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Carrega os detalhes da receita ao inicializar a página
const idReceita = obterIdDaURL();
if (idReceita) {
    buscarDetalhesReceita(idReceita).then(atualizarTela);
}


function verificarCheckboxes() {
    let allChecked = true;
    for (let i = 0; i < list.children.length; i++) {
        const item =   list.children[i];
        const checkbox = item.querySelector('input[type="checkbox"]')

        if (!checkbox.checked) {
            allChecked = false;
            break;
        }
    }

    if (allChecked)  {
        start.textContent = 'Finish Recipe'
    }else {
        start.textContent = 'Start Recipe'; 
    }
}


start.addEventListener('click', () => {
    for (let i = 0; i < list.children.length; i++) {
        const item = list.children[i];

        if (!item.querySelector('input[type="checkbox"]')) {
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            item.insertBefore(checkbox, item.firstChild);
            checkbox.addEventListener('change', verificarCheckboxes);
        }
        
    }
    verificarCheckboxes();
})

