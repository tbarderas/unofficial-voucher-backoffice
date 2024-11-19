import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {FadeLoader} from "react-spinners";
import ItemActions from "../../components/ItemActions";

class VoucherTemplatesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherTemplates: [],
            pagination: {
                self: 0,
                next: 0,
                last: 1000
            },
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({voucherTemplates: [], isLoading: true});
        fetch('/vouplaVoucherTemplate/search/customSearchWithFilter?sort=desc&page=' + this.state.pagination.self)
            .then(response => response.json())
            .then(data => this.setState({
                voucherTemplates: data["_embedded"]["vouplaVoucherTemplate"],
                pagination: {
                    self: data["page"]["number"],
                    next: Math.min(data["page"]["number"] + 1, data["page"]["totalPages"] - 1),
                    last: data["page"]["totalPages"] - 1,
                },
                isLoading: false}));
    }

    render() {
        const {voucherTemplates, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherTemplatesList = voucherTemplates?.map(voucherTemplate => {
            return <tr key={voucherTemplate.templateId}>
                <td>
                    <ItemActions
                        urlPath="/voucherTemplate"
                        itemId={voucherTemplate.templateId}
                    />
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherTemplate.templateId}</td>
                <td>{voucherTemplate.status}</td>
                <td>{voucherTemplate.templateName}</td>
                <td>{voucherTemplate.description}</td>
                <td>{voucherTemplate.formatTypeT}</td>
                <td>{voucherTemplate.formatType}</td>
                <td>{voucherTemplate.languageCode}</td>
                <td>{voucherTemplate.outputFormat}</td>
            </tr>
        });

        return (
            <div>
            <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-9">VoucherTemplates</h3>
                        <Button color="success" tag={Link} to="/voucherTemplates/new" className="col-md-2">Add VoucherTemplate</Button>
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
                            <td>Status</td>
                            <td>Template name</td>
                            <td>Description</td>
                            <td>Format type T</td>
                            <td>Format type</td>
                            <td>Language code</td>
                            <td>Output format</td>
                        </tr>
                        </thead>
                        <tbody>
                        {voucherTemplatesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherTemplatesList;
