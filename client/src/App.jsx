import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ReviewForm from './components/ReviewForm';
import ReviewView from './components/ReviewView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50">
        <header className="border-b border-stone-200 bg-white py-4 px-6 mb-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-sans tracking-tight text-stone-700 uppercase">
              Stoic <span className="font-bold">Reflection</span>
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<ReviewForm />} />
            <Route path="/review/:id" element={<ReviewView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;