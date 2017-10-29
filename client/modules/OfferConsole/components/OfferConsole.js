import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './OfferConsole.css';
import Offer from './Offer';
import EditConsole from './EditConsole';
import Button from './Button';
import Header from '../../App/components/Header/Header';

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

const cities = [
{
    name: "Austin",
    cli: 78.12,
    rent: 51.84,
    cliRent: 65.18,
    groceries: 81.79,
    restaurant: 77.67,
    purch: 122.65,
    medianRent: 1140,
},
{
    name: "New York",
    cli: 100,
    rent: 100,
    cliRent: 100,
    groceries: 100,
    restaurant: 100,
    purch: 100,
    medianRent: 2090,
},
{
    name: "San Francisco",
    cli: 101.94,
    rent: 119.63,
    cliRent: 110.65,
    groceries: 116.73,
    restaurant: 93.57,
    purch: 104.40,
    medianRent: 2450,
},
{
    name: "Seattle",
    cli: 93.31,
    rent: 65.46,
    cliRent: 79.60,
    groceries: 98.17,
    restaurant: 86.72,
    purch: 121.29,
    medianRent: 1370,
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
        this.deleteHandler = this.deleteHandler.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }

    componentDidMount() {
        // get the list of offers

        // update state

    }

    /* function to calculate cost for a given city */
    calculateCost(offer) {
        // cost of living source: https://www.numbeo.com/cost-of-living/region_rankings.jsp?title=2017-mid&region=019
        let total = 0;
        // get city
        let city = undefined;
        for (let idx = 0; idx < cities.length; idx++) {
            if (offer.location == cities[idx].name) {
                city = cities[idx];
            }
        }
        // convert salary to weekly salary
        let salary = offer.salary;
        switch(salaryFormat) {
            case "hourly" :
                salary = salary * 40;
                break;
            case "weekly" :
                break;
            case "monthly" :
                salary = salary / 4;
                break;
            case "biweekly" :
                salary = salary / 2;
        }
        // convert salary to flat rate
        salary = salary * duration;
        // convert salary to NY money
        salary = ((100 + (100 - city.cli)) / 100) * salary;
        // think about housing
        // housing source: https://www.apartmentlist.com/rentonomics/national-rent-data/
        let rent = 0;
        if (!offer.housingStipend) {
            // based on median rent
            rent = (city.medianRent / 4) * duration;
            rent = ((100 + (100 - city.rent)) / 100) * rent;
            // take housing stipend into account
            let housingHelp = 0;
            rent = rent - (((100 + (100 - city.rent)) / 100) * offer.housingStipend);
        }
        // think about meals
        let meals = 0;
        if (offer.meals > 0) {
            // based on restaurant index and $15/meal
            meals = ((100 + (100 - city.restaurant)) / 100) * offer.meals;
        }
        // subtract meal and housing cost from salary
        return salary - rent - meals;
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
        const offers = this.state.offers;
        for (let idx = 0; idx < offers.length; idx++) {
            if (offers[idx].cuid == cuid) {
                offers[idx] = props;
                found = true;
            }
        }
        if (!found) {
            offers.push(props);
        }
        this.setState({ offers });
    }

    /* delete offer in list of offers */
    deleteOffer(props) {
        const cuid = props;
        const offers = this.state.offers;
        for (let idx = 0; idx < offers.length; idx++) {
            if (offers[idx].cuid == cuid) {
                if (offers[idx].cuid == cuid) {
                    offers.splice(idx, 1);
                }
            }
        }
        this.setState({ offers });
    }

    /* edit button is clicked, calling this method to edit that offer*/
    editHandler(props) {
        // get the offer that needs to be edited
        const offer = this.getOffer(props);
        // set the state with this offer and set the flags
        this.setState({
            edit: true,
            add: false,
            default: false,
            offer,
        });
    }

    /* add button is clicked, calling this method to add a new offer*/
    addHandler() {
        // set the state to "adding offer" and set the flags
        this.setState({
            add: true,
            edit: false,
            default: false,
            offer: undefined,
        });
    }

    /* save button is clicked, calling this method to save changes to an existing offer or create new offer*/
    saveHandler(props) {
        // add or replace offer
        const offer = props;
        this.replaceOffer(offer);
        // send call to server with updated offer
        const body = {
            offer,
        };
        this.setState({
            add: false,
            edit: false,
            default: true,
            offer: undefined,
        });
    }

    /* delete button is clicked, calling this method to delete that offer from the array*/
    deleteHandler(props) {
        const cuid = props;
        // send call to server to delete the offer
        this.deleteOffer(props);
    }

    /* cancel button is clicked, calling this method to stop adding or editing without saving*/
    cancelHandler() {
        this.setState({
            add: false,
            edit: false,
            default: true,
            offer: undefined,
        });
    }

    pickPanel() {
        if (this.state.add) {
            return (
                <EditConsole saveHandler={this.saveHandler} cancelHandler={this.cancelHandler} username={this.state.username} />
            )
        } /*else if (this.state.edit) {
            return (
                <EditConsole saveHandler={this.saveHandler} cancelHandler={this.cancelHandler} username={this.state.username} offer={this.state.offer} />
            );
        } */else {
            return (
                <div />
            );
        }
    }

    render() {
        return (
            <div className="offer-console">
                <div className={styles.left}>
                    <Header
                        switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
                        intl={this.props.intl}
                        toggleAddPost={this.toggleAddPostSection}
                    />
                    <Button text="Add Offer" handleClick={this.addHandler} />
                    {this.pickPanel()}
                </div>
                <div className={styles.right}>
                    
                    {this.state.offers.map((offer) => (
                        <Offer info={offer} editHandler={this.editHandler} key={offer.cuid} deleteHandler={this.deleteHandler}
                            saveHandler={this.saveHandler} cancelHandler={this.cancelHandler} username={this.state.username}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default OfferConsole;