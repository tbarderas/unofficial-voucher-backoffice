import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class VoucherRuleOthersEdit extends Component {

    emptyItem = {
        otherRuleId: '',
        ruleId: '',
        activityTypeId: '',
        associatedCompanyId: '',
        serviceId: '',
        modalityId: '',
        supplierCarId: '',
        cmdId: '',
        categoryId: '',
        cmdGdsId: '',
        activityIntegrationId: ''
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
            const voucherRuleOthers = await (await fetch(`/vouplaVoucherRulesOthers/${this.props.match.params.id}`)).json();
            this.setState({item: voucherRuleOthers});
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

        await fetch('/vouplaVoucherRulesOthers' + (item.otherRuleId ? '/' + item.otherRuleId : ''), {
            method: (item.otherRuleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/voucherRulesOthers');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.ruleId ? 'Editing VoucherRuleOthers #' + item.ruleId : 'Adding VoucherRuleOthers'}</h2>;

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <Button color="warning" tag={Link} to="/voucherRulesOthers" className="col-md-3">Back to list</Button>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="ruleId">Rule ID</Label>
                                <Input type="text" name="ruleId" id="ruleId" value={item.ruleId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="activityTypeId">Activity type ID</Label>
                                <Input type="text" name="activityTypeId" id="activityTypeId" value={item.activityTypeId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="associatedCompanyId">Associated Company Id</Label>
                                <Input type="text" name="associatedCompanyId" id="associatedCompanyId" value={item.associatedCompanyId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="serviceId">Service ID</Label>
                                <Input type="text" name="serviceId" id="serviceId" value={item.serviceId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="modalityId">Modality ID</Label>
                                <Input type="text" name="modalityId" id="modalityId" value={item.modalityId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="supplierCarId">Supplier Car ID</Label>
                                <Input type="text" name="supplierCarId" id="supplierCarId" value={item.supplierCarId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="cmdId">CMD ID</Label>
                                <Input type="text" name="cmdId" id="cmdId" value={item.cmdId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="categoryId">Category ID</Label>
                                <Input type="text" name="categoryId" id="categoryId" value={item.categoryId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="cmdGdsId">Cmd Gds ID</Label>
                                <Input type="text" name="cmdGdsId" id="cmdGdsId" value={item.cmdGdsId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="activityIntegrationId">Activity Integration ID</Label>
                                <Input type="text" name="activityIntegrationId" id="activityIntegrationId" value={item.activityIntegrationId || ''} onChange={this.handleChange}/>
                            </FormGroup>

                            <FormGroup className="submit-line">
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/voucherRulesOthers">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherRuleOthersEdit);