const url = require("url");

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    if (parsedUrl.pathname === "/sakib/candles") {
        const pair = query.pair || "USDBDT_otc";
        const time = query.time || new Date().toISOString().slice(11, 16);
        const timezone = query.timezone || "UTC: +06:00";

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

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data, null, 2));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
};
