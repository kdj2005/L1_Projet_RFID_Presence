# 🖥️ Serveur Backend (Node.js / Express / MongoDB)

Ce dossier contient le serveur complet qui gère l'API d'émargement et héberge l'interface d'inscription.

---

## 🚀 Installation et Démarrage Rapide

Suis ces 3 étapes simples pour lancer le serveur sur ton ordinateur :

### 1. Prérequis
* Installe **Node.js** sur ton PC (téléchargeable sur [nodejs.org](https://nodejs.org/)).

### 2. Installation des dépendances (NPM)
Ouvre ton terminal dans ce dossier `/server` et tape la commande suivante pour installer Express, Mongoose et les autres paquets :
```bash
node app.js pour demarrer le serveur
💾 Configuration de la Base de Données (MongoDB Atlas)
Le serveur a besoin de se connecter à ton "annuaire" MongoDB pour fonctionner.

Crée un fichier nommé .env à la racine de ce dossier /server.

Ajoute à l'intérieur ton lien de connexion secret récupéré sur MongoDB Atlas en remplaçant par tes identifiants :

Extrait de code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/presence_db
