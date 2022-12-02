const mongoose = require('./connection')
const Exhibit = require('./exhibit')

const db = mongoose.connection

db.on('open', () => {
    const startExhibits = [
        { name: "Garden of Earthly Delights", date: "1510", info: "The Garden of Earthly Delights is the modern title given to a triptych oil painting on oak panel painted by the Early Netherlandish master Hieronymus Bosch, between 1490 and 1510, when Bosch was between 40 and 60 years old. It has been housed in the Museo del Prado in Madrid, Spain since 1939", picture: "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FfjrGRpX29vMJUlmoTJtkfw%252Fgarden%2Bof%2Bearthly%2Bdelights%2Bemail%2Bthumb.jpg&width=1200&height=630&quality=80", artist: "Hieronymous Bosch", museum: "Museo Del Prado, Madrid, Spain" },
        { name: "Lady with an Ermine", date: "1489-91", info: "The Lady with an Ermine is a portrait painting widely attributed to the Italian Renaissance artist Leonardo da Vinci. Dated to c. 1489/1491, the work is painted in oils on a panel of walnut wood. ",  picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/1200px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg" , artist: "Leonardo Da Vinci", museum: " Princes Czartoryski Museum" },
        { name: "Pietà", date: "1498-1499", info: " The Pietà is a subject in Christian art depicting the Virgin Mary cradling the dead body of Jesus after his body was removed from the cross. It is most often found in sculpture. The Pietà is a specific form of the Lamentation of Christ in which Jesus is mourned by the Virgin Mary alone.",  picture: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Michelangelo%27s_Pieta_5450_cut_out_black.jpg" , artist: "Michaelangelo", museum: "St. Peter's Basilica" },
        { name: "A lavar", date: "1941", info: " Created during an era of social and economic reppression, A Lavar depicts the crude reality of life experienced by youth, suffering from both poverty and the abscense of a traditional familial structure. ",  picture: "https://static.wixstatic.com/media/a486a7_7df78fe062434b2a9fc9367f5f5728a2~mv2.jpg/v1/fill/w_700,h_810,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a486a7_7df78fe062434b2a9fc9367f5f5728a2~mv2.jpg" , artist: "Julia Díaz", museum: "Museo Marte, El Salvador" },
        { name: "El Grito", date: "1982", info: "En plena guerra civil, no es raro encontrarnos con una pintura como “El grito”, en la cual se representa una figura que parece estar envuelta y atrapada en la oscuridad, que grita triste y solitario desde las tinieblas, como si solo a través del grito pudiera acercarse a la luz. Y en la obra, ese silencioso grito se vuelve eterno y lo mantiene iluminado.",  picture: " https://static.wixstatic.com/media/a486a7_0de942ffd156416eae37eaba7aba62bb~mv2.jpg/v1/fill/w_700,h_1006,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a486a7_0de942ffd156416eae37eaba7aba62bb~mv2.jpg" , artist: "Julia Díaz", museum: "Museo Marte, El Salvador" },
        { name: "Bronze Statue Of Eros Sleeping", date: "3rd/2nd century B.C.", info: "“Bronze Statue of Eros Sleeping” is from the Hellenistic period. This is the period from the death of Alexander the Great (323 B.C.) and the beginning of the Roman Empire ( 31 B.C.).Eros, the god of love is depicted here without his cruel arrow, instead he is laying, resting upon what seems to be a boulder.",  picture: " https://thetourguy.com/wp-content/uploads/2021/05/Bronze-Statue-of-Eros-Sleeping.jpeg" , artist: "Unknown", museum: "The MET" },

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