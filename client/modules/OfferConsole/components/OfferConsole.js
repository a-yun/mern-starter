import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './OfferConsole.css';
import Offer from './Offer';
import EditConsole from './EditConsole';
import Button from './Button';

const offerDummy = [
{
    companyName: "Company 1",
    salaryFormat: "hourly",
    salary: 25,
    duration: 10,
    location: "San Francisco",
    corporateHousing: false,
    housingStipend: 3000,
    meals: 21,
    cuid: "0101",
},
{
    companyName: "Company 2",
    salaryFormat: "monthly",
    salary: 12000,
    duration: 11,
    location: "Austin",
    corporateHousing: true,
    housingStipend: 0,
    meals: 21,
    cuid: "0102",
},
{
    companyName: "Company 1",
    salaryFormat: "biweekly",
    salary: 4000,
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
            offer: undefined,
            username: "dummyUsername",
        }
        this.editHandler = this.editHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.pickPanel = this.pickPanel.bind(this);
        this.getOffer = this.getOffer.bind(this);
    }

    componentDidMount() {
        // get the list of offers

        // update state

    }

    /* find offer in list of offers to be edited */
    getOffer(props) {
        for (let idx = 0; idx < this.state.offers.length; idx++) {
            if (this.state.offers[idx].cuid == props) {
                return this.state.offers[idx];
            }
        }
        return undefined;
    }

    /* replace offer in list of offers or add to end if not existed */
    replaceOffer(props) {
        let found = false;
        const cuid = props.cuid;
        for (let idx = 0; idx < this.state.offers.length; idx++) {
            if (this.state.offers[idx].cuid == cuid) {
                this.state.offers[idx] = props;
                found = true;
            }
        }
        if (!found) {
            this.state.offers.push(props);
        }
    }

    /* edit button is clicked, calling this method to edit that offer*/
    editHandler(props) {
        // get the offer that needs to be edited
        const offer = this.getOffer(props);
        // set the state with this offer and set the flags
        this.setState({
            edit: true,
            default: false,
            add: false,
            offer,
        });
    }

    /* add button is clicked, calling this method to add a new offer*/
    addHandler() {
        this.setState({
            default: false,
            add: true,
            edit: false,
            offer: undefined,
        });
    }

    /* save button is clicked, calling this method to save changes to an existing offer or create new offer*/
    saveHandler(props) {
        const offer = props;
        this.replaceOffer(offer);
        // send a request to backend with updated offer
        const body = {
            offer,
        };
        this.setState({
            default: true,
            add: false,
            edit: false,
            offer: undefined,
        });
    }

    pickPanel() {
        if (this.state.add) {
            return (
                <EditConsole saveHandler={this.saveHandler} username={this.state.username} />
            )
        } else if (this.state.edit) {
            return (
                <EditConsole saveHandler={this.saveHandler} username={this.state.username} offer={this.state.offer} />
            );
        } else {
            return (
                <div className="offers">
                    <Button text="Add Offer" handleClick={this.addHandler} />
                    <Button text="Score" />
                    {this.state.offers.map((offer) => (
                        <Offer info={offer} editHandler={this.editHandler} key={offer.cuid} />
                    ))}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="offer-console">
                {this.pickPanel()}
            </div>
        );
    }
}

export default OfferConsole;