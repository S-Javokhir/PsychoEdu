import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviewQueue() {
    return this.reviewsService.getReviewQueue();
  }

  @Patch(':id/decision')
  async makeDecision(
    @Param('id') id: string,
    @Body('action') action: string,
    @Body('comment') comment: string,
    @Body('supervisorName') supervisorName?: string,
  ) {
    return this.reviewsService.makeDecision(id, action, comment, supervisorName);
  }
}
