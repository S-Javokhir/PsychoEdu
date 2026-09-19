import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CameraState } from '@prisma/client';

@Injectable()
export class CamerasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const cameras = await this.prisma.camera.findMany({
        include: { room: true },
        orderBy: { roomNumber: 'asc' },
      });
      return cameras;
    } catch {
      return this.getFallbackCameras();
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.camera.findUnique({
        where: { id },
        include: { room: true },
      });
    } catch {
      return this.getFallbackCameras().find((c) => c.id === id) || null;
    }
  }

  async updateState(id: string, state: string) {
    try {
      return await this.prisma.camera.update({
        where: { id },
        data: { state: state.toUpperCase() as CameraState },
      });
    } catch {
      return { id, state };
    }
  }

  private getFallbackCameras() {
    return [
      {
        id: 'cam-01',
        name: '201-xona Kamera 1 (Umumiy ko‘rinish)',
        roomNumber: '201',
        floor: 2,
        state: 'Online',
        resolution: '1080p (1920x1080)',
        fps: 30,
        cameraType: 'PTZ',
        recordingEnabled: true,
        lastActivity: 'Signal barqaror',
        thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'cam-02',
        name: '203-xona Kamera 1 (Laboratoriya faol)',
        roomNumber: '203',
        floor: 2,
        state: 'Live',
        resolution: '1080p (1920x1080)',
        fps: 30,
        cameraType: 'PTZ',
        recordingEnabled: true,
        currentActivity: 'KBT amaliy konsultatsiyasi (Xavotir tahlili)',
        currentProfessor: 'Prof. Dilorom Karimova',
        patientCode: 'PT-9012',
        startedAt: '10:32',
        lastActivity: 'Hozir efirda',
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'cam-03',
        name: '305-xona Kamera (Guruh zali)',
        roomNumber: '305',
        floor: 3,
        state: 'Preparing',
        resolution: '1080p (1920x1080)',
        fps: 30,
        cameraType: 'Panorama',
        recordingEnabled: true,
        currentActivity: 'Guruh psixoterapiyasi tayyorgarligi',
        currentProfessor: 'Dots. Jamshid Aliyev',
        startedAt: '15:00 da',
        lastActivity: 'Kutilmoqda',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
      },
    ];
  }
}
