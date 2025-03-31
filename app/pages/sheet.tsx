import React from 'react';
import Nav from '../components/Nav';
import SubSheet from '../components/subSheet';

function Sheet() {
    return (
        <>
        <Nav />
        <div className=" p-10">
            <SubSheet />
        </div>
        </>
    );
}

export default Sheet;