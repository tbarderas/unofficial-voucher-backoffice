import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class VoucherLabelsEdit extends Component {

    emptyItem = {
        labelId: '',
        templateId: '',
        labelName: '',
        domain: '',
        languageCode: '',
        text: ''
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
            const voucherLabel = await (await fetch(`/vouplaTemplateLabel/${this.props.match.params.id}`)).json();
            this.setState({item: voucherLabel});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.state.item;
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/vouplaTemplateLabel' + (item.labelId ? '/' + item.labelId : ''), {
            method: (item.labelId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/voucherLabels');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.labelId ? 'Editing voucherLabel #' + item.labelId : 'Adding voucherLabel'}</h2>;

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
                                <Label for="labelName">Label name</Label>
                                <Input type="text" name="labelName" id="labelName"
                                       value={item.labelName || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="domain">Domain</Label>
                                <Input type="text" name="domain" id="domain"
                                       value={item.domain || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="languageCode">Language Code</Label>
                                <Input type="text" name="languageCode" id="languageCode"
                                       value={item.formatTypeT || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="text">Text</Label>
                                <Input type="textarea" name="text" id="text" rows="10"
                                       value={item.text || ''}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup className="submit-line">
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/voucherLabels">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherLabelsEdit);