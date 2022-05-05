setInterval(() => {
    document.querySelector("#navBarClock").innerHTML = `
            <span class="material-icons-round md-24">
          schedule
        </span>
         <p>${new Date().toLocaleTimeString()}</p>
        `
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];

    document.querySelector("#navBarDate").innerHTML = `
        <span class="material-icons-round" style="color: #9ece6a">
          calendar_month
        </span>
         <p>${day}, ${new Date().getDate()}</p>
        `
}, 1000)

console.log(window.innerWidth)

//navbar

var applications = document.getElementsByClassName("item")
Array.from(applications).forEach(E =>  {
  console.log(E.textContent)
  E.addEventListener('click', () => {
    var app = document.getElementById(E.textContent)
    app.classList.toggle("minimize") 
    E.classList.toggle("glow")
  })
})