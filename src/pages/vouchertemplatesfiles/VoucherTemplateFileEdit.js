import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class VoucherTemplateFileEdit extends Component {

    emptyItem = {
        idTempFile: '',
        templateId: '',
        formatOut: 'HTML',
        tempSourceT: '',
        tempSource: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const voucherTemplateFile = await (await fetch(`/vouplaVoucherTemplateFile/${this.props.match.params.id}`)).json();
            this.setState({item: voucherTemplateFile});
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const b64encoded = name === 'tempSource' || name === 'tempSourceT';
        const value = b64encoded ? btoa(target.value) : target.value;
        let item = this.state.item;
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/vouplaVoucherTemplateFile' + (item.idTempFile ? '/' + item.idTempFile : ''), {
            method: (item.idTempFile) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/voucherTemplateFiles');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.idTempFile ? 'Editing voucherTemplateFile #' + item.idTempFile : 'Adding voucherTemplateFile'}</h2>;

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="templateId">Template ID</Label>
                                <Input type="text" name="templateId" id="templateId"
                                       value={item.templateId || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="formatOut">Format out</Label>
                                <Input type="text" name="formatOut" id="formatOut"
                                       value={item.formatOut || ''}
                                       onChange={this.handleChange} autoComplete="formatOut"/>
                            </FormGroup>

                            <FormGroup>
                                <FormGroup className="col-md-6 half-column">
                                    <Label for="tempSourceT">Temp source T</Label>
                                    <Input type="textarea" name="tempSourceT" id="tempSourceT" rows="25"
                                           className="compact-text"
                                           value={atob(item.tempSourceT) || ''}
                                           onChange={this.handleChange}/>
                                </FormGroup>

                                <FormGroup className="col-md-6 half-column">
                                    <Label for="tempSource">Temp source</Label>
                                    <Input type="textarea" name="tempSource" id="tempSource" rows="25"
                                           className="compact-text"
                                           value={atob(item.tempSource) || ''}
                                           onChange={this.handleChange}/>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup className="submit-line">
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/voucherTemplateFiles">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherTemplateFileEdit);