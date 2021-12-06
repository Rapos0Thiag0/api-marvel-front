const url = "https://apimarvel-first.herokuapp.com/personagens?";
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
    .get(`${url}`, {
      params: {
        page: currentPage - 1,
        limit: 12,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      document.querySelector("#col-card").innerHTML = "";

      lastPage = Math.floor(data.totalPages);

      data.personagens.forEach((personagem) => {
        document.querySelector("#col-card").innerHTML += `
        <div id="char-card"  class=" mb-0 p-1 rounded-2">
        <a
        onclick="carregarPersonagem(${personagem.id})"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title=${personagem.nome}        
      >
      <div class="card bg-secundary p-1 text-black rounded-2">
      <img
      id="${personagem.id} "
        src=${personagem.image.path}.${personagem.image.extension}
        class="card-img-top"
        alt="personagem #"
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
            <h6 class="card-text">${personagem.nome} </h6>
          </div>
        </div>
      </a>
      </div>
        `;
      });
    });
}

function carregarPersonagem(id) {
  let personagemSelecionado = id;
  localStorage.setItem("id", JSON.stringify(personagemSelecionado));
  window.location.href = `./descricao.html?id=${personagemSelecionado}`;
}

document.addEventListener("DOMContentLoaded", () => {
  listaPersonagens(currentPage);
});
