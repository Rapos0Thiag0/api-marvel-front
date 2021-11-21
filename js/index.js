const url = "https://marvelapr.herokuapp.com/";
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
    .get(`${url}personagens`, {
      params: {
        page: currentPage,
        limit: 15,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      document.querySelector("#col-card").innerHTML = "";

      lastPage = data.totalPages;

      data.personagens.forEach((personagem) => {
        document.querySelector("#col-card").innerHTML += `
        <div id="char-card" class="p-1 mb-2 rounded-2">
        <a
        href="../html/descricao.html"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title=${personagem.nome}
        target="_black"
      >
        <div class="card bg-light p-1 text-white" style="diplay: inline-block;">
          <img
            id="img-card"
            src=${personagem.image.path}.${personagem.image.extension}
            class="card-img"
            alt="personagem #"
          />
          <div
            class="
              d-flex
              justify-content-center
              align-items-end
              card-img-overlay
              p-1
            "
          >
            <h5 class="card-text">${personagem.nome} </h5>
          </div>
        </div>
      </a>
      </div>
        `;
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  listaPersonagem(currentPage);
});
