var form = document.getElementById('myForm');

form.addEventListener('submit', async function(submit) {
    submit.preventDefault();

    var name = document.getElementById('search').value;

    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();
    console.log(data);
})