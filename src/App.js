import React from 'react';
import axios from 'axios';
import './App.css'
import './javaVersions.js'
import { Stocks } from './javaselect.js'
import SimpleSelect from './select.js'
const API = 'https://cors-anywhere.herokuapp.com/https://registry.hub.docker.com/v1/repositories/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoading: false,
      error: null,
    };
  }
  downloadTxtFile = () => {
      	const name = document.getElementById('dockerImageName');
        const age = document.getElementById('txtName');
		const input = document.getElementById('myInput');
        const data = 'FROM ' + name.value + '\n' + 'CMD ' + age.value + '\n' + 'RUN ' + input.value;
    const element = document.createElement("a");
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "dockerfile";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  async componentDidMount(abc) {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(API + abc + '/tags',{'mode':'no-cors'});

      this.setState({
        records: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }
	updateInputValue(evt){
	    const updateValue=document.getElementById('dockerImageName');
		this.componentDidMount(updateValue.value)
						}
  render () {
     				const { records } = this.state;
     					let optionTemplate = this.state.records.map(v => (
     					<option value={v.name}>{v.name}</option>
     					));

  return (
         		<div>
         		<input className="centerA" type="text" id="dockerImageName" onChange={evt => this.updateInputValue(evt)} placeholder="Enter docker Image" />
         		<div>
         			<input className="centerA" type="text" id="myInput" placeholder="Enter Input directories" />
         		</div>
         		<div>
         			<input className="centerA" type="text" id="txtName" placeholder="Enter your path of entrypoint.sh" />
         		</div>
         		<div>
         			<select className="selectStyle" value={optionTemplate} onChange={this.handleChange}>{optionTemplate}
         		</select>
         		</div>
         		<div>
         		    <SimpleSelect />
         		</div>
         		<div>
         			{
         				records.map(hit =>
         				<li key={hit.objectID}>
         				<a>{hit.name}</a>
         				</li>)
         			}
         		</div>
         		<button className="button" onClick={this.downloadTxtFile}>Download Dockerfile</button>
         		</div>
         );
        }
}

export default App;
