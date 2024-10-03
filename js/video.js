function getTimeString(time) {
    const secondsInADay = 86400; 
    const secondsInAYear = 365 * secondsInADay; 

    const years = Math.floor(time / secondsInAYear);
    let remainingTime = time % secondsInAYear; 

    const days = Math.floor(remainingTime / secondsInADay);
    remainingTime = remainingTime % secondsInADay; 

    const hours = Math.floor(remainingTime / 3600);
    remainingTime = remainingTime % 3600; 

    const minutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    let timeString = '';
    if (years > 0) timeString += `${years} year${years > 1 ? 's' : ''} `;
    if (days > 0) timeString += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0) timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} `;

    return timeString.trim() + ' ago';
}
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}
const displayCategories = (categories) =>{
    const categoriesContainer = document.getElementById('categories')
    categories.forEach((item) => {
        const button = document.createElement('button')
        button.classList = 'btn font-bold'
        button.innerText = item.category;
        categoriesContainer.append(button);
    });
}
const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videos')
    videos.forEach((video) => {
        const card = document.createElement('div')
        card.classList = 'card card-compact px-4 lg:px-0'
        card.innerHTML = `
         <figure class= "h-[200px] relative">
            <img class= "w-full h-full object-cover"
            src=${video.thumbnail}>
            ${
                video.others.posted_date?.length == 0
                  ? ""
                  : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(
                      video.others.posted_date
                    )}</span>`
              }
        </figure>
        <div class="py-2 px-0 flex gap-2">
            <div>
                <img class= "w-10 h-10 object-cover rounded-full"
                src=${video.authors[0].profile_picture}>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>   
            <div class="flex gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true ? `<img class= "w-5 h-5"
                src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : ""}
            </div>
                <p class="text-gray-400">${video.others.views} views</p>
            </div>
        </div>
        `
        videosContainer.append(card);
    });
}
loadCategories()
loadVideos()