import React from 'react';
import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate } = {}) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.floor(Math.random() * 100)}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>

            <input id={htmlFor} onChange={props.onChange} type={inputType} value={props.value} />

            {isInvalid(props) ? <span>{props.errorMessage}</span> : null}
        </div>
    );
};

export default Input;
