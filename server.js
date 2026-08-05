const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


app.use(cors({
    origin: "*"
}));

app.use(express.json());


const WEBHOOK = process.env.WEBHOOK;



// Test pagina

app.get("/", (req,res)=>{

    res.send("🚑 Zen Ambulance Backend Online");

});





// Rapportage ontvangen

app.post("/rapportage", async (req,res)=>{


const data = req.body;



console.log("📋 Nieuwe rapportage ontvangen:");
console.log(data);



// Controle verplichte velden

if(
!data.medewerker ||
!data.rang ||
!data.incident ||
!data.locatie
){

return res.status(400).json({

success:false,

message:
"Verplichte velden ontbreken"

});

}





try{


await axios.post(WEBHOOK, {


embeds:[

{

title:"🚑 Nieuwe Ambulance Rapportage",

color:16711680,


fields:[


{
name:"👤 Medewerker",
value:
`${data.medewerker}\n🚑 ${data.rang}`,
inline:true
},



{
name:"📅 Datum",
value:data.datum || "Niet ingevuld",
inline:true
},


{
name:"⏰ Tijd",
value:data.tijd || "Niet ingevuld",
inline:true
},



{
name:"📍 Locatie",
value:data.locatie || "Niet ingevuld"
},



{
name:"🚨 Incident",
value:data.incident || "Niet ingevuld"
},



{
name:"⚠️ Prioriteit",
value:data.prioriteit || "Niet ingevuld",
inline:true
},



{
name:"👥 Betrokken personen",
value:data.personen || "Geen"
},



{
name:"🩺 Patiënt",
value:data.patient || "Onbekend",
inline:true
},



{
name:"🩹 Klachten / letsel",
value:data.klachten || "Geen"
},



{
name:"🩺 ABCDE",
value:data.ABCDE || "Geen informatie"
},



{
name:"🚑 Behandeling",
value:data.behandeling || "Geen"
},



{
name:"💊 Materialen / medicatie",
value:data.materiaal || "Geen"
},



{
name:"🚑 Transport",
value:data.transport || "Niet ingevuld",
inline:true
},



{
name:"🏥 Bestemming",
value:data.bestemming || "Geen"
},



{
name:"📝 Bijzonderheden",
value:data.bijzonderheden || "Geen"
},



{
name:"💬 Opmerkingen",
value:data.opmerkingen || "Geen"
},



{
name:"✍️ Ondertekend door",
value:data.ondertekening || "Niet ingevuld"
}



],



footer:{

text:"Zen Roleplay Ambulance Dienst"

},



timestamp:new Date()


}

]


});




res.json({

success:true,

message:
"Rapportage verzonden"

});



}

catch(error){


console.error(
"Discord webhook fout:",
error.message
);



res.status(500).json({

success:false,

message:
"Discord verzenden mislukt"

});


}



});





const PORT = process.env.PORT || 3000;



app.listen(PORT,"0.0.0.0",()=>{


console.log(
`🚑 Zen Ambulance Backend draait op poort ${PORT}`
);


});
