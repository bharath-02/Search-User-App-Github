var form = document.getElementById('myForm');

form.addEventListener('submit', async function(submit) {
    submit.preventDefault();

    var name = document.getElementById('search').value;

    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();
    console.log(data);

    var result = document.getElementById('resultData');

    document.getElementById('repoData').innerHTML = '';

    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'repoClass');
    a.id = 'repoid';
    a.innerHTML = 'View Repositories';
    result.append(a);

    a.addEventListener('click', async function() {
        document.getElementById('repoid').style.display = 'none';
        var reposData = await fetch('https://api.github.com/users/' + name + '/repos');
        var repo = await reposData.json();
        console.log(repo);
        var repoResult = document.getElementById('repoData');
        for (var i = 0; i < data.public_repos; i++) {
            var div = document.createElement('div');
            div.innerHTML = `
                <a href="${repo[i].html_url}" target='_blank' class='rep'> ${repo[i].name} </a>
            `;
            repoResult.append(div);
            console.log(repo[i].html_url);
        }
    })

})