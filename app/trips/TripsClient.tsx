'use client';

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        await fetch(`/api/reservations/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.status == 204) {
                toast.success('Reservation cacelled');
            } else {
                toast.error('Something error');
            }
            router.refresh();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router]);

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default TripsClient;