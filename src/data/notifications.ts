import type { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Jonli seans boshlandi',
    message: '203-xonada Prof. Dilorom Karimova tomonidan "Anxiety bilan ishlash" seansi jonli efirda boshlandi.',
    time: '12 daqiqa oldin',
    isRead: false,
    type: 'live',
    link: '/live/session-203'
  },
  {
    id: 'notif-2',
    title: 'Yangi o‘quv qo‘llanmasi',
    message: 'Kafedra tomonidan "CBT asoslari va amaliy mashqlar qo‘llanmasi" PDF formati yuklandi.',
    time: '1 soat oldin',
    isRead: false,
    type: 'material',
    link: '/materials/mat-001'
  },
  {
    id: 'notif-3',
    title: 'Yangi keys tahlili',
    message: 'Case #024 (PT-9012) bo‘yicha KBT amaliy tahlili o‘quv bazasiga kiritildi.',
    time: '3 soat oldin',
    isRead: true,
    type: 'case',
    link: '/cases/case-024'
  },
  {
    id: 'notif-4',
    title: 'Yangi amaliyot videosi',
    message: 'Dots. Jamshid Aliyevning "Psixologik konsultatsiyada faol tinglash" videosi tasdiqlandi va e’lon qilindi.',
    time: 'Kecha',
    isRead: true,
    type: 'video',
    link: '/videos/vid-102'
  }
];
