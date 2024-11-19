import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {FadeLoader} from "react-spinners";
import ItemActions from "../../components/ItemActions";

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
                    <ItemActions
                        urlPath="/voucherRulesOthers"
                        itemId={voucherRuleOther.otherRuleId}
                        />
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
                        <Button outline={true} color="dark" tag={Link} to="/voucherRules?page=0">First</Button>
                        <Button outline={true} disabled={true} color="dark">Page {this.state.pagination.self}</Button>
                        <Button outline={true} color="dark" tag={Link} to={"/voucherRules?page=" + this.state.pagination.next}>Next</Button>
                        <Button outline={true} color="dark" tag={Link} to={"/voucherRules?page=" + this.state.pagination.last}>Last</Button>
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
