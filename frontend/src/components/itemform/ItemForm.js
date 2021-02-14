import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value    
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createItem(this.state.name, this.state.description)
      .then(res => {
        this.setState({name: '', description: ''});
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  name="name" type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                <input
                  name="description" type="text"
                  value={this.state.description}
                  onChange={this.handleInputChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">
            Create Item
        </button>
      </form>
    );
  }
}

export default ItemForm;