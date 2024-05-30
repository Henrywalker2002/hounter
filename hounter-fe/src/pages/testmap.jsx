import React from "react";
import Map4Re from "../component/Maps4Re";
import { useState } from "react";

const TestMap = () => {
    const [postDetail, setPostDetail] = useState({latitude: 10.79320300, longitude: 106.69020300});
    return (
        <Map4Re data={[postDetail.latitude, postDetail.longitude]}/>
    );
};

export default TestMap; 
