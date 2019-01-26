
import * as React from 'react';
import { Layout as AntLayout} from 'antd';
import  './layout.css';
import CreateForm from '../Form/Create';
import Index from '../Form/Index'
import HeaderLayout from './HeaderLayout'
import { Route } from "react-router-dom";




const {Content} = AntLayout;

class Layout extends React.Component {


  public render() {

    return (
      
        <div className="layout">
                
                  <HeaderLayout />
                  <Content className="layout-content">
                      <Route exact={true} path="/" component={Index} />
                      <Route exact={true} path="/form/create" component={CreateForm} />
                  </Content>
                
        </div>
        
    );
  }
}

export default Layout;
