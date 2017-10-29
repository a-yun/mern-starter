import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './Button.css';
export default function Button(props) {
    return (
        <button
            className={styles.btn}
            onClick={props.handleClick}
        >
            {props.text}
        </button>
    )
};