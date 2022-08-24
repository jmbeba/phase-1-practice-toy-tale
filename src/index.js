let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const form = document.querySelector(".add-toy-form");


  fetch("http://localhost:3000/toys").then(res => res.json()).then(data => {
    data.map((element) => {
      const div = document.createElement("div");
      div.classList.add("card");
      const h2 = document.createElement("h2");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const button = document.createElement("button");
      p.textContent = `${element.likes} likes`;
      button.id = element.id;
      button.classList.add("like-btn");
      img.classList.add("toy-avatar");
      img.src = element.image;
      h2.textContent = element.name;

      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);

      toyCollection.appendChild(div);

      button.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/toys/${button.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          },
          body : JSON.stringify({
            "likes" : element.likes+1
          })
        }).then(res => res.json()).then(data => {
          p.textContent = `${data.likes} likes`;
        })
      })
    })
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const url  = e.target[1].value;

    fetch("http://localhost:3000/toys", {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        "name" : name,
        "image" : url,
        "likes" : 0
      })
    }).then(res => res.json()).then(data => console.log(data))
  })
});
