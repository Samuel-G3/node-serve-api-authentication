const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://root:root@cluster0.mewoh.mongodb.net/galaxies?retryWrites=true&w=majority";
const GalaxySchema = require("../api/models/galaxies.model");

const galaxies = [
  {
    name: "Galaxia desconocida",
    description: "Galaxia desconocida",
    planets: [],
  },
  {
    name: "Galaxia desconocida 2",
    description: "Galaxia desconocida 2",
    planets: [],
  },
];

const galaxieDocuments = galaxies.map((galaxie) => new GalaxySchema(galaxie));

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allGalaxies = await GalaxieSchema.find();
    if (allGalaxies.length) {
      await GalaxieSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting galaxies: ${err}`))
  .then(async () => {
    await GalaxieSchema.insertMany(galaxieDocuments);
    console.log("Galaxies successfully created");
  })
  .catch((err) => console.log(`Error creating galaxies: ${err}`))
  .finally(() => mongoose.disconnect());
