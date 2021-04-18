let noeudId = 2;
let reponseId = 0;


/* Affichage des réponses */

$(document).ready(
    function() {
        /* $("#doAjax").click(doRequestResponse); */
        doRequestResponse();
    }
);

// Fonction qui traite les résultats de la requête
function showResultResponse(resultJson) {
    // Le code source du template est dans la page
    var template = $('#reponsesTemplate').html();
    // On combine le template avec le résultat de la requête
    var processedTemplate = Mustache.to_html(template, resultJson);
    // On affiche le résultat dans la page
    $('#contenuNoeud').html(processedTemplate);

    // On récupère les id de tous les boutons créés pour y mettre des event listeners
    let boutonsReponse = document.getElementsByClassName("boutonReponse");

    for (let i = 0; i < boutonsReponse.length; i++) {
        let idBouton = boutonsReponse[i].id; 
        document.getElementById(idBouton).addEventListener("click", changeIdQuestion);
    }
}

// Fonction qui traite les erreurs de la requête
function showErrorResponse(xhr, status, message) {
    $("#contenuNoeud").html("Erreur: " + status + " : " + message);
}

//Fonction pour faire l'appel AJAX
function doRequestResponse() {
    $.ajax({
        //appel de l'API auto-générée
        url: "../api/questions/" + noeudId + "/reponsePossible",
        dataType: "json",
        success: showResultResponse,
        error: showErrorResponse
    });
}


/* Affichage de la question ou de la fiche */

// Fonction qui traite les résultats de la requête
function showResultNoeud(resultJson) {
    // si c'est une question
    if(resultJson.nomFiche == null){
        // Le code source du template est dans la page
        var template = $('#questionTemplate').html();
        // On combine le template avec le résultat de la requête
        var processedTemplate = Mustache.to_html(template, resultJson);
        // On affiche le résultat dans la page
        $('#titreNoeud').html(processedTemplate);

        doRequestResponse();
    }
    // si c'est une fiche
    else {
        // Le code source du template est dans la page
        var template = $('#ficheTitreTemplate').html();
        // On combine le template avec le résultat de la requête
        var processedTemplate = Mustache.to_html(template, resultJson);
        // On affiche le résultat dans la page
        $('#titreNoeud').html(processedTemplate);
        
        doRequestIllustrations();
    }
}

// Fonction qui traite les erreurs de la requête
function showErrorNoeud(xhr, status, message) {
    $("#titreNoeud").html("Erreur: " + status + " : " + message);
}


/* Changement des questions et réponses */

//Fonction pour faire l'appel AJAX
function doRequestNoeud() {
    $.ajax({
        //appel de l'API auto-générée
        url: "../api/noeudDecisionnels/" + noeudId,
        dataType: "json",
        success: showResultNoeud,
        error: showErrorNoeud
    });
}

//Fonction pour récupérer l'id du noeud fils
function doRequestNoeudFils(){
    const url = "../api/reponses/" + reponseId + "/noeudFils";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let noeudFilsId = 0;
    const fetchOptions = {
        method: "GET"
    }
    return fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            noeudFilsId = dataJSON.id;
            return noeudFilsId;
        })
        .catch((error) => console.log(error));
}

//Fonction pour changer les questions et réponses sur la page en fonction de la réponse de l'utilisateur
async function changeIdQuestion() {
    let idBouton = event.target.id;
    reponseId = idBouton.split("_")[1];
    let noeudFilsId = await doRequestNoeudFils();
    noeudId = noeudFilsId;
    doRequestNoeud();
}


// Fonction qui traite les résultats de la requête
function showResultIllustrations(resultJson) {
    // Le code source du template est dans la page
    var template = $('#ficheIllustrationsTemplate').html();
    // On combine le template avec le résultat de la requête
    var processedTemplate = Mustache.to_html(template, resultJson);
    // On affiche le résultat dans la page
    $('#contenuNoeud').html(processedTemplate);
}

// Fonction qui traite les erreurs de la requête
function showErrorIllustrations(xhr, status, message) {
    $("#contenuNoeud").html("Erreur: " + status + " : " + message);
}

//Fonction pour faire l'appel AJAX
function doRequestIllustrations() {
    $.ajax({
        //appel de l'API auto-générée
        url: "../api/fiches/" + noeudId + "/dessins",
        dataType: "json",
        success: showResultIllustrations,
        error: showErrorIllustrations
    });
}