import ItemForm from "../itemform/ItemForm"
import ItemList from "../itemlist/ItemList"
import React from 'react';
import { createItemRequest, deleteItem } from "../../client/itemClient";

class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.createItem = this.createItem.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchItems();
    }
    
    fetchItems() {
        fetch('http://localhost:3005/api/item/')
        .then(res => res.json())
        .then((data) => {
          this.setState({ items: data })
        })
        .catch(console.log)
    }

    createItem(name, description) {
        return createItemRequest({name: name, description: description})
        .then(res => {
            this.fetchItems();
        });
    }

    handleDelete(id) {
        return deleteItem(id)
        .then(res => {
            this.fetchItems();
        });
    }

    render() {
        const items = this.state.items;
        return (
            <div>
                <ItemForm createItem={this.createItem}></ItemForm>
                <br /><br />
                <ItemList items={items} handleDelete={this.handleDelete}></ItemList>
            </div>
        );
    }
}

export default ItemPage;