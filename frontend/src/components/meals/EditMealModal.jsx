import { useState } from 'react';
import { X } from 'lucide-react';
const EditMealModal = ({
  meal,
  onClose,
  onSave
}) => {
  const [items, setItems] = useState(meal.items.map(i => ({
    name: i.name,
    quantity: i.quantity
  })));
  const updateQty = (index, qty) => {
    setItems(prev => prev.map((it, i) => i === index ? {
      ...it,
      quantity: Number(qty)
    } : it));
  };
  const handleSave = () => {
    onSave(meal._id, {
      items
    });
  };
  return <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Edit Meal</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-sm text-gray-700 capitalize flex-1">{item.name}</span>
              <input type="number" min="0" step="0.5" value={item.quantity} onChange={e => updateQty(i, e.target.value)} className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
            </div>)}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>;
};
export default EditMealModal;