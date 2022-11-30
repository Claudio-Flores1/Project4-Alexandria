const mongoose = require('./connection')
const Exhibit = require('./exhibit')

const db = mongoose.connection

db.on('open', () => {
    const startExhibits = [
        { name: "Garden of Earthly Delights", date: "1510", picture: "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FfjrGRpX29vMJUlmoTJtkfw%252Fgarden%2Bof%2Bearthly%2Bdelights%2Bemail%2Bthumb.jpg&width=1200&height=630&quality=80",artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},
        { name: "Hieronymous Bosch", date: "1510", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain"},

    ]

    Exhibit.deleteMany({})
        .then(deletedExhibits => {
            console.log('exhibit go bye bye', deletedExhibits)

            Exhibit.create(startExhibits)
                .then(data => {
                    console.log('here are the newly created pieces', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})