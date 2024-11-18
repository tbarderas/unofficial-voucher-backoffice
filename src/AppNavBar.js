import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/" className="m-1">Home</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherRules" className="m-1">VoucherRules</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherRulesOthers" className="m-1">VoucherRulesOthers</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherTemplates" className="m-1">VoucherTemplates</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherTemplateFiles" className="m-1">VoucherTemplateFiles</NavbarBrand>
        </Navbar>;
    }
}

export default AppNavbar;
