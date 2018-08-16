var Name; //ファイル名

var Radius;
var Hight;
var Nozzle;
var PSpeed;
var EMulti;

var CenterX;
var CenterY;
var FHight;
var Divide;
var Times;

var Extrude;
var LoopX;
var LoopY;

var content;  //内容

if (window.File == false) {   //APIチェック
  window.alert("The File APIs are not fully supported in this browser.");
}

function OF(){
    get();
    write_parameter();
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
  FHight = Number(document.getElementById('FHight').value);
  Divide = Number(document.getElementById('Divide').value);
  Times = Number(document.getElementById('Times').value);

  Extrude = Radius*2*Math.PI/Divide*Emulti;
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

function makeGcode(){
  Gcode_Start();

  for(var i=0; i<Times; i++){
    content += ["G1 X" + Radius + " Y0\n"].join(""); //loop start Gcode
    for(var t=1; t<=Divide; t++){
      LoopX = Radius*Math.cos(2*Math.PI/Divide*t);
      LoopY = Radius*Math.sin(2*Math.PI/Divide*t);
      content += ["G1 X" + LoopX + " Y" + LoopY + " Z" + (Hight/Divide*t+Hight*i) + " E" + Extrude + "\n"].join("");
    }
  }

  Gcode_End();
}

function Gcode_Start(){  //Gcode start
  content += [ "G90\n",  //Set to Absolute Positioning
              "M82\n",  //set extruder to absolute mode
              "M106 S255\n" ,      //Fan On
              "M104 S" + Nozzle +"\n",  //Set Extruder Temperature
              "M109 S" + Nozzle + "\n"].join("");  //Set Extruder Temperature and Wait

              content += [ "G28\n"]; //Move to Origin

  content += [ "G1 X" + CenterX + " Y" + CenterY + " Z" + FHight + " F1000 ;Move to new Origin\n",
              "G92 X0 Y0 Z0 E0\n", //Set Position
              "G1 F" + PSpeed + "\n\n"].join(""); //Set Moving Speed
}

function  Gcode_End(){ //Gcode end
  content += ["\n",
              "G92 E0\n",  //Set Position
              "G1 E-4\n",
              "G1 Z" + 20 + " E0\n", //Move up 20mm end of job
              "M104 S0\n", //Set Extruder Temperature
              "M140 S0\n",  //Bed Temperature
              "M84"].join("");  //Stop idle hold
}

function write_parameter(){
  content = [ ";Radius : " + Radius + "\n",
              ";Hight : " + Hight + "\n",
              ";Print speed : " + PSpeed + "\n",
              ";Extrude multiplier : " + Emulti + "\n",
              "\n",
              ";CenterX : " + CenterX + "\n",
              ";CenterY : " + CenterY + "\n",
              ";First Hight : " + FHight + "\n",
              ";Divivde Number : " + Divide + "\n",
              ";Times : " + Times + "\n",
              "\n",].join("");
}
