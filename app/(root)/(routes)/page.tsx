"use client";



import { useStoreModal } from "@/hooks/use-store-modal";
import Link from "next/link";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

useEffect (() => {
if (!isOpen) {
  onOpen();
}
}, [isOpen, onOpen]); 

  return null;
    
      <Link href="/sign-up">
        
      </Link>
    
  
}

export default SetupPage;