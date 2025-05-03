import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [wishlists, setWishlists] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchWishlists = async () => {
    const res = await axios.get('http://localhost:5000/api/wishlists', {
      params: { userId: user._id },
    });
    setWishlists(res.data);
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/wishlists/${editId}`, { name });
    } else {
      await axios.post('http://localhost:5000/api/wishlists', { name, userId: user._id });
    }
    setName('');
    setEditId(null);
    setOpen(false);
    fetchWishlists();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/wishlists/${id}`);
    fetchWishlists();
  };

  const openEdit = (wishlist) => {
    setEditId(wishlist._id);
    setName(wishlist.name);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Wishlists</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <PlusIcon className="h-5 w-5" /> Add Wishlist
          </button>
          <button onClick={logout} className="text-red-600 underline">Logout</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlists.map(wl => (
          <div key={wl._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span className="text-lg">{wl.name}</span>
            <div className="flex gap-2">
              <button onClick={() => openEdit(wl)} className="text-blue-500 hover:text-blue-700">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(wl._id)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow">
            <Dialog.Title className="text-lg font-medium mb-4">
              {editId ? 'Edit Wishlist' : 'New Wishlist'}
            </Dialog.Title>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Wishlist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="text-gray-500">Cancel</button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editId ? 'Update' : 'Create'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
