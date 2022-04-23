document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchItem = document.getElementById('search').value
    fetch(`https://api.github.com/search/users?q=${searchItem}`)
      .then(resp => resp.json())
      .then(data => {
        document.getElementById('user-list').innerHTML = ""
        document.getElementById('repos-list').innerHTML = ""
        data.items.forEach(user => {
          let ul = document.getElementById('user-list')
          let li = document.createElement('li')
          let img = document.createElement('img')
          let h4 = document.createElement('h4')
          let h3 = document.createElement('h3')
          let a = document.createElement('a')
          let profile = document.createTextNode('Checkout Profile')

          img.src = user.avatar_url
          h3.innerText = user.login
          a.href = user.html_url
          h4.innerHTML = `See ${user.login}'s Repositories`

          a.appendChild(profile)
          li.appendChild(img)
          li.appendChild(h3)
          li.appendChild(a)
          li.appendChild(h4)
          ul.appendChild(li)

          h4.addEventListener('mouseover', () => {
            h4.style.color = 'brown'
          })
          h4.addEventListener('mouseout', () => {
            h4.style.color = 'black'
          })
          h4.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
              .then(resp => resp.json())
              .then(repos => {

                let h4 = document.createElement('h4')
                let ul = document.getElementById('repos-list')
                ul.innerHTML = ''

                h4.innerText = `${user.login}'s Repositories`
                ul.appendChild(h4)

                repos.forEach(repo => {
                  let li = document.createElement('li')
                  let a = document.createElement('a')
                  let name = document.createTextNode(`${repo.name}`)

                  a.url = repo.html_url
                  a.appendChild(name)
                  li.appendChild(a)
                  ul.appendChild(li)
                })
              })
          })
        })
      })
  })
})