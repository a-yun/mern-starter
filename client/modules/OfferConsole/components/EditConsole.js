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
        this.isThisFormat = this.isThisFormat.bind(this);
    }

    /* check which format the salary is in */
    isThisFormat(props) {
        return this.props.offer && this.props.offer.salaryFormat === props;
    }

    /* check which location has been selected */
    isThisLocation(props) {
        return this.props.offer && this.props.offer.location == props;
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
                    <select className="inputfield">
                        <option selected={this.isThisFormat("hourly")}>hourly</option>
                        <option selected={this.isThisFormat("weekly")}>weekly</option>
                        <option selected={this.isThisFormat("biweekly")}>biweekly</option>
                        <option selected={this.isThisFormat("monthly")}>monthly</option>
                    </select>
                </label>
                <label>
                    Duration (in weeks)
                    <input className="inputfield" value={this.state.duration} />
                </label>
                <label>
                    Location
                    <select className="inputfield">
                        <option selected={this.isThisLocation("Austin")}>Austin</option>
                        <option selected={this.isThisLocation("San Francisco")}>San Francisco</option>
                        <option selected={this.isThisLocation("Seattle")}>Seattle</option>
                        <option selected={this.isThisLocation("New York")}>New York</option>
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