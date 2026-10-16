// Tableau pour notre jeu
let mots = ["voiture", "fraise" , "table" , "lion" , "force"];

document.body.classList.toggle("dark");


function motAleatoire(){
    let res = Math.floor(Math.random() * mots.length);
    return mots[res];
}

console.log(motAleatoire());


let motAffiche = document.getElementById("motAffiche")
motAffiche.textContent = motAleatoire();
//(---------------------------------Zone Jeu---------------------------------

let inputJoueur = document.getElementById("inputJoueur")
let bouton = document.getElementById("btnValider")
//--------------------------------Score-----------------------------
let score = 0;
let zoneScore = document.getElementById("scoreMot")

//--------------------------------Timer & Reset--------------------------

let temps = 30;
let zoneTimer = document.getElementById("timerMot")
let boutonReset = document.getElementById("btnRejouer")


let btnEasy = document.getElementById("easyMode")
let btnMedium = document.getElementById("mediumMode")
let btnHard = document.getElementById("hardMode")

let tempMode= 30;

//const = les valeurs de nos listes ne changeront jamais
const easyModeList = ["chat", "cable", "stylos", "feuille"];
const mediumModeList = ["ordinateur", "javascript", "camion", "bibliotheque"];
const hardModeList = ["developpement", "architecture", "synchronisation", "evaporation"];


// Vies & Messages
let messageF = document.getElementById("messageFinale")


let nbVies = document.getElementById("vies");
let uneVie = 3;

// Vitesse dans le cas on a chaque fois qu'on score de 5 en 5 la variable va changer.
let vitesse = 1000;
//--------------------Enregistrement du score via LocalStorage--------------
let savedScore = localStorage.getItem("bestScore") || 0;
console.log(savedScore) //vérifier qu'on a bien récup la valeur

let meilleurScore = document.getElementById("bestScore");
meilleurScore.textContent = "Meilleur score : " + savedScore;

// ---------------------------- Partager le score---------------------------
let boutonShare = document.getElementById("btnPartager");
let popupScore = document.getElementById("popupScore");


let form = document.querySelector("form");
let champNom = document.getElementById("nom");
let champEmail = document.getElementById("email");



//function

function resetJeu(){
    clearInterval(interval)
    score = 0;
    temps = tempMode;
    bouton.disabled = false;
    inputJoueur.disabled = false;
    boutonReset.style.display = "none";


    boutonShare.style.display= "none";
    popupScore.style.display = "none";
    messageF.textContent = "";


    uneVie = 3;
    MajVies();


    zoneScore.textContent = "Score : 0 ";

    inputJoueur.focus();
    inputJoueur.value ="";
    majTemps()

    interval = setInterval(() => {
    temps--;
    majTemps()
    
    if(temps <= 0 || uneVie <= 0){
        clearInterval(interval); //met fin au timer
        bouton.disabled = true;
        inputJoueur.disabled = true;
        zoneTimer.textContent = "Fin";
        boutonReset.style.display = "block";
        document.getElementById("soundGameOver").play();

        boutonShare.style.display = "block";
        messageF.textContent = "Fin du jeu ! Score de " + score + " pts ! "
    }
    
}, vitesse);
}

function majTemps(){
    zoneTimer.textContent = "Temps restants : " + temps + " sec."
}

function afficherNouveauMot(){
    motAffiche.textContent = motAleatoire();
}

function MajVies(){
    nbVies.textContent = "Nombres de vies : " +  "❤️ ".repeat(uneVie); //repeat(unevaleur seulement numérique) est associé a la chaine "<3" et donc
} //je soustrait ou additionne "uneVie" , la chaine va augmenter ou se réduire.



//-------------------------------Evenements (START DU JEU) -------------------------------------)

bouton.addEventListener("click" , ()=>{
    console.log(inputJoueur.value)
    
    if(inputJoueur.value.trim() === motAffiche.textContent){ //trim = retirer les espaces inutiles dans le champ.
        console.log("Correct ! Le bon mot a été saisie")
        motAffiche.classList.add("correct");
        setTimeout(() => motAffiche.classList.remove("correct"), 300);
        score++;
        document.getElementById("soundCorrect").play(); //démarrer l'audio lorsque la réponse est correcte

        if(vitesse > 0 && score % 5===0){
            vitesse = vitesse - 100;            //La vitesse augmente chaque fois que le score passe de 5 en 5.
            if(vitesse < 300) vitesse = 300;
        }
    }
    else{
        console.log("Incorrecte, vous n'avez pas saisie le bon mot.")
        motAffiche.classList.add("incorrect");
        setTimeout(() => motAffiche.classList.remove("incorrect"), 300);
        uneVie--; // la vie est perdue lorsque la réponse est mauvaise et un son se déclenche
        MajVies();
        document.getElementById("soundIncorrect").play();
    }
    afficherNouveauMot();
    inputJoueur.value = "";
    inputJoueur.focus();

    zoneScore.textContent = "Score : " + score;

})

inputJoueur.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        bouton.click();
    }
})

//--------------------------------- TIMER DU JEU ------------------------------//

let interval = setInterval(() => { //l'intervalle du jeu 30 sec et chaque secondes on descend d'une sec
    temps--;
    majTemps()
    
    if(temps <= 0 || uneVie <= 0){
        clearInterval(interval); //met fin au timer
        bouton.disabled = true;
        inputJoueur.disabled = true;
        zoneTimer.textContent = "Fin";
        boutonReset.style.display = "block";
        boutonReset.style.margin = "0 auto"; /*bouton au milieu*/

        boutonShare.style.display = "block";
        boutonShare.style.margin = "0 auto";
        
        document.getElementById("soundGameOver").play();
            // Message de fin & Styles
        messageF.classList.add("show")
        messageF.textContent = "Fin du jeu ! Score de " + score + " pts ! " //message de fin
        messageF.style.color = "blue";
        messageF.style.fontSize = "1rem";

                
        if(score > savedScore){
            savedScore = score;
            localStorage.setItem("bestScore", savedScore);
            meilleurScore.textContent = "Meilleur score : " + savedScore;
        }

    }
    
}, 1000); //1000ms = 1sec


boutonReset.addEventListener("click", ()=>{
    resetJeu();
})

//----------------------------------- BOUTON REJOUER -------------------------------//
btnEasy.addEventListener("click", ()=>{
    tempMode = 40;
    mots = easyModeList;
    resetJeu();
});

btnMedium.addEventListener("click", ()=>{ //en fonction du mode de jeu la limite du temps est plus courte ou longue.
    tempMode = 30;
    mots = mediumModeList;
    resetJeu();
});

btnHard.addEventListener("click", ()=>{
    console.log("détecté")
    tempMode = 20;
    mots = hardModeList;
    resetJeu();
    
});



//---------------Partage du score par mail----------


function mailSend(nom , email, score, bestScore){
    const subject = "Score partagé du jeu 'Input!' ";
    const corps = `Score du joueur ${nom.value} : ${score}\n Meilleur score : ${bestScore}`;

    const mail = `mailto:${email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(corps)}`;
    window.location.href = mail;
}
//Affiche de notre PopPup
boutonShare.addEventListener("click", ()=>{
    popupScore.style.display = "block";
})

//On écoute l'événement en cliquant sur le bouton valider

form.addEventListener("submit", function(event){
    event.preventDefault();

    const nomValide = verifNom(champNom);
    const mailValide = verifMail(champEmail);

    if( nomValide && mailValide ){
        mailSend(champNom, champEmail, score , savedScore);
    }
    else{
        console.log("erreur")
    }
})


// Voir instantanement si notre champ respecte les règles


champNom.addEventListener('input', (event)=>{
    verifNom(event.target);    
})

champEmail.addEventListener('input', (event)=>{
    verifMail(event.target);
})

//--------------Expresssions régulières----------------


function verifNom(unNom){
    
    const maRegex = /^[a-zA-Z_.-]{2,}$/;
    if(maRegex.test(unNom.value.trim() )){
        unNom.classList.add("green");
        unNom.classList.remove("red");

        return true;
    }
    else{
        unNom.classList.add("red");
        unNom.classList.remove("green");
        
        return false;
    }
}

function verifMail(unEmail){

    let mailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;

    if(mailRegex.test(unEmail.value.trim() )){
        unEmail.classList.add("green");
        unEmail.classList.remove("red");

        return true;
    }
    else{
        unEmail.classList.add("red");
        unEmail.classList.remove("green");

        return false;
    }
}
