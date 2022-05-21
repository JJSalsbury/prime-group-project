import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import './RosterMember.css'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';




function RosterMember({ member }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const titleRender = () => {
        if (member.access_level === 2) {
            return <a onClick={() => { history.push(`/profile/${member.id}`) }}>{member.username} - Administrator</a>
        } else if (member.access_level === 1) {
            return <a onClick={() => { history.push(`/profile/${member.id}`) }}>{member.username} - Moderator</a>
        } else if (member.access_level ===0 ) {
            return <a onClick={() => { history.push(`/profile/${member.id}`) }}>{member.username}</a>
        }

    };

    // function to determine which button to render next to user, Admins will get an empty p tag
    const buttonRender = () => {
        if (member.access_level === 2) {
            return <p></p>;
        } else if (member.access_level === 1) {
            // if user access_level is 1, 'DEMOTE' button will render to call promoteUser function
            return <Button sx={{ backgroundColor: 'red' }} variant={'contained'} onClick={demoteUser}><SouthIcon fontSize='small'/> DEMOTE</Button>;
        } else if (member.access_level === 0) {
            // if user access_level is 0, 'PROMOTE' button will render to call promoteUser function
            return <Button sx={{ backgroundColor: 'green' }} variant={'contained'} onClick={promoteUser}><NorthIcon fontSize='small'/> PROMOTE</Button>;
        }

    }

    // function to demote a Moderator to a normal user
    const demoteUser = () => {
        console.log('clicked demote');
        const id = member.id;
        // create object to send to server
        const user = {
            id: id
        }
        // SweetAlert warning before demoting member
        Swal.fire({
            title: `Are you sure you want to demote ${member.username} to a normal user?`,
            text: "Click OK to Demote",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Demote!',
            cancelButtonText: 'No, Cancel!',
            reverseButtons: true
        }).then((result) => {
            // clicking 'OK' sends dispatch to demote user
            if (result.isConfirmed) {

                dispatch({
                    type: 'DEMOTE_USER',
                    payload: user
                })
                Swal.fire(
                    'Demoted!',
                    `You revoked ${member.username}'s Moderator privileges.`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    `${member.username} will remain a Moderator.`,
                    'error'
                )
            }
        })
    }
    // function to promote a normal user to a Moderator
    const promoteUser = () => {
        console.log('clicked promote');
        const id = member.id;
        // create object to send to server
        const user = {
            id: id
        }
        // SweetAlert warning before promoting member
        Swal.fire({
            title: `Are you sure you want to promote ${member.username} to a Moderator?`,
            text: "Click OK to Promote",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Promote!',
            cancelButtonText: 'No, Cancel!',
            reverseButtons: true
        }).then((result) => {
            // clicking 'OK' sends dispatch to promote user
            if (result.isConfirmed) {

                dispatch({
                    type: 'PROMOTE_USER',
                    payload: user
                })
                Swal.fire(
                    'Promoted!',
                    `You have promoted ${member.username} to a Moderator.`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    `${member.username} will remain a normal user.`,
                    'error'
                )
            }
        })


    }

    // function to delete a user
    const deleteUser = () => {
        console.log('clicked delete');
        const id = member.id;
        // create object to send to server
        const user = {
            id: id
        }
        // SweetAlert warning before promoting member
        Swal.fire({
            title: `Are you sure you want to delete ${member.username}'s account?`,
            text: "Click OK to Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete the account.',
            cancelButtonText: 'No, Cancel!',
            reverseButtons: true
        }).then((result) => {
            // clicking 'OK' sends dispatch to delete user
            if (result.isConfirmed) {

                dispatch({
                    type: 'DELETE_USER',
                    payload: user
                })
                Swal.fire(
                    'Delete!',
                    `You have deleted ${member.username}'s account.`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    `${member.username} will remain a user.`,
                    'error'
                )
            }
        })
    }

    return (
        <>
            <TableRow>
                {/* username is a link, onClick will push user to that person's profile page */}
                <TableCell sx={{ width: 250 }} align={'center'}>{titleRender()}</TableCell>
                {/* call buttonRender function to determine which button to render */}
                <TableCell sx={{ width: 250 }} align={'center'}>{buttonRender()}</TableCell>
                {/* if the username is for a profile that is not an Admin, a DELETE button will render to delete that user using deleteUser function*/}
                <TableCell sx={{ width: 250 }} align={'center'}>{member.access_level < 2 ? <Button sx={{ backgroundColor: 'black' }} variant={'contained'} onClick={deleteUser}><DisabledByDefaultIcon fontSize='small'/>DELETE USER</Button> : <p></p>}</TableCell>
            </TableRow>
        </>
    )


}

export default RosterMember;