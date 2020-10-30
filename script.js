var form = document.getElementById('myForm');

form.addEventListener('submit', async function(submit) {
    submit.preventDefault();

    var name = document.getElementById('search').value;

    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();
    console.log(data);

    var result = document.getElementById('resultData').innerHTML = `
        <a href=${data.repos_url} target="_blank"> Repositories </a>
    `;
    // var a = document.createElement('a');
    // a.setAttribute('href', data.repos_url);
    // a.setAttribute('target', '_blank')
    // a.innerHTML = 'Repos';
    // result.append(a);
    // result.innerHTML = ;
})