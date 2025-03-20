const express = require("express");
const app = express();

app.get("/api/candles", (req, res) => {
    const pair = req.query.pair || "USDBDT_otc";
    const time = req.query.time || new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const timezone = req.query.timezone || "UTC: +06:00";

    let data = [];

    for (let i = 0; i < 10; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let formattedDate = date.toISOString().split("T")[0];

        let open = (127500 + Math.random() * 100) / 1000;
        let high = open + Math.random() * 0.005;
        let low = open - Math.random() * 0.005;
        let close = low + Math.random() * (high - low);
        let volume = Math.floor(Math.random() * (200 - 50) + 50);

        let direction = close > open ? "call" : "put";

        data.push({
            asset: pair,
            date: formattedDate,
            time: time,
            timezone: timezone,
            open: parseFloat(open.toFixed(3)),
            close: parseFloat(close.toFixed(3)),
            high: parseFloat(high.toFixed(3)),
            low: parseFloat(low.toFixed(3)),
            volume: volume,
            direction: direction
        });
    }

    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
