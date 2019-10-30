// External imports
import React, { Fragment, useState, Component } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';

// Internal imports
import { TopNavigation } from '../components/organisms';

export class GroupDetail extends Component{    

    constructor(props){
        super(props);
        this.state={
            group: {name: "", members: []}
        }
    }

    async getData(){
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params:{
              'groupName': 'Testovací skupina'
          }
        };

        const res = await axios.get('api/group/detail', config);
        console.log('Valid Statement');
        console.log(res.data);
        this.setState({
            group: res.data.filterGroup[0]
        })

        console.log(this.state.group);

      } catch (err) {
        console.log('Error Statement');
        // console.error(err.response.data);
        // setError({ ...errors, backend: err.response.data.errors });
        // err.response.data.errors.map(error => {
        //   console.log(error);
        // });
      }
    }

    componentDidMount(){
        this.getData();
    }

    render(){  
        const members = this.state.group.members;
        
        return(            
            <Fragment>
            <TopNavigation></TopNavigation>
            <div className="blue lighten-5">
                <div className="container">
                    <div className="row">
                      <div className="col s12 center-align">
                        <h3>Group:
                            {this.state.group.name}
                        </h3>                        

                        <div>
                            {this.state.group.members.map((member, index) => (
                                <div>
                                   <p>Name: {member.email} Status: {member.timer.status}</p>
                                </div>
                            ))}
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}
