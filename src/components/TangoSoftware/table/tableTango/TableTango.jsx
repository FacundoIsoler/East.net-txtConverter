// src/components/TangoSoftware/table/tableTango/TableTango.jsx
import React from 'react';
import TableHeader from '../tableHeader/TableHeader';
import './TableTango.css';

const TableTango = () => {
    return (
        <main className="table-tango">
            <h1>TableTango</h1>
            <table>
                <TableHeader />
            </table>
        </main>
    );
};

export default TableTango;
