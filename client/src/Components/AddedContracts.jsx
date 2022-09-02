import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddedContracts = () => {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = () => {
        const query = process.env.REACT_APP_API_SERVER + 'contracts/getContracts'; // Query string

        // Get
        axios
            .get(query)
            .then((response) => {
                setContracts(response.data.contracts);
            })
            .catch(console.log)
            .then();
    };

    return (
        <div className='contract-table-box'>
            <h2>Added contracts</h2>
            <table className='contracts-table'>
                <thead>
                    <tr>
                        <th>
                                Label
                            </th>

                            <th>
                                Typology
                            </th>

                            <th>
                                F1 Cost
                            </th>

                            <th>
                                F2 Cost
                            </th>

                            <th>
                                F3 Cost
                            </th>                   
                    </tr>
                    
                </thead>
                <tbody>
                    {contracts.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    {item.label} 
                                </td>

                                <td>
                                    {item.typology}
                                </td>

                                <td>
                                    {item.costs[0] + ' €/KWh'}
                                </td>

                                <td>
                                    {item.costs[1] == null ? '-' : item.costs[1] + ' €/KWh'}
                                </td>

                                <td>
                                    {item.costs[2] == null ? '-' : item.costs[1] + ' €/KWh'}
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddedContracts;