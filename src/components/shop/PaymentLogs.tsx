import React from 'react'

interface PaymentLog {
    amount: number;
    timestamp: string;
}

interface PaymentLogsProps {
    paymentLogs: PaymentLog[];
}

const PaymentLogs = ({ paymentLogs }: PaymentLogsProps) => {
    console.log("Payment Logs:", paymentLogs);

    if (!paymentLogs || paymentLogs.length === 0) {
        return <p>No payment logs available.</p>;
    }

    return (
        <div className="w-full overflow-x-auto">
            {paymentLogs.map((paymentLog: PaymentLog) => (
                <div key={paymentLog.timestamp}>
                    <p>{paymentLog.amount}</p>
                    <p>{paymentLog.timestamp}</p>
                </div>
            ))}
        </div>
    );
}

export default PaymentLogs;