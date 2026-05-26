# 📓 Cahier de Suivi -
**Rôle :** Responsable Matériel et Électronique (Arduino)

---

## 🗓️ Séance 1 : Câblage du lecteur RFID
* **Ce que j'ai fait :**
  * J'ai pris le matériel (carte RThing, lecteur RFID RC522 et l'antenne LoRa).
  * J'ai branché tous les fils entre le lecteur RFID et la carte (les broches SDA, RST, SCK, MISO, MOSI, le 3.3V et la masse).
  * J'ai installé les bibliothèques MFRC522 et LMIC sur le logiciel Arduino de mon PC.

---

## 🗓️ Séance 2 : Lecture du badge et envoi LoRa
* **Ce que j'ai fait :**
  *  j’ai mise en place le code pour lire le numéro unique (UID) d'un badge quand on le passe devant le lecteur.
  * J'ai copié les clés de connexion ABP données par la console TTN et je les ai mises dans mon code Arduino.
  * J'ai fait des tests et j'ai réussi à voir les messages arriver sur la passerelle du FabLab.

---

## 🗓️ Séance 3 : Réglage du code et anti-spam
* **Ce que j'ai fait :**
  * J'ai ajouté une sécurité dans le code (un délai de 10 secondes) pour éviter que la carte envoie des messages en boucle si on la laisse posée sur le lecteur.
  * J'ai réglé le code pour que la recherche de badge ne bloque pas la connexion internet LoRaWAN.

---

## 🗓️ Séance 4 : Boîtier et test final
* **Ce que j'ai fait :**
  * J'ai vérifié que tous les fils tenaient 
  * J'ai fait des tests de portée dans l'amphi pour voir si ça captait de loin.
  * J'ai scanné les badges devant le prof pour lui montrer que l'autorisation s'affichait bien.
