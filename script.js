// Auto date
document.getElementById("today").innerText =
  new Date().toLocaleDateString();

// Image preview
function preview(idInput,idImg){
  const i=document.getElementById(idInput);
  const img=document.getElementById(idImg);
  i.onchange=()=>{if(i.files[0])img.src=URL.createObjectURL(i.files[0]);};
}
preview("imgA","previewA");
preview("imgB","previewB");

// Signature setup
function setup(id){
  const c=document.getElementById(id),x=c.getContext("2d");
  c.width=c.offsetWidth; c.height=c.offsetHeight;
  let d=false;
  const pos=e=>{
    const r=c.getBoundingClientRect();
    const t=e.touches?e.touches[0]:e;
    return{x:t.clientX-r.left,y:t.clientY-r.top};
  };
  c.onmousedown=c.ontouchstart=e=>{d=true;const p=pos(e);x.beginPath();x.moveTo(p.x,p.y);};
  c.onmousemove=c.ontouchmove=e=>{if(!d)return;const p=pos(e);x.lineTo(p.x,p.y);x.lineWidth=2;x.lineCap="round";x.stroke();};
  c.onmouseup=c.ontouchend=()=>{d=false;x.closePath();};
}

// Clear signature
function clearCanvas(id){
  const c=document.getElementById(id);
  c.getContext("2d").clearRect(0,0,c.width,c.height);
}

// Initialize
setup("signA");
setup("signB");

// PDF Download
function downloadPDF(){
  html2pdf().set({
    margin:0.4,
    filename:"Friendship_Achievement_Agreement.pdf",
    image:{type:"jpeg",quality:0.98},
    html2canvas:{scale:2},
    jsPDF:{unit:"in",format:"a4",orientation:"portrait"}
  }).from(document.getElementById("agreement")).save();
}
