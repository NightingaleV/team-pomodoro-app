//External import
import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../atoms';
import { SignUpSuccess } from '../../templates';
import { useAuth } from '../../utils/useAuth';
import { useApi } from '../../utils/useApi';
import M from 'materialize-css';
import { async } from 'rxjs/internal/scheduler/async';

export function RemoveUserModal({ group, member, modalId }){    
    const history = useHistory();
    let location = useLocation();
    const api = useApi();
    const { user, token } = useAuth();    

    console.log(member);

    // Component State
    //----------------------------------------------------------------------------
    const [errors, setError] = useState({ backend: '' });

    // Component Control
    //----------------------------------------------------------------------------
    function closeModal() {
        const removeMemberModalElement = document.querySelector('.remove-member-modal');        
        const elem = M.Modal.getInstance(removeMemberModalElement);        
        console.log(member);
        elem.close();
    }

    // Form Control
    //----------------------------------------------------------------------------
    const removeMember = async e => {
        const requestData = {
            groupID: group._id,
            memberID: member._id,
        };    

        const config = {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify(requestData);
        await axios
            .post('/api/group/remove', body, config)
            .then(res => {
                history.push('/');
            })
            .catch(err => {
                console.log('Error Statement');
                if (err.response.data) {
                    console.log('Error Statement');
                    console.log(err);
                    // if (err.response.data) {
                    //   setError({ ...errors, backend: err.response.data.errors });
                    //   console.log(err.response.data.errors);
                    // }
                }
            });
    };

    // Modal Content
    //----------------------------------------------------------------------------
    return (
        <>
            <div
                // id="removeMemberModal"
                id={modalId}
                className="remove-member-modal modal center-align"
            >
                <div className="modal-content">
                    <h4>Removing member { member.email } from group { group.name }</h4>
                    <p>Do you really want to remove this member from the group?</p>
                    <>
                        {errors.backend &&
                        errors.backend.map(error => {
                            return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                        })}
                    </>
                </div>
                <Button
                    icon={'undo'}
                    iconPosition={'left'}
                    color={'blue lighten-1'}
                    type={'button'}
                    className={'mx-4'}
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    icon={'delete_sweep'}
                    iconPosition={'left'}
                    color={'red lighten-1'}
                    type={'button'}
                    className={'mx-4'}
                    onClick={removeMember}
                >
                    Remove
                </Button>
            </div>
        </>
    );
}