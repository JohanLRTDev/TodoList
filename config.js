// Storage localStorage
const storeList = () => {
  window.localStorage.todolist = list.innerHTML;
};
// Verifie le localStorage et charge le storage
const getTodos = () => {
  if (window.localStorage.todolist) {
    list.innerHTML = window.localStorage.todolist;
  } else {
    list.innerHTML = `<li>Cliquez sur un todo pour le supprimer</li>`;
  }
};

// validation du minimum de caractères pour la tâche
const minimumCharacter = () => {
  if (item.value.length < 2) {
    alert("veuille entrer au moins 2 caractères");
    return false;
  } else {
    return true;
  }
};

//validation du formulaire et ajout d'une tâche
const validationFormulaire = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!minimumCharacter()) return;
    list.innerHTML += `<li>${item.value}</li>`;
    item.value = "";
    storeList();
  });
};
// efface une tache au click
const deleteTask = () => {
  list.addEventListener("click", (e) => {
    let element = e.target;
    if (e.target.classList.contains("checked")) {
      element.remove();
    } else {
      e.target.classList.add("checked");
    }
    storeList();
  });
};
