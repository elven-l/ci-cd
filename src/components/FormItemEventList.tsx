import * as React from 'react';
import {Button, Row, Col} from 'antd';

interface IFormEvent {
    selected : string,
    target_name : string,
    action: string
}

interface IState {
    dataSource: IFormEvent[],
};

interface IProps {
    eventItems: IFormEvent[],
    deleteEvent : (index:number) => void
}

class FormItemEventList extends React.Component<IProps,IState> {
    
    constructor(props:IProps) {
        super(props);
    }
    
    
   public render() 
   {
    return (
        <div>
          {
             this.props.eventItems.map( (event:IFormEvent, index:number) => {
                 return <Row className='row-event-items' key={index}> 
                              <Col lg={20} xl={20}>
                                      When {"        "} 
                                      {event.selected}
                                      {"              "} 
                                      selected
                                      {"              "}   
                                      Then{"          "}  
                                      {event.target_name}
                                      {"               "}  
                                      {event.action}
                              </Col>
                              <Col lg={4} xl={4}>
                                      <Button size="small" >Delete</Button>
                              </Col>
                     </Row>
            })
          }   
        </div>
    );
   }
  }
  

export default FormItemEventList;
