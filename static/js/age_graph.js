// Get data from json 
d3.json("api/castaways.json", function(data) {
    console.log(data);
   
    // Group data by winners by age group
    var castaway_agegroup_winners = d3.nest()
      .key(function (data) {
        if (data.result === "Sole Survivor") {
          return data.age_group
        }
      })
      .entries(data.castaways)
      console.log(castaway_agegroup_winners);
    
      // group data by 1st voted out by age group
    var castaway_agegroup_losers = d3.nest()
      .key(function (data) {
        if (data.result === "1st voted out") {
          return data.age_group
        } 
      })
      .entries(data.castaways)
      console.log(castaway_agegroup_losers);

    // group data by winners by personality
    var castaway_personality_winners = d3.nest()
      .key(function (data) {
        if (data.result === "Sole Survivor") {
        return data.personality_name
        } 
      })
      .entries(data.castaways)
      console.log(castaway_personality_winners);
    
    // group data by 1st voted out by personality
      var castaway_personality_losers = d3.nest()
      .key(function (data) {
        if (data.result === "1st voted out") {
        return data.personality_name
        } 
      })
      .entries(data.castaways)
      console.log(castaway_personality_losers);
    
    // Group all contestants by age group
    var castaway_agegroup = d3.nest()
      .key(function (data) {
        return data.age_group
      })
      .entries(data.castaways)
      console.log(castaway_agegroup);

    // Group all contestants by personality type
    var castaway_personality = d3.nest()
      .key(function (data) {
        return data.personality_name
      })
      .entries(data.castaways)
      console.log(castaway_personality);

    // Make variables for graphing
    var agegroup_x = [];
    var agegroup_y = [];
    
    var personality_x = [];
    var personality_y = [];

    var winner_agegroup_x = [];
    var winner_agegroup_y = [];
    
    var winner_personality_x = [];
    var winner_personality_y = [];
    
    var loser_agegroup_x = [];
    var loser_agegroup_y = [];
    
    var loser_personality_x = [];
    var loser_personality_y = [];
// Variables for all contestants' age groups
    for (var i = 0; i < castaway_agegroup.length; i++) {
      agegroup_x.push(castaway_agegroup[i].key)
      agegroup_y.push(castaway_agegroup[i].values.length)
    }
//variables for all contestants' personality types
    for (var i = 0; i < castaway_personality.length; i++) {
      personality_x.push(castaway_personality[i].key)
      personality_y.push(castaway_personality[i].values.length)
    }     
// Variables for winner age group
    for (var i = 0; i < castaway_agegroup_winners.length; i++) {
      if (castaway_agegroup_winners[i].key != "undefined") {
        winner_agegroup_x.push(castaway_agegroup_winners[i].key) 
        winner_agegroup_y.push(castaway_agegroup_winners[i].values.length)
      }
    }
// Variables for winner personality types
  for (var i = 0; i < castaway_personality_winners.length; i++) {
    if (castaway_personality_winners[i].key != "undefined") {
      winner_personality_x.push(castaway_personality_winners[i].key)
      winner_personality_y.push(castaway_personality_winners[i].values.length)
    }
  }  
// Variables for loser age group
  for (var i = 0; i < castaway_agegroup_losers.length; i++) {
    if (castaway_agegroup_losers[i].key != "undefined") {
      loser_agegroup_x.push(castaway_agegroup_losers[i].key)
      loser_agegroup_y.push(castaway_agegroup_losers[i].values.length)
    }
  }
  // Variables for loser personality types
  for (var i = 0; i < castaway_personality_losers.length; i++) {
    if (castaway_personality_losers[i].key != "undefined") {
      loser_personality_x.push(castaway_personality_losers[i].key)
      loser_personality_y.push(castaway_personality_losers[i].values.length)
    }
  }
    
    console.log(agegroup_x);
    console.log(agegroup_y);
    console.log(personality_x);
    console.log(personality_y);
    console.log(winner_agegroup_x);
    console.log(winner_agegroup_y);
    console.log(winner_personality_x);
    console.log(winner_personality_y);
    console.log(loser_agegroup_x);
    console.log(loser_agegroup_y);
    console.log(loser_personality_x);
    console.log(loser_personality_y);
    
    var data = [
      {
        x: agegroup_x,
        y: agegroup_y,
        type: 'bar',
        name: 'Age Groups'
      },
      {
        x: personality_x,
        y: personality_y,
        type: 'bar',
        name: 'Personality Types'
      }
    ];

    var high_annotations = [
      {
        x: agegroup_x,
        y: agegroup_y,
        // yref: 'y', xref: 'x',
      }
  ]
  
  var low_annotations = [{
      x: personality_x,
      y: personality_y,
        // yref: 'y', xref: 'x',
        // ay: 40, ax: 0
      }
   ]

    var button_layer_2_height = 1.2

    var updatemenus=[
      {
          buttons: [
              {
                  args: [{'visible': [true, true, false, false]},
                         {'title': 'Yahoo High',
                          'annotations': high_annotations}],
                  label: 'High',
                  method: 'update'
              },
              {
                  args: [{'visible': [false, false, true, true,]},
                         {'title': 'Yahoo Low',
                          'annotations': low_annotations}],
                  label: 'Low',
                  method: 'update'
              },
              {
                  args: [{'visible': [true, false, true, false,]},
                         {'title': 'Yahoo',
                          'annotations': []}],
                  label: 'Reset',
                  method: 'update'
              },
  
          ],
          direction: 'left',
          pad: {'r': 10, 't': 10},
          showactive: true,
          type: 'buttons',
          x: 0.1,
          xanchor: 'left',
          y: button_layer_2_height,
          yanchor: 'top'
      },
  
  ]

  var layout = {
    titel: 'Age and Personality Type Distribution',
    updatemenus: updatemenus,
  }

    
    Plotly.newPlot('myDiv', data, layout);

   
});