'use client';
import CountUp from 'react-countup';

const AnimateCountUp = ({
    start = 0,
    end = 100,
    duration = 2,
    scrollSpyDelay = 10,
    className = "text-4xl font-semibold",
}) => {

    return (
        <CountUp
            enableScrollSpy
            scrollSpyOnce
            start={start}
            end={end}
            duration={duration}
            scrollSpyDelay={scrollSpyDelay}
        >
            {({ countUpRef }) => (
                <p className={className}>
                    <span ref={countUpRef} />
                </p>
            )}
        </CountUp>
    );
}

export default AnimateCountUp;