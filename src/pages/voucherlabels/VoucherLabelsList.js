import React, {Component} from 'react';
import {Button, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {FadeLoader} from "react-spinners";
import ItemActions from "../../components/ItemActions";

class VoucherLabelsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherLabels: [],
            pagination: {
                self: 0,
                next: 0,
                last: 1000
            },
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({voucherLabels: [], isLoading: true});
        fetch('/vouplaTemplateLabel/search/customSearchWithFilter?sort=desc&page=' + this.state.pagination.self)
            .then(response => response.json())
            .then(data => this.setState({
                voucherLabels: data["_embedded"]["vouplaTemplateLabel"],
                pagination: {
                    self: data["page"]["number"],
                    next: Math.min(data["page"]["number"] + 1, data["page"]["totalPages"] - 1),
                    last: data["page"]["totalPages"] - 1,
                },
                isLoading: false}));
    }

    render() {
        const {voucherLabels, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherLabelsList = voucherLabels?.map(voucherLabel => {
            return <tr key={voucherLabel.labelId}>
                <td>
                    <ItemActions
                        urlPath="/voucherLabels"
                        itemId={voucherLabel.labelId}
                    />
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherLabel.labelId}</td>
                <td>{voucherLabel.templateId}</td>
                <td>{voucherLabel.labelName}</td>
                <td>{voucherLabel.domain}</td>
                <td>{voucherLabel.languageCode}</td>
                <td>{voucherLabel.text}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-9">VoucherLabels</h3>
                        <Button color="success" tag={Link} to="/voucherLabels/new" className="col-md-2">Add VoucherLabel</Button>
                        <div className="col-md-1">&nbsp;</div>
                    </div>
                    <div className="mt-12">
                        <Button outline={true} color="dark" tag={Link} to="/voucherLabels?page=0">First</Button>
                        <Button outline={true} disabled={true} color="dark">Page {this.state.pagination.self}</Button>
                        <Button outline={true} color="dark" tag={Link} to={"/voucherLabels?page=" + this.state.pagination.next}>Next</Button>
                        <Button outline={true} color="dark" tag={Link} to={"/voucherLabels?page=" + this.state.pagination.last}>Last</Button>
                    </div>
                    <Table className="mt-4 table-condensed table-hover" striped bordered>
                        <thead>
                        <tr className="small">
                            <th width="4%">Actions</th>
                            <th width="4%">#Id</th>
                            <td>TemplateID</td>
                            <td>Label name</td>
                            <td>Domain</td>
                            <td>Language code</td>
                            <td>Text</td>
                        </tr>
                        </thead>
                        <tbody>
                        {voucherLabelsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherLabelsList;