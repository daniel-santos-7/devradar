const axios = require('axios').default;
const Dev = require('../models/Dev');
const {findConnections} = require('../websocket');

module.exports = {

    async index(req,res) {

        const devs = await Dev.find();

        return res.json(devs);

    },

    async store(req,res) {

        const {github_username, latitude, longitude } = req.body;

        const dev = await Dev.findOne({github_username});

        if(dev) {
            return res.json(dev);
        }

        const location = { type:'Point', coordinates:[longitude, latitude] };

        const techs = req.body.techs.split(',').map(tech=> tech.trim());

        const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = githubResponse.data;

        const newDev = await Dev.create({name, avatar_url, bio, github_username, techs, location});

        const sendSocketMessageTo = findConnections({ latitude, longitude },techs);

        sendMessage(sendSocketMessageTo, 'new-dev', newDev);

        return res.json(newDev);

    }

}