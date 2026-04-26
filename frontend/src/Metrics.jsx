import { useState, useEffect } from "react";

function Metrics() {
    const [metrics, setMetrics] = useState({});
    useEffect(() => {
        fetch('http://localhost:3000/api/metric', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {setMetrics(data); console.log(data)})
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Metrics</h1>
            {/* {metrics} */}
        </div>
    );
}

export default Metrics