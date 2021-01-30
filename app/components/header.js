import eventEmitter from '../utils/event-emitter.js';

export default class Header {
  // el-> HTML DOM where the header will be mounted
  constructor(el) {
    this.el = el;
  }

  // afterRender
  componentMounted() {
    document.querySelector("#btnExecuteCode") 
      .addEventListener("click", (e) => {
        eventEmitter.emit("execute-code");
      });
    
    document.querySelector("#btnSave") 
    .addEventListener("click", (e) => {
      eventEmitter.emit('save-code');
    });
  }

  render() {
    let h = `
      <div class="crud-buttons">
        <h4 class="logo"><a  data-route href="/#/">CodePlay</a></h4>
        <span id="pageTitle"></span>
        <button id="btnNew" title="New Code Block"  class="button secondary noborder">
          <a data-route href="#/new">+</a>
        </button>
        <button id="btnSave" title="Save Code Block"  class="button secondary noborder">
          🖫
        </button>
        <button id="btnExecuteCode" title="Execute Code Block"  class="button action noborder">
           ▷
        </button>
      </div>
    `;

    document.querySelector(this.el).innerHTML = h;
    this.componentMounted();
    return this;
  }
}