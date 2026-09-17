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

let savedScore = localStorage.getItem("bestScore") || 0;
console.log(savedScore) //vérifier qu'on a bien récup la valeur

let meilleurScore = document.getElementById("bestScore");
meilleurScore.textContent = "Meilleur score : " + savedScore;


//function

function resetJeu(){
    clearInterval(interval)
    score = 0;
    temps = tempMode;
    bouton.disabled = false;
    inputJoueur.disabled = false;
    boutonReset.style.display = "none";

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


/*Utile*/
let emoji = document.getElementById("logo");

emoji.addEventListener("click", ()=>{
    emoji.textContent = "Je t'avais prévenu.";

    setTimeout(() => {
        emoji.textContent = "⌨️";
    }, 1500);
});