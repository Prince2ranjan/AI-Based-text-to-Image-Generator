const token = "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";
const prompt = document.getElementById("input");
const reset = document.getElementById("resetbtn");
const image = document.getElementById("image");
const genbtn = document.getElementById("btn");
const downloadbtn = document.getElementById("downlaod");
const dtag = document.getElementById("dtag");
const svg = document.getElementById("svg");
const loading = document.getElementById("loading");


reset.addEventListener("click",()=>{
    svg.style.display="block";
    loading.style.display="none";
    image.style.display="none";
    prompt.value ="";
})


function speak(text){
    let compspeak = new SpeechSynthesisUtterance(text);
    compspeak.volume =1;
    compspeak.pitch =1;
    compspeak.rate =1;
    compspeak.lang ="en-GB";
    window.speechSynthesis.speak(compspeak);
}

 //window.addEventListener("load",speak("hello there, i will generate images for you, based on the prompt you give me"));


async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${token}`
				// "Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({"inputs": prompt.value}),
		}
	);
	const result = await response.blob();
    image.style.display="block";
    loading.style.display="none";
    
	return result;
}

async function generate(){

query().then((response) => {
  const objurl = URL.createObjectURL(response);
  image.src = objurl;
  dtag.href = objurl;
});

}

genbtn.addEventListener("click",()=>{
    svg.style.display="none";
    loading.style.display="block";
    image.style.display="none";
    generate();
})

prompt.addEventListener("keydown",(e)=>{
   if(e.key=="Enter"){
    generate();
    svg.style.display="none";
    loading.style.display="block";
    image.style.display="none";
   
   }
});

downloadbtn.addEventListener("click",()=>{
    dtag.click();
});


//to greet

