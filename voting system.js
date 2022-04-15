/* ------------------
    Getting Data
--------------------- */
let votes_table = base.getTable("Votes");
let votes_data = await votes_table.selectRecordsAsync();

/* ------------------
Counting & Deciding
--------------------- */
let focus_on_earch = 0;
let search_another_planet = 0;
for (let vote of votes_data.records) {
  if (vote.getCellValueAsString("Everyone Voted for") == "Focus on earth") {
    focus_on_earch++;
  } else {
    search_another_planet++;
  }
}
let winner_idea = '';
let looser_idea = '';
let winner_votes;
let looser_votes;
let tie = false;
if (focus_on_earch > search_another_planet) {
  winner_idea = "Focus on earth";
  winner_votes = focus_on_earch;
  looser_idea = "Look for another planet";
  looser_votes = search_another_planet
}
if (focus_on_earch < search_another_planet) {
  looser_idea = "Focus on earth";
  looser_votes = focus_on_earch;
  winner_idea = "Look for another planet";
  winner_votes = search_another_planet
}
if (focus_on_earch == search_another_planet) {
  tie = true;
  winner_votes = focus_on_earch;
  looser_votes = search_another_planet
}


/* ------------------
Creating Or Updating
--------------------- */
let results_table = base.getTable("Results");
let results_data = await results_table.selectRecordsAsync();

if (results_data.records.length == 0) {
  if (tie) {
    results_table.createRecordAsync({
      "Winner Idea": "No Win No Loss",
      "Loosing Idea": "No Win No Loss",
      "Winner Votes": winner_votes,
      "Looser Votes": looser_votes,
      "Tie": true
    })
  } else {
    results_table.createRecordAsync({
      "Winner Idea": winner_idea,
      "Loosing Idea": looser_idea,
      "Winner Votes": winner_votes,
      "Looser Votes": looser_votes,
      "Tie": false
    })
  }
} else {
  if (tie) {
    results_table.updateRecordAsync(results_data.records[0].id, {
      "Winner Idea": "No Win No Loss",
      "Loosing Idea": "No Win No Loss",
      "Winner Votes": winner_votes,
      "Looser Votes": looser_votes,
      "Tie": true
    })
  } else {
    results_table.updateRecordAsync(results_data.records[0].id, {
      "Winner Idea": winner_idea,
      "Loosing Idea": looser_idea,
      "Winner Votes": winner_votes,
      "Looser Votes": looser_votes,
      "Tie": false
    })
  }
}