var Name; //ファイル名

var Radius;
var Hight;
var Nozzle;
var PSpeed;
var EMulti;

var CenterX;
var CenterY;
var Times;

var content;  //内容

if (window.File == false) {   //APIチェック
  window.alert("The File APIs are not fully supported in this browser.");
}

function OF(){
    get();
    writeParameter();
    makeGcode();
    setName();
    Download();
}

function get(){
  Name = document.getElementById('Name').value;

  Radius = Number(document.getElementById('Radius').value);
  Hight = Number(document.getElementById('Hight').value);
  Nozzle = Number(document.getElementById('Nozzle').value);
  PSpeed = Number(document.getElementById('PSpeed').value);
  Emulti = Number(document.getElementById('Emulti').value);

  CenterX = Number(document.getElementById('CenterX').value);
  CenterY = Number(document.getElementById('CenterY').value);
  Times = Number(document.getElementById('Times').value);
}

function setName(){
  var Download = document.getElementById("download");
  Download.setAttribute("download", Name);
}

function Download() {
    var blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "test.txt");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}
