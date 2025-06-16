'use client';

import React, { useState } from 'react';
import { MedicineTable, MediModal, Nav } from '@/components/@Organisms';


interface Medicine {
  id: number;
  name: string;
  type: string;
  count: number;
  body_system: string | null;
}

export function MediManagement() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState<Medicine | null>(null);

  return (
    <>
      <Nav />
      <div className='w-full h-full overflow-scroll scrollbar-hide'>
        <MedicineTable
          onAdd={() => setIsAddOpen(true)}
          onEdit={(data) => setEditData(data)}
        />
        {isAddOpen && <MediModal onClose={() => setIsAddOpen(false)} />}
        {editData && (
          <MediModal
            initialData={editData}
            onClose={() => setEditData(null)}
          />
        )}
      </div>
    </>
  );
}
