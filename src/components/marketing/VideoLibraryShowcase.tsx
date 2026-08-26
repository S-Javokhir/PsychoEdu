import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  ArrowRight, 
  Sparkles, 
  User, 
  CheckCircle2,
  Clock,
  Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VideoLibraryShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoToVideos = () => {
    if (isAuthenticated) {
      navigate('/videos');
    } else {
      navigate('/login');
    }
  };

  const mockCards = [
    {
      id: 'vid-1',
      title: 'Anxiety bilan ishlash (KBT yondashuvi)',
      method: 'KBT (CBT)',
      duration: '42:18',
      instructor: 'Prof. Dilorom Karimova',
      activityType: 'Individual konsultatsiya',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-2',
      title: 'Faol tinglash va empatiya texnikasi',
      method: 'Faol tinglash',
      duration: '38:40',
      instructor: 'Dots. Jamshid Aliyev',
      activityType: 'Birlamchi diagnostika',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-3',
      title: 'CBT asosida konsultatsiya va kontrakt tuzish',
      method: 'Kognitiv qayta tuzish',
      duration: '45:10',
      instructor: 'Prof. Dilorom Karimova',
      activityType: 'Individual terapiya',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-4',
      title: 'Klinik psixologiyada birinchi uchrashuv tuzilmasi',
      method: 'Integrativ yondashuv',
      duration: '50:15',
      instructor: 'Dr. Nigora Toirova',
      activityType: 'Konsultatsiya boshqaruvi',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="video-kutubxona" className="py-20 lg:py-28 bg-surface border-t border-border-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Product UI Showcase (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-page border border-border-ui rounded-[32px] p-6 sm:p-8 shadow-card space-y-6">
              
              <div className="flex items-center justify-between border-b border-border-ui pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-200">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-main font-sans">Kafedra Video Kutubxonasi</h4>
                    <p className="text-xs text-text-muted">Metodik daqiqalar va protokollar bilan boyitilgan</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-sage-light text-deep-teal px-3 py-1 rounded-full border border-sage">
                  4 ta namuna dars
                </span>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockCards.map((v) => (
                  <div
                    key={v.id}
                    onClick={handleGoToVideos}
                    className="overflow-hidden border border-border-ui rounded-2xl bg-surface hover:border-teal-400 hover:shadow-card transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Video Thumbnail */}
                      <div className="aspect-[16/10] bg-neutral-900 relative overflow-hidden">
                        <img
                          src={v.img}
                          alt={v.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Play Icon on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-deep-teal/90 text-white flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px]">
                          <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sage" />
                            {v.duration}
                          </span>
                          <span className="bg-deep-teal/90 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                            {v.method}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3.5">
                        <p className="text-xs font-bold text-text-main line-clamp-1 group-hover:text-deep-teal transition-colors">
                          {v.title}
                        </p>
                        <p className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-text-soft" />
                          <span>{v.instructor}</span>
                        </p>
                      </div>
                    </div>

                    <div className="px-3.5 pb-3.5 pt-1 border-t border-border-ui/60 text-[11px] text-text-muted flex items-center justify-between">
                      <span className="truncate max-w-[120px]">{v.activityType}</span>
                      <span className="text-deep-teal font-semibold text-xs">Ko‘rish →</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Supporting narrative & CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-sage-light px-4 py-1.5 rounded-full border border-sage text-xs font-semibold text-deep-teal">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Strukturalangan Amaliy Arxiv</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-text-main tracking-tight leading-tight">
              Real seanslardan o‘rganing
            </h2>

            <p className="text-base sm:text-lg text-text-muted font-sans font-light leading-relaxed">
              Har bir amaliy video shunchaki yozuv emas — u daqiqama-daqiqa ajratilgan metodik belgilar va nazariy materiallar bilan boyitilgan ta’limiy manbadir.
            </p>

            <div className="space-y-3 pt-2 text-sm text-text-muted font-sans">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Metodik bosqichlar vaqt belgilari (timestamps) bilan ajratilgan.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Har bir videoga tegishli nazariy qo‘llanma va anonim keys biriktirilgan.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Etik qoidalarga binoan videolarni yuklab olish cheklangan (view-only).</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleGoToVideos}
                className="inline-flex items-center gap-2 bg-deep-teal hover:bg-teal-700 text-white font-sans font-bold text-sm px-6 py-3.5 rounded-full shadow-card hover:shadow-elevated transition-all duration-200"
              >
                <span>Video kutubxonasini ko‘rish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
