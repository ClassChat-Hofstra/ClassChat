import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";

function Dashboard(props) {


    return (
        <Container fluid>
            <h1>Home</h1>
            <Button>Logout</Button>
        </Container>
    )
}

export default Dashboard;



