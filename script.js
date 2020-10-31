// ID of the form element
var form = document.getElementById('myForm');

// Adding Event Listener while the form gets submmitted
form.addEventListener('submit', async function(submit) {
    // To prevent refreshing add prevent default
    submit.preventDefault();

    // Get the username entered in the text-box
    var name = '' + document.getElementById('search').value;

    // Fetch the data using the below API
    var response = await fetch('https://api.github.com/users/' + name);
    var data = await response.json();
    console.log(data);

    var result = document.getElementById('repoData');

    result.innerHTML = '';
    document.getElementById('pagi').innerHTML = '';

    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'repoClass');
    a.id = 'repoid';
    a.innerHTML = 'View Repositories';
    result.append(a);

    a.addEventListener('click', async function(s) {
        var value = prompt('How many repositories per page');
        value = parseInt(value);
        s.preventDefault();
        document.getElementById('repoid').style.display = 'none';
        var reposData = await fetch('https://api.github.com/users/' + name + '/repos');
        var repo = await reposData.json();
        console.log(repo);
        var total = parseInt(repo.length);
        var loopCount;
        if ((total % value) === 0) {
            loopCount = Math.floor(total / value);
        } else {
            loopCount = Math.floor((total / value) + 1);
        }
        console.log(loopCount)
        for (var z = 0; z < loopCount; z++) {
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            var start = (z * value);
            var end = ((z * value) + value);
            link.setAttribute('onclick', `showData(${start},${end},${name})`);
            link.innerHTML = z + 1;
            document.getElementById('pagi').append(link);
        }

        // var repoResult = document.getElementById('repoData');
        // for (var i = 0; i < data.public_repos; i++) {
        //     var div = document.createElement('div');
        //     div.innerHTML = `
        //         <a href="${repo[i].html_url}" target='_blank' class='rep'> ${repo[i].name} </a>
        //     `;
        //     repoResult.append(div);
        //     console.log(repo[i].html_url);
        // }
    })

})

async function showData(start, end, userName) {
    var repoResult = document.getElementById('repoData');
    userName = '' + userName;
    var reposData = await fetch('https://api.github.com/users/' + userName + '/repos');
    var repo = await reposData.json();
    var div = document.createElement('div');
    for (var i = start; i < end; i++) {
        var list = document.createElement('li');
        list.innerHTML = `
            <a href="${repo[i].html_url}" target='_blank' class='rep'>${repo[i].name}</a>
        `;
        div.append(list);
    }
    repoResult.append(div);
}