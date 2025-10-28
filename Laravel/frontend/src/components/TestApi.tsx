import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TestApi: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Panggil endpoint Laravel
    api
      .get('/hello') // pastikan Laravel punya route GET /api/hello
      .then((res) => {
        setMessage(res.data.message || JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error('Error fetching API:', err);
        setError(err.response?.data?.message || 'Gagal menghubungkan ke API');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>⏳ Menghubungkan ke API...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>❌ {error}</p>;
  }

  return (
    <div>
      <h2>🔗 Koneksi Backend Laravel</h2>
      <p>Pesan dari API:</p>
      <pre style={{ background: '#101010ff', padding: '10px', borderRadius: '6px' }}>
        {message}
      </pre>
    </div>
  );
};

export default TestApi;
