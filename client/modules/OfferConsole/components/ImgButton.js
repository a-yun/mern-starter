import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './ImgButton.css';
export default function ImgButton(props) {
    return (
        <button>
            <img src="https://image.flaticon.com/icons/svg/61/61456.svg" alt="my image"
            className={styles.btn}
            onClick={props.handleClick}/>
        </button>
    )
};