
import * as React from 'react';
import { Spin } from 'antd';

interface IProps {
    spinning:boolean
}

class Loading extends React.Component<IProps, object> {
  
  constructor(props:IProps){
      super(props);
    
  }

  public render() {
   
    return (
        <Spin tip="Loading..."  spinning={this.props.spinning}/> 
    );
  }
}

export default Loading;
