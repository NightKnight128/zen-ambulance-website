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
                            value: data.medewerker || "Niet ingevuld"
                        },

                        {
                            name: "📅 Datum",
                            value: data.datum || "Niet ingevuld"
                        },

                        {
                            name: "⏰ Tijd",
                            value: data.tijd || "Niet ingevuld"
                        },

                        {
                            name: "📍 Locatie",
                            value: data.locatie || "Niet ingevuld"
                        },

                        {
                            name: "🚨 Incident",
                            value: data.incident || "Niet ingevuld"
                        },

                        {
                            name: "⚠️ Prioriteit",
                            value: data.prioriteit || "Niet ingevuld"
                        },

                        {
                            name: "🩺 Patiënt",
                            value: data.patient || "Niet ingevuld"
                        },

                        {
                            name: "💉 Behandeling",
                            value: data.behandeling || "Niet ingevuld"
                        },

                        {
                            name: "📝 Opmerkingen",
                            value: data.opmerkingen || "Geen"
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
