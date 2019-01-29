import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../../PageContent/NotFound/NotFound";
import InvoiceList from "../../../containers/InvoiceList/InvoiceList";
import Products from "../../../containers/Products/Products";
import Customers from "../../../containers/Customers/Customers";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/customers" exact component={Customers} />
    <Route path="/invoices" exact component={InvoiceList} />
    <Route path="/products" exact component={Products} />
    <Route component={NotFound} />
  </Switch>;