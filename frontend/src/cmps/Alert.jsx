import React, { useState } from 'react'

export function Alert() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        window.bus.subscribe("alert", (e) => {
            const uid = uid();
            const { type, message } = e;
            setAlerts((prev) => [...prev, { type, message, uid }]);
            setTimeout(() => {
                setAlerts(alerts.filter((alert) => alert.uid !== id));
            }, 5000);
        });
    }, []);

    return (
        <div className='alert'>
            Alert
        </div>
    )
}
