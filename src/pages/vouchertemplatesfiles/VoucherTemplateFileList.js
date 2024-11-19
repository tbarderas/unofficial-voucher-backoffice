import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {FadeLoader} from "react-spinners";
import ItemActions from "../../components/ItemActions";

class VoucherTemplateFilesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherTemplateFiles: [],
            pagination: {
                self: 0,
                next: 0,
                last: 1000
            },
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({voucherTemplateFiles: [], isLoading: true});
        fetch('/vouplaVoucherTemplateFile/search/customSearchWithFilter?sort=desc&page=' + this.state.pagination.self)
            .then(response => response.json())
            .then(data => this.setState({
                voucherTemplateFiles: data["_embedded"]["vouplaVoucherTemplateFile"],
                pagination: {
                    self: data["page"]["number"],
                    next: Math.min(data["page"]["number"] + 1, data["page"]["totalPages"] - 1),
                    last: data["page"]["totalPages"] - 1,
                },
                isLoading: false}));
    }

    render() {
        if (this.state.isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherTemplateFilesList = this.state.voucherTemplateFiles?.map(voucherTemplateFile => {
            return <tr key={voucherTemplateFile.idTempFile}>
                <td>
                    <ItemActions
                        urlPath="/voucherTemplateFile"
                        itemId={voucherTemplateFile.idTempFile}
                    />
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherTemplateFile.idTempFile}</td>
                <td>{voucherTemplateFile.templateId}</td>
                <td>{voucherTemplateFile.formatOut}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-8">VoucherTemplateFiles</h3>
                        <Button color="success" tag={Link} to="/voucherTemplateFiles/new" className="col-md-3">Add VoucherTemplateFile</Button>
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
                            <td>Template ID</td>
                            <td>Format out</td>
                        </tr>
                        </thead>
                        <tbody>
                        {voucherTemplateFilesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherTemplateFilesList;
