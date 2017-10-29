import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './OfferConsole.css';
import Offer from './Offer';

const offerDummy = [
{
    companyName: "Company 1",
    salaryFormat: "$25/hr",
    salary: 8000,
    duration: 10,
    location: "California",
    corporateHousing: false,
    housingStipend: 3000,
    meals: 21,
    cuid: "0101",
},
{
    companyName: "Company 2",
    salaryFormat: "$25/wk",
    salary: 12000,
    duration: 11,
    location: "California",
    corporateHousing: true,
    housingStipend: 0,
    meals: 21,
    cuid: "0102",
},
{
    companyName: "Company 1",
    salaryFormat: "$25/biwk",
    salary: 10000,
    duration: 12,
    location: "Seattle",
    corporateHousing: false,
    housingStipend: 0,
    meals: 21,
    cuid: "0103",
},
];

class OfferConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            add: false,
            edit: false,
            default: true,
            offers: this.props.offers == undefined ? offerDummy : this.props.offers,
        }
    }

    /* edit button is clicked, calling this method to edit that offer*/
    editHandler(props) {
        // this is the cuid of the offer that needs to be edited
        const cuid = props;
    }

    addHandler() {

    }

    pickPanel() {
        if (this.state.default) {
            
        }
    }

    render() {
        return (
            <div className={styles.offerConsole}>
                {this.state.offers.map((offer) => (
                    <Offer info={offer} editHandler={this.editHandler} key={offer.cuid} />
                ))}
            </div>
        );
    }
}

export default OfferConsole;