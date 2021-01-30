function create(code) {
  let data = localStorage.getItem("codeFiles");
  data = (data && JSON.parse(data)) || [];
  data.push(code);
  localStorage.setItem("codeFiles", JSON.stringify(data));
}

function loadCodeFiles() {
  let codeFiles = localStorage.getItem("codeFiles");
  codeFiles = (codeFiles && JSON.parse(codeFiles)) || [];
  return codeFiles;
}

function loadCodeFile(id) {
  let codeFiles = localStorage.getItem("codeFiles");
  codeFiles = (codeFiles && JSON.parse(codeFiles)) || [];

  let file = codeFiles.find(f => f.id == id);
  return file;
}

function update(newState) {
  localStorage.setItem("codeFiles", JSON.stringify(newState));
}

export default {
  create,
  update,
  loadCodeFiles,
  loadCodeFile
}