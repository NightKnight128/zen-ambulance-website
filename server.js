const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


const WEBHOOK = process.env.WEBHOOK;


// Test pagina
app.get("/", (req, res) => {
    res.send("🚑 Zen Ambulance Backend Online");
});


// Rapportage ontvangen
app.post("/rapportage", async (req, res) => {

    const data = req.body;

    try {

        await axios.post(WEBHOOK, {

            embeds: [
                {
                    title: "🚑 Nieuwe Ambulance Rapportage",
                    color: 16711680,

                    fields: [

{
    name: "👤 Medewerker",
    value: data.medewerker || "Niet ingevuld",
    inline: true
},

{
    name: "📅 Datum",
    value: data.datum || "Niet ingevuld",
    inline: true
},

{
    name: "⏰ Tijd",
    value: data.tijd || "Niet ingevuld",
    inline: true
},

{
    name: "📍 Locatie melding",
    value: data.locatie || "Niet ingevuld"
},

{
    name: "🚨 Type incident",
    value: data.incident || "Niet ingevuld"
},

{
    name: "⚠️ Prioriteit",
    value: data.prioriteit || "Niet ingevuld",
    inline: true
},

{
    name: "👥 Betrokken personen",
    value: data.personen || "Niet ingevuld"
},

{
    name: "🧑‍⚕️ Patiënt",
    value: data.patient || "Niet ingevuld",
    inline: true
},

{
    name: "🩹 Klachten / letsel",
    value: data.klachten || "Niet ingevuld"
},

{
    name: "🩺 ABCDE Beoordeling",
    value: data.ABCDE || "Niet ingevuld"
},

{
    name: "🚑 Uitgevoerde handelingen",
    value: data.behandeling || "Niet ingevuld"
},

{
    name: "💊 Medicatie / materialen",
    value: data.materiaal || "Niet ingevuld"
},

{
    name: "🚑 Transport",
    value: data.transport || "Niet ingevuld",
    inline: true
},

{
    name: "🏥 Bestemming",
    value: data.bestemming || "Niet ingevuld",
    inline: true
},

{
    name: "📝 Bijzonderheden",
    value: data.bijzonderheden || "Geen"
},

{
    name: "💬 Opmerkingen",
    value: data.opmerkingen || "Geen"
},

{
    name: "✍️ Ondertekend door",
    value: data.ondertekening || "Niet ingevuld",
    inline: true
}

],
                    footer: {
                        text: "Zen Roleplay Ambulance"
                    },

                    timestamp: new Date()
                }
            ]

        });


        res.json({
            success: true
        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            success:false
        });

    }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`🚑 Backend draait op poort ${PORT}`);
});
