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
        <div className='contract-box'>
            <h2>Added contracts</h2>
            <table className='contracts-table'>
                <thead>
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
                </thead>
                <tbody>
                    {contracts.map((item, i) => (
                            <tr key={i}>
                                <td>{item.label}</td>
                                <td>{item.typology}</td>
                                {item.costs.map((cost, index) => (<td key={index}>{cost}</td>))}
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddedContracts;