import {debounce} from '../utils/common.js';
import eventEmitter from '../utils/event-emitter.js';
import api from '../utils/api.js';

export default class CodePage {
  constructor(el) {
    this.el =el; 
    this.pageTitle = "";
    this.id = undefined;

    eventEmitter.on("save-code", () => {
      this.saveCode();
    });

    eventEmitter.on("execute-code", () => {
      this.executeCode();
    });
  }

  componentMounted () {
    this.htmlCode = document.querySelector("#htmlCode");
    this.cssCode = document.querySelector("#cssCode");
    this.jsCode = document.querySelector("#jsCode");
    this.previewFrame = document.querySelector("#resultIframe");

    this.pageTitleEl = document.querySelector("#pageTitle");

    this.jsEditor = CodeMirror.fromTextArea(jsCode, {
      lineNumbers: true,
      mode: "javascript",
      tabSize: 2, 
      lineWrapping: false, 
      theme: "dracula"
    });

    this.cssEditor = CodeMirror.fromTextArea(cssCode, {
      lineNumbers: true,
      mode: "css",
      tabSize: 2, 
      tabSize: 2, 
      lineWrapping: false,
      theme: "dracula"
    });

    this.htmlEditor = CodeMirror.fromTextArea(htmlCode, {
      lineNumbers: true,
      mode: "htmlmixed",
      lineWrapping: false,
      theme: "dracula"
    });

    const delayedFunc = debounce((e) => {
      //console.log(e.target.value);
      this.executeCode();
    }, 250); 

    [this.jsEditor, this.cssEditor, this.htmlEditor].forEach(code => {
      code.on("keyup", delayedFunc);
    })
  }

  saveCode() {
    if (!this.id) {
      // new code block 
      this.pageTitle = prompt("Please enter a title");
      if (!this.pageTitle) return; 

      // Use uuid generator here
      this.id = +new Date().getTime();  

      let code = {
        id: this.id, 
        pageTitle: this.pageTitle,
        html: this.htmlEditor.getValue(),
        css: this.cssEditor.getValue(), 
        js: this.jsEditor.getValue()
      }

      this.pageTitleEl.textContent = this.pageTitle;
      eventEmitter.emit("create-code", code);
    } else {
      //update existing code 
      let code = api.loadCodeFile(this.id); 
      code.html = this.htmlEditor.getValue();
      code.css = this.cssEditor.getValue();
      code.js = this.jsEditor.getValue();
      
      eventEmitter.emit("update-code", code);
    }
  }
  
  loadFile(currentPageObject) {
    this.id = currentPageObject.id;
    this.pageTitleEl.textContent = currentPageObject.pageTitle || "";
    this.htmlEditor.getDoc().setValue(currentPageObject.html);
    this.cssEditor.getDoc().setValue(currentPageObject.css);
    this.jsEditor.getDoc().setValue(currentPageObject.js);
  }

  executeCode() {
    const ifDocument = this.previewFrame.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${this.cssEditor.getValue()}
        </style>
      </head>
      <body>
        ${this.htmlEditor.getValue()}
  
        <script type="text/javascript">
            ${this.jsEditor.getValue()}
        </script>
      </body>
      </html>
    `;
  
    ifDocument.open();
    ifDocument.write(documentContents);
    ifDocument.close();
  }

  render() {
    let h = `
      <div class="app-area" data-app>
        <div class="code-area-container animate__animated animate__swing">
          <div class="code-area code-area-html ">
            <h4 class="code-title">HTML</h4>
            <div>
              <textarea  id="htmlCode" rows="10">
                <h1>Welcome</h1>
              </textarea>
            </div>
          </div>
        
          <div class="code-area code-area-css">
            <h4 class="code-title">CSS</h4>
            <div>
              <textarea  id="cssCode" rows="10"></textarea>
            </div>
          </div>
        
          <div class="code-area code-area-js">
            <h4 class="code-title">JAVASCRIPT</h4>
            <div>
              <textarea  id="jsCode" rows="10"></textarea>
            </div>
          </div>
        </div>
        <div id="resize-preview" class="resizer" data-direction="horizontal">
        </div>
        <div class="code-preview animate__animated animate__zoomIn"><h4>PREVIEW</h4>
          <iframe id="resultIframe"></iframe>
        </div>
      </div>
    `;
    document.querySelector(this.el).innerHTML = h;
    this.componentMounted();
    return this;
  }
}