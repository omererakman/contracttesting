const { pactWith } = require("jest-pact")
const { Matchers, Pact } = require("@pact-foundation/pact")
const { itemApi, createItem, getItems, deleteItem } = require("../client/itemClient")

const itemCreateSuccessInteraction = {
  state: "Create Item Success",
  uponReceiving: "Create item success",
  willRespondWith: {
    status: 201,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: {
      id: Matchers.string("6003ec5889f5f80627e7f490")
    }
  },
  withRequest: {
    method: "POST",
    path: "/api/item",
    headers: {
      Accept: "application/json, text/plain, */*"
    },
    body: {
      name: Matchers.string("name"),
      description: Matchers.string("description")
    }
  }
};


const itemDeleteSuccessInteraction = {
  state: "Delete Item Success",
  uponReceiving: "Delete item success",
  willRespondWith: {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  },
  withRequest: {
    method: "DELETE",
    path: "/api/item/5ff1b4b389082b5b9912ae1f",
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  }
};

const getAllItemsSuccessInteraction = {
  state: "Get All Items Success",
  uponReceiving: "Get All Items Success",
  willRespondWith: {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: Matchers.eachLike({
      id: Matchers.string("5ff1b4b389082b5b9912ae1f"),
      name: Matchers.somethingLike("name"),
      description: Matchers.somethingLike("description")
    })
  },
  withRequest: {
    method: "GET",
    path: "/api/item",
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  }
};

pactWith({ consumer: 'ItemWeb', provider: 'ItemApi' }, provider => {

    describe('Create Item Success', () => {
      
      /**
       * Do not forget to use async await otherwise the test may start before adding interaction is not finished
       */
      beforeEach(() => provider.addInteraction(itemCreateSuccessInteraction));

      it('Test create item success', () => {
        itemApi.url = provider.mockService.baseUrl;
        createItem({name: "name2", description: "description1"})
          .then((value) => {
            expect(value.status).toEqual(201);
        })
      });
    });

    describe('Get All Items Success', () => {
      beforeEach(() => provider.addInteraction(getAllItemsSuccessInteraction));
  
      it('Get All Items Success', () => {
        itemApi.url = provider.mockService.baseUrl;
        getItems()
          .then((value) => {
            expect(value.status).toEqual(200);
        })
      });
    });


    describe('Delete Item Success', () => {
      beforeEach(() => provider.addInteraction(itemDeleteSuccessInteraction));
  
      it('Delete Item Success', () => {
        itemApi.url = provider.mockService.baseUrl;
        deleteItem('5ff1b4b389082b5b9912ae1f')
          .then((value) => {
            expect(value.status).toEqual(200);
        })
      });
    });
});