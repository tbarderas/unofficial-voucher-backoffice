import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class VoucherRuleEdit extends Component {

    emptyItem = {
        ruleId: '',
        isActive: '',
        isGeneral: '',
        temporaryId: '',
        application: '',
        webpageId: '',
        domain: '',
        groupId: '',
        incomingOfficeId: '',
        supplierIncomingOffice: '',
        bookingDateFrom: '',
        bookingDateTo: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        productTypeId: '',
        associatedCompanyId: '',
        channelInterfaceId: '',
        clientId: '',
        agencyCode: '',
        languageCode: ''
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
            const voucherRule = await (await fetch(`/vouplaVoucherRules/${this.props.match.params.id}`)).json();
            this.setState({item: voucherRule});
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
        const {item} = this.state.item;

        await fetch('/vouplaVoucherRules' + (item.ruleId ? '/' + item.ruleId : ''), {
            method: (item.ruleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vouplaVoucherRules');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.ruleId ? 'Editing VoucherRule #' + item.ruleId : 'Adding VoucherRule'}</h2>;

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}{item.clone ? ' [ CLONING ]' : ''}</h3>
                            <Button color="warning" tag={Link} to="/voucherRules" className="col-md-3">Back to list</Button>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="ruleId">RuleId</Label>
                                <Input type="text" name="ruleId" id="ruleId"
                                       value={item.ruleId || ''}
                                       onChange={this.handleChange} autoComplete="ruleId"/>
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/voucherRules">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherRuleEdit);