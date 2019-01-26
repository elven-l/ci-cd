
import * as React from 'react';
import {  Layout as AntLayout, Menu, Dropdown, Icon} from 'antd';
import  './layout.css';

const {
  Header
} = AntLayout;

class HeaderLayout extends React.Component {
  public render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <a  rel="noopener noreferrer" >退出</a>
        </Menu.Item>
      </Menu>
    );

    return (
      
       <Header className='header'>
                    <div className="header-meun">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link header-username" href="#">
                        TMS01 <Icon type="down" />
                      </a>
                  </Dropdown>
                    </div>
        </Header>
        
    );
  }
}

export default HeaderLayout;
