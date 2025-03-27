import React from 'react';
import Nav from '../components/Nav';
import SubSheet from '../components/subSheet';

function Sheet() {
    return (
        <>
        <Nav />
        {/*메인 바디 */}
        <div className=" p-10">
            <SubSheet />
        </div>
        </>
    );
}

export default Sheet;