import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <Card padded="lg" className="max-w-md w-full text-center border-border-ui shadow-card py-10">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-deep-teal flex items-center justify-center mx-auto mb-4 border border-teal-200 shadow-subtle">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <span className="text-xs font-mono font-bold text-teal-800 bg-sage-light px-2.5 py-1 rounded-full uppercase tracking-wider">
          404 Xatolik
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-text-main mt-3">
          Sahifa topilmadi
        </h2>

        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed max-w-sm mx-auto">
          Siz qidirayotgan sahifa mavjud emas, o‘chirilgan yoki manzili o‘zgargan bo‘lishi mumkin.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Orqaga qaytish
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="w-full sm:w-auto"
            icon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Bosh sahifaga
          </Button>
        </div>
      </Card>
    </div>
  );
};
