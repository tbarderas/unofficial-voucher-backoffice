import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Container} from "reactstrap";
import {VoucherItemForm} from "../../components/VoucherItemForm";

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
        }).then((response) => {
            if (!response.ok) {
                response.json().then((json) => {
                    console.log('Fail:' + json.message);
                    alert('Cant add item: ' + json.message);
                })
            } else {
                this.props.history.push('/voucherLabels');
            }
        });
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.labelId ? 'Editing voucherLabel #' + item.labelId : 'Adding voucherLabel'}</h2>;
        const columns = [
            { field: 'templateId', label: 'Template ID'},
            { field: 'labelName', label: 'Label name'},
            { field: 'domain', label: 'Domain'},
            { field: 'languageCode', label: 'Language code'},
            { field: 'text', label: 'Text', type: 'textarea', rows: 10}
        ]

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <VoucherItemForm
                            entityName="voucherLabels"
                            item={item}
                            columns={columns}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherLabelsEdit);