import React, { Component } from 'react';
import './VanityNumberView.css';

class VanityNumberView extends Component {
  constructor(props) {
    super(props);
    this.state = {phoneNumberInput: "", isValidPhoneNumberInput: null, vanityNumbers: []};
    this.validatePhoneNumberInput = this.validatePhoneNumberInput.bind(this);
    this.onPhoneNumberInputChange = this.onPhoneNumberInputChange.bind(this);
    this.fetchVanityNumbers = this.fetchVanityNumbers.bind(this);

  }

  onPhoneNumberInputChange(e) {
    let phoneNumber = e.target.value
    this.setState({phoneNumberInput: phoneNumber});

    if(phoneNumber === ""){
      this.setState({isValidPhoneNumberInput: null});
    }
  }

  validatePhoneNumberInput(e) {
    e.preventDefault();
    const API_URL = 'http://127.0.0.1:5000';
    let validate_endpoint = '/validate'
    let query = '?phone_number=' + encodeURIComponent(this.state.phoneNumberInput);
    fetch(API_URL + validate_endpoint + query)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data && data.is_valid === true) {
          this.setState({isValidPhoneNumberInput : true});
          this.fetchVanityNumbers(API_URL, '/vanitynumbers', query);
        } else if(data && data.is_valid === false) {
          this.setState({isValidPhoneNumberInput : false, vanityNumbers: []});
        }
      });
    }

    fetchVanityNumbers(api_url, endpoint, query) {
      fetch(api_url + endpoint + query)
        .then(response => response.json())
        .then(data => {
          console.log(data);
            this.setState({vanityNumbers : data.vanitynumbers});
        });
    }

  render() {
    let inputValidClass = "";

    if(this.state.isValidPhoneNumberInput === true){
      inputValidClass = "is-valid";
    } else if(this.state.isValidPhoneNumberInput === false){
      inputValidClass = "is-invalid";
    }

    return (
      <div className="vanity-number-view" noValidate>
        <header className="vanity-number-view-header">
          <h5 className="vanity-number-title">Toll-free Vanity Number Generator</h5>
          <form autoComplete="off">
            <div className="form-group row">
              <div className="col-md-5">
                <label htmlFor="phoneNumberInput" className="phone-number-input-label">Telephone Number: </label>
              </div>
              <div className="col-md-5 input-group input-group-lg">
                <input type="tel" className={"form-control " + inputValidClass} id="phone-number-input" aria-describedby="inputGroup-sizing-lg"
                  placeholder="+1-xxx-xxx-xxxx" onChange={this.onPhoneNumberInputChange}/>
                  {this.state.isValidPhoneNumberInput === true &&
                    <div className="valid-feedback">
                      Valid Phone Number!
                    </div>
                  }
                  {this.state.isValidPhoneNumberInput === false &&
                    <div className="invalid-feedback">
                      Invalid Phone Number!
                    </div>
                  }
              </div>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={this.validatePhoneNumberInput}>Submit</button>
              </div>
            </div>

          </form>

          <div class="row vanity-number-results">
            {this.state.vanityNumbers.map((item, index) => (
              <div class="col-lg-3 col-md-4 col-sm-6" key={index}>{item}</div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}


export default VanityNumberView;
