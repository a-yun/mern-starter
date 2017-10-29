import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from './Button';

class EditConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: this.props.offer ? this.props.offer.companyName : "",
            salaryFormat: this.props.offer ? this.props.offer.salaryFormat : "hourly",
            salary: this.props.offer ? this.props.offer.salary : "",
            duration: this.props.offer ? this.props.offer.duration : "",
            location: this.props.offer ? this.props.offer.location : "Austin",
            corporateHousing: this.props.offer ? this.props.offer.corporateHousing : true,
            housingStipend: this.props.offer ? this.props.offer.housingStipend : "",
            meals: this.props.offer ? this.props.offer.meals : "",
        };
    }

    /* update parameters */
    

    render() {
        return (
            <div className="editconsole">
                <div className="title">
                    {this.props.offer ? "Edit Offer" : "Add Offer"}
                </div>
                <label>
                    Company Name
                    <input className="inputfield" value={this.state.companyName} />
                </label>
                <label>
                    Salary Amount (in dollars)
                    <input className="inputfield" value={this.state.salary} />
                    <select className="inputfield" defaultValue={this.state.salaryFormat}>
                        <option>hourly</option>
                        <option>weekly</option>
                        <option>biweekly</option>
                        <option>monthly</option>
                    </select>
                </label>
                <label>
                    Duration (in weeks)
                    <input className="inputfield" value={this.state.duration} />
                </label>
                <label>
                    Location
                    <select className="inputfield" selected={this.state.location}>
                        <option>Austin</option>
                        <option>San Francisco</option>
                        <option>Seattle</option>
                        <option>New York</option>
                    </select>
                </label>
                <label>
                    Corporate Housing Offered?
                    <select className="inputfield">
                        <option selected={this.state.corporateHousing}>Yes</option>
                        <option selected={!this.state.corporateHousing}>No</option>
                    </select>
                </label>
                <label>
                    Housing Stipend
                    <input className="inputfield" value={this.state.housingStipend}/>
                </label>
                <label>
                    Number of Meals You are Responsible for Providing Yourself in a Week
                    <input className="inputfield" value={this.state.meals} />
                </label>
                <Button text="Save" handleClick={() => {
                    this.props.saveHandler(this.state.offer);
                }} />
            </div>
        );
    }
}

export default EditConsole;