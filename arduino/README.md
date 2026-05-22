# 🔌 Documentation du Module Embarqué (Arduino / LoRaWAN / RFID)

Ce dossier contient le code source ainsi que le guide matériel complet pour le boîtier de pointage IoT. Ce système est capable de lire l'identifiant unique (UID) d'un badge physique et de le transmettre instantanément à travers les airs en utilisant le protocole réseau LoRaWAN.

---

## 🛠️ Liste du Matériel et Équipements Requis

Pour reproduire ou manipuler ce module, vous avez besoin de :
1. **1x Carte de développement microcontrôleur** (compatible avec la bibliothèque LMIC, ex: *RThing Card*).
2. **1x Lecteur RFID / NFC MFRC522** (Fréquence de fonctionnement : 13.56 MHz).
3. **1x Antenne LoRa** (accordée sur la fréquence européenne de 868 MHz).
4. **Des câbles de prototypage (Bretelles / Fils Dupont)** de type Femelle-Femelle.
5. **Des badges, cartes ou porte-clés RFID** (compatibles avec le protocole du MFRC522).

---

## 📌 Guide de Câblage Matériel (Le rôle de chaque bretelle)

Le lecteur RFID communique avec le microcontrôleur via le bus de données **SPI**. Ce protocole utilise des broches de données partagées (MISO, MOSI, SCK) et des broches de contrôle spécifiques (SDA pour la sélection du composant, RST pour la réinitialisation).

Voici le plan de câblage exact appliqué et configuré dans notre code source :

### 1. Connexion du Lecteur RFID (RC522) vers la Carte Arduino
| Broche du RFID (RC522) | Rôle du Signal / Type de liaison | Connexion sur la Carte (Pin) | Correspondance & Code Source |
| :---: | :--- | :---: | :--- |
| **SDA (SS)** | Sélection du composant SPI (Chip Select) | **D7** | Configuré par la ligne `#define SS_PIN 7` |
| **SCK** | Horloge de synchronisation du bus SPI | **D13** | Broche d'horloge SPI matérielle par défaut |
| **MOSI** | Entrée des données SPI (Master Output) | **D11** | Broche de données sortantes par défaut |
| **MISO** | Sortie des données SPI (Slave Output) | **D12** | Broche de données entrantes par défaut |
| **RST** | Ligne de réinitialisation (Reset) | **D9** | Configuré par la ligne `#define RST_PIN 9` |
| **3.3V** | Alimentation électrique principale | **3.3V** | **ATTENTION OBLIGATOIRE** (Le 5V grille le module) |
| **GND** | Masse électrique de référence | **GND** | Liaison à la terre commune du circuit |

### 2. Configuration Interne de la Radio LoRa
Sur la carte de développement, les broches de liaison avec le module radio interne sont directement déclarées et gérées par la structure `lmic_pinmap` :
* **NSS (Sélection Radio)** : Connecté sur la **Pin 10**.
* **RST (Reset Radio)** : Connecté sur la **Pin 8**.
* **DIO 0, 1, 2 (Interruptions Réseau)** : Reliées ensemble sur la **Pin 6** (`{6, 6, 6}`) pour intercepter les signaux d'envoi et de réception.

---

## ⚙️ Explication de la Logique du Code Source

Le programme s'exécute de manière asynchrone (non-bloquante) afin de laisser tourner la pile réseau en tâche de fond.

### 1. La Phase d'Initialisation (`setup`)
* **Moniteur Série** : Ouvre le canal de communication à `115200 bauds` pour suivre les logs de débogage.
* **Périphériques** : Démarre le bus SPI et réveille le module de lecture (`rfid.PCD_Init()`).
* **Configuration LoRaWAN (Mode ABP)** : Charge directement la session réseau avec les clés de sécurité pré-partagées (`DEVADDR`, `NWKSKEY`, `APPSKEY`). Il configure les trois canaux européens standards de référence (868.1 MHz, 868.3 MHz et 868.5 MHz) avec un codage en *Spreading Factor* 7 (SF7) pour optimiser la vitesse d'envoi.

### 2. La Boucle Principale (`loop`)
La boucle exécute en continu deux fonctionnalités clés :
* **Le moteur LoRaWAN** : La fonction globale `os_runloop_once()` s'exécute en permanence en arrière-plan pour traiter la pile radio et gérer l'événement `EV_TXCOMPLETE` (confirmation d'envoi réussi).
* **La détection et lecture RFID** : Le code vérifie si un badge physique passe à proximité du champ magnétique de l'antenne.

Dès qu'une carte est détectée :
1. **Extraction de l'UID** : Le programme récupère la taille et les octets bruts de l'identifiant (ex: `7BF81607`) et les stocke dans le tableau global `rfid_payload`.
2. **Gestion de l'Anti-rebond (Cooldown)** : Pour éviter de surcharger inutilement le réseau LoRaWAN en émettant des paquets en boucle si un utilisateur laisse son badge posé sur le lecteur, une sécurité temporelle de **10 secondes** (`cooldown = 10000`) bloque toute nouvelle lecture immédiate.
3. **Transmission Radio** : Le drapeau `card_waiting_to_send` passe à vrai et appelle instantanément la fonction `do_send()`. Celle-ci donne l'ordre à la bibliothèque LMIC d'émettre le payload contenant l'UID brut de la carte directement vers la passerelle de l'université.

---

## 🚀 Comment déployer et tester ce module ?

1. Connecte ton lecteur RFID à ta carte en suivant scrupuleusement le tableau de branchement (les bretelles).
2. Ouvre le fichier `.ino` avec l'IDE Arduino.
3. Installe si nécessaire les bibliothèques requises : **MFRC522** et **MCCI Arduino-LMIC library**.
4. *(Optionnel)* Modifie les clés d'activation ABP (`DEVADDR`, `NWKSKEY`, `APPSKEY`) si tu dois enregistrer ce boîtier sur un autre compte *The Things Network (TTN)*.
5. Sélectionne la carte, le bon port COM, puis clique sur **Téléverser**.
6. Ouvre ton moniteur série à 115200 bauds. À chaque passage de carte, tu verras l'UID s'afficher suivi du message de succès réseau `EV_TXCOMPLETE` !
