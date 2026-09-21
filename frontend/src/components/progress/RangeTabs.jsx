const ranges = [{
  key: 'daily',
  label: 'Daily'
}, {
  key: 'weekly',
  label: 'Weekly'
}, {
  key: 'monthly',
  label: 'Monthly'
}];
const RangeTabs = ({
  active,
  onChange
}) => {
  return <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
      {ranges.map(r => <button key={r.key} onClick={() => onChange(r.key)} className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${active === r.key ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500'}`}>
          {r.label}
        </button>)}
    </div>;
};
export default RangeTabs;