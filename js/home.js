const url = "https://marvelapr.herokuapp.com/";
let currentPage = 1;
let lastPage;

function listaPersonagens(pagina) {
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
        limit: 12,
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
        onclick="carregarPersonagem(${personagem.id})"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title=${personagem.nome}        
      >
        <div class="card bg-light p-1 text-white" style="diplay: inline-block;">
          <img
          
            id=${personagem.id}
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

function carregarPersonagem(id) {
  window.location.href = `../html/descricao.html?${id}`;
  // let id = mouseEvent.target.id;
}

document.addEventListener("DOMContentLoaded", () => {
  listaPersonagens(currentPage);
});
