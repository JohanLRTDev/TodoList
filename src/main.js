// Verif si une modification est en cours
let editingOn = true;

// Fonction pour vérifier si les champs ne sont pas vides
const checkInputs = () => {
  if (titleInput.value === "" || todoInput.value === "") {
    alert("Veuillez remplir les deux champs");
    return false;
  }
  return true;
};

// Fonction pour ajouter une nouvelle tâche
const addTodo = () => {
  if (!checkInputs()) {
    return; // Si les champs ne sont pas valides, arrêter l'exécution
  }

  list.innerHTML += `
    <li class="bg-white p-2 mt-5 rounded-l shadow flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <input type="checkbox" class="checkbox h-5 w-5 text-green-500">
        <div>
          <h2 class="text-lg font-bold text-purple-800 uppercase">${titleInput.value}</h2>
          <p class="text-md text-gray-500 break-words">${todoInput.value}</p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button class="modifBtn bg-yellow-200 text-sm px-2 py-1 rounded-md hover:bg-yellow-300 active:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500">Modifier</button>
        <button class="deleteBtn bg-red-300 text-sm px-2 py-1 rounded-md hover:bg-red-400 active:bg-red-500 focus:outline-none focus:ring focus:ring-red-500">Suprimer</button>
      </div>
    </li>
  `;

  // Réinitialise les champs d'entrée après l'ajout
  titleInput.value = "";
  todoInput.value = "";

  // Rafraîchit les fonctions associées aux tâches ajoutées
  validTask();
  modifTask();
  deleteTask();
};

// Fonction pour marquer ou supprimer une tâche
const validTask = () => {
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
      if (!editingOn) {
        alert("veuillez d'abord validé la modification en cours");
        e.target.checked = false;
        retur;
      }
      const task = e.target.closest("li"); // Sélectionne l'élément <li> le plus proche

      // Vérifie si la case est cochée (valide la tâche)
      if (e.target.checked) {
        task.classList.add("validated", `bg-green-100`);
        task.querySelector("h2").classList.add("line-through", "text-gray-400");
        task.querySelector("p").classList.add("text-gray-400");
        task.querySelector(".modifBtn").style.display = "none";
      } else {
        // Si la tâche est décochée, elle est réinitialisée (non validée)
        task.classList.remove("validated", `bg-green-100`);
        task
          .querySelector("h2")
          .classList.remove("line-through", "text-gray-400");
        task.querySelector("p").classList.remove("text-gray-400");
        task.querySelector(".modifBtn").style.display = "";
        task.querySelector(".deleteBtn").style.display = "";
      }
    }
  });
};
// Fonction pour supprimer une tâche
const deleteTask = () => {
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn") && editingOn) {
      const task = e.target.closest("li"); // Sélectionne l'élément <li> le plus proche
      task.remove(); // Supprime l'élément du DOM
    }
  });
};
// Fonction pour modifier une tâche
const modifTask = () => {
  const modifBtns = document.querySelectorAll(".modifBtn");
  let currentTitleInput = null; // Pour stocker le nouveau titre modifié
  let currentTaskInput = null; // Pour stocker la description modifiée

  modifBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      let selectedTask = e.target.closest("li"); // Sélectionne l'élément <li> correspondant
      let modifTitle = selectedTask.querySelector("h2"); // Sélectionne le <h2> à modifier
      let modifTask = selectedTask.querySelector("p"); // Sélectionne la description <p>
      let inputTitle, inputTask;

      // Si le bouton est en mode "Modifier"
      if (button.textContent === "Modifier" && editingOn) {
        // Remplace les éléments <h2> et <p> par des champs <input> pour l'édition
        inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.value = modifTitle.textContent;
        inputTitle.classList.add(
          "bg-gray-100",
          "w-48",
          "h-10",
          "rounded-md",
          "px-4",
          "border-2",
          "border-black",
          "text-sm",
          "outline-none",
          "mb-0.5"
        );

        inputTask = document.createElement("input");
        inputTask.type = "text";
        inputTask.value = modifTask.textContent;
        inputTask.classList.add(
          "bg-gray-100",
          "w-48",
          "h-10",
          "rounded-md",
          "px-4",
          "border-2",
          "border-black",
          "text-sm",
          "outline-none",
          "mb-0.5"
        );

        modifTitle.replaceWith(inputTitle);
        modifTask.replaceWith(inputTask);

        button.textContent = "Sauvegarder"; // Change le bouton en "Sauvegarder"
        editingOn = false; // Désactive les autres actions pendant la modification

        currentTitleInput = inputTitle; // Stocke les nouvelles valeurs
        currentTaskInput = inputTask;
      } else if (button.textContent === "Sauvegarder") {
        // Sauvegarde la modification
        let newTitle = document.createElement("h2");
        newTitle.textContent = currentTitleInput.value;
        newTitle.className = "text-lg font-bold text-blue-900 uppercase";

        let newTask = document.createElement("p");
        newTask.textContent = currentTaskInput.value;
        newTask.className = "text-md text-gray-500 break-words";

        currentTitleInput.replaceWith(newTitle);
        currentTaskInput.replaceWith(newTask);

        button.textContent = "Modifier"; // Change le bouton en "Modifier"
        editingOn = true; // Réactive les autres actions
      }
    });
  });
};

// Ajoute l'événement pour le bouton "Ajouter"
validBtn.addEventListener("click", () => {
  addTodo();
});
