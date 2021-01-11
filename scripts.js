$(() => {

    function renderPhrases(){
        $.ajax({
            url: '/phrases',
            contentType: 'application/json',
            method: 'GET',
            success: function(response){
                var content = $('#coments');

                content.html('<h4>Frases</h4>');

                response.forEach((phrases) => {
                    content.append(`<div class="card bg-light text-dark"> <div class="container card-body card-style"> 
                                    <span id="` + phrases.id + `" class="text-style">` + phrases.text + `</span>
                                    <button id="listen-button" type="submit" class="btn btn-primary">Ouvir</button></div> </div>`)
                });
            }
        });
    };

    renderPhrases();

    $('#inputComent').on('input', (event) => {
        event.preventDefault();

        var limit = 255;

        var tCharacter = $('#inputComent').val().length;

        var contCharacter = limit - tCharacter;

        $('#counter').text('Caracteres restantes: ' + contCharacter);
    })

    $('#buttonAdd').on('click', (event) => {
        event.preventDefault();

        var createInput = $('#inputComent');
        
        if(createInput.val().trim()){
            $.ajax({
                url: '/phrases',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ text: createInput.val() }),
                success: () => {
                    createInput.val('');
                    $('#counter').text('Caracteres restantes: 255');
                    renderPhrases();
                }
            });
        }
        else alert('Não é possível cadastrar frases vazias!');
    });
    
    $(document).on("click", "#listen-button", (event) => {
        var id = event.target.parentElement.children[0].id;
        var text = event.target.parentElement.children[0].innerHTML;

        $.ajax({
            url: '/audio',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: id, text: text }),
            success: (response) => {
                $('#source').attr('src', response);
                $('audio').get(0).load();
                $('audio').get(0).play();
            }
        });
    });
});