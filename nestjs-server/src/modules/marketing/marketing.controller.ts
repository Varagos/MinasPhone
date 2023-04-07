import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreateMarketingDto } from './dto/create-marketing.dto';
import { UpdateMarketingDto } from './dto/update-marketing.dto';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Post()
  create(@Body() createMarketingDto: CreateMarketingDto) {
    return this.marketingService.create(createMarketingDto);
  }

  @Get()
  findAll() {
    return this.marketingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingDto: UpdateMarketingDto) {
    return this.marketingService.update(+id, updateMarketingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingService.remove(+id);
  }
}
