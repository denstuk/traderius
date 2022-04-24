import { CACHE_MANAGER, Controller, Get, Inject } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FinanceNewsService } from "./finance-news/finance-news.service";
import { NewsDto } from "./finance-news/dtos/news-dto";

@ApiTags("News")
@Controller({
  version: "1",
})
export class AppController {
  constructor(private readonly financeNewsService: FinanceNewsService) {}

  @ApiOperation({
    description: "Fetch stocks news from finance source",
  })
  @ApiResponse({
    status: 200,
    type: [NewsDto],
  })
  @Get("/stocks")
  getStocksNews(): Promise<NewsDto[]> {
    return this.financeNewsService.fetchFromAPI();
  }
}
