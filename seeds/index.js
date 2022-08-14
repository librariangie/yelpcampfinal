const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d02229b9f335d06445007c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djna62s9f/image/upload/v1658518905/YelpCamp/sxlwr5e4apesk8egitsp.jpg',
                    filename: 'YelpCamp/sxlwr5e4apesk8egitsp'
                },
                {
                    url: 'https://res.cloudinary.com/djna62s9f/image/upload/v1658518906/YelpCamp/mdbvmzzsmstgrwterolj.jpg',
                    filename: 'YelpCamp/mdbvmzzsmstgrwterolj'
                },
                {
                    url: 'https://res.cloudinary.com/djna62s9f/image/upload/v1658518906/YelpCamp/unjhvwj5smlexoobhwlv.jpg',
                    filename: 'YelpCamp/unjhvwj5smlexoobhwlv'
                },
                {
                    url: 'https://res.cloudinary.com/djna62s9f/image/upload/v1658518907/YelpCamp/pgtnwlzoflapctidnpmo.jpg',
                    filename: 'YelpCamp/pgtnwlzoflapctidnpmo'
                },
                {
                    url: 'https://res.cloudinary.com/djna62s9f/image/upload/v1658518907/YelpCamp/aeouv9xp3eojwkzbdd9e.jpg',
                    filename: 'YelpCamp/aeouv9xp3eojwkzbdd9e'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})