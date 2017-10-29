import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './EditConsole.css'
import Button from './Button';

let counter = 0;

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
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            companyName: nextProps.offer ? nextProps.offer.companyName : "",
            salaryFormat: nextProps.offer ? nextProps.offer.salaryFormat : "hourly",
            salary: nextProps.offer ? nextProps.offer.salary : "",
            duration: nextProps.offer ? nextProps.offer.duration : "",
            location: nextProps.offer ? nextProps.offer.location : "Austin",
            corporateHousing: nextProps.offer ? nextProps.offer.corporateHousing : true,
            housingStipend: nextProps.offer ? nextProps.offer.housingStipend : "",
            meals: nextProps.offer ? nextProps.offer.meals : "",
        });
    }

    /* update parameters */
    handleChange(event) {
        let value = event.target.value;
        if (event.target.title == "corporateHousing") {
            value = event.target.value == "Yes";
        }
        this.setState({
            [event.target.title]: value,
        })
    }

    render() {
        return (
            <div className={styles.editConsole}>
                <div className="title">
                    Offer Details:
                </div>
                <div>
                    Company Name:
                    <input className="inputfield" title="companyName" value={this.state.companyName} onChange={this.handleChange}/>
                </div>
                <div>
                    Salary Amount (dollars):
                    <input className="inputfield" title="salary" value={this.state.salary} onChange={this.handleChange}     />
                    <select className="inputfield" title="salaryFormat" defaultValue={this.state.salaryFormat} onChange={this.handleChange}>
                        <option>Hourly</option>
                        <option>Weekly</option>
                        <option>Biweekly</option>
                        <option>Monthly</option>
                    </select>
                </div>
                <div>
                    Duration (weeks):
                    <input className="inputfield" title="duration" value={this.state.duration} onChange={this.handleChange}/>
                </div>
                <div>
                    Location:
                    <select className="inputfield" title="location" defaultValue={this.state.location} onChange={this.handleChange}>
                        <option>Austin, Texas</option>
                        <option>San Francisco, California</option>
                        <option>Seattle, Washington</option>
                        <option>New York City, New York</option>
                    </select>
                </div>
                <div>
                    Corporate Housing Offered:
                    <select className="inputfield" title="corporateHousing" onChange={this.handleChange}>
                        <option selected={this.state.corporateHousing}>Yes</option>
                        <option selected={!this.state.corporateHousing}>No</option>
                    </select>
                </div>
                <div>
                    Housing Stipend:
                    <input className="inputfield" title="housingStipend" value={this.state.housingStipend} onChange={this.handleChange}/>
                </div>
                <div>
                    Meals to Prepare (weekly):
                    <input className="inputfield" title="meals" value={this.state.meals} onChange={this.handleChange}/>
                </div>
                <div>
                    <Button text="Save" handleClick={() => {
                        const offer = this.state;
                        offer.cuid = this.props.offer ? this.props.offer.cuid : counter;
                        counter++;
                        // send state to offer console
                        this.props.saveHandler(offer);
                        // reset state
                        this.setState({
                            companyName:  "",
                            salaryFormat: "hourly",
                            salary: "",
                            duration: "",
                            location: "Austin",
                            corporateHousing: true,
                            housingStipend: "",
                            meals: "",
                        })
                    }} />
                    <Button text="Cancel" handleClick={() => {
                        // send state to offer console
                        this.props.cancelHandler();
                        // reset state
                        this.setState({
                            companyName:  "",
                            salaryFormat: "hourly",
                            salary: "",
                            duration: "",
                            location: "Austin",
                            corporateHousing: true,
                            housingStipend: "",
                            meals: "",
                        })
                    }} />
                </div>
            </div>
        );
    }
}

export default EditConsole;