import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../reducer/actions/auth';

const Logout = (props) => {
    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to={'/'} />;
};

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(null, mapDispatchToProps)(Logout);
