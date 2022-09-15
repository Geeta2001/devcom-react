import { useEffect } from "react";
import { useState } from "react"
import AdminService from "../services/AdminService";
import 'bootstrap/dist/css/bootstrap.min.css';
const AdminHome = () => {
    const[developers, setDevelopers] = useState([]);

    useEffect(() => {
        AdminService.getAll() 
            .then(response => {
                console.log('Developer Details', response.data);
                setDevelopers(response.data);
            })
            .catch(error => {
                console.log("Error fetching details", error);
            })
    }, []);
    return (
        <div>
            <h3>List of developers</h3>
            <div>
                <table border="1" cellPadding="10">
                <tbody>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Skill level</th>
                </tr>
                {
                    developers.map(developer => (
                        <tr key={developer.devId}>
                            <td>{developer.name}</td>
                            <td>{developer.email}</td>
                            <td>{developer.skillLevel}</td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminHome;