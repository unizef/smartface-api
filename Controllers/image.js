

// API KEY
// https://www.clarifai.com/models/face-detection
const app = new Clarifai.App({
    apiKey: 'b9a7995bd4704699836c021b822bd2cf'
});

const handleApiCall = (req, res) => {
app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
    .catch(err => res.status(400).json('Unable to work with Clarifai API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}