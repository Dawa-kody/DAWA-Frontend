'use client';

import React, { useState } from 'react';
import MedicineTable from '@/components/MediList';
import DrugModal from '@/components/MediModal';
import ConfirmModal from '@/components/ConfirmModal';
import Nav from '@/components/Nav';

interface Medicine {
  id: number;
  name: string;
  type: string;
  count: number;
  body_system: string | null;
}

export default function DrugManagementPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editData, setEditData] = useState<Medicine | null>(null);

  return (
    <>
      <Nav />
      <MedicineTable
        onAdd={() => setIsAddOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
        onEdit={(data) => setEditData(data)}
      />
      {isAddOpen && <DrugModal onClose={() => setIsAddOpen(false)} />}
      {editData && (
        <DrugModal
          initialData={editData}
          onClose={() => setEditData(null)}
        />
      )}
      {isDeleteOpen && <ConfirmModal onClose={() => setIsDeleteOpen(false)} />}
    </>
  );
}
