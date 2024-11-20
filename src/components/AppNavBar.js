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
            <NavbarBrand tag={Link} to="/" className="m-1 ps-2 pe-2">Home</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherRules" className="m-1 ps-2 pe-2">VoucherRules</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherRulesOthers" className="m-1 ps-2 pe-2">VoucherRulesOthers</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherTemplates" className="m-1 ps-2 pe-2">VoucherTemplates</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherTemplateFiles" className="m-1 ps-2 pe-2">VoucherTemplateFiles</NavbarBrand>
            <NavbarBrand tag={Link} to="/voucherLabels" className="m-1 ps-2 pe-2">VoucherLabels</NavbarBrand>
        </Navbar>;
    }
}

export default AppNavbar;
