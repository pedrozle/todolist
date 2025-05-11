window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme);
};

function setTheme(theme) {
  document.body.className = "";

  // Adiciona a nova classe
  if (!theme) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    return;
  }

  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}
