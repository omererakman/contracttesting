import React from 'react';

class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  handleEdit(id) {
    this.props.handleEdit(id);
  }

  ItemRows() {
    const items = this.props.items;
    const ItemRows = items === undefined ? () => <tr></tr>: items.map((item) => 
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td><button onClick={() => this.handleDelete(item.id)}>Delete</button></td>
      </tr>  
    );

    return ItemRows;
  }

  render() {

   
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.ItemRows()}
        </tbody>
      </table>
    );
  }
}

export default ItemList;