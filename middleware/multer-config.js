//Importation du package multer permettant de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//on indique à multer où enregistrer les fichiers entrants
// diskstorage configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
    // on indique à multer d'enrégistrer les fichers dans le dossier Images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // on indique à multer d'utiliser le nom d'origine
    // de remplacer les espaces par des underscores
    //et d'ajouter un timestamp
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        // pour résoudre l'extension de fichier appropriée.
    }
});

// Storage gère uniquement les téléchargements de fichiers Image.
module.exports = multer({storage}).single('image');