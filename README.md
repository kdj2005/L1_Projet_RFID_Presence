Ce projet est réalisé dans le cadre du module Communication Sans Fil en Licence 1 à l'Université Nice Sophia Antipolis.

# 🔐 Système IoT de Contrôle d'Accès et d'Autorisation RFID via LoRaWAN

## 📝 Description du Projet
Ce projet consiste à développer un système connecté de contrôle d'accès et de vérification des autorisations en temps réel pour la sécurisation d'un lieu. 

La logique principale repose sur un annuaire sécurisé : **une base de données MongoDB est configurée au préalable pour enregistrer les utilisateurs, leur attribuer un rôle spécifique (ex: Employé, Responsable) et définir leurs droits d'accès**. 

Lorsqu'un badge est scanné en direct, le système identifie l'individu, vérifie s'il possède l'autorisation requise pour accéder au lieu, et affiche instantanément le verdict (Accès Accordé ou Refusé) sur un tableau de bord de supervision.

---

## Architecture Globale du Système

Le projet est divisé en deux grandes phases :

### 1. Phase d'inscription (Back-Office)
* **L'Interface d'Inscription ** : Permet d'enregistrer un nouvel individu (Nom, Prénom), de lui associer l'identifiant unique de son badge (`cartId`), et de lui définir un rôle ainsi qu'un statut d'autorisation initial.
* **La Base de Données (MongoDB)** : Stocke le profil complet de l'utilisateur.

### 2. Phase de Vérification (Contrôle d'Accès en direct)
1. **Le Capteur (RFID)** : L'utilisateur présente son badge devant le lecteur. Celui-ci extrait l'UID brut (ex: `7BF81607`) et le transmet sans traitement local.
2. **Le Réseau Sans Fil (LoRaWAN)** : Le module LoRa envoie cet UID de manière sécurisée et à longue portée vers la passerelle du FabLab, qui le pousse sur **The Things Network (TTN)**.
3. **La Plateforme IoT (TagoIO)** : TTN transmet l'UID à TagoIO. Un script *Analysis* (Node.js) intercepte immédiatement la donnée dès qu'un scan est détectée.
4. **Le Serveur API (Node.js & Render)** : L'Analysis TagoIO interroge notre API personnalisée sur **Render** en lui fournissant l'UID de la carte.
5. **Le Verdict d'Autorisation** : Le serveur Node.js cherche la carte dans **MongoDB**. Il récupère l'identité, vérifie le rôle de la personne et ses droits d'accès, puis renvoie le résultat JSON à TagoIO.
6. **L'Affichage de Supervision** : TagoIO met à jour le Dashboard en temps réel en affichant l'identité de la personne et le statut de l'accès :
   * 🟢 **ACCÈS ACCORDÉ** (ex: Si l'utilisateur est enregistré et actif).
   * 🔴 **ACCÈS REFUSÉ** (ex: Si la carte est inconnue ou si les droits ont été révoqués).

---

## 💻 Technologies Utilisées

* **Matériels** : Lecteur RFID RC522, carte de développement (RThing Card) et antenne LoRaWAN 868 MHz.
* **Réseau** : The Things Network (TTN) pour la couche réseau LoRaWAN.
* **Cloud & Dashboard** : TagoIO pour la réception des payloads, l'exécution des règles métiers et l'interface de contrôle.
* **Backend** : API REST développée en Node.js (Express) et déployée sur **Render**.
* **Base de données** : MongoDB Atlas (NoSQL) pour la gestion sécurisée des rôles et des autorisations.
* **Technologie**:HTML CSS,javascript pour la page d'inscription*

---

## 📁 Structure du Dépôt GitHub

Le dépôt est organisé de la manière suivante :

* 📁 **`/arduino`** : Code source embarqué pour la lecture RFID SPI et l'émission des paquets LoRaWAN ABP (contient le guide de câblage matériel).
* 📁 **`/server`** : Code source de l'API de contrôle d'accès Node.js (logique de vérification des rôles MongoDB) prête pour le déploiement.
  * 📁 **`/public`** : Fichiers de l'interface d'inscription.
* 📁 **`/doc`** : Cahiers de suivi de projet individuels (Fichiers `PrenomNOM.md`), mis à jour à chaque séance.

---

## 👥 Membres du Groupe
* **Fadel KOUDOKODJI** - Licence 1, Université Nice Sophia Antipolis
