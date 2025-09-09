"use client";


import { Modal } from "@/components/ui/model";
import Link from "next/link";

const SetupPage = () => {
  return (
    <div className="p-4">
      <Modal title="Test" description="Test Desc" isOpen onClose={() => {}}>
        Children
      </Modal>
      <Link href="/sign-up">
        
      </Link>
    </div>
  );
}

export default SetupPage;