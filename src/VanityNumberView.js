import React from 'react';
import './VanityNumberView.css';

function VanityNumberView() {
  return (
    <div className="vanity-number-view">
      <header className="vanity-number-view-header">
        <h5 class="vanity-number-title">Vanity Toll-free Number Generator</h5>
        <form>
          <div class="form-group row">
            <div class="col-md-5">
              <label for="phoneNumberInput" class="phone-number-input-label">Telephone Number: </label>
            </div>
            <div class="col-md-5 input-group input-group-lg">
              <input type="tel" class="form-control" id="phoneNumberInput" aria-describedby="inputGroup-sizing-lg" placeholder="+1-xxx-xxx-xxxx" />
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>

        </form>
      </header>
    </div>
  );
}

export default VanityNumberView;
