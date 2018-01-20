

// Part3

    let allCandidates, allVoter, fetchVoters;
    let fetchCandidates = [];
    let btnpart3 = document.querySelector('.btn-part3');
    btnpart3.addEventListener('click', fetchElectionData)

    // fetch data
    function fetchElectionData() {
        const url = 'https://www.mocky.io/v2/5a55224b2d000088425b1ed8';
        fetch(url)
            .then(res => res.json())
            .then(data => getAllVoters(data))
            .then(voterValid => filterInvalidVoters(voterValid))
            .then(dat => runElection(dat, candidates))
            .then(results => getWinner(results))
            .then(winnerName => winnerMessage(winnerName))
            .catch(err => console.log(err))
    }

    function getAllVoters(voter) {

        voter.voters.forEach(person => {
            fetchVoters = new Voter(person.name, person.age, person.votingCard)
            votingPopulation.push(fetchVoters);
        })

        voter.candidates.forEach(person => {
            let x = (new Candidate(person.name, person.age, person.votingCard, person.party, person.id));
            fetchCandidates.push(x)
        })

        allNewCandidatesObject(fetchCandidates);
        allVoter = votingPopulation.concat(candidatesObjToArray(candidates));
        let filter = filterInvalidVoters(allVoter);
        let run = runElection(filter, candidates)
        let win = getWinner(run)
        titleH('candidate', 'h1', 'CANDIDATES', candidates);
        titleH('voter', 'h1', 'VOTERS', arrToObj(votingPopulation));
        let message = winnerMessage(win);
        displayWin(message)

        return allVoter;
    }


    // function: display name of the winner and his score
    function displayWin(theWinnerIs) {
        let resultTag = document.createElement('div');
        let resultP = document.querySelector('.result-3');
        resultClass.appendChild(resultTag);
        resultTag.innerHTML = theWinnerIs;
        resultTag.classList.add('results');
        if (resultTag.innerHTML === theWinnerIs) {
            removeBtn3()
            resultP.style.display = 'none';
        }
    }

    function removeBtn3() {
        var btnRemove3 = document.querySelector('.btn-part3');
        resultClass.appendChild(btnRemove3);
        btnRemove3.removeEventListener('click', displayWin);
        resultClass.removeChild(btnRemove3);
    }

    // create function to convert fetchCandidate array to an object 
    function allNewCandidatesObject(arr) {
        for (let i = 1; i <= arr.length; i++) {
            candidates[i] = new Candidate(arr[i - 1].name, arr[i - 1].age, arr[i - 1].votingCard, arr[i - 1].party, arr[i - 1].numVotes);
        }
        return candidates;
    }

    console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.