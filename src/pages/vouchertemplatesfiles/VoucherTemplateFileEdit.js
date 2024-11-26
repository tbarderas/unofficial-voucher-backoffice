import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Container} from "reactstrap";
import {updateDB, VoucherItemForm} from "../../components/VoucherItemForm";

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

        function utf8_to_b64(str) {
            return btoa(unescape(encodeURIComponent( str )));
        }

        const value = b64encoded ? utf8_to_b64(target.value) : target.value;
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
        }).then((response) => {
            if (!response.ok) {
                response.json().then((json) => {
                    console.log('Fail:' + json.message);
                    alert('Cant save item: ' + json.message);
                })
            } else {
                updateDB('voupla-voucher-template-file');
                this.props.history.push('/voucherTemplateFiles');
            }
        });
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.idTempFile ? 'Editing voucherTemplateFile #' + item.idTempFile : 'Adding voucherTemplateFile'}</h2>;

        function b64_to_utf8( str ) {
            return decodeURIComponent(escape(atob( str )));
        }

        const columns = [
            { field: 'templateId', label: 'Template ID'},
            { field: 'formatOut', label: 'Format Out'},
            {
                field: 'tempSourceT', label: 'Temp SourceT',
                className: "col-md-6 half-column", type: 'textarea', rows: 25,
                inputClass: 'compact-text', adapter: b64_to_utf8
            },
            {
                field: 'tempSource', label: 'Temp Source',
                className: "col-md-6 half-column", type: 'textarea', rows: 25,
                inputClass: 'compact-text', adapter: b64_to_utf8
            }
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
                            entityName="voucherTemplateFiles"
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

export default withRouter(VoucherTemplateFileEdit);