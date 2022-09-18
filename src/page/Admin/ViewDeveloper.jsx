import { useEffect } from "react";
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import AdminService from "../../services/AdminService";
import { Navigate, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Box } from "@mui/material";

const ViewDeveloper = () => {
    const[user, setUser] = useState([]);
    const[blocked, setBlocked] = useState('');
    const[userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        init();
      }, []);
    
    const init = () => {
        AdminService.getAllUsers() 

            .then(response => {
                console.log('User Details', response.data);
                setUser(response.data);

            })
            .catch(error => {
                console.log("Error fetching details", error);
            })
    }

    const Block = (e) => {
        e.preventDefault();
        AdminService.blockUser(userId)
        .then(response => {
            console.log("User is Blocked", response.data);
        })
        Swal.fire({
            icon: 'success',
            title: 'User Blocked!',
            text: `User is blocked.`,
            showConfirmButton: false,
            timer: 3000
        });
        navigate("/ViewDeveloper");
        
    }

    const Unblock = (e) => {
        e.preventDefault();
        AdminService.unblockUser(userId)
        .then(response => {
            console.log("User is Unblocked", response.data);
        })
        Swal.fire({
            icon: 'success',
            title: 'User Unblocked!',
            text: `User is unblocked.`,
            showConfirmButton: false,
            timer: 3000
        });
        navigate("/ViewDeveloper");
    }

    return (
        <div>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>List of Users</h3>
            <div>
                <table border="1" cellPadding="10" className="table table-bordered table-striped">
                <tbody>
                <tr>
                <th>UserId</th>
                <th>Email</th>
                <th>Is Blocked</th>
                </tr>
                {
                    user.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{JSON.stringify(user.blocked)}</td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            </div>

            <div className="form-outline mb-4" >
                Add UserId
                <input type="number" id="form7Example2" className="form-control" required
                value={userId} onChange= {(e) => setUserId(e.target.value)}
                                    placeholder="Enter userid" />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => Block(e)}
                >
                Block
                </Button>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => Unblock(e)}
                >
                UnBlock
                </Button>

            </div>
            </Box>
        </div>
    );
}
export default ViewDeveloper;