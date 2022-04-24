import { ApiProperty } from "@nestjs/swagger";

export class NewsDto {
  @ApiProperty({
    description: "News topic",
    type: String,
  })
  readonly title: string;

  @ApiProperty({
    description: "Link to origin",
    type: String,
  })
  readonly link: string;

  @ApiProperty({
    description: "Publishing date",
    type: String,
  })
  readonly pubDate: string;

  @ApiProperty({
    description: "Author",
    type: String,
  })
  readonly source: string;
}
