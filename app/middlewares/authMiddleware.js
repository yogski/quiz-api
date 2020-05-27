const Auth = require('../models/Auth')

exports.validateApiKey = (req, res, next) => {
    //check API key exist
    Auth.validateApiKey(req.query.api_key,(err, data) => {
        if (!req.query.api_key) {
            return res.status(400).send({
                message: "api_key query parameter is required."
            });
        }
        
        if (err) {
            return res.status(500).send({
                message: "Error while validating API key."
            });
        }

        if (data == 0) {
            return res.status(401).send({
                message: "Unauthorized access: invalid API key."
            });
        }
        
    next()
    })
}

exports.checkApiUsage = (req, res, next) => {
    //check API key exist
    Auth.checkApiUsage(req.query.api_key,(err, data) => {
        if (!req.query.api_key) {
            return res.status(400).send({
                message: "api_key query parameter is required."
            });
        }

        if (err.kind === "not_found") {
            return res.status(404).send(
                {message: `API key not found.`}
            )
        }
        
        let limit = data[0].daily_limit
        if (err.kind === "limit_reached") {
            return res.status(400).send({
                message: `Your limit of ${limit} requests/day has been reached. Please contact administrator for inquiries.`
            });
        }

    next()
    })
}

    //check last hit, if last hit is yesterday, reset hit_count
    
    //check daily limit, if daily limit has reached, return 400

    //increment hit count, then next


exports.hasLevelTwo = (req, res, next) => {
    Auth.hasLevelTwo(req.query.api_key,(err, data) => {
        if (err) {
            return res.status(500).send({
                message: "Error while determining access level"
            });
        }

        if (data == 0) {
            return res.status(403).send({
                message: "Forbidden Route: user has no access."
            });
        }

    //increment hit count, then next
    next()
    })
}