# Exercice Kittens
Vous allez utiliser les données suivantes que vous placerez pour l'instant dans un fichier JSON : kittens.json

[
    {"id" : 1, "name": "Bob", "image" : "bob.jpg", "age" : 16, "description" : "super cat" },
    {"id" : 2, "name": "Wild" , "image" : "wild.jpg" , "age" : 10,"description" : "super cat" },
    {"id" : 3, "name": "Nyan" , "image" : "nyan.jpg" , "age" : 12, "description" : "super cat" }
]
Créez une page principale, affichez dans un ul/li l'ensemble des noms des chats ainsi que leurs photos respectives. Récupérez des images de chat, se sont des fichiers statiques.

Chaque nom de chat est cliquable et redirige vers une autre page qui affiche toutes les informations concernant un chat.

Mettre le jeu de donnée dans des fichiers json
un json pour tout les chats
3 fichier json pour chaque chats 
{
    "id": 1,
    "name": "Bob",
    "image": "bob.jpg",
    "age": 16,
    "description": "super cat"
}

Pour lire les fichiers json => parse => fs.readFilesync() (ne pas oublier l'utf-8)

./Data/${id}.json