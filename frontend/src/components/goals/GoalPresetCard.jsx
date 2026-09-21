const presets = [{
  key: 'lose',
  label: 'Weight Loss',
  desc: 'Calorie deficit with high protein to preserve muscle.'
}, {
  key: 'maintain',
  label: 'Maintenance',
  desc: 'Balanced intake to stay at your current weight.'
}, {
  key: 'gain',
  label: 'Weight Gain',
  desc: 'Calorie surplus for steady, healthy weight gain.'
}, {
  key: 'muscle',
  label: 'Muscle Gain',
  desc: 'High protein and calories to support muscle growth.'
}];
const GoalPresetCard = ({
  active,
  onSelect
}) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {presets.map(p => <button key={p.key} onClick={() => onSelect(p.key)} className={`text-left p-4 rounded-xl border-2 transition ${active === p.key ? 'border-brand-600 bg-brand-50' : 'border-gray-100 bg-white hover:border-brand-200'}`}>
          <p className="font-semibold text-gray-900">{p.label}</p>
          <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
        </button>)}
    </div>;
};
export default GoalPresetCard;