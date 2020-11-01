// ID of the form element
var form = document.getElementById('myform');

// Adding Event Listener while the form gets submmitted
form.addEventListener('submit', async function(submit) {
    // To prevent refreshing add prevent default
    submit.preventDefault();

    // Get the username entered in the text-box
    var name = '' + document.getElementById('search').value;

    // Fetch the data using the below API
    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();

    // Place to display the result
    var result = document.getElementById('repoData');
    result.innerHTML = '';

    document.getElementById('pagi').innerHTML = '';

    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'repoClass');
    a.id = 'repoid';
    a.innerHTML = 'View Repositories';
    result.append(a);
    // Adding Event Listener to view the repositories
    a.addEventListener('click', async function(s) {
        // Prompt for knowing how much repositories per page
        var value = prompt('How many repositories per page');
        value = parseInt(value);
        s.preventDefault();
        document.getElementById('repoid').style.display = 'none';

        // Fetching repository lists
        var reposData = await fetch('https://api.github.com/users/' + name + '/repos');
        var repo = await reposData.json();

        // Logics behind the pagination
        var total = parseInt(repo.length);
        var loopCount;
        if ((total % value) === 0) {
            loopCount = Math.floor(total / value);
        } else {
            loopCount = Math.floor((total / value) + 1);
        }

        // Loop to create Pagination Dynamically
        for (var z = 0; z < loopCount; z++) {
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            var start = (z * value);
            var end = ((z * value) + value);
            link.setAttribute('onclick', `showData('${start}','${end}','${name}')`);
            link.innerHTML = z + 1;
            document.getElementById('pagi').append(link);
        }
    });
});

// function to create list of repositories 
async function showData(start, end, userName) {
    var repoResult = document.getElementById('repoData');
    repoResult.innerHTML = '';

    // Again fetching repository lists
    var reposData = await fetch('https://api.github.com/users/' + userName + '/repos');
    var repo = await reposData.json();
    var div = document.createElement('ul');
    for (var i = start; i < end; i++) {
        console.log(repo[i].name);
        if (i === (repo.length - 1)) {
            break;
        } else {
            var list = document.createElement('li');
            list.innerHTML = `
                <a href="${repo[i].html_url}" target='_blank' class='rep'>${repo[i].name}</a>
            `;
            div.append(list);
        }
    }
    repoResult.append(div);
}