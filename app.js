//This app does not do full error handling yet
//because... this is a hackathon cmon.
var builder = require('botbuilder');
var restify = require('restify');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
  appId: 'APP_ID',
  appPassword: 'APP_PASSWORD'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//=========================================================
// Recommendation Algorithm
//=========================================================

//weighing algorithm to select a penpal
//probably good place to use a 'recommendation API'
//but not enough time to implement that... or is there?
function penpalSelector(grade, school, hobby) {

  //In future probably get this from a real database
  //it would be good practice to put in different file
  //but not now because not enough time...
  /* 100 objects with random data
  * grades: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12
  * school: Gryffindor, Slytherin, Ravenclaw, Hufflepuff
  * hobby: biking, reading, music, photography, sports
   */
  var penpals = [{"name":"Helen Mendoza","grade":4,"school":"Slytherin","hobby":"music"},
    {"name":"Tammy Hudson","grade":9,"school":"Slytherin","hobby":"biking"},
    {"name":"Martha Williams","grade":11,"school":"Slytherin","hobby":"reading"},
    {"name":"Alice Jordan","grade":6,"school":"Slytherin","hobby":"biking"},
    {"name":"Jerry Myers","grade":1,"school":"Slytherin","hobby":"biking"},
    {"name":"Christine Roberts","grade":12,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Sean Wilson","grade":1,"school":"Gryffindor","hobby":"biking"},
    {"name":"Denise Brown","grade":11,"school":"Gryffindor","hobby":"photography"},
    {"name":"Steven Fields","grade":1,"school":"Ravenclaw","hobby":"reading"},
    {"name":"Tina Sullivan","grade":6,"school":"Ravenclaw","hobby":"reading"},
    {"name":"Aaron Ray","grade":7,"school":"Gryffindor","hobby":"biking"},
    {"name":"Maria Flores","grade":8,"school":"Hufflepuff","hobby":"biking"},
    {"name":"Beverly Martinez","grade":8,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Paula Armstrong","grade":11,"school":"Ravenclaw","hobby":"biking"},
    {"name":"Annie Moreno","grade":9,"school":"Slytherin","hobby":"sports"},
    {"name":"Phyllis Ray","grade":4,"school":"Gryffindor","hobby":"reading"},
    {"name":"Rachel Smith","grade":3,"school":"Slytherin","hobby":"biking"},
    {"name":"Lois Robertson","grade":3,"school":"Hufflepuff","hobby":"photography"},
    {"name":"Joseph Sanders","grade":4,"school":"Gryffindor","hobby":"photography"},
    {"name":"Daniel Hart","grade":2,"school":"Ravenclaw","hobby":"photography"},
    {"name":"Cheryl Warren","grade":7,"school":"Ravenclaw","hobby":"photography"},
    {"name":"Jane Bishop","grade":12,"school":"Gryffindor","hobby":"biking"},
    {"name":"Sharon Anderson","grade":8,"school":"Slytherin","hobby":"reading"},
    {"name":"Willie Daniels","grade":9,"school":"Slytherin","hobby":"photography"},
    {"name":"Elizabeth Lynch","grade":8,"school":"Ravenclaw","hobby":"music"},
    {"name":"Jeremy Mendoza","grade":8,"school":"Slytherin","hobby":"biking"},
    {"name":"Andrea Wagner","grade":10,"school":"Gryffindor","hobby":"sports"},
    {"name":"Ann Sanchez","grade":1,"school":"Gryffindor","hobby":"music"},
    {"name":"Mark Mccoy","grade":9,"school":"Gryffindor","hobby":"music"},
    {"name":"Norma Gonzales","grade":11,"school":"Gryffindor","hobby":"sports"},
    {"name":"Carolyn Porter","grade":9,"school":"Slytherin","hobby":"photography"},
    {"name":"Jacqueline Ramirez","grade":4,"school":"Slytherin","hobby":"reading"},
    {"name":"Shirley Carroll","grade":10,"school":"Ravenclaw","hobby":"photography"},
    {"name":"John Hawkins","grade":12,"school":"Hufflepuff","hobby":"biking"},
    {"name":"Christopher Knight","grade":10,"school":"Gryffindor","hobby":"photography"},
    {"name":"Larry Schmidt","grade":8,"school":"Hufflepuff","hobby":"photography"},
    {"name":"Rachel Washington","grade":12,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Marie Peterson","grade":4,"school":"Slytherin","hobby":"music"},
    {"name":"Ryan Diaz","grade":1,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Andrew West","grade":2,"school":"Slytherin","hobby":"reading"},
    {"name":"Brenda Hudson","grade":2,"school":"Ravenclaw","hobby":"biking"},
    {"name":"Robert Day","grade":1,"school":"Hufflepuff","hobby":"reading"},
    {"name":"Earl Gutierrez","grade":5,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Joyce Boyd","grade":2,"school":"Gryffindor","hobby":"sports"},
    {"name":"Ann Scott","grade":4,"school":"Hufflepuff","hobby":"photography"},
    {"name":"Randy Gonzalez","grade":2,"school":"Slytherin","hobby":"sports"},
    {"name":"Ronald Cook","grade":4,"school":"Hufflepuff","hobby":"biking"},
    {"name":"Ruth Lewis","grade":1,"school":"Gryffindor","hobby":"sports"},
    {"name":"Annie Torres","grade":10,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Harold Grant","grade":6,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Henry Henry","grade":5,"school":"Hufflepuff","hobby":"reading"},
    {"name":"Diane Knight","grade":2,"school":"Slytherin","hobby":"biking"},
    {"name":"Katherine Roberts","grade":10,"school":"Slytherin","hobby":"photography"},
    {"name":"Peter Nichols","grade":9,"school":"Gryffindor","hobby":"photography"},
    {"name":"Bruce Miller","grade":11,"school":"Slytherin","hobby":"biking"},
    {"name":"Scott Black","grade":1,"school":"Ravenclaw","hobby":"biking"},
    {"name":"Emily Morrison","grade":7,"school":"Hufflepuff","hobby":"reading"},
    {"name":"Catherine Armstrong","grade":11,"school":"Slytherin","hobby":"biking"},
    {"name":"Frances Phillips","grade":6,"school":"Gryffindor","hobby":"photography"},
    {"name":"Mary Nguyen","grade":5,"school":"Slytherin","hobby":"photography"},
    {"name":"Kathleen Riley","grade":9,"school":"Gryffindor","hobby":"sports"},
    {"name":"Christopher Sanchez","grade":11,"school":"Gryffindor","hobby":"reading"},
    {"name":"Dorothy Long","grade":6,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Barbara Jones","grade":7,"school":"Gryffindor","hobby":"music"},
    {"name":"Beverly Hill","grade":1,"school":"Slytherin","hobby":"biking"},
    {"name":"Kimberly Elliott","grade":12,"school":"Gryffindor","hobby":"sports"},
    {"name":"Anne Spencer","grade":3,"school":"Hufflepuff","hobby":"photography"},
    {"name":"Thomas Howell","grade":5,"school":"Hufflepuff","hobby":"photography"},
    {"name":"Mary Rivera","grade":4,"school":"Gryffindor","hobby":"sports"},
    {"name":"Arthur Matthews","grade":4,"school":"Gryffindor","hobby":"reading"},
    {"name":"Samuel Sims","grade":6,"school":"Ravenclaw","hobby":"photography"},
    {"name":"Martha Carr","grade":2,"school":"Gryffindor","hobby":"sports"},
    {"name":"Dennis Stewart","grade":11,"school":"Hufflepuff","hobby":"reading"},
    {"name":"Doris Torres","grade":10,"school":"Gryffindor","hobby":"photography"},
    {"name":"Timothy Simmons","grade":9,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Bruce Hayes","grade":12,"school":"Slytherin","hobby":"biking"},
    {"name":"Daniel Banks","grade":4,"school":"Gryffindor","hobby":"photography"},
    {"name":"Gloria Snyder","grade":12,"school":"Hufflepuff","hobby":"music"},
    {"name":"Keith Smith","grade":11,"school":"Ravenclaw","hobby":"reading"},
    {"name":"Ann Lawrence","grade":10,"school":"Slytherin","hobby":"sports"},
    {"name":"Denise Hawkins","grade":11,"school":"Gryffindor","hobby":"music"},
    {"name":"Julia Fuller","grade":7,"school":"Hufflepuff","hobby":"reading"},
    {"name":"Patrick Johnson","grade":7,"school":"Gryffindor","hobby":"reading"},
    {"name":"Diana Sanders","grade":4,"school":"Hufflepuff","hobby":"music"},
    {"name":"Russell Foster","grade":7,"school":"Gryffindor","hobby":"biking"},
    {"name":"Richard Lawrence","grade":8,"school":"Ravenclaw","hobby":"reading"},
    {"name":"Beverly Reyes","grade":4,"school":"Gryffindor","hobby":"photography"},
    {"name":"Robin Dunn","grade":6,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Tina Gilbert","grade":11,"school":"Ravenclaw","hobby":"photography"},
    {"name":"Robin Myers","grade":8,"school":"Gryffindor","hobby":"sports"},
    {"name":"Angela Jenkins","grade":10,"school":"Gryffindor","hobby":"photography"},
    {"name":"Ryan Larson","grade":4,"school":"Gryffindor","hobby":"music"},
    {"name":"Bobby Shaw","grade":5,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Arthur Ward","grade":4,"school":"Gryffindor","hobby":"music"},
    {"name":"Rachel Carpenter","grade":9,"school":"Hufflepuff","hobby":"sports"},
    {"name":"Louis Cruz","grade":5,"school":"Ravenclaw","hobby":"sports"},
    {"name":"Keith Murray","grade":1,"school":"Ravenclaw","hobby":"music"},
    {"name":"Jean Fernandez","grade":11,"school":"Gryffindor","hobby":"reading"},
    {"name":"Earl Jackson","grade":8,"school":"Slytherin","hobby":"photography"},
    {"name":"Jimmy Fox","grade":9,"school":"Ravenclaw","hobby":"biking"}];

  var grade = Number(grade);
  var school = school.toLowerCase();
  var hobby = hobby.toLowerCase();

  for (var i in penpals) {
    if (Number(penpals[i].grade) <= grade + 2 && Number(penpals[i].grade) >= grade - 2 &&
        penpals[i].school.toLowerCase() == school && penpals[i].hobby.toLowerCase() == hobby) {
      return penpals[i];
    }
  }

  for (var i in penpals) {
    if (Number(penpals[i].grade) <= grade + 2 && Number(penpals[i].grade) >= grade - 2 &&
         penpals[i].school.toLowerCase().toLowerCase() == school) {
      return penpals[i];
    }
  }

  for (var i in penpals) {
    if (penpals[i].school.toLowerCase() == school) {
      return penpals[i];
    }
  }

  for (var i in penpals) {
    if (Number(penpals[i].grade) <= grade + 2 && Number(penpals[i].grade) >= grade - 2) {
      return penpals[i];
    }
  }

  //if nobody matches :P
  return penpals[0];
}



//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);


intents.matches(/^reset/i, [
    //TODO: this code is waay to repetitive! repeats the code below.
    //to fix, will need to understand waterfalls better
  function (session) {
    session.userData.profile = {};
    session.beginDialog('/ensureProfile', session.userData.profile);
  },
  function (session, results) {
    session.userData.profile = results.response;
    session.selectedPenpals = penpalSelector(
        session.userData.profile.grade,
        session.userData.profile.school,
        session.userData.profile.hobby
    );
    session.send('Hello %(name)s, you are in grade %(grade)s at %(school)s and like %(hobby)s.',
        session.userData.profile);
    session.send('Based on your profile, we found the following penpals:');
    session.send('%(name)s, grade %(grade)s, at %(school)s likes %(hobby)s', session.selectedPenpals);
    session.send('Ok, successfully changed your profile and recommended new penpals.');
  }
]);


intents.onDefault([
  function (session) {
    //bring the global var to local to prevent issues from using global vars

    session.beginDialog('/ensureProfile', session.userData.profile);
  },
  function (session, results) {
    session.userData.profile = results.response;
    session.selectedPenpals = penpalSelector(
        session.userData.profile.grade,
        session.userData.profile.school,
        session.userData.profile.hobby
    );
    session.send('Hello %(name)s, you are in grade %(grade)s at %(school)s and like %(hobby)s.',
        session.userData.profile);
    session.send('Based on your profile, we found the following penpals:');
    session.send('%(name)s, grade %(grade)s, at %(school)s likes %(hobby)s', session.selectedPenpals);
  }
]);



bot.dialog('/ensureProfile', [
  function (session, args, next) {
    session.dialogData.profile = args || {};
    if (!session.dialogData.profile.name) {
      builder.Prompts.text(session, "What's your name?");
    } else {
      next();
    }
  },
  function (session, results, next) {
    if (results.response) {
      session.dialogData.profile.name = results.response;
    }
    if (!session.dialogData.profile.grade) {
      builder.Prompts.text(session, "What is your grade?");
    } else {
      next();
    }
  },
  function (session, results, next) {
    if (results.response) {
      session.dialogData.profile.grade = results.response;
    }
    if (!session.dialogData.profile.school) {
      builder.Prompts.text(session, "What is your school?");
    } else {
      next();
    }
  },
  function (session, results, next) {
    if (results.response) {
      session.dialogData.profile.school = results.response;
    }
    if (!session.dialogData.profile.hobby) {
      builder.Prompts.text(session, "What is your hobby?");
    } else {
      next();
    }
  },
  function (session, results) {
    if (results.response) {
      session.dialogData.profile.hobby = results.response;
    }
    session.endDialogWithResult({ response: session.dialogData.profile });
  }
]);

