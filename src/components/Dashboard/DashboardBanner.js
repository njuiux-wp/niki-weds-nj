import React, { useState, useEffect } from 'react';

const DashboardBanner = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('February 7, 2025 00:00:00');

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const intervalId = setInterval(updateCountdown, 1000); // Update every minute

        updateCountdown(); // Initial call to set the correct time immediately

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <>
            <div className="main-banner-box">
                <img src="https://i.pinimg.com/736x/56/cf/5b/56cf5bea9e468c7781c6f7cfd17194bc.jpg" className="w-full h-[380px] object-cover object-bottom" alt="njniki" />
            </div>
            <div className="main-countdown-box">
                <div className="flex flex-col">
                    <span className="title-font-m fs-14 mb-1">{timeLeft.days}</span>
                    <span className="desc-font-s fs-10">days</span>
                </div>
                <div className="flex flex-col">
                    <span className="title-font-m fs-14 mb-1">{timeLeft.hours}</span>
                    <span className="desc-font-s fs-10">hours</span>
                </div>
                <div className="flex flex-col">
                    <span className="title-font-m fs-14 mb-1">{timeLeft.minutes}</span>
                    <span className="desc-font-s fs-10">minutes</span>
                </div>
                <div className="flex flex-col">
                    <span className="title-font-m fs-14 mb-1">{timeLeft.seconds}</span>
                    <span className="desc-font-s fs-10">seconds</span>
                </div>
            </div>
        </>
    );
};

export default DashboardBanner;