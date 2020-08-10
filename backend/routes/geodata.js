const express = require('express')

const restaurants = require('../schema/geodataSchema')

const router = express.Router()

router.post('/geodata', async (req, res) => {
    try {

        if (!req.body) {
            res.status(400).send({message:'missing parameters'})
            return
        }
        if (!req.body.radius || !req.body.center) {
            res.status(400).send({message:'missing parameters'})
            return
        }
        else {
            console.log(req.body)
            const radius = req.body.radius
            const center = req.body.center
            const radian = radius / 6371.0
            var query = {
                "address.coord": {
                    $geoWithin: {
                        $centerSphere: [center, radian]
                    }
                }
            }
            const data = await restaurants.find(query)
            const newData = []
            data.forEach(node => {
                var avgGrade = 0.0;
                var counter = 0;
                var qual = false;
                node.grades.forEach(g => {
                    counter++;
                    if (g.grade == 'A') {
                        qual = true
                    }
                    avgGrade = avgGrade + g.score
                })
                avgGrade = avgGrade / counter
                if (avgGrade > 15 && qual == true) {
                    newData.push(node)
                }
    
            })
            if (newData.length == 0) {
                res.sendStatus(204);
            } else {
                res.status(200).json(newData);
            }
        }
    } catch (err) {
        res.status(500).send({message: 'Server error'});
    }
});

router.get('/data', async (req, res) => {
    res.send(await restaurants.find())
})

module.exports = router
