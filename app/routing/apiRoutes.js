var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 41
        }

        var participant = req.body;
        var participantName = participant.name;
        var participantPhoto = participant.photo;
        var participantScores = participant.scores;

        console.log(friends);
        for(i = 0; i < friends.length; i++){
            console.log("Comparing scores to " + friends[i].name);
            var totalDifference = 0;

            for(j = 0; j < participantScores.length; j++){
                totalDifference += Math.abs(participantScores[j] - parseInt(friends[i].scores[j]));
            }

            if(totalDifference < bestMatch.friendDifference){
                console.log("Your new best match is " + friends[i].name + " with a total difference of " + totalDifference);
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friends.push(participant);
        res.json(bestMatch);
    });
};