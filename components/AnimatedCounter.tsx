'use client'

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp
                end={amount}
                duration={1}
                decimals={2}
                decimal="."
                prefix="$ "
            />
        </div>
    )
}

export default AnimatedCounter