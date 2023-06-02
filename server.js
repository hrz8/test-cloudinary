const express = require('express');
const upload = require("express-fileupload");
const Cloudinary = require('cloudinary').v2;

const app = express();

Cloudinary.config({
    cloud_name: "dpnlopuki",
    api_key: "413336792591126",
    api_secret: "EDMduukUNQVBbMFKXuqoKU2enns"
});

app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', async function(req, res) {
    if (!req.files || !req.files?.image) {
        res.status(400);
        res.json({
            ok: false,
        });

        return;
    }

    const _base64 = Buffer.from(req.files.image.data, 'base64').toString('base64');
    const base64 = `data:image/jpeg;base64,${_base64}`;

    const cloudinaryResponse = await Cloudinary.uploader.upload(base64, { public_id: new Date().getTime() });

    res.json({
        ok: true,
        url: cloudinaryResponse.secure_url,
    });
});

app.listen(3008);
