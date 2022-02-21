// I'd use an asynchronous function to fetch API and then manipulate the data
// if the response API is provided in the prompt
// async function dataManipulation(){
//   try {
//     const response = await fetch();
//  
//     // continute to manipulate data
//   } catch(error){
//       alert(error);
// }}

const response = [
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];


// Initate variables to store data
const data = [];
const dates = {};


// Extract tracks from each user in response
const tracks = response.map(item => item.tracks);

// Get the songs from unique dates by each user
const getDates = tracks.map(arr => arr.map(function(item){

  let time = item.timestp
  let song = item.trackName 

  // Append the song name in the list of songs on the corresponding date key 
  if (dates.hasOwnProperty(time)) {
    dates[time].push(song)
  }
  // Add new key (date) value (songs) pair if the date is not in our list of existing dates
  else {
    dates[time] = [song]
  }
}));


// Update the data
function updateData(object) {
  
  // Obtain songs from each date 
  for (const property in object) {

    // Variables for simple reference 
    const objProp = object[property]
    const length = objProp.length
    // console.log(objProp)
    
    // Variable to store the occurences of unique songs for each date
    let counter = {}

    // Count the occurrences of unique song on the particular date
    for (let i = 0; i < length; i++) {
      counter[objProp[i]] = (counter[objProp[i]] || 0 ) + 1
    }
    // console.log(counter)

    // Helper function to add tooltip (song and count) 
    function getTooltip(counter) {
      return Object.keys(counter).map(x => 
        "" + x + " " + "(" + counter[x] + ")" ).join(",")
    }

    // Append to data
    data.push({
      x: property, 
      y: length,
      tooltip: getTooltip(counter), 
    })
  }

  // Sort the data by date from oldest to newest 
  data.sort(function(obj1, obj2) {
    return obj1.x < obj2.x ? -1 : (obj1.x > obj2.x ? 1 : 0);
  })
  return data
};

updateData(dates);

// console.log(dates);
// console.log(data);
