// URL base para buscar detalhes da receita por ID
const API_URL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';



// Função para buscar os detalhes da receita com base no ID
async function buscarDetalhesReceita(id) {
   try {
        const response = await fetch(`${API_URL_DETAILS}${id}`);
        const data = await response.json();
        console.log(data.meals)
        return data.meals[0];
    } catch (error) {
        console.error('Erro ao buscar detalhes: ', error)
        return[];

    } 
   }
   function atualizarTela(receita) {
    if (receita) {
        document.getElementById('recipe-title').textContent = receita.strMeal;
        document.getElementById('recipe-image').src = receita.strMealThumb;
        document.getElementById('recipe-instructions').textContent = receita.strInstructions;
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

