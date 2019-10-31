import React, { Fragment, useState, useEffect } from 'react';
import { TopNavigation, PomodoroGroup } from '../components/organisms';
import axios from 'axios';


export function MainGroup() {
    const [group, setGroup] = useState({name: "", members: []});

    useEffect(() => {
        async function fetchData(){
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
                console.log("Result:", res.data);
                setGroup(res.data.filterGroup[0]);     
        
            } catch (err) {
                console.log('Error Statement');
            }
        }

        fetchData(); 
    }, []);
    
    console.log("Group:", group);

    return (
        <Fragment>
         <TopNavigation></TopNavigation>
        
         <div className="container">
               <PomodoroGroup group={group} > </PomodoroGroup>
        </div>
      </Fragment>
);
}
