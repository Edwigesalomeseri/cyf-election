/**
 * CYF JS core 3 election project
 */
/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {
    var arr = [];
    for (var i = 1; i < 5; i++) {
        arr.push(candidates[i]);
    }
    return arr;
}

function candidatesObjToArray(candidates) {
    var arrOfCandidates = [];
    Object.keys(candidates).map(function(candidateId) {
        arrOfCandidates.push(candidates[candidateId]);
    });
    return arrOfCandidates;
}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
 */

function filterInvalidVoters(voters) {
    return voters.filter(function(voter) {
        for (let i = 0; i < voter.votingCard.length; i++) {
            if (voter.votingCard.length > 2 || voter.votingCard[i] === voter.votingCard[i + 1]) {
                return false
            } else {
                return true
            }
        }
    });
}

/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
function runElection(validVoters, candidates) {
    for (let i = 0; i < validVoters.length; i++) {
        var voterCast = validVoters[i].votingCard;
        for (let j = 0; j < voterCast.length; j++) {
            if (voterCast[j] === voterCast[0]) {
                candidates[voterCast[j]].numVotes += 1;
            } else {
                candidates[voterCast[j]].numVotes += 0.5;
            }
        }
    }
    return candidates;
}


/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
    var hasMaxVote = 0;
    var theWinner;
    for (var i = 1; i < 5; i++) {
        if (candidates[i].numVotes > hasMaxVote) {
            hasMaxVote = candidates[i].numVotes;
            theWinner = candidates[i];
        }
    }
    return theWinner;
}

function getWinner(candidates) {
    var hasMaxVote = 0;
    var theWinner;
    var candidatesToArray = candidatesObjToArray(candidates);
    for (var i = 0; i < candidatesToArray.length; i++) {
        if (candidatesToArray[i].numVotes > hasMaxVote) {
            hasMaxVote = candidatesToArray[i].numVotes;
            theWinner = candidatesToArray[i];
        } else if (candidatesToArray[i] === hasMaxVote) {
            theWinner = null;
        }
    }
    return theWinner;
}
/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    if (winner === null) {
        return 'The election was a draw';
    } else {
        return winner.name + ' has won the election with ' + winner.numVotes + ' votes!';
    }
}




    


    module.exports = {
        candidatesObjToArray,
        filterInvalidVoters,
        runElection,
        getWinner,
        winnerMessage
     }