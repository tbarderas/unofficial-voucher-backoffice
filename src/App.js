import React, {Component} from 'react';
import './css/App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import VoucherRulesList from './VoucherRulesList';
import VoucherRuleEdit from "./VoucherRuleEdit";
import VoucherTemplatesList from "./VoucherTemplatesList";
import VoucherTemplateEdit from "./VoucherTemplateEdit";
import VoucherRulesOthersList from "./VoucherRulesOthersList";
import VoucherRuleOthersEdit from "./VoucherRuleOthersEdit";
import VoucherTemplateFileEdit from "./VoucherTemplateFileEdit";
import VoucherTemplateFilesList from "./VoucherTemplateFileList";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/voucherRules' exact={true} component={VoucherRulesList}/>
            <Route path='/voucherRules/:id' component={VoucherRuleEdit}/>
            <Route path='/voucherRulesOthers' exact={true} component={VoucherRulesOthersList}/>
            <Route path='/voucherRulesOthers/:id' component={VoucherRuleOthersEdit}/>
            <Route path='/voucherTemplates' exact={true} component={VoucherTemplatesList}/>
            <Route path='/voucherTemplates/:id' component={VoucherTemplateEdit}/>
            <Route path='/voucherTemplateFiles' exact={true} component={VoucherTemplateFilesList}/>
            <Route path='/voucherTemplateFiles/:id' component={VoucherTemplateFileEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;