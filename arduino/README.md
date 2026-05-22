# 🔌 Module Embarqué (Arduino / RFID / LoRaWAN)

Ce dossier contient le code source de la carte (RThing Card) pour lire l'UID d'un badge RFID et l'envoyer sur le réseau LoRaWAN.

## 📌 Branchement Matériel (RFID RC522)

Relier le lecteur RFID à la carte pin à pin avec les câbles (bretelles) :

* **SDA (SS)** ➔ Pin **D7** *(géré par #define SS_PIN 7)*
* **SCK** ➔ Pin **D13** *(Horloge SPI)*
* **MOSI** ➔ Pin **D11** *(Données SPI)*
* **MISO** ➔ Pin **D12** *(Données SPI)*
* **RST** ➔ Pin **D9** *(géré par #define RST_PIN 9)*
* **3.3V** ➔ Pin **3.3V** *(Attention : ne pas brancher sur le 5V)*
* **GND** ➔ Pin **GND** *(Masse commune)*

*Note : Les broches de la radio LoRa interne (NSS sur 10, RST sur 8, DIO sur 6) sont directement intégrées sur la carte via la configuration LMIC.*

---

## ⚙️ Logique du Code

Le programme fonctionne de manière asynchrone (non-bloquante) :

1. **Initialisation (`setup`)** : Lance le port série (115200 bauds), le bus SPI, le RFID, et configure la session LoRaWAN en mode **ABP** avec les clés réseau sur les fréquences européennes (868 MHz).
2. **Boucle principale (`loop`)** :
   * Fait tourner la pile réseau LoRaWAN en arrière-plan (`os_runloop_once()`).
   * Attend le passage d'un badge. Dès qu'une carte est détectée, elle extrait son UID brut (ex: `7BF81607`).
   * **Anti-rebond (Cooldown)** : Bloque la lecture pendant **10 secondes** après un scan pour éviter d'envoyer la même carte en boucle.
   * **Envoi** : Déclenche immédiatement la fonction `do_send()` pour envoyer l'UID par radio vers la passerelle.

---

## 🚀 Utilisation rapide

1. Câbler le module suivant le guide ci-dessus.
2. Installer les bibliothèques **MFRC522** et **MCCI Arduino-LMIC**.
3. *(Optionnel)* Mettre à jour les clés `DEVADDR`, `NWKSKEY` et `APPSKEY` avec celles de TTN.
4. Téléverser le code et ouvrir le moniteur série.
