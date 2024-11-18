import React, {Component} from 'react';
import './css/App.css';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import AppNavbar from "./AppNavBar";

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/voucherRules">Voucher rules</Link></Button>
                    <Button color="link"><Link to="/voucherRulesOthers">Voucher rules others</Link></Button>
                    <Button color="link"><Link to="/voucherTemplates">Voucher templates</Link></Button>
                    <Button color="link"><Link to="/voucherTemplateFiles">Voucher template files</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;