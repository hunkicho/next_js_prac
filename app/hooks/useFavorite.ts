'use client';

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from 'react-hot-toast';

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorites {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorites) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = async () => {
                    await fetch(`/api/favorites/${listingId}`, {
                        method: 'DELETE',
                        cache: 'no-store',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then((response) => {
                        if (response.status !== 200) {
                            throw new Error('Invalid ID');
                        }
                    });
                }
            } else {
                request = async () => {
                    await fetch(`/api/favorites/${listingId}`, {
                        method: 'POST',
                        cache: 'no-store',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then((response) => {
                        if (response.status !== 200) {
                            toast.error('Invalid ID.');
                        }
                    });
                }
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;