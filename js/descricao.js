const url = "https://marvelapr.herokuapp.com/personagens?";
let query = location.search.slice(1);
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
    .get(`${url}${query}`, {
      params: {
        page: currentPage,
        limit: 6,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })

    .then((data) => {
      document.querySelector("#header-desc").innerHTML = "";
      document.querySelector("#comic-card").innerHTML = "";

      lastPage = data.totalPages;

      data.personagens.findIndex((personagem) => {
        document.querySelector("#header-desc").innerHTML += `
        <div class="row mx-4">
          <figure class="col align-self-center m-2 ps-0">
            <img
              id="img-desc"
              src=${personagem.image.path}.${personagem.image.extension}
              class="card-img p-1 border bg-light"
              alt="personagem #"
            />
          </figure>
          <div class="container-fluid rounded-2 bg-dark opacity-75 col m-4 p-3">
            <h5 class="opacity-100 ps-3 text-uppercase">${personagem.nome}</h5>
            <p class="opacity-100 ps-3 pt-1">
            ${personagem.story}
            </p>
          </div>
        </div>`;
      });
      data.personagens.forEach((personagem) => {
        document.querySelector("#comic-card").innerHTML += `
      <div id="char-card-desc" class="p-1 rounded-2">
          <a
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=${personagem.nome}
            target="_black"
          >
            <div class="card bg-light p-1 text-white rounded-2">
              <img
                src=${personagem.comic}
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
                <h5 class="card-text">${personagem.nome}</h5>
              </div>
            </div>
          </a>
        </div>
      `;
      });
    });
}

// function testeVal() {
//   var query = location.search.slice(1);
//   // var partes = query.split("&");
//   // var data = {};
//   // partes.forEach(function (parte) {
//   //   var chaveValor = parte.split("=");
//   //   var chave = chaveValor[0];
//   //   var valor = chaveValor[1];
//   //   data[chave] = valor;
//   //});
//   console.log(query);
// }
// testeVal();

document.addEventListener("DOMContentLoaded", () => {
  listaPersonagem(currentPage);
});
