
// https://api.openweathermap.org/data/2.5/weather?q=saint-saulve&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric

function changeLogo(logoPath) {
    console.log(logoPath);
    const logo = document.getElementById('logo');
    logo.src = logoPath;
}

function changeVideo(videoPath) {
    console.log(videoPath);
    const vid = document.getElementById('bgvid');
    const vidsource = document.querySelector('#vid');
    vidsource.src = videoPath;
    vid.load();
}
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
                let humidite = reponse.main.humidity;
                let ville = reponse.name;
                if (temperature <= 0) {
                    changeVideo('img/winter.webm');
                    changeLogo("img/winter.png");

                } else if (temperature > 0 && temperature < 15) {
                    if (humidite > 90) {
                        changeVideo('img/cloudy.webm');
                        changeLogo("img/cloudy.png");
                    } else {
                        changeVideo('img/sun.webm');
                        changeLogo("img/sunny.png");
                    }
                } else if (temperature > 15 && temperature < 20) {
                    changeVideo('img/sun.webm');
                    changeLogo("img/sunny.png");
                } else if (temperature > 20) {

                    changeVideo('img/sunchine.webm');
                    changeLogo("img/sun.png");
                }
                document.querySelector('#temperature_label').textContent = temperature;//id = temperature
                document.querySelector('#ville').textContent = ville;
                document.querySelector('#humidity_label').textContent = humidite;
            }
            else {
                alert('Un probleme est interevenu, merci de revenir plus tard ! ');
            }

        }

    }

}

