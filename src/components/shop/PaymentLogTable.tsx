import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import config from '@/config'

interface Payment {
    id: string
    date: string
    amount: number
    status: string
}

const PaymentLogTable: React.FC = () => {
    const { jwtToken, isAuthenticated, user } = useAuth()
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user || !user.userId) {
                setError('User is not authenticated')
                setLoading(false)
                return
            }

            try {

                console.log('Sending userId:', user?.userId)

                const response = await fetch(`${config.backendUrl}/payments/logs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({ userId: user?.userId }),
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }

                const data: { payments: Payment[] } = await response.json()
                setPayments(data.payments)
            }
            catch (err: any) {
                setError(err.message || 'An unexpected error occurred')
            }
            finally {
                setLoading(false)
            }
        }

        fetchPayments()
    }, [jwtToken, isAuthenticated, user?.userId])

    if (!user || !user.userId) {
        return null
    }

    return (
        <div className="w-1/2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4">
            {payments.length === 0 ? (
                <p>No payments found</p>
            ) : (
                loading ? (
                    <p>Loading payments...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="w-full text-left border-collapse border-separate">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="px-4 py-2">{payment.date}</td>
                                        <td className="px-4 py-2">{payment.amount}</td>
                                        <td className="px-4 py-2">{payment.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            )}
        </div>
    )
}

export default PaymentLogTable