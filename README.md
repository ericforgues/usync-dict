# uSync-Dict

Un utilitaire en ligne de commande pour gérer facilement les dictionnaires de traduction uSync dans vos projets Umbraco.

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/ericforgues/usync-dict.git
cd usync-dict

# Installer les dépendances
npm install

# Créer un lien symbolique global
npm link
```

## Prérequis

- Node.js >= 18.18.0
- Umbraco CMS
- uSync package installé
- Le dossier `uSync/data/Dictionary` doit exister dans votre projet

## Utilisation

Placez-vous dans le dossier racine de votre projet Umbraco (où se trouve le dossier `uSync`) et utilisez la commande :

```bash
# Syntaxe de base
usync-dict <clé> <valeur_fr> [valeur_en]

# Exemples
# Ajouter une traduction en français uniquement
usync-dict MemberPage.NumberOfSites "Nombre de sites"

# Ajouter une traduction en français et en anglais
usync-dict MemberPage.NumberOfSites "Nombre de sites" "Number of sites"
```

### Format de la clé

La clé doit être au format `Section.SousSection`, par exemple :
- `MemberPage.NumberOfSites`
- `HomePage.WelcomeMessage`
- `ContactForm.SubmitButton`

## Structure des fichiers

Le script créera automatiquement la structure suivante dans votre dossier `uSync/data/Dictionary` :

```
uSync/
└── data/
    └── Dictionary/
        ├── memberpage.config
        └── memberpage.numberofsites.config
```

## Fonctionnalités

- Création automatique des fichiers de dictionnaire parent
- Support bilingue (français et anglais)
- Génération automatique des UUIDs
- Structure XML compatible avec uSync
- Interface en ligne de commande simple

## Messages d'erreur

Si vous obtenez une erreur indiquant que le dossier uSync n'existe pas, assurez-vous que :
1. Vous êtes dans le bon dossier (racine du projet Umbraco)
2. uSync est correctement configuré dans votre projet
3. Le dossier `uSync/data/Dictionary` existe 