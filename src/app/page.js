'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Showproducts from "./components/Showproducts";
export default function Page() {
  const router = useRouter()
  return (
    <div>
    <Showproducts></Showproducts>
     
     
    </div>
  );
}
