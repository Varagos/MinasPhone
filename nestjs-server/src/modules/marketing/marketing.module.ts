import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';

@Module({
  controllers: [],
  providers: [MarketingService],
})
export class MarketingModule {}
