import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "./AppNavBar";
import {FadeLoader} from "react-spinners";

class VoucherTemplateFilesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherTemplateFiles: [],
            isLoading: false
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({voucherTemplateFiles: [], isLoading: true});
        fetch('/vouplaVoucherTemplateFile/search/customSearchWithFilter?sort=desc')
            .then(response => response.json())
            .then(data => this.setState({voucherTemplateFiles: data["_embedded"]["vouplaVoucherTemplateFile"], isLoading: false}));
    }

    async remove(id) {
        await fetch(`/vouplaVoucherTemplateFile/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            }
        }).then(() => {
            let updatedVoucherTemplateFiles = [...this.state.voucherTemplateFiles].filter(i => i.idTempFile !== id);
            this.setState({voucherTemplateFiles: updatedVoucherTemplateFiles});
        });
    }

    render() {
        const {voucherTemplateFiles: voucherTemplateFiles, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherTemplateFilesList = voucherTemplateFiles?.map(voucherTemplateFile => {
            return <tr key={voucherTemplateFile.idTempFile}>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/voucherTemplateFiles/" + voucherTemplateFile.idTempFile}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(voucherTemplateFile.idTempFile)}>
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
