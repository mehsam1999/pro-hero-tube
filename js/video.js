const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
const displayCategories = (categories) =>{
    const categoriesContainer = document.getElementById('categories')
    categories.forEach((item) => {
        const button = document.createElement('button')
        button.classList = 'btn font-bold'
        button.innerText = item.category;
        categoriesContainer.appendChild(button);
    });
}
loadCategories()