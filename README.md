TODO LIST
Ce projet est une application To-Do List basique construite avec HTML, CSS et JavaScript. Elle permet aux utilisateurs d'ajouter, compléter et supprimer des tâches, offrant une manière simple et interactive de gérer les tâches quotidiennes. L'application démontre des concepts essentiels de développement front-end tels que la manipulation du DOM, la gestion des événements et l'utilisation de localStorage pour la persistance des données.



### 1. **Stockage avec `localStorage`**
const storeList = () => {
  window.localStorage.todolist = list.innerHTML;
};

J'utilise `localStorage` pour sauvegarder la liste des tâches dans le stockage local du navigateur. À chaque fois que la liste change, je mets à jour le contenu de `list.innerHTML` dans `localStorage`.

### 2. **Chargement du `localStorage` au démarrage**
const getTodos = () => {
  if (window.localStorage.todolist) {
    list.innerHTML = window.localStorage.todolist;
  } else {
    list.innerHTML = `<li>Cliquez sur un todo pour le supprimer</li>`;
  }
};

Je vérifie si une liste de tâches est déjà enregistrée dans `localStorage`. Si c'est le cas, je charge cette liste dans l'élément HTML. Sinon, je mets un message par défaut pour indiquer qu'aucune tâche n'est encore ajoutée.

### 3. **Vérification du nombre minimum de caractères pour une tâche**
const minimumCharacter = () => {
  if (item.value.length < 2) {
    alert("Veuillez entrer au moins 2 caractères");
    return false;
  } else {
    return true;
  }
};

Avant d'ajouter une nouvelle tâche, je vérifie que le texte saisi contient au moins deux caractères. Si ce n'est pas le cas, j'affiche une alerte et j'empêche l'ajout de la tâche.

### 4. **Validation du formulaire et ajout d'une tâche**
const validationFormulaire = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!minimumCharacter()) return; // Si la validation échoue, on arrête l'exécution
    list.innerHTML += `<li>${item.value}</li>`; // Ajouter la tâche à la liste
    item.value = ""; // Réinitialiser le champ de saisie
    storeList(); // Sauvegarder la liste mise à jour dans le localStorage
  });
};

Je gère l'ajout de tâches via un formulaire. Quand l'utilisateur soumet le formulaire, je vérifie d'abord si le texte saisi est valide (au moins 2 caractères). Si la validation est réussie, j'ajoute la tâche à la liste et je sauvegarde la mise à jour dans `localStorage`.

### 5. **Suppression d'une tâche au clic**
const deleteTask = () => {
  list.addEventListener("click", (e) => {
    let element = e.target;
    if (e.target.classList.contains("checked")) {
      element.remove(); // Supprimer la tâche si elle est déjà marquée comme terminée
    } else {
      e.target.classList.add("checked"); // Marquer la tâche comme terminée
    }
    storeList(); // Sauvegarder la liste après modification
  });
};

Je permets à l'utilisateur de marquer une tâche comme terminée en cliquant dessus. Si la tâche est marquée comme "terminée" (classe `checked`), un autre clic la supprime. Après chaque modification, je mets à jour le `localStorage` pour conserver la dernière version de la liste.

### Résumé des Concepts Appris :

- **Stockage local (`localStorage`)** : Sauvegarder et charger les données directement dans le navigateur pour une persistance des données entre les sessions.
- **Manipulation du DOM** : Modifier le contenu d'une page HTML (ajouter, supprimer des éléments) en interagissant avec le DOM.
- **Gestion des événements** : Utiliser `addEventListener()` pour écouter les interactions utilisateur (comme le clic sur une tâche ou la soumission d'un formulaire).
- **Validation des entrées utilisateur** : Vérifier que l'utilisateur a saisi une entrée valide avant de l'ajouter (minimum de 2 caractères pour une tâche).
- **État dynamique de l'interface** : Modifier l'interface utilisateur en fonction des actions de l'utilisateur (ajouter, marquer comme terminé, supprimer des tâches).

Ce projet m'a permis de me familiariser avec la gestion des données locales dans un navigateur, la manipulation d'éléments HTML et l'interaction avec l'utilisateur de manière dynamique.