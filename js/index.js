const url = "https://growdev-first-app.herokuapp.com/personagem";
let currentPage = 1;
let lastPage;

function listaPersonagem(pagina) {
  if (pagina > 0) currentPage = pagina;
  if (pagina == 1) {
    document.querySelector("#anterior").style.display = "none";
  } else {
    document.querySelector("#anterior").style.display = "block";
    document.querySelector("#anterior").textContent = currentPage - 1;
  }
  document.querySelector("#atual").textContent = currentPage;
  document.querySelector("#seguinte").textContent = currentPage + 1;

  axios
    .get(url, {
      params: {
        page: currentPage,
        limit: 15,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      document.querySelector("tbody").innerHTML = "";

      lastPage = data.totalPages;

      data.personagens.forEach((personagem) => {
        document.querySelector("tbody").innerHTML += `
                
                `;
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  listaPersonagem(currentPage);
});
