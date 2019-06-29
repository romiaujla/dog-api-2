function displayDog(responseJson) {

    console.log(responseJson);
    let src = responseJson.message;
    if(responseJson.status === "error"){
        throw responseJson.message;
    }

    $('.search-result-section .wrapper').html(`
        <div class="dog-image-div">
            <img src="${src}" alt="picture of a dog"
        </div>
    `);

}

function fetchDogs(breed) {

    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            $('.search-result-section .wrapper').html("");
            displayDog(responseJson);
            $('.footer-section').show();
        })
        .catch(err => {
            console.log("Something went wrong: " + err.message);
            $('.search-result-section .wrapper').html(`
                <div class="no-dogs-found">
                    No dogs found
                </div>
            `);
        });

}

function watchForm() {

    $('form').on('submit', function (e) {

        e.preventDefault();

        $('.footer-section').hide();

        let breed = $('.dog-selector').val();
        console.log(breed);
        $('.search-result-section .wrapper').html(`Searching ${breed}`);
        
        // removing the - and replaing with a '/'
        breed = breed.replace(/-/g, '/');

        fetchDogs(breed);

        $('#breed').val("");

    });

}

$(watchForm);