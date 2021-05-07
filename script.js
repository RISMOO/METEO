
let ville = "Brest";//ville de départ
recevoirTemperature(ville);
let changerDeVille = document.querySelector('#changer');
//quand l'utilisateur click tu m'execute cette fonction
changerDeVille.addEventListener('click', () => {
    ville = prompt('Quelle ville souhaitez-vous voir ?');
    recevoirTemperature(ville)
});
function recevoirTemperature(ville) {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=0e81e5ba3934101e44c241eb5e313808&units=metric';
    let requete = new XMLHttpRequest();
    requete.open('GET', url);//get envoi des information dans l'url
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {//au chargement de la page

        if (requete.readyState === XMLHttpRequest.DONE) {

            //on verfie que la requete est terminé
            if (requete.status === 200) {

                let reponse = requete.response;
                let temperature = reponse.main.temp;
                let ville = reponse.name;
                document.querySelector('#temperature_label').textContent = temperature;//id = temperature
                document.querySelector('#ville').textContent = ville;




            }
            else {
                alert('Un probleme est interevenu, merci de revenir plus tard ! ');
            }

        }
    }


}

