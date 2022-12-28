import { useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
    const [searchString, setSearchString] = useState("");
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    console.log("rendered");

    const onSearch = (e) => {
        setSearchString(e.target.value.toLocaleLowerCase());
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((monsters) => setMonsters(monsters));
    }, []);

    useEffect(() => {
        const filteredArray = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchString);
        });
        setFilteredMonsters(filteredArray);
    }, [monsters, searchString]);

    return (
        <div className="App">
            <h1 className="app-title">Monster Rolodex</h1>
            <SearchBox onChangeHandler={onSearch} placeholder="Search Monsters" />
            <CardList monsters={filteredMonsters} />
        </div>
    );
};

// class App extends Component {
//   constructor() {
//     super();
//
//     this.state = {
//       monsters: [],
//       searchString: "",
//     };
//   }
//
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) =>
//         this.setState(() => {
//           return { monsters: data };
//         })
//       );
//   }
//
//   onSearch = (event) => {
//     const searchString = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchString };
//     });
//   };
//
//   render() {
//     const { monsters, searchString } = this.state;
//     const { onSearch } = this;
//
//     const filteredArray = monsters.filter((monster) =>
//       monster.name.toLocaleLowerCase().includes(searchString)
//     );
//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox onChangeHandler={onSearch} placeholder="Search Monsters" />
//         <CardList monsters={filteredArray} />
//       </div>
//     );
//   }
// }

export default App;
