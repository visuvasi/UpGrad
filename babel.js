var data = [
        
        ];
      
var PhoneBookApp = React.createClass({
  loadDataFromVar: function(){
      this.setState({data: data});
  },
  handleContactSubmit: function(contact){
      this.props.data.push(contact);
      console.log(this.props.data);
  },
  getInitialState: function(){
      return{data: []};
  },
  componentDidMount: function(){
      this.loadDataFromVar();
      setInterval(this.loadDataFromVar, this.props.pollInterval);
  },
  render: function(){
      return (
          <div className="phoneBookApp">
              <h1>My PhoneBook</h1>
            <AddContactForm onContactSubmit={this.handleContactSubmit} />
              <PhoneBookList data={this.props.data} />
          </div>
      )
  }
});

var PhoneBookList = React.createClass({
  render: function(){
      var contactNodes = this.props.data.map(function(contact) {
          return(
              <Contact name={contact.name} number={contact.number} />
          )
      });
      return (
          <div className="phoneBookList">
              {contactNodes}
          </div>
      )

  }
});

var AddContactForm = React.createClass({
  handleSubmit: function(e){
      e.preventDefault();
      var name = React.findDOMNode(this.refs.name).value.trim();
      var number = React.findDOMNode(this.refs.number).value.trim();

      if(!name || !number){
          return;
      }
      this.props.onContactSubmit({name: name, number: number});

      React.findDOMNode(this.refs.name).value = '';
      React.findDOMNode(this.refs.number).value = '';
      return;
  },
  render: function(){
      return (
          <form className="addContactForm" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Name" ref="name" />
              <input type="text" placeholder="Number" ref="number" />
              <button type="submit">Add Contact</button>
          </form>
      );
  }
});

var Contact = React.createClass({
  render: function(){
      return(
          <div className="contact">
              <h2 className="contactName">{this.props.name}</h2>
              <p>{this.props.number}</p>
          </div>
      )
  }
});

React.render(
  <PhoneBookApp data={data} pollInterval={200} />,
  document.getElementById('content')
  );
