import { useEffect, useState, useCallback } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import InsightFlag from '../components/insights/InsightFlag';
import AverageCard from '../components/insights/AverageCard';
import axiosInstance from '../api/axiosInstance';
const Insights = () => {
  const [range, setRange] = useState(7);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data
      } = await axiosInstance.get('/insights', {
        params: {
          range
        }
      });
      setData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [range]);
  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Insights</h1>
            <p className="text-sm text-gray-500">Patterns in your eating habits, detected automatically.</p>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            {[7, 30].map(d => <button key={d} onClick={() => setRange(d)} className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${range === d ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500'}`}>
                {d} Days
              </button>)}
          </div>
        </div>

        {loading ? <p className="text-sm text-gray-400">Analyzing your meals...</p> : !data?.averages ? <p className="text-sm text-gray-400">Not enough meal history yet — log a few more days to see insights.</p> : <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <AverageCard label="Calories" value={data.averages.calories} unit=" kcal" color="text-orange-500" />
              <AverageCard label="Protein" value={data.averages.protein} unit="g" color="text-green-600" />
              <AverageCard label="Carbs" value={data.averages.carbs} unit="g" color="text-blue-500" />
              <AverageCard label="Fat" value={data.averages.fat} unit="g" color="text-purple-500" />
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-brand-600" />
                <h3 className="font-semibold text-gray-900">Detected Patterns</h3>
              </div>
              {data.flags.length === 0 ? <div className="flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-100 rounded-lg p-4">
                  <CheckCircle2 size={18} />
                  No concerning patterns found — your intake has been consistent and balanced.
                </div> : <div className="space-y-3">
                  {data.flags.map((flag, i) => <InsightFlag key={i} flag={flag} />)}
                </div>}
            </div>
          </>}
      </main>
    </div>;
};
export default Insights;