import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "./AppNavBar";
import {FadeLoader} from "react-spinners";

class VoucherRulesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherRules: [],
            isLoading: false
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({voucherRules: [], isLoading: true});
        fetch('/vouplaVoucherRules/search/customSearchWithFilter?filter=%28productTypeId%3A%27O%27%29&sort=desc')
            .then(response => response.json())
            .then(data => this.setState({voucherRules: data["_embedded"]["vouplaVoucherRules"], isLoading: false}));
    }

    async remove(id) {
        await fetch(`/vouplaVoucherRules/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            }
        }).then(() => {
            let updatedVoucherRules = [...this.state.voucherRules].filter(i => i.ruleId !== id);
            this.setState({voucherRules: updatedVoucherRules});
        });
    }

    render() {
        const {voucherRules, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherRulesList = voucherRules?.map(voucherRule => {
            return <tr key={voucherRule.ruleId}>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/voucherRules/" + voucherRule.ruleId}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(voucherRule.ruleId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherRule.ruleId}</td>
                <td className="text-center">{voucherRule.isActive ? 'Y' : 'N'}</td>
                <td className="text-center">{voucherRule.isGeneral ? 'Y' : 'N'}</td>
                <td>{voucherRule.temporaryId}</td>
                <td>{voucherRule.application}</td>
                <td>{voucherRule.webpageId}</td>
                <td>{voucherRule.domain}</td>
                <td>{voucherRule.groupId}</td>
                <td>{voucherRule.incomingOfficeId}</td>
                <td>{voucherRule.supplierIncomingOffice}</td>
                <td className="x-small-text">{voucherRule.bookingDateFrom}</td>
                <td className="x-small-text">{voucherRule.bookingDateTo}</td>
                <td className="x-small-text">{voucherRule.serviceDateFrom}</td>
                <td className="x-small-text">{voucherRule.serviceDateTo}</td>
                <td>{voucherRule.associatedCompanyId}</td>
                <td>{voucherRule.channelInterfaceId}</td>
                <td>{voucherRule.clientId}</td>
                <td>{voucherRule.agencyCode}</td>
                <td>{voucherRule.languageCode}</td>

            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-9">VoucherRules</h3>
                        <Button color="success" tag={Link} to="/voucherRules/new" className="col-md-2">Add VoucherRule</Button>
                        <div className="col-md-1">&nbsp;</div>
                    </div>
                    <Table className="mt-4 table-condensed table-hover" striped bordered>
                        <thead>
                        <tr className="small">
                            <th width="4%">Actions</th>
                            <th width="4%">#Id</th>
                            <td width="4%">act.?</td>
                            <td width="4%">gral.?</td>
                            <td width="4%">Temporary<br/>Id</td>
                            <td width="6%">Application</td>
                            <td width="6%">WebpageId</td>
                            <td width="6%">Domain</td>
                            <td width="6%">GroupId</td>
                            <td width="4%">Incoming<br/>OfficeId</td>
                            <td width="4%">Supplier<br/>Incoming<br/>Office</td>
                            <td width="6%">BookingDate<br/>From</td>
                            <td width="6%">BookingDate<br/>To</td>
                            <td width="6%">ServiceDate<br/>From</td>
                            <td width="6%">ServiceDate<br/>To</td>
                            <td width="4%">Associated<br/>CompanyId</td>
                            <td width="4%">Channel<br/>InterfaceId</td>
                            <td width="4%">ClientId</td>
                            <td width="4%">Agency<br/>Code</td>
                            <td width="4%">Language<br/>Code</td>
                        </tr>
                        </thead>
                        <tbody>
                        {voucherRulesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherRulesList;
