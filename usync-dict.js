#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuration
const USYNC_DIR = path.join(process.cwd(), 'uSync/data/Dictionary');

// Fonction pour vérifier si le dossier uSync existe
function checkUsyncDirectory() {
  if (!fs.existsSync(USYNC_DIR)) {
    console.error('❌ Erreur: Le dossier uSync/data/Dictionary n\'existe pas');
    console.error('   Dossier attendu:', USYNC_DIR);
    console.error('   Assurez-vous d\'exécuter cette commande dans un projet avec uSync configuré');
    process.exit(1);
  }
}

// Fonction pour créer ou mettre à jour un fichier de dictionnaire parent
function createParentDictionary(parentKey) {
  const parentFilePath = path.join(USYNC_DIR, `${parentKey.toLowerCase()}.config`);

  if (!fs.existsSync(parentFilePath)) {
    const parentXml = `<?xml version="1.0" encoding="utf-8"?>
<Dictionary Key="${uuidv4()}" Alias="${parentKey}" Level="0">
  <Info />
  <Translations />
</Dictionary>`;

    fs.writeFileSync(parentFilePath, parentXml);
    console.log(`✅ Fichier parent créé: ${parentFilePath}`);
  }
}

// Fonction pour créer ou mettre à jour un fichier de traduction
function updateTranslationFile(key, translations) {
  const parts = key.split('.');
  const parentKey = parts[0];
  const childKey = parts[1];

  // Créer le fichier parent s'il n'existe pas
  createParentDictionary(parentKey);

  // Créer le fichier de traduction
  const translationFilePath = path.join(USYNC_DIR, `${parentKey.toLowerCase()}.${childKey.toLowerCase()}.config`);

  const translationXml = `<?xml version="1.0" encoding="utf-8"?>
<Dictionary Key="${uuidv4()}" Alias="${key}" Level="1">
  <Info>
    <Parent>${parentKey}</Parent>
  </Info>
  <Translations>
    <Translation Language="en-US">${translations.en || ''}</Translation>
    <Translation Language="fr-CA">${translations.fr}</Translation>
  </Translations>
</Dictionary>`;

  fs.writeFileSync(translationFilePath, translationXml);
  console.log(`✅ Dictionnaire ajouté avec succès dans ${translationFilePath}`);
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('❌ Usage: usync-dict <key> <fr_value> [en_value]');
    console.error('Exemple: usync-dict MemberPage.NumberOfSites "Nombre de sites"');
    console.error('Exemple avec anglais: usync-dict MemberPage.NumberOfSites "Nombre de sites" "Number of sites"');
    process.exit(1);
  }

  const [key, frValue, enValue] = args;

  if (!key.includes('.')) {
    console.error('❌ La clé doit contenir un point (ex: MemberPage.NumberOfSites)');
    process.exit(1);
  }

  checkUsyncDirectory();

  const translations = {
    fr: frValue,
    en: enValue
  };

  updateTranslationFile(key, translations);
}

main(); 