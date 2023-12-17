[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12368739&assignment_repo_type=AssignmentRepo)

# SantaFall (web2-2023-project-group-18)

Jeu 2D dans lequelle le Père Noël descend une montagne tout en évitant des obstacles sur son chemin.Tout le long de la descente le Père Noël pourra collecter des pièces ce qui lui permettra de personnaliser son apparence et/ou le thème du jeu via la boutique. La prise en main du jeu est simple, une seule action possible : sauter. Le jeu est jouable sur ordinateur, comme sur téléphone pour pouvoir jouer au travail comme aux toilettes. Le but principal est d'aller le plus loin possible dans le jeu afin d'être le joueur avec le meilleur score sur le tableau des scores.

# Host

Frontend: https://e-vinci.github.io/web2-2023-project-group-18/   

API: https://santafall.azurewebsites.net/

# Installation

### Installer NodeJs
- [NodeJS](https://nodejs.org/en)


### API
| Installation des node modules
```bash
cd api
npm i
```

| Base de donnée
Il vous faudra un  base de donnée PostgreSQL

[Elephantsql](https://www.elephantsql.com/) prorpose un hébergement gratuit nommé "Tiny Turtle"
OU 
Créez votre base de donnée localement [Télécharger](https://www.postgresql.org/download/)

| Secret et information de connection base de donnée
```bash
touch .env
nano .env
```
###### Ajouter se-ci dans votre .env
```
DB_USER="VOTRE_NOM_UTILISATEUR_BASE_DONNEE"
DB_HOST="IP_BASE_DONNEE"
DB_DATABASE="NOM_BASE_DONNEE"
DB_PASSWORD="MDP_BASE_DONNEE"
DB_PORT="PORT_BASE_DONNEE"

JWT_SECRET="VOTRE_SECRET"
```

```bash
npm run start
```

Après le premier lancement de l'api
Veuillez vous connecter à votre base de donner et insérer les lignes suivantes.

```SQL
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('santa', 'Santa', 0);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('redhat', 'Red Hat', 100);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('jack', 'Jack', 250);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('cat', 'Cat', 500);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('dog', 'Dog', 750);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('explorer', 'Explorer', 1000);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('adventurer', 'Adventurer', 1500);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('ninjaboy', 'Ninja Boy', 2000);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('ninjagirl', 'Ninja Girl', 2500);
INSERT INTO projet.skins (name_skin, label_skin, price) VALUES ('robot', 'Robot', 5000);

INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('snow', 'Snow', 0);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('meadow', 'Meadow', 250);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('desert', 'Desert', 500);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('mushroom', 'Mushroom', 1000);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('candy', 'Candy', 2500);
INSERT INTO projet.themes (name_theme, label_theme, price) VALUES ('alien', 'Alien',  5000);
```

Relancer votre API
```bash
npm run start
```


### Frontend
```bash
cd frontend
npm i
npm run start
```


## API 
La table des routes de notre api ce trouve dans le rapport 


## Credits

[front-end/boilerplate](https://github.com/e-vinci/js-phaser-boilerplate)
[API/boilerplate](https://github.com/e-vinci/jwt-api-boilerplate)
[front-end/game](https://www.emanueleferonato.com/)
[front-end/game](https://mourner.github.io/simplify-js/)
[front-end/assets](https://craftpix.net/)
[front-end/assets](https://pzuh.itch.io/)
[front-end/assets](https://kenney.nl/assets/platformer-art-deluxe)


## Authors


- [alexis-cattaruzza-vinci](https://github.com/alexis-cattaruzza-vinci)
- [pierre-alexandre-debin-vinci](https://github.com/Padami-9)
- [thibaut-devos-vinci](https://github.com/thibaut-devos-vinci)
- [xavier-massart-vinci](https://github.com/xavier-massart-vinci)
- [chisom-ubah-vinci](https://github.com/Willom125)


## Background Music

- [music background](https://www.youtube.com/watch?v=PUJdZJIrXKw&list=PLWxfclyGJ0RHgpDQT_gS5v5GMy1Ol9d3B)

## PNG conventisseur in JSON

- [player images](https://www.codeandweb.com/texturepacker)
