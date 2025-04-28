
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { ChartPie } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#4ade80', '#f87171'];

const FeedbackStats = () => {
  const { currentUser } = useAuth();
  
  // Only render for admin email
  if (currentUser?.email !== 'jhonm21@gmail.com') {
    return null;
  }

  const { data: feedbackStats, isLoading } = useQuery({
    queryKey: ['feedbackStats'],
    queryFn: async () => {
      const feedbackDocs = await getDocs(collection(db, "userFeedback"));
      let likes = 0;
      let dislikes = 0;

      feedbackDocs.forEach((doc) => {
        const data = doc.data();
        if (data.liked) {
          likes++;
        } else {
          dislikes++;
        }
      });

      return [
        { name: 'Me gusta', value: likes },
        { name: 'No me gusta', value: dislikes }
      ];
    },
  });

  if (isLoading) {
    return <div className="p-4">Cargando estadísticas...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <ChartPie className="h-5 w-5" />
        <h3 className="font-semibold">Estadísticas de Feedback</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={feedbackStats}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {feedbackStats?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedbackStats;
