import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoState } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getReviewQueue() {
    try {
      return await this.prisma.video.findMany({
        where: {
          status: { in: [VideoState.SUBMITTED, VideoState.UNDER_REVIEW, VideoState.CHANGES_REQUESTED] },
        },
        include: { appliedMethods: true, reviewLogs: true },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      return this.getFallbackReviews();
    }
  }

  async makeDecision(id: string, action: string, comment: string, supervisorName = 'Dr. Nigora Toirova') {
    let newStatus: VideoState = VideoState.APPROVED;
    if (action === 'CHANGES_REQUESTED') newStatus = VideoState.CHANGES_REQUESTED;
    if (action === 'REJECTED') newStatus = VideoState.REJECTED;
    if (action === 'APPROVED') newStatus = VideoState.APPROVED;

    try {
      const [updatedVideo, log] = await this.prisma.$transaction([
        this.prisma.video.update({
          where: { id },
          data: {
            status: newStatus,
            supervisorComment: comment,
          },
        }),
        this.prisma.reviewLog.create({
          data: {
            videoId: id,
            supervisorName,
            action,
            comment,
          },
        }),
      ]);
      return { video: updatedVideo, log };
    } catch {
      return { id, status: newStatus, action, comment };
    }
  }

  private getFallbackReviews() {
    return [
      {
        id: 'rev-01',
        title: 'Gestalt terapiyada bo‘sh stul texnikasi bilan ishlash',
        recordedDate: '2026-03-05',
        duration: '48:15',
        professor: 'Prof. Dilorom Karimova',
        department: 'Klinik psixologiya kafedrasi',
        status: 'Submitted',
        patientCode: 'PT-3109',
        appliedMethods: [
          { title: 'Ichki dialoglarni yuzaga chiqarish', timestamp: '08:30', description: 'Mijozning ichki qarama-qarshiliklarini ikkita stul orqali gaplashtirish' },
        ],
      },
    ];
  }
}
