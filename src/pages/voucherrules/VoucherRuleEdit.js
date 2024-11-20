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
        const {item} = this.state;

        await fetch('/vouplaVoucherRules' + (item.ruleId ? '/' + item.ruleId : ''), {
            method: (item.ruleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/voucherRules');
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
<Input type="hidden" name="ruleId" id="ruleId" value={item.ruleId}/>
<FormGroup><Label for="isActive">isActive</Label><Input type="text" name="isActive" id="isActive" value={item.isActive || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="isGeneral">isGeneral</Label><Input type="text" name="isGeneral" id="isGeneral" value={item.isGeneral || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="temporaryId">temporaryId</Label><Input type="text" name="temporaryId" id="temporaryId" value={item.temporaryId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="application">application</Label><Input type="text" name="application" id="application" value={item.application || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="webpageId">webpageId</Label><Input type="text" name="webpageId" id="webpageId" value={item.webpageId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="domain">domain</Label><Input type="text" name="domain" id="domain" value={item.domain || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="groupId">groupId</Label><Input type="text" name="groupId" id="groupId" value={item.groupId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="incomingOfficeId">incomingOfficeId</Label><Input type="text" name="incomingOfficeId" id="incomingOfficeId" value={item.incomingOfficeId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="supplierIncomingOffice">supplierIncomingOffice</Label><Input type="text" name="supplierIncomingOffice" id="supplierIncomingOffice" value={item.supplierIncomingOffice || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="bookingDateFrom">bookingDateFrom</Label><Input type="text" name="bookingDateFrom" id="bookingDateFrom" value={item.bookingDateFrom || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="bookingDateTo">bookingDateTo</Label><Input type="text" name="bookingDateTo" id="bookingDateTo" value={item.bookingDateTo || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="serviceDateFrom">serviceDateFrom</Label><Input type="text" name="serviceDateFrom" id="serviceDateFrom" value={item.serviceDateFrom || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="serviceDateTo">serviceDateTo</Label><Input type="text" name="serviceDateTo" id="serviceDateTo" value={item.serviceDateTo || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="productTypeId">productTypeId</Label><Input type="text" name="productTypeId" id="productTypeId" value={item.productTypeId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="associatedCompanyId">associatedCompanyId</Label><Input type="text" name="associatedCompanyId" id="associatedCompanyId" value={item.associatedCompanyId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="channelInterfaceId">channelInterfaceId</Label><Input type="text" name="channelInterfaceId" id="channelInterfaceId" value={item.channelInterfaceId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="clientId">clientId</Label><Input type="text" name="clientId" id="clientId" value={item.clientId || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="agencyCode">agencyCode</Label><Input type="text" name="agencyCode" id="agencyCode" value={item.agencyCode || ''} onchange={this.handleChange}/></FormGroup>
<FormGroup><Label for="languageCode">languageCode</Label><Input type="text" name="languageCode" id="languageCode" value={item.languageCode || ''} onchange={this.handleChange}/></FormGroup>
                            
                            <FormGroup className="submit-line">
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