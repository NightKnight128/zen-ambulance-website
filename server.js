const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


// Middleware

app.use(cors({
    origin: "*"
}));

app.use(express.json());



// Discord webhook
const WEBHOOK = process.env.WEBHOOK;



// Rapportage teller

let rapportageNummer = 1;




// Test

app.get("/", (req, res) => {

    res.send("🚑 Zen Ambulance Backend Online");

});






// Rapportage ontvangen

app.post("/rapportage", async (req, res) => {


    const data = req.body;


    console.log("📋 Nieuwe rapportage:");
    console.log(data);



    // Controle verplichte gegevens

    if(
        !data.medewerker ||
        !data.rang ||
        !data.locatie ||
        !data.incident
    ){

        return res.status(400).json({

            error:"Verplichte gegevens ontbreken"

        });

    }





    let kleur = 16711680;


    if(data.prioriteit === "P2 - Dringende melding"){

        kleur = 16753920;

    }


    if(data.prioriteit === "P3 - Normale melding"){

        kleur = 65280;

    }





    const rapportageID =
    `AMB-${String(rapportageNummer).padStart(4,"0")}`;


    rapportageNummer++;





    try{


        await axios.post(WEBHOOK, {


            embeds:[

                {

                    title:
                    `🚑 Nieuwe Ambulance Rapportage | ${rapportageID}`,


                    color:kleur,



                    fields:[


                        {
                            name:"👤 Medewerker",
                            value:
                            `${data.medewerker}\n🚑 ${data.rang}`,
                            inline:true
                        },


                        {
                            name:"📅 Datum",
                            value:
                            data.datum || "Niet ingevuld",
                            inline:true
                        },


                        {
                            name:"📍 Locatie",
                            value:
                            data.locatie
                        },


                        {
                            name:"⚠️ Prioriteit",
                            value:
                            data.prioriteit
                        },


                        {
                            name:"🚨 Incident",
                            value:
                            data.incident
                        },


                        {
                            name:"🩺 Patiënt",
                            value:
                            data.patient || "Onbekend"
                        },


                        {
                            name:"🚑 Behandeling",
                            value:
                            data.behandeling || "Geen informatie"
                        },


                        {
                            name:"🚑 Transport",
                            value:
                            data.transport
                        },


                        {
                            name:"🏥 Bestemming",
                            value:
                            data.bestemming || "Geen"
                        },


                        {
                            name:"✍️ Ondertekend door",
                            value:
                            data.ondertekening || data.medewerker
                        }


                    ],



                    footer:{

                        text:
                        "Zen Roleplay Ambulance Dienst"

                    },


                    timestamp:
                    new Date()

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

            error:
            "Discord webhook mislukt"

        });



    }



});






const PORT = process.env.PORT || 3000;


app.listen(PORT,"0.0.0.0",()=>{


    console.log(
        `🚑 Zen Ambulance Backend draait op poort ${PORT}`
    );


});
