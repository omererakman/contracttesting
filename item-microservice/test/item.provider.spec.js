const { Verifier } = require("@pact-foundation/pact")
const chai = require("chai")
//const chaiAsPromised = require("chai-as-promised")
//chai.use(chaiAsPromised)
//const { server, importData, animalRepository } = require("../provider.js")
const path = require("path")
const app = require("../bin/www")
const Item = require("../models/Item")

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;



let mongoServer;

// Verify that the provider meets all consumer expectations
describe("Pact Verification", () => {

  beforeEach(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {});

    var item = new Item(
      { 
        _id: "5ff1b4b389082b5b9912ae1f",
        name: "name",
        description: "description"
      });
    await item.save(function (err) {
      console.log("Test item save result: " + JSON.stringify(item));
    });
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("validates Item Service", () => {
    let opts = {
      provider: "Item Service",
      logLevel: "DEBUG",
      providerBaseUrl: "http://localhost:3005",
      pactUrls: [path.resolve(process.cwd(), '../frontend/pact/pacts/itemweb-itemapi.json')],

      providerVersion: "1.0.0",
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact Verification Complete!")
      console.log(output)
    })
  })
})