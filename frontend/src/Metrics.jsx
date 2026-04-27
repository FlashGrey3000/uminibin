import { useState, useEffect } from "react";
import Card from "./ui/Card";

function Metrics() {
    const [metrics, setMetrics] = useState({
        totalRateLimits: 0,
        totalLetters: 0,
        totalFishes: 0,
        umazingScore: 0,
        serverUpTime: ""
    });

    // const metricList = Object.entries(metrics).map(([key, val]) => <tr key={key}><td>{key}</td><td>{val}</td></tr>);
    const metricList = Object.entries(metrics).map(([key, val]) => <Card key={key} title={key} value={val} />);
    
    const fetchMetrics = () => {
        fetch('http://localhost:3000/api/metric', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {setMetrics(data)})
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchMetrics();

        const interval = setInterval(fetchMetrics, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Metrics</h1>
            <Card title={"UMAZING"} subtitle={"uma no namae juan"} value={"Saikyou!"} />
            {/* <table border={5}>
                <tbody>
                    {metricList}
                </tbody>
            </table> */}
            <div style={{display: "flex", flexWrap: 'wrap'}}>
                {metricList}
            </div>
        </div>
    );
}

export default Metrics