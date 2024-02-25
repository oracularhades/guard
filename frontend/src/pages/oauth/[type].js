"use client"

import { useRouter } from "next/router";
import Magiclink from "../magiclink";

export default function oauth() {
    const router = useRouter();
    
    if (router.query && router.query.type) {
        return (
            <Magiclink type={router.query.type}/>
        )
    }
}