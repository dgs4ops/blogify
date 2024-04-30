import { ApiProperty } from '@nestjs/swagger';

export class AuthorMeResponseDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AuthorMeResponseDto {
  @ApiProperty({
    type: 'object',
  })
  meta: undefined;

  @ApiProperty({
    type: () => AuthorMeResponseDataDto,
  })
  data: AuthorMeResponseDataDto;
}
