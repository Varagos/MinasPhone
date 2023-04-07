import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';

@Module({
  controllers: [MarketingController],
  providers: [MarketingService],
})
export class MarketingModule {}
