'use client';

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser, safeListing } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: safeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        await fetch(`/api/listings/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.status == 204) {
                toast.success('Listing deleted');
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
                title="Properties"
                subtitle="List of your properties"
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
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete properties"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default PropertiesClient;