console.log('Before');
// const user = getUser(1, (user) => {
//     console.log('User', user);

//     //get the repositories
//     // const repo = getRepositories(user.gitHubUsername, (repo) => {
//     //     console.log('User Repo', repo);
//     // });
//     // getCommits(repo, displayCommits);
// });
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
 });


// const p  = getUser(1);
// p.then(user => console.log(user));


// getUser(1)
//  .then(user => getRepositories(user.gitHubUsername))
//  .then(repos => getCommits(repos[0]))
//  .then(commits => console.log('Commits', commits))
//  .catch(err => console.log('Error', err.message));
// console.log('After');


//callbacks
//promises


function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api');
            resolve(['commit']);
        }, 2000);
    })
}


function displayCommits(commits) {
    console.log(commits);
}


function getUser(id) {
    return new Promise((resolve, reject) => {
        //kick off some async work
        setTimeout(() => {
            console.log('Reading a user from database..');
            resolve({ id: id, gitHubUsername: 'ashok'});
        }, 2000);
    });
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    });

}



// Asycn and Await Approach
//Async/wait
// const user = await getUser(1);
// const repos = await getRepositories(user.gitHubUsername);
// const commits = await getCommits(repos[0]);
// console.log(commits);

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch(err){
        console.log('Error', err.message);
    }
 
}

displayCommits()


