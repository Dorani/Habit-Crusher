'use strict'
var express = require('express');
var habit = express.Router();

// TEST
console.log('hello');

var habitData = []

var dumpMethod = (req, res) => res.send(req.method + " habits! // METHOD NOT IMPLEMENTED")

// habits route (collection)
habit.route('/')
/*habit homepage*/
.get((req, res) => {
    console.log(habitData)
    res.render('pages/habit_all', {
        data: habitData
    })
})
/*create a new habit*/
.post((req, res) => {
    // insert our new habit into the collection
    habitData.push(req.body)

    // redirect to the new item (in a db, you'd return the new id)
    var newID = habitData.length - 1;
    res.redirect('./' + newID)
})
/* show create habit form*/
habit.get('/new', (req, res) =>
    res.render('pages/habit_edit', {
        habitForm: {
            title: 'Write out your bad habit',
            habitURL: '/habits/',
            submitMethod: 'post'
        }
    })
)

// habit.post('/', function(req,res){
//     res.send("habit route")
// })

/*show edit form for one habit*/
habit.get('/:habitID/edit', (req, res) =>
    res.render('pages/habit_edit', {
        habitForm: {
            title: 'Edit your bad habit',
            habitURL: '/habits/' + req.params.habitID + '?_method=PUT',
            submitMethod: 'post'
        }
    })
)
// single habit
habit.route('/:habitID')
    .get((req, res) => {
        var habID = req.params.habitID;
        // if there is not a habit at position :burgerID, throw a non-specific error
        if (!(habID in habitData)) {
            res.sendStatus(404);
            return;
        }
        
        res.render('pages/habit_one', {
            habitID: habID,
            habitURL: '/habits/' + habID,
            habitData: habitData[habID]
        })
    })
/*one habit update*/
.put((req, res) => {
    var habID = req.params.habitID;
    console.log("PUT", req.body)
    // if we don't have a bad habit there, let's 
    if (!(habID in habitData)) {
        res.sendStatus(404);
        return;
    }

    //replace the habit at :habitID position
    habitData[habID] = req.body;

    //redirect to the new habit
    res.redirect('./' + habID)
})
    .delete(dumpMethod)



module.exports = habit;