# Exercice read students

Les données sont dans le dossier Data et dans le fichier student.txt

1. Lisez le fichier à l'aide de la méthode asynchrone.

1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.

2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.

3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.

```js
// { name : null, note : null, address : null}; // structure de l'objet
const students = []; // tableau pour récupérer les données.
```

5. Ordonnez maintenant l'ensemble des données dans le tableau.

## Bonus

Attention, il faut bien réfléchir avant d'écrire le code de cet exercice, certaines méthodes étant asynchrones, il faudra penser à l'enchaînement de vos traitements.

6. Ajoutez dans le fichier students.txt les étudiants suivants :

- 18 Sonia Paris

- 17 Clarisse Marseille

7. Lire le fichier lui-même et mettez chaque nom en majuscule