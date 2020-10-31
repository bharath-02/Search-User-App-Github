// ID of the form element
var form = document.getElementById('myForm');

// Adding Event Listener while the form gets submmitted
form.addEventListener('submit', async function(submit) {
    // To prevent refreshing add prevent default
    submit.preventDefault();

    // Get the username entered in the text-box
    var name = document.getElementById('search').value;

    // Fetch the data using the below API
    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();
    console.log(data);

    var result = document.getElementById('repoData');

    result.innerHTML = '';

    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'repoClass');
    a.id = 'repoid';
    a.innerHTML = 'View Repositories';
    result.append(a);

    a.addEventListener('click', async function(s) {
        var value = prompt('How many repositories per page');
        s.preventDefault();
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