import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function Button(props) {
    return (
        <button
            className="btn"
            onClick={props.handleClick}
        >
            {props.text}
        </button>
    )
};