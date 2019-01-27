import * as React from 'react';
import { Table, Button  } from 'antd';
import {getLists} from '../../service/Form/Index'
import './form.css';
const { Column } = Table;

interface IState {
    dataSource: any,
    pagination:any
};

class Index extends React.Component<object, IState> {
  

   
   constructor(props:object){
      super(props);
      this.state = {
          pagination:{},
          dataSource :[]
      }
      this.handleTableChange = this.handleTableChange.bind(this);
  }

  public  rederAction(text:any, record: any) {
      return (
        <span key={text.id} className='index-action-button'>
                <Button size="small">Event</Button>  
                <Button size="small">Edit</Button> 
                <Button size="small">Delete</Button>
              
         </span>
      )
  }

  public componentDidMount()
  {
         getLists().then((respone) =>{
            if(respone.data.length) {
            this.setState({
                dataSource:respone.data,
                pagination : {
                    pageSize: respone.per_page,
                    current : respone.current_page,
                    total : respone.total
                }
            });
           }
        });
            
  }


 public handleTableChange(pagination:any)
 {
    
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    getLists(pager.current).then((respone) =>{
        this.setState({
            dataSource:respone.data,
            pagination : {
                pageSize: respone.per_page,
                current : respone.current_page,
                total : respone.total
            }
        });
    });
 }

  public render() {
   
    return (
        <div>
            <div className="btn-area">
                <Button type="primary">Create</Button>
            </div>
             
            <Table dataSource={this.state.dataSource} pagination={this.state.pagination} onChange={this.handleTableChange} >
                   <Column
                        title="标题"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="创建时间"
                        dataIndex="created_at"
                        key="created_at"
                    />
                    <Column
                    title="创建人"
                    dataIndex="created_by"
                    key="created_by"
                    />
                    <Column
                    title="操作"
                    key = "Action"
                    render={this.rederAction}
                    />
                </Table>
        </div>
        
    );
  }
}

export default Index;
