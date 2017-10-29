import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import EditConsole from'./EditConsole';
import styles from './Offer.css'
// offer has:
// company name
// salary the way the user gave it
// hourly salary for our purposes
// duration in weeks
// location (city, state)
// corporate housing
// housing stipend (0 if not there)
// meals responsible per week
// flight/relocation cost: maybe not
// transportation: maybe not

class Offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
        this.stopEditing = this.stopEditing.bind(this);
    }

    stopEditing() {
        this.setState({ editing: false });
    }

    render() {
        if (this.state.editing) {
            return (
                <EditConsole saveHandler={this.saveHandler} cancelHandler={this.cancelHandler} username={this.props.username}
                    offer={this.props.offer} stopEditing={this.stopEditing} />
            );
        } else {
            return (
                <div className={styles.offer}>
                    <div className="offer-title">Company: {this.props.info.companyName}</div>
                    <div className="offer-field">Salary: ${this.props.info.salary} {this.props.info.salaryFormat}</div>
                    <div className="offer-field">Duration: {this.props.info.duration} weeks</div>
                    <div className="offer-field">Location: {this.props.info.location}</div>
                    <div className="offer-field">Corporate Housing: {this.props.info.corporateHousing ? "yes" : "no"}</div>
                    <div className="offer-field">Housing Stipend: ${this.props.info.housingStipend}</div>
                    <div className="offer-field">Responsible for: {this.props.info.meals} meals per week</div>
                    <Button text="Edit" handleClick={() => {
                        const cuid = this.props.info.cuid;
                        this.props.editHandler(cuid);
                        this.setState({ editing: true });
                    }} />
                    <Button text="Delete" handleClick={() => {
                        const cuid = this.props.info.cuid;
                        this.props.deleteHandler(cuid);
                    }} />
                </div>
            );
        }
    }
}

export default Offer;

Offer.propTypes = {
    info: PropTypes.object.isRequired,
    editHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};