const url = "https://api-marvel-back.herokuapp.com/personagens/";
const urlComic = "https://api-marvel-back.herokuapp.com/comic/";
let personagemId = JSON.parse(localStorage.getItem("id"));

function descrevePersonagem(idPersonagem) {
  axios
    .get(`${url}` + idPersonagem)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      document.querySelector("#header-desc").innerHTML = "";
      let personagem = data[0];

      document.querySelector("#header-desc").innerHTML += `
        <div class="row mx-4">
          <figure class="col align-self-center m-2 ps-0">
            <img
              id="img-desc"
              src=${personagem.image.path}.${personagem.image.extension}
              class="card-img p-1 border bg-light"
              alt=${personagem.nome}
            />
          </figure>
          <div class="container-fluid rounded-2 bg-dark opacity-75 col m-4 p-3">
            <h5 class="opacity-100 ps-3 text-uppercase">${personagem.nome}</h5>
            <p class="opacity-100 ps-3 pt-1">
            ${personagem.descricao}
            </p>
          </div>
        </div>`;
    });
}
async function descreveComic(idPersonagem) {
  axios
    .get(`${urlComic}` + idPersonagem)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      document.querySelector("#comic-card").innerHTML = "";

      let comics = data;

      comics.forEach((comic) => {
        document.querySelector("#comic-card").innerHTML += `
      <div id="char-card-desc" class="p-1 rounded-2">
          <a
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=${comic.nome}            
          >
            <div class="card bg-secundary p-1 text-black rounded-2">
              <img
                src=${comic.image.path}.${comic.image.extension}
                class="card-img-top"
                alt=${comic.nome}
              />
              <div
                class="
                  d-flex
                  justify-content-center
                  align-items-end
                  card-body
                  p-1
                "
              >
                <h6 class="card-text">${comic.nome}</h6>
              </div>
            </div>
          </a>
        </div>
      `;
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  descrevePersonagem(personagemId);
  descreveComic(personagemId);
});
