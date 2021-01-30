export default class Dashboard {
  constructor(el) {
    this.el =el; 
  }

  componentMounted () {
    document.querySelector("body")
      .addEventListener("click", (e) => {
        let t = e.target;
        if (t.classList.contains('card')) {
          let id = t.getAttribute("id");
          onNavigate(`/code/${id}`, true);
        }
      });
  }

  render(files) {
    let h = `
      <div class="dashboard-container">
        ${files.map(f => {
          return (
            `
              <div class="card animate__animated animate__swing" id="${f.id}">
                <div class="hanger"></div>
                <h2>${f.pageTitle}</h2>
              </div>
            `            
          )
        }).join("")}
      </div>
    `;
    document.querySelector(this.el).innerHTML = h;
    this.componentMounted();
    return this;
  }
}