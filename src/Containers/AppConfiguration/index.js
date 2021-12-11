import ItemConfig from "./ItemConfig";
import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminLayout from "../../Components/AdminLayout";
import Dashboard from "../Dashboard";
import VendorConfig from "./VendorConfig";
import "react-toastify/dist/ReactToastify.css";
import AccountConfig from "./AccountConfig";
import PlanConfig from "./PlanConfig";
import UserConfig from "./UserConfig";
import SubscriptionConfig from "./SubscriptionConfig";

export default function AppConfiguration() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/itemconfig" component={ItemConfig} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/vendorconfig" component={VendorConfig} />
        <Route path="/admin/accountconfig" component={AccountConfig} />
        <Route path="/admin/planconfig" component={PlanConfig} />
        <Route path="/admin/userconfig" component={UserConfig} />
        <Route path="/admin/subscipconfig" component={SubscriptionConfig} />
      </Switch>
    </AdminLayout>
  );
}
