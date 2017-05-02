// Keep list of DOM elements for clearing later when reloading
var listItems = [];
var listItems1 = [];
var listItems2 = [];
var database;

function setup() {

  var config = {
    apiKey: "AIzaSyAmO6whxqecGNUvYSu3rPZKDWnadZA4CQ0",
    authDomain: "endls-2d017.firebaseapp.com",
    databaseURL: "https://endls-2d017.firebaseio.com",
    projectId: "endls-2d017",
    storageBucket: "endls-2d017.appspot.com",
    messagingSenderId: "226281493198"
  };
  firebase.initializeApp(config);
  database = firebase.database();

   // Submit button
  //var download = select('#download');
  //download.mousePressed(writeNewPost);

  // Start loading the data
  loadFirebase();
}

function loadFirebase() {
  var t = new Date();
  var r = "live/" + t.getFullYear().toString() + '0' + (t.getMonth()+1).toString().slice(-2) + '0' + t.getDate().toString().slice(-2);
  var ref = database.ref(r);//'0' + t.getDate().toString().slice(-2));
  ref.on("value", gotData, errData);
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

function gotData(data) {
  var index = data.val();
  var keys = Object.keys(index);


  // Grab all the keys to iterate over the object

  // clear previous HTML list
  clearList();

  // Make an HTML list
  var list = createElement('ol');
  list.parent('data');
  var list1 = createElement('ol');
  list1.parent('data1');
  var list2 = createElement('ol');
  list2.parent('data2');

  // Loop through array
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var endls = index[key];
    if (endls.Location == "A1-000\r\n"){
      var li = createElement('li', 'ID:'+key +' '+'RSSI:'+ endls.RSSI +'   '+ 'HB:💛'+endls.HB +'   '+ 'Time:'+endls.Time);
      li.parent(list);
      listItems.push(li);
    }
    if (endls.Location == "A1-001\r\n"){
      var li1 = createElement('li', 'ID:'+key +'   '+'RSSI:'+ endls.RSSI+'   '+ 'HB:💛'+endls.HB +'   '+ 'Time:'+endls.Time);
      li1.parent(list1);
      listItems1.push(li1);
    }
    if (endls.Location == "A1-002\r\n"){
      var li2 = createElement('li', 'ID:'+key +'   '+'RSSI:'+ endls.RSSI+'   '+ 'HB:💛'+endls.HB +'   '+ 'Time:'+endls.Time);
      li2.parent(list2);
      listItems2.push(li2);
    }
  }
}

// Clear everything
function clearList() {
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].remove();
  }
  for (var i = 0; i < listItems1.length; i++) {
    listItems1[i].remove();
  }
  for (var i = 0; i < listItems2.length; i++) {
    listItems2[i].remove();
  }
}
