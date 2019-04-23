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
        var participantName = participant.friendName;
        var participantPhoto = participant.friendPhoto;
        var participantScores = participant.responses;
        var totalDifference = 0;

        for(i = 0; i < friends.length; i++){
            console.log("Comparing scores to " + friend[i].name);

            for(j = 0; j < participantScores.length; j++){
                totalDifference += Math.abs(participantScores[j] - parseInt(friends[i].scores[j]));

                if(totalDifference < bestMatch.friendDifference){
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(participant);
        res.json(bestMatch);
    });
};