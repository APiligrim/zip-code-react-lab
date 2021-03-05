import React, { Component } from "react";
import "./App.css";
function City({ data }) {
  return (
    <div className="card mb-4">
      <div className="card-header">{data.City}</div>
      <div className="card-body">
        <ul>
          <li>State: {data.State} </li>
          <li>
            Location: {data.Lat} , {data.Long}
          </li>
          <li>Population(estimated): {data.EstimatedPopulation} </li>
          <li>Total Wages: {data.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}
function ZipSearchField({ zipCode, onChange }) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Zip Code:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={zipCode}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: "",
    };
  }

  zipChanged(event) {
    let zip = event.target.value;
    console.log(zip);

    if (zip.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          this.setState({
            cities: body,
          });
        })
        .catch((err) => {
          console.log(err);
          //return an empty array if input is invalid
          this.setState({
            cities: [],
          });
        });
    } else {
      this.setState({
        cities: [],
      });
    }

    this.setState({
      zipCode: event.target.value,
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <ZipSearchField
                zipCode={this.state.zipCode}
                onChange={(e) => this.zipChanged(e)}
              />
            </div>
          </div>
          {this.state.cities.length === 0 ? (
            <h1>No Result </h1>
          ) : (
            this.state.cities.map((c, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col">
                    <City data={c} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
export default App;
