import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../AppNavBar";
import {FadeLoader} from "react-spinners";

class VoucherRulesOthersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherRulesOthers: [],
            pagination: {
                self: 0,
                next: 0,
                last: 1000
            },
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({VoucherRulesOthers: [], isLoading: true});
        fetch('/vouplaVoucherRulesOthers/search/customSearchWithFilter?sort=desc&page=' + this.state.pagination.self)
            .then(response => response.json())
            .then(data => this.setState({
                voucherRulesOthers: data["_embedded"]["vouplaVoucherRulesOthers"],
                pagination: {
                    self: data["page"]["number"],
                    next: Math.min(data["page"]["number"] + 1, data["page"]["totalPages"] - 1),
                    last: data["page"]["totalPages"] - 1,
                },
                isLoading: false}));
    }

    render() {
        const {voucherRulesOthers, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const VoucherRulesOthersList = voucherRulesOthers?.map(voucherRuleOther => {
            return <tr key={voucherRuleOther.otherRuleId}>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/VoucherRulesOthers/" + voucherRuleOther.otherRuleId}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
                        <Button size="sm" color="info" tag={Link} to={"/VoucherRulesOthers/" + voucherRuleOther.otherRuleId + '?clone'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy"
                                 viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherRuleOther.otherRuleId}</td>
                <td>{voucherRuleOther.ruleId}</td>
                <td>{voucherRuleOther.activityTypeId}</td>
                <td>{voucherRuleOther.associatedCompanyId}</td>
                <td>{voucherRuleOther.serviceId}</td>
                <td>{voucherRuleOther.modalityId}</td>
                <td>{voucherRuleOther.supplierCarId}</td>
                <td>{voucherRuleOther.cmdId}</td>
                <td>{voucherRuleOther.categoryId}</td>
                <td>{voucherRuleOther.cmdGdsId}</td>
                <td>{voucherRuleOther.activityIntegrationId}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-9">VoucherRulesOthers</h3>
                        <Button color="success" tag={Link} to="/VoucherRulesOthers/new" className="col-md-2">Add VoucherRuleOther</Button>
                        <div className="col-md-1">&nbsp;</div>
                    </div>
                    <div className="mt-12">
                        <Button outline="true" color="dark" tag={Link} to="/voucherRules?page=0">First</Button>
                        <Button outline="true" disabled="true" color="dark">Page {this.state.pagination.self}</Button>
                        <Button outline="true" color="dark" tag={Link} to={"/voucherRules?page=" + this.state.pagination.next}>Next</Button>
                        <Button outline="true" color="dark" tag={Link} to={"/voucherRules?page=" + this.state.pagination.last}>Last</Button>
                    </div>
                    <Table className="mt-4 table-condensed table-hover" striped bordered>
                        <thead>
                        <tr className="small">
                            <th width="4%">Actions</th>
                            <th width="4%">#Id</th>
                            <td>RuleId</td>
                            <td>Activity<br/>TypeId</td>
                            <td>AssociatedCompanyId</td>
                            <td>ServiceId</td>
                            <td>ModalityId</td>
                            <td>SupplierCarId</td>
                            <td>CmdId</td>
                            <td>CategoryId</td>
                            <td>CmdGdsId</td>
                            <td>Activity<br/>IntegrationId</td>
                        </tr>
                        </thead>
                        <tbody>
                        {VoucherRulesOthersList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherRulesOthersList;