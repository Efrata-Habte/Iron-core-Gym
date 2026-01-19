import SectionHeading from '../ui/SectionHeading'
import TrainerCard from './TrainerCard'
import Button from '../ui/Button'
import FloatingBall from '../ui/FloatingBall'


import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TrainersSection() {
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/trainers`)
            .then(res => res.json())
            .then(data => setTrainers(data.slice(0, 3))) // Show only 3 on home page
            .catch(err => console.error(err))
    }, [])

    return (
        <section className="trainers-section">
            <SectionHeading centered>
                OUR <span className="red-text">TRAINERS</span>
            </SectionHeading>

            {/* Floating balls belonging to the section */}
            <FloatingBall color="black" size={130} top="15%" left="5%" />
            <FloatingBall color="red" size={100} bottom="10%" right="5%" />

            {trainers.map((trainer, index) => (
                <TrainerCard key={trainer.name} {...trainer} />
            ))}


            <div className="join-cta">
                <p>
                    Don't waste your time, start your transformation{' '}
                    <span className="red-text">RIGHT NOW!</span>
                </p>
                <Button to="/plans">Get Membership</Button>
            </div>
        </section>
    )
}
