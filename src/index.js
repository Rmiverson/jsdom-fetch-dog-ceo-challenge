console.log('%c HI', 'color: firebrick')

//loads functions and listeners when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
   loadJson('https://dog.ceo/api/breeds/image/random/4', addImg)
   loadJson('https://dog.ceo/api/breeds/list/all', addBrd)
   loadJson('https://dog.ceo/api/breeds/list/all', addListeners)
})

//loads json information from a url with a function
const loadJson = async (url, fn) => {
   const resp = await fetch(url)
   const json = await resp.json()

   fn(json)
}

//adds random dog images
const addImg = (dogs) => {
   const imgList = document.querySelector('#dog-image-container')

   dogs.message.forEach(dog => {
      const img = document.createElement('img')
      img.src = dog
      img.style.width = '300px'
      imgList.appendChild(img)
   })
}

//adds a list of dog breeds sorted by dropdown alphabet
const addBrd = (dogs) => {
   const ul = document.querySelector('#dog-breeds')
   let drop = document.querySelector('#breed-dropdown').value

   //clears list whenever this fn is ran
   while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
   }

   //checks the current option tag and appends dogs breed name
   for (const dog in dogs.message) {
      if (dog.charAt(0) === drop) {
         const li = document.createElement('li')
         li.innerHTML = dog
         ul.appendChild(li)
      }
   }
}

//adds a listener for the dog list to change the text color to blue when clicked on
const addListeners = (dogs) => {
   let dogListLi = document.querySelectorAll('#dog-breeds li')

   dogListLi.forEach( (li) => {
      li.addEventListener('click', (e) => {
         li.style.color = 'blue'
      })
   })
}