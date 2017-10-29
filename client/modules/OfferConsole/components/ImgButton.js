import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './ImgButton.css';
export default function ImgButton(props) {
    return (
        <button style={props.styl}>
            <img src={props.src} alt="my image"
            className={styles.btn}
            onClick={props.handleClick}/>
        </button>
    )
};