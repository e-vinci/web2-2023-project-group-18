
# SantaFall (web2-2023-project-group-18)

Jeu 2D dans le quelle un père  Noël descente une montagne et doit éviter des obstacles sur son chemin.Le jeu sera simple à jouer, une action possible sauter. Tout le long de la descente le père Noël pourra collectera des pièces et ensuite pourra acheter des "skins".Le but principal sera d'être le joueur à aller le plus loin (tableau de score) dans le jeux (compteur de mètres).

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

[Elephantsql](https://www.elephantsql.com/) prorposer un hébergement gratuit nommé "Tiny Turtle"

OU 
Crée votre base de donnée localement [Télécharger](https://www.postgresql.org/download/)

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
### Frontend
```bash
cd frontend
npm i
npm run start
```




## API 
La table des route de notre api ce trouve dans le rapport 



## Authors


- [alexis-cattaruzza-vinci](https://github.com/alexis-cattaruzza-vinci)
- [pierre-alexandre-debin-vinci](https://github.com/Padami-9)
- [thibaut-devos-vinci](https://github.com/thibaut-devos-vinci)
- [xavier-massart-vinci](https://github.com/xavier-massart-vinci)
- [chisom-ubah-vinci](https://github.com/Willom125)
