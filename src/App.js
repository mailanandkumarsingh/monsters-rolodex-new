import { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.components";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((user) =>
        this.setState({
          monsters: user,
          searchText: "",
        })
      );
  }

  handleChange = (e) => {
    this.setState({
      // setState is an asynchronous call and immidiately accessing
      // the this.state will not reflect the values
      // to do so you can use the callback function of
      // setState to see the updated value
      searchText: e.target.value,
    });
  };

  render() {
    // Filter the monsters array based on the searchField
    // Destructuring
    const { monsters, searchText } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchText.toLowerCase());
    });
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          onHandleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
