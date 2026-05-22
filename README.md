# L1_Projet_RFID_Presence
Système IoT d'émargement et de présence par badge RFID via le réseau LoRaWAN (TTN), TagoIO et une API Node.js pour identifier l'utilisateur.
[cite_start]Ce projet est réalisé dans le cadre du module Communication Sans Fil en Licence 1 à l'Université Nice Sophia Antipolis. [cite: 61]

# 🪪 Système IoT d'Émargement et de Présence RFID via LoRaWAN

## 📝 Description du Projet
Ce projet consiste à développer un système connecté de gestion des présences en temps réel. La logique principale repose sur un principe simple : **une base de données est créée au préalable pour enregistrer un utilisateur et lui associer l'identifiant unique de sa carte (UID)**. Une fois cet enrôlement fait, le lecteur RFID nous permet, lors d'un scan en direct, de détecter instantanément à qui appartient la carte, d'enregistrer sa présence et d'afficher son identité sur un tableau de bord.

---

## 🏗️ Architecture Globale du Système

Le projet est une chaîne technologique complète divisée en deux grandes phases :

### 1. Phase d'Enrôlement (Création de l'utilisateur)
* **L'Interface d'Administration** : Un panneau d'administration permet à un gestionnaire de saisir le Nom et le Prénom d'un nouvel étudiant.
* **La Base de Données (MongoDB)** : Ces informations, associées à l'identifiant de sa carte RFID (`cartId`), sont sauvegardées dans notre base de données **MongoDB Atlas**. Notre base sert ainsi d'annuaire de référence.

### 2. Phase de Détection (Pointage en direct)
1. **Le Capteur (RFID)** : L'utilisateur scanne sa carte. Le lecteur récupère son UID brut (ex: `7BF81607`) sans savoir à qui il appartient.
2. **Le Réseau Sans Fil (LoRaWAN)** : Le module LoRa transmet cet UID à travers les airs. Le message est capté par la passerelle (Gateway) du FabLab et centralisé sur **The Things Network (TTN)**.
3. **La Plateforme IoT (TagoIO)** : TTN redirige la donnée vers TagoIO. Dès que le scan arrive, une *Analysis* (script Node.js) se déclenche automatiquement pour récupérer l'UID.
4. **Le Serveur API (Node.js & Render)** : L'Analysis TagoIO envoie l'UID à notre API personnalisée hébergée sur **Render**.
5. **L'Identification** : Le serveur Node.js interroge la base **MongoDB**, trouve la correspondance, et renvoie le Nom et le Prénom à TagoIO qui met instantanément à jour le Dashboard avec l'identité de l'étudiant (ex: *Fadel Koudokodji*).

---

## 💻 Technologies Utilisées

* **Hardware** : Lecteur RFID / NFC, carte de développement et module émetteur LoRaWAN.
* [cite_start]**Réseau** : The Things Network (TTN) pour la gestion du réseau LoRaWAN. [cite: 18]
* **Cloud & Dashboard** : TagoIO pour la réception des données et l'affichage des widgets graphiques.
* **Backend** : API REST développée en Node.js et déployée sur **Render**.
* **Base de données** : MongoDB Atlas (NoSQL) pour le stockage des utilisateurs et des historiques de présence.

---


## 📁 Structure du Dépôt GitHub

Pour garantir la clarté du projet, le dépôt est organisé de la manière suivante :

* 📁 **`/arduino`** : Code source chargé dans le microcontrôleur pour la lecture RFID et l'émission des payloads LoRaWAN.
* 📁 **`/server`** : Code source complet du backend Node.js (connexion MongoDB, API REST, et gestion des routes) configuré pour Render.
  * 📁 **`/public`** : Contient les fichiers frontend (HTML/CSS/JS) de l'interface d'inscription et d'administration, directement servis par notre serveur Node.js.
* [cite_start]📁 **`/doc`** : Cahiers de suivi de projet individuels, à renseigner obligatoirement pour chaque séance[cite: 62, 63].


---

## 👥 Membres du Groupe
* [cite_start]**Fadel KOUDOKODJI** - Licence 1, Université Nice Sophia Antipolis [cite: 61]
* *(Ajoute ici les noms de tes camarades de groupe si tu en as)*
